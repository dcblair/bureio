import {
  createContext,
  type MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import initialSongs from "~/data/songs.json";
import { getSignedS3UrlFromApi } from "~/utils/s3-signed-url-from-api";

const backupSong = {
  id: "6",
  title: "calling currents",
  trackNumber: 3,
  album: "on letting go",
  duration: 288,
  artist: "bu.re_",
  artwork: "/images/webp/cropped-dsii-artwork-1440w.webp",
  audio: "/audio/calling-currents.wav",
  bandcamp: "https://bure.bandcamp.com/track/calling-currents",
};
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artworkS3?: string;
  audioS3?: string;
  artwork: string;
  audio: string;
  trackNumber: number;
  bandcamp?: string;
}

// todo: add "fullscreen" to playerExpansion
const playerExpansion = ["collapsed", "standard"] as const;
export type PlayerExpansion = (typeof playerExpansion)[number];

interface AudioContextType {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  currentSong: Song;
  currentSongStatus: "success" | "error";
  currentTime: number;
  handleNextSong: () => void;
  handlePlay: () => void;
  handlePrevSong: () => void;
  isPlaying: boolean;
  playerExpansion: PlayerExpansion;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  togglePlayerExpanded: () => void;
  volume: number;
}

const AudioContext = createContext<AudioContextType>({
  audioRef: { current: null },
  currentSong: backupSong,
  currentSongStatus: "success",
  currentTime: 0,
  handleNextSong: () => {},
  handlePlay: () => {},
  handlePrevSong: () => {},
  isPlaying: false,
  playerExpansion: "standard",
  setCurrentTime: () => {},
  setVolume: () => {},
  togglePlayerExpanded: () => {},
  volume: 0.85,
});

const AudioProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [playerExpansion, setPlayerExpansion] =
    useState<PlayerExpansion>("standard");
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeAnimRef = useRef<number | null>(null);
  const isFading = useRef(false);
  const operationRef = useRef(0);

  const cancelFade = () => {
    if (fadeAnimRef.current !== null) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }
    isFading.current = false;
  };

  const fadeOut = (onComplete: () => void, duration = 300) => {
    const audio = audioRef.current;
    if (!audio) {
      onComplete();
      return;
    }
    cancelFade();
    const generation = ++operationRef.current;
    const startVolume = Math.min(1, Math.max(0, audio.volume));
    const startTime = performance.now();
    const step = (now: number) => {
      if (generation !== operationRef.current) return;
      const progress = Math.min((now - startTime) / duration, 1);
      audio.volume = Math.min(1, Math.max(0, startVolume * (1 - progress)));
      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = 0;
        onComplete();
      }
    };
    fadeAnimRef.current = requestAnimationFrame(step);
  };

  const fadeIn = (targetVolume: number, duration = 300) => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelFade();
    const generation = ++operationRef.current;
    audio.volume = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      if (generation !== operationRef.current) return;
      const progress = Math.min((now - startTime) / duration, 1);
      audio.volume = Math.min(1, Math.max(0, targetVolume * progress));
      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = Math.min(1, Math.max(0, targetVolume));
        isFading.current = false;
      }
    };
    fadeAnimRef.current = requestAnimationFrame(step);
  };

  const {
    data: currentSong,
    isLoading: isCurrentSongLoading,
    status: currentSongStatus,
  } = useQuery<Song>({
    queryKey: ["currentSong"],
    initialData: backupSong,
  });

  const {
    data: songs,
    error: songsError,
    isPending: areSongsLoading,
  } = useQuery<Song[]>({ queryKey: ["songs"], initialData: initialSongs });

  const { mutateAsync: updateSong } = useMutation({
    mutationFn: async (id: string) => {
      const selectedSong = songs.find((song: Song) => song.id === id);
      if (!selectedSong) throw new Error("song not found");

      // return song if audio and artwork are already fetched
      if (selectedSong && selectedSong.audio && selectedSong.artwork)
        return selectedSong;

      const selectedSongAudio = await getSignedS3UrlFromApi(
        selectedSong.audioS3!,
      );
      const selectedSongArtwork = await getSignedS3UrlFromApi(
        selectedSong.artworkS3!,
      );

      if (!selectedSongAudio || !selectedSongArtwork) {
        throw new Error("failed to fetch audio or artwork");
      }

      return {
        ...selectedSong,
        artwork: selectedSongArtwork.url,
        audio: selectedSongAudio.url,
      };
    },
    onSuccess: (updatedSong) => {
      queryClient.setQueryData(["songs"], (oldSongs: Song[]) =>
        oldSongs?.map((song) =>
          song.id === updatedSong.id ? updatedSong : song,
        ),
      );
    },
  });

  const handleSongChange = async (id: string) => {
    if (areSongsLoading || isCurrentSongLoading) return;

    try {
      const updatedSong = await updateSong(id);
      if (!updatedSong) throw new Error("failed to update song");

      queryClient.setQueryData(["currentSong"], updatedSong);

      if (audioRef?.current) {
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().catch((err) => {
            console.error("playback failed:", err);
            setIsPlaying(false);
          });
        }
      }
    } catch (error) {
      console.error("failed to update song: ", error);
    }
  };

  const handleNextSong = () => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id,
    );
    const nextIndex = (currentSongIndex + 1) % songs.length;
    handleSongChange(songs[nextIndex].id);
  };

  const handlePrevSong = () => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id,
    );
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    handleSongChange(songs[prevIndex].id);
  };

  //  handles saving current time in state and ending song
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audio) return;

    // sync audio element volume with React state
    audio.volume = volume;

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEndSong = () => {
      handleNextSong();
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("ended", handleEndSong);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("ended", handleEndSong);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      cancelFade();
    };
  }, [audioRef?.current, currentSong]);

  // handles audio playing and pausing
  const handlePlay = () => {
    const audio = audioRef.current;
    if (!currentSong?.audio || !audio) return;

    if (!audio.paused) {
      // pause is always allowed — cancel any in-progress fade first
      cancelFade();
      isFading.current = true;
      // if interrupted mid fade-in, restore to a non-zero start volume
      if (audio.volume === 0) audio.volume = volume;
      fadeOut(() => {
        audio.pause();
        isFading.current = false;
      });
    } else {
      // throttle rapid double-taps on play only
      if (isFading.current) return;
      isFading.current = true;
      const operation = ++operationRef.current;
      audio
        .play()
        .then(() => {
          // discard if a pause was triggered before this resolved
          if (operation !== operationRef.current) {
            isFading.current = false;
            return;
          }
          fadeIn(volume);
        })
        .catch((err) => {
          console.error("playback failed:", err);
          isFading.current = false;
        });
    }
  };

  // handles expanding and collapsing the player
  const togglePlayerExpanded = () => {
    if (playerExpansion === "collapsed") {
      setPlayerExpansion("standard");
    } else {
      setPlayerExpansion("collapsed");
    }
    // else if (playerExpansion === "standard") {
    //   setPlayerExpansion("fullscreen"); {
  };

  const value = {
    audioRef,
    currentSong,
    currentSongStatus: currentSongStatus,
    currentTime,
    setVolume: (volume: number) => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        setVolume(volume);
      }
    },
    handleNextSong,
    handlePlay,
    handlePrevSong,
    playerExpansion,
    isPlaying,
    setCurrentTime: (time: number) => {
      if (audioRef.current) {
        cancelFade();
        isFading.current = false;
        audioRef.current.currentTime = time;
        audioRef.current.volume = volume;
        setCurrentTime(time);
      }
    },
    togglePlayerExpanded,
    volume,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export { AudioContext, AudioProvider };

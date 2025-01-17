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
type PlayerExpansion = (typeof playerExpansion)[number];

interface AudioContextType {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  currentSong: Song;
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
  currentTime: 0,
  handleNextSong: () => {},
  handlePlay: () => {},
  handlePrevSong: () => {},
  isPlaying: false,
  playerExpansion: "standard",
  setCurrentTime: () => {},
  setVolume: () => {},
  togglePlayerExpanded: () => {},
  volume: 0.7,
});

const AudioProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [playerExpansion, setPlayerExpansion] =
    useState<PlayerExpansion>("standard");
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audio = audioRef.current;

  const {
    data: currentSong,
    error: currentSongError,
    isLoading: isCurrentSongLoading,
  } = useQuery<Song>({
    queryKey: ["currentSong"],
    initialData: backupSong,
  });

  const {
    data: songs,
    error: songsError,
    isLoading: areSongsLoading,
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
      queryClient.setQueryData(["songs"], (oldSongs: Song[]) => {
        oldSongs?.map((song) => {
          song.id === updatedSong.id ? updatedSong : song;
        });
      });
    },
  });

  const handleSongChange = async (id: string) => {
    if (areSongsLoading || isCurrentSongLoading) return;

    try {
      const updatedSong = await updateSong(id);
      if (!updatedSong) throw new Error("failed to update song");

      queryClient.setQueryData(["currentSong"], updatedSong);

      // load and play updated song if isplaying is true
      if (audioRef.current) {
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play();
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
    const nextSong = songs[(currentSongIndex + 1) % songs.length];
    nextSong ? handleSongChange(nextSong.id) : handleSongChange(songs[0].id);
  };

  const handlePrevSong = () => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id,
    );
    const prevSong = songs[(currentSongIndex - 1) % songs.length];
    prevSong
      ? handleSongChange(prevSong.id)
      : handleSongChange(songs[songs.length - 1].id);
  };

  // todo: add fade in and out & fix clean track change
  //  handles saving current time in state and ending song
  useEffect(() => {
    if (!audioRef?.current || !currentSong?.audio) return;

    const updateCurrentTime = () => {
      if (!audioRef?.current) return;
      setCurrentTime(audioRef.current.currentTime);
    };

    const handleEndSong = () => {
      handleNextSong();
    };

    audioRef.current.addEventListener("timeupdate", updateCurrentTime);
    audioRef.current.addEventListener("ended", handleEndSong);

    return () => {
      if (!audioRef?.current) return;
      audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
      audioRef.current.removeEventListener("ended", handleEndSong);
    };
  }, [audioRef?.current, currentSong]);

  // todo: fix this!
  // const fadeOut = (milliseconds = 100) => {
  //   if (!audio) return;

  //   const fade = () => {
  //     if (audio.volume > 0) {
  //       audio.volume = Math.max(0, audio.volume - 0.05);
  //       setInterval(fade, milliseconds);
  //     } else {
  //       audio.pause();
  //     }
  //   };
  //   fade();
  // };

  // const fadeIn = (milliseconds = 100) => {
  //   if (!audio) return;

  //   const fade = () => {
  //     if (audio.volume === 0) {
  //       audio.play();
  //     }

  //     if (audio.volume < volume) {
  //       audio.volume = Math.min(1, audio.volume + 0.05);
  //       setTimeout(fade, milliseconds);
  //     } else {
  //     }
  //   };
  //   fade();
  // };

  // handles audio playing and pausing
  const handlePlay = () => {
    if (!currentSong?.audio || !audioRef?.current) return;

    if (isPlaying) {
      // fadeOut(2000);
      audioRef.current.pause();
    } else {
      // fadeIn();
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
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
    currentTime,
    setVolume: (volume: number) => {
      if (audio) {
        audio.volume = volume;
        setVolume(volume);
      }
    },
    handleNextSong,
    handlePlay,
    handlePrevSong,
    playerExpansion,
    isPlaying,
    setCurrentTime: (time: number) => {
      if (audio) {
        audio.currentTime = time;
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

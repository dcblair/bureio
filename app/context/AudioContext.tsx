import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useState } from "react";
import initialSongs from "~/data/songs.json";
import { getSignedS3UrlFromApi } from "~/utils/s3-signed-url";

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
  audio: HTMLAudioElement | null;
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

export const backupSong = {
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

const AudioContext = createContext<AudioContextType>({
  audio: null,
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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
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

      return {
        ...selectedSong,
        artwork: selectedSongArtwork,
        audio: selectedSongAudio,
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
      queryClient.setQueryData(["currentSong"], updatedSong);
    } catch (error) {
      console.error("Failed to update: ", error);
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

  // establishes audio element
  useEffect(() => {
    if (!currentSong?.audio) return;

    const audioElement = new Audio(currentSong.audio);
    setAudio(audioElement);

    const updateCurrentTime = () => setCurrentTime(audioElement.currentTime);
    audioElement.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      audioElement.pause();
      audioElement.src = "";
      audioElement.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, [currentSong]);

  // handles audio ending
  useEffect(() => {
    if (!audio) return;

    const handleEndSong = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEndSong);

    return () => {
      audio.removeEventListener("ended", handleEndSong);
    };
  }, [audio]);

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
    if (!audio) return;

    if (isPlaying) {
      // fadeOut(2000);
      audio.pause();
    } else {
      // fadeIn();
      audio.play();
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
    audio,
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

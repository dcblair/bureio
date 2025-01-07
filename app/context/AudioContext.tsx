import { createContext, ReactNode, useEffect, useState } from "react";

interface Song {
  // id?: string;
  title: string;
  artist: string;
  artwork: string;
  audio: string;
  album: string;
  trackNumber: string;
}

interface S3Song {
  Key: string;
  Metadata: Song;
  ContentType: string;
}

// todo: add "fullscreen" to playerExpansion
const playerExpansion = ["collapsed", "standard"] as const;
type PlayerExpansion = (typeof playerExpansion)[number];

interface AudioContextType {
  audio: HTMLAudioElement | null;
  currentSong: S3Song;
  currentTime: number;
  handlePlay: () => void;
  isPlaying: boolean;
  playerExpansion: PlayerExpansion;
  setCurrentSong: (song: S3Song) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  togglePlayerExpanded: () => void;
  volume: number;
}

// think of schema for song
/**
 * {
 *  Key: "bureio/songs/...",
 * Metadata: {
 * title: "calling currents",
 * trackNumber: "3",
 * bandcamp: 'https://bureio.bandcamp.com/track/calling-currents'
 * }
 */

const AudioContext = createContext<AudioContextType>({
  audio: null,
  currentSong: {
    Key: "/audio/calling-currents.wav",
    Metadata: {
      title: "calling currents",
      trackNumber: "3",
      album: "on letting go",
      artist: "bu.re_",
      artwork: "/images/webp/cropped-dsii-artwork-1440w.webp",
      audio: "/audio/calling-currents.wav",
    },
    ContentType: "audio/wav",
  },
  currentTime: 0,
  handlePlay: () => {},
  isPlaying: false,
  playerExpansion: "standard",
  setCurrentSong: () => {},
  setCurrentTime: () => {},
  setVolume: () => {},
  togglePlayerExpanded: () => {},
  volume: 0.7,
});

const AudioProvider = ({
  children,
  defaultSong,
}: {
  children: ReactNode;
  defaultSong: S3Song;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [playerExpansion, setPlayerExpansion] =
    useState<PlayerExpansion>("standard");
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState(defaultSong);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // establishes audio element
  useEffect(() => {
    const audioElement = new Audio(currentSong.Metadata.audio);
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
    handlePlay,
    playerExpansion,
    isPlaying,
    setCurrentSong,
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

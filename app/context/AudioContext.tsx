import { createContext, ReactNode, useEffect, useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audio: string;
}

// todo: add "fullscreen" to playerExpansion
const playerExpansion = ["collapsed", "standard"] as const;

type PlayerExpansion = (typeof playerExpansion)[number];

interface AudioContextType {
  audio: HTMLAudioElement | null;
  currentSong: {
    id: string;
    title: string;
    artist: string;
    cover: string;
    audio: string;
  };
  currentTime: number;
  handlePlay: () => void;
  isPlaying: boolean;
  playerExpansion: PlayerExpansion;
  setCurrentSong: (song: Song) => void;
  setCurrentTime: (time: number) => void;
  togglePlayerExpanded: () => void;
}

const AudioContext = createContext<AudioContextType>({
  audio: null,
  currentSong: {
    id: "1",
    title: "calling currents",
    artist: "bu.re_",
    cover: "/images/webp/cropped-dsii-artwork-1440w.webp",
    audio: "/audio/calling-currents.wav",
  },
  currentTime: 0,
  handlePlay: () => {},
  isPlaying: false,
  playerExpansion: "standard",
  setCurrentSong: () => {},
  setCurrentTime: () => {},
  togglePlayerExpanded: () => {},
});

const AudioProvider = ({
  children,
  songUrl,
}: {
  children: ReactNode;
  songUrl: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerExpansion, setPlayerExpansion] =
    useState<PlayerExpansion>("standard");
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState({
    id: "1",
    title: "calling currents",
    artist: "bu.re_",
    cover: "/images/webp/cropped-dsii-artwork-1440w.webp",
    audio: "/audio/calling-currents.wav",
  });
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // establishes audio element
  useEffect(() => {
    const audioElement = new Audio(currentSong.audio);
    setAudio(audioElement);

    const updateCurrentTime = () => setCurrentTime(audioElement.currentTime);
    audioElement.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      audioElement.pause();
      audioElement.src = "";
      audioElement.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, [currentSong.audio]);

  // handles audio ending
  useEffect(() => {
    if (!audio) return;

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener("ended", () => {
        setIsPlaying(false);
      });
    };
  });

  // fetches presigned url for audio => see app/routes/api.s3-signed-url.ts
  useEffect(() => {
    async function fetchAudioUrl() {
      const res = await fetch(`/api/s3-signed-url?key=${songUrl}`);
      const audioUrl = res.url;

      console.log("audioUrl", audioUrl);
      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to fetch audio url", error);
        return;
      }

      setCurrentSong({ ...currentSong, audio: audioUrl });
    }

    fetchAudioUrl();
  }, [songUrl]);

  // handles audio playing and pausing
  const handlePlay = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
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
    audio,
    currentSong,
    currentTime,
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
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export { AudioContext, AudioProvider };

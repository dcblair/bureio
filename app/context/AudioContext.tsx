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
  togglePlayerExpanded: () => void;
}

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
  togglePlayerExpanded: () => {},
});

const AudioProvider = ({
  children,
  defaultSong,
}: {
  children: ReactNode;
  defaultSong: S3Song;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
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
  });

  // fetches presigned url for audio => see app/routes/api.s3-signed-url.ts
  useEffect(() => {
    async function fetchAudioUrl() {
      const res = await fetch(`/api/s3-signed-url?key=${defaultSong.Key}`);
      const audioUrl = res.url;

      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to fetch audio url", error);
        return;
      }

      setCurrentSong({
        ...currentSong,
        Metadata: { ...defaultSong.Metadata, audio: audioUrl },
      });
    }

    fetchAudioUrl();
  }, [defaultSong]);

  // fetches presigned url for artwork => see app/routes/api.s3-signed-url.ts
  useEffect(() => {
    async function fetchArtworkUrl() {
      const res = await fetch(
        `/api/s3-signed-url?key=bureio/${defaultSong.Metadata.artwork}`,
      );
      const artworkUrl = res.url;

      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to fetch artwork url", error);
        return;
      }

      setCurrentSong({
        ...currentSong,
        Metadata: { ...defaultSong.Metadata, artwork: artworkUrl },
      });
    }

    fetchArtworkUrl();
  }, [defaultSong]);

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

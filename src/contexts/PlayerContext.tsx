import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    thumbnail: string;
    members: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    hasNext: boolean;
    isLopping: boolean;
    hasPrevious: boolean;
    togglePlay: () => void;
    toggleLoop: () => void;
    playNext: () => void;
    playPrevious: () => void;
    playList: (list: Episode[], index:number) => void;
    setPlayinState: (state: boolean) => void;
    play: (episode: Episode) => void;
};

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode,
}

export function PlayerContextProvider ( { children }: PlayerContextProviderProps ) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLopping, setIsLopping] = useState(false);
  
    function play(episode: Episode) {
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList (list: Episode[], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
    }
  
    function togglePlay() {
      setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
      setIsLopping(!isLopping);
    }
  
    function setPlayinState(state: boolean) {
      setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex+1) >= episodeList.length;

    function playNext () {
      if (hasNext) {
        return;
      }
      setCurrentEpisodeIndex(currentEpisodeIndex+1);
    }

    function playPrevious() {
      if(hasPrevious) {
        setCurrentEpisodeIndex(currentEpisodeIndex -1);
      }
    }
  
    return (
      <PlayerContext.Provider value={{
                episodeList, 
                currentEpisodeIndex, 
                play, isPlaying, 
                togglePlay, 
                toggleLoop,
                setPlayinState,
                playList,
                playPrevious,
                playNext,
                hasNext,
                hasPrevious,
                isLopping,
            }}
        >
      {children}
      </PlayerContext.Provider>
      )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}
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
    hasPrevious: boolean;
    togglePlay: () => void;
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
  
    function setPlayinState(state: boolean) {
      setIsPlaying(state);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex+1) >= episodeList.length;

    function playNext () {
      const nextEpisodeIndex = currentEpisodeIndex+1;
      if (hasNext) {
        return;
      }
      setCurrentEpisodeIndex(nextEpisodeIndex);
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
                setPlayinState,
                playList,
                playPrevious,
                playNext,
                hasNext,
                hasPrevious,
            }}
        >
      {children}
      </PlayerContext.Provider>
      )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}
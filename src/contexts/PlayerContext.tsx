import { createContext, useState, ReactNode } from 'react';

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

    function playNext () {
      const nextEpisodeIndex = currentEpisodeIndex+1;
      if (nextEpisodeIndex >= episodeList.length) {
        return;
      }
      setCurrentEpisodeIndex(nextEpisodeIndex);
    }

    function playPrevious() {
      if(currentEpisodeIndex > 0) {
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
            }}
        >
      {children}
      </PlayerContext.Provider>
      )
}


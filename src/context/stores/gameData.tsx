import React, {createContext, useReducer, useContext} from 'react';
import {G} from 'react-native-svg';
import {ReducerAction} from 'types/Context';
import {Hero, Map} from 'types/Game';
import httpRequest from 'utils/httpRequest';

interface GameDataState {
  maps: Map[];
  heroes: Hero[];
  getGameData: Function;
}

type availableActions = 'SET_GAME_DATA';

interface GameDataAction extends ReducerAction {
  type: availableActions;
}

function reducer(state: GameDataState, action: GameDataAction) {
  switch (action.type) {
    case 'SET_GAME_DATA':
      return {...state, ...action.payload};
    default:
      throw new Error('Unsupported action type provided to game data context');
  }
}

const initialState: GameDataState = {
  maps: [],
  heroes: [],
  getGameData: () => console.warn('No game data provider'),
};

const GameDataContext = createContext<GameDataState>(initialState);
GameDataContext.displayName = 'GameDataStore';

const GameDataProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getGameData = async (): Promise<void> => {
    const mapData = await httpRequest({method: 'GET', url: '/maps'});
    const heroData = await httpRequest({method: 'GET', url: '/heroes'});

    console.log(heroData);
    dispatch({
      type: 'SET_GAME_DATA',
      payload: {heroes: heroData, maps: mapData},
    });
  };

  return (
    <GameDataContext.Provider value={{...state, getGameData}}>
      {props.children}
    </GameDataContext.Provider>
  );
};

const useGameDataContext = (): GameDataState => {
  const gameDataContext = useContext(GameDataContext);
  return gameDataContext;
};

export default GameDataProvider;
export {useGameDataContext};

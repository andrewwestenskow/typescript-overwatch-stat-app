import React, {createContext, useReducer, useContext} from 'react';
import {ReducerAction} from 'types/Context';
import {typeArray, isType} from 'types/Utility';
import {Player} from 'types/Users';
import httpRequest from 'utils/httpRequest';

const missingContext = () => console.warn('Missing players provider');
interface PlayerState {
  players: Player[];
  player: Player;
  getPlayers: Function;
  setPlayer: Function;
}

type availableActions = 'SET_PLAYER' | 'SET_PLAYERS';

type PlayersAction = {
  type: availableActions;
  payload: any;
};

function reducer(state: PlayerState, action: PlayersAction): PlayerState {
  switch (action.type) {
    case 'SET_PLAYER':
      if (isType<Player>(action.payload)) {
        return {...state, player: action.payload};
      }
    case 'SET_PLAYERS':
      if (typeArray<Player>(action.payload)) {
        return {...state, players: action.payload};
      }
    default:
      throw new Error('Unsupported action type provided to players context');
  }
}

const initialState: PlayerState = {
  players: [],
  player: {
    id: 0,
    name: 'No Player Found',
    private: true,
    portrait: '',
    tank_sr: null,
    damage_sr: null,
    support_sr: null,
  },
  getPlayers: missingContext,
  setPlayer: missingContext,
};

const PlayersContext = createContext<PlayerState>(initialState);
PlayersContext.displayName = 'PlayersStore';

const PlayersProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPlayers = async (): Promise<Player[]> => {
    const res = await httpRequest({method: 'GET', url: '/players'});
    dispatch({type: 'SET_PLAYERS', payload: res});
    return res;
  };

  const setPlayer = (player: Player) => {
    dispatch({type: 'SET_PLAYER', payload: player});
  };

  return (
    <PlayersContext.Provider
      value={{
        players: state.players,
        player: state.player,
        getPlayers,
        setPlayer,
      }}>
      {props.children}
    </PlayersContext.Provider>
  );
};

const usePlayersContext = (): PlayerState => {
  const playerContext = useContext(PlayersContext);
  return playerContext;
};
export default PlayersProvider;
export {usePlayersContext};

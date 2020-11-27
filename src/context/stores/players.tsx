import React, {createContext, useReducer, useContext} from 'react';
import {ContextProps, ReducerAction} from 'types/Context';
import {Player} from 'types/Users';
import httpRequest from 'utils/httpRequest';

interface PlayerState {
  players: Array<Player>;
  player: Player;
  getPlayers?: () => Promise<void>;
  setPlayer?: (player: Player) => void;
}

type availableActions = 'SET_PLAYER' | 'SET_PLAYERS';

interface PlayersAction extends ReducerAction {
  type: availableActions;
}

function reducer(state: PlayerState, action: PlayersAction) {
  switch (action.type) {
    case 'SET_PLAYER':
      return {...state, player: action.payload};
    case 'SET_PLAYERS':
      return {...state, players: action.payload};
    default:
      throw new Error('Unsupported action provided to players context');
  }
}

const initialState: PlayerState = {
  players: [],
  player: {
    name: 'No Player Found',
    private: true,
    portrait: '',
    tank_sr: null,
    damage_sr: null,
    support_sr: null,
  },
};

const PlayersContext = createContext<PlayerState>(initialState);
PlayersContext.displayName = 'PlayersStore';

export default (props: ContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPlayers = async () => {
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

export {usePlayersContext};

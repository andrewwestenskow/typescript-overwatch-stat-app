import React, {createContext, useReducer, useContext} from 'react';
import {ReducerAction} from 'types/Context';
import httpRequest from 'utils/httpRequest';
import {usePlayersContext} from 'context/stores/players';
import {useGameDataContext} from 'context/stores/gameData';
import {Hero} from 'types/Game';
import {Player} from 'types/Users';

const {player} = usePlayersContext();

interface WizardHero extends Hero {
  game_round_id: number;
}

interface WizardState {
  player_id: number;
  map_id: number | null;
  win: boolean | null;
  heroes: WizardHero[];
}

type availableActions = 'SET_MAP' | 'SET_WIN' | 'MODIFY_HEROES';

interface WizardAction extends ReducerAction {
  type: availableActions;
  action: Record<string, string | number> | WizardHero;
}

function deriveHeroChanges(
  state: WizardHero[],
  payload: WizardHero,
): WizardHero[] {
  const current = [...state];
  const index = current.findIndex((e: WizardHero) => e.id === payload.id);
  if (index === -1) {
    current.push(payload);
  } else {
    const remove = current.findIndex(
      (e: WizardHero) =>
        e.id === payload.id && e.game_round_id === payload.game_round_id,
    );
    if (remove) {
      current.splice(remove, 1);
    } else {
      current.push(payload);
    }
  }

  return current;
}

const isWizardHero = (varToCheck: any): varToCheck is WizardHero =>
  varToCheck.hasOwnProperty('game_round_id');

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_MAP':
      return {...state, ...action.payload};
    case 'SET_WIN':
      return {...state, ...action.payload};
    case 'MODIFY_HEROES':
      if (isWizardHero(action.payload)) {
        const modifiedHeroes = deriveHeroChanges(state.heroes, action.payload);
        return {...state, heroes: modifiedHeroes};
      }
    default:
      console.warn('Unsupported action type passed to wizard reducer');
      return state;
  }
}

const initialSate: WizardState = {
  player_id: player.id,
  map_id: null,
  win: null,
  heroes: [],
};

const WizardContext = createContext<WizardState>(initialSate);
WizardContext.displayName = 'WizardStore';

const WizardProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialSate);

  return (
    <WizardContext.Provider value={{...state}}>
      {props.children}
    </WizardContext.Provider>
  );
};

export default WizardProvider;

function useWizardContext() {
  const wizardContext = useContext(WizardContext);
  return wizardContext;
}

export {useWizardContext};

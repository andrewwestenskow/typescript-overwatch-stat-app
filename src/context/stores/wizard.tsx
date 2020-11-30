import React, {createContext, useReducer, useContext, useState} from 'react';
import httpRequest from 'utils/httpRequest';
import {usePlayersContext} from 'context/stores/players';
import {Hero} from 'types/Game';

const fallback = () => console.warn('No wizard provider found');

interface WizardHero extends Hero {
  game_round_id: number;
}

interface WizardState {
  player_id: number;
  map_id: number | null;
  win: boolean | null;
  heroes: WizardHero[];
  isSubmitting: boolean;
  setMapId: Function;
  setWin: Function;
  modifyHeroes: Function;
  submitMatch: Function;
}

type availableActions = 'SET_MAP' | 'SET_WIN' | 'MODIFY_HEROES';

interface WizardAction {
  type: availableActions;
  payload: Record<string, string | number | boolean> | WizardHero;
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
      } else {
        return state;
      }
    default:
      console.warn('Unsupported action type passed to wizard reducer');
      return state;
  }
}

const initialSate: WizardState = {
  player_id: 0,
  map_id: null,
  win: null,
  heroes: [],
  isSubmitting: false,
  setMapId: fallback,
  setWin: fallback,
  modifyHeroes: fallback,
  submitMatch: fallback,
};

const WizardContext = createContext<WizardState>(initialSate);
WizardContext.displayName = 'WizardStore';

const WizardProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialSate);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {player} = usePlayersContext();

  function setMapId(id: number) {
    dispatch({type: 'SET_MAP', payload: {map_id: id}});
  }

  function setWin(isWin: boolean) {
    dispatch({type: 'SET_WIN', payload: {win: isWin}});
  }

  function modifyHeroes(hero: WizardHero) {
    dispatch({type: 'MODIFY_HEROES', payload: hero});
  }

  function submitMatch() {
    setIsSubmitting(true);
    return httpRequest({
      method: 'POST',
      url: `/results/${player.id}`,
      data: {
        player_id: player.id,
        map_id: state.map_id,
        win: state.win,
        heroes: state.heroes,
      },
    }).finally(() => setIsSubmitting(false));
  }

  return (
    <WizardContext.Provider
      value={{
        ...state,
        setMapId,
        setWin,
        modifyHeroes,
        submitMatch,
        isSubmitting,
      }}>
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

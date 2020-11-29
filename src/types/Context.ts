export interface ContextProps {
  children: React.ReactChild;
}

export interface ReducerAction {
  type: string;
  payload: Record<string, string | number>;
}

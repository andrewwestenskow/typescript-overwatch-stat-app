export type EmptyProps = Record<any, never>;

export interface RouteProps {
  authNavigate: Function;
}

//Verify a value is an array containing a type
export const typeArray = <T = any>(varToCheck: any): varToCheck is Array<T> =>
  Array.isArray(varToCheck);

//Verify a value is of a given type T
export function isType<T extends Record<string, any>>(arg: T): arg is T {
  type RequiredKeys = keyof T;
  const values: RequiredKeys[] = Object.keys(arg);
  function isValidKey(key: RequiredKeys): key is RequiredKeys {
    return values.indexOf(key) !== -1;
  }

  for (let key in arg) {
    if (!isValidKey(key)) {
      return false;
    }
  }

  return true;
}

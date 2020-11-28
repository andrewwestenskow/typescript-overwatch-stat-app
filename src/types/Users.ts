export interface Player {
  name: string;
  private: boolean;
  portrait: string;
  tank_sr: number | null;
  damage_sr: number | null;
  support_sr: number | null;
  id: number;
}

export interface AuthRes {
  email: string;
  id: number;
  token: string;
  token_expire: string;
}

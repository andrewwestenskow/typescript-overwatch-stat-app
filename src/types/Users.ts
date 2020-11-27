export interface Player {
  name: string;
  private: boolean;
  portrait: string;
  tank_sr: number | null;
  damage_sr: number | null;
  support_sr: number | null;
}

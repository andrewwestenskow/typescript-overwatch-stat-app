export interface Hero {
  id: number;
  image: string;
  name: string;
  role: 'damage' | 'tank' | 'support';
  role_id: number;
  role_image: string;
}

export interface Map {
  game_mode: 'control' | 'assault' | 'escort' | 'hybrid';
  game_mode_id: number;
  id: number;
  image: string;
  name: string;
}

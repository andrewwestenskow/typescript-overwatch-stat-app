export interface Platform {
  id: number;
  name: 'pc' | 'xbl' | 'psn' | 'switch';
}

const platforms: Platform[] = [
  {id: 1, name: 'pc'},
  {id: 2, name: 'xbl'},
  {id: 3, name: 'psn'},
  {id: 4, name: 'switch'},
];

export default platforms;

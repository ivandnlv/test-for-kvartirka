import { AsteroidData } from '.';

export interface AsteroidInfo {
  name: string;
  id: string;
  isDanger: boolean;
  approachData: AsteroidData['close_approach_data'];
  diameters: AsteroidData['estimated_diameter'];
}

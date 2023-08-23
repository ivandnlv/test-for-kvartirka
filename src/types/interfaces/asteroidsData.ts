type Diameter = {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
};

interface NearEarthValue {
  links: {
    self: string;
  };
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: Diameter;
    meters: Diameter;
    miles: Diameter;
    feet: Diameter;
  };
  is_potentially_hazardous_asteroid: boolean;
}

interface NearEarth {
  [key: string]: NearEarthValue[];
}

export interface AsteroidsData {
  links: {
    next: string;
    previous: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: NearEarth[];
}

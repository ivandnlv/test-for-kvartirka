interface CloseApproach {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  miss_distance: {
    astronomical: string;
    kilometers: string;
    lunar: string;
    miles: string;
  };
  orbiting_body: string;
  relative_velocity: {
    kilometers_per_hour: string;
    kilometers_per_second: string;
    miles_per_hour: string;
  };
}

interface Diameter {
  estimated_diameter_max: number;
  estimated_diameter_min: number;
}

interface EstimatedDiameter {
  fest: Diameter;
  kilometers: Diameter;
  meters: Diameter;
  miles: Diameter;
}

interface Links {
  self: string;
}

interface OrbitalData {
  aphelion_distance: string;
  ascending_node_longitude: string;
  data_arc_in_days: number;
  eccentricity: string;
  epoch_osculation: string;
  equinox: string;
  first_observation_date: string;
  inclination: string;
  jupiter_tisserand_invariant: string;
  last_observation_date: string;
  mean_anomaly: string;
  mean_motion: string;
  minimum_orbit_intersection: string;
  observations_used: number;
  orbit_class: {
    orbit_class_description: string;
    orbit_class_range: string;
    orbit_class_type: string;
  };
  orbit_determination_date: string;
  orbit_id: string;
  orbit_uncertainty: string;
  orbital_period: string;
  perihelion_argument: string;
  perihelion_distance: string;
  perihelion_time: string;
  semi_major_axis: string;
}

interface NearEarth {
  absolute_magnitude_h: number;
  close_approach_data: CloseApproach[];
  designation: string;
  estimated_diameter: EstimatedDiameter;
  id: string;
  is_potentially_hazardous_asteroid: boolean;
  is_sentry_object: boolean;
  links: Links;
  name: string;
  name_limited: string;
  nasa_jpl_url: string;
  neo_reference_id: string;
  orbital_data: OrbitalData;
}

export interface AsteroidsData {
  links: {
    next: string;
    self: string;
  };
  near_earth_objects: NearEarth[];
  page: {
    number: number;
    size: number;
    total_elements: number;
    total_pages: number;
  };
}

import axios from 'axios';

export const API_KEY = 'cZjLjyWRUYfD36vY8ngfEgUWQMoJ29NdeRHyFhyO';

const instance = axios.create({
  baseURL: 'https://api.nasa.gov/neo/rest/v1',
});

export default instance;

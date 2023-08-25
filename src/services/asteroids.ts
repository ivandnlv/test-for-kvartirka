import { AsteroidData, AsteroidsData } from '@/types/interfaces';
import axios from './axios';
import { API_KEY } from './axios';

interface GetAllAsteroidsParams {
  startDate: string;
  endDate: string;
}

const getAllAsteroids = async ({
  startDate,
  endDate,
}: GetAllAsteroidsParams): Promise<AsteroidsData> => {
  try {
    const res = await axios.get(
      `/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`,
    );

    if (!res.data) throw new Error('Не удалось получить данные');

    return res.data;
  } catch (error) {
    throw new Error('Не удалось получить данные');
  }
};

const getAsteroid = async (id: string): Promise<AsteroidData> => {
  const res = await axios.get(`/neo/${id}?api_key=${API_KEY}`);

  if (!res.data) throw new Error('Не удалось получить данные о данном астероиде');

  return res.data;
};

export { getAllAsteroids, getAsteroid };

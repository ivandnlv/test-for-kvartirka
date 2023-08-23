import { AsteroidsData } from '@/types/interfaces';
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

    if (!res.data) throw new Error("Can't fetch data");

    return res.data;
  } catch (error) {
    throw new Error("Can't fetch data");
  }
};

export { getAllAsteroids };

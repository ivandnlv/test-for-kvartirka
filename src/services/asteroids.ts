import axios from './axios';
import { API_KEY } from './axios';

const getAllAsteroids = async () => {
  const date = new Date();
  const day = date.getDay() >= 10 ? date.getDay().toString : `0${date.getDay()}`;
  const month = date.getMonth() >= 10 ? date.getMonth.toString() : `0${date.getMonth()}`;
  const year = date.getFullYear().toString();
  const startDate = [year, month, day].join('-');

  try {
    const res = await axios.get(`?start_date=${startDate}&api_key=${API_KEY}`);

    if (!res.data) throw new Error("Can't fetch data");

    console.log(res.data);

    return res.data;
  } catch (error) {
    throw new Error("Can't fetch data");
  }
};

export { getAllAsteroids };

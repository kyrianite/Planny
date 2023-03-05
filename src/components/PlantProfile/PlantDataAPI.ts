// https://perenual.com/docs/api
import * as dotenv from 'dotenv';
dotenv.config();
import axios, { AxiosResponse } from 'axios';
import * as PlantTypes from './PlantTypes';

const baseURL = 'https://perenual.com/api/';
const axiosOption = {headers: {'content-type': 'application/json'}};

module.exports = {
  getPlantList: async (name: string) => {
    try {
      const plants = await axios.get(`${baseURL}species-list?page=1&key=${process.env.PERENUAL_API_KEY}`, axiosOption);
      return plants.data;
    } catch (err: unknown) {
      console.log('Could not get plant list.');
      return [];
    }

  },
  getPlantDetails: async (id: number) => {
    try {
      const plantDetails = await axios.get(`${baseURL}species/details/${id}?key=${process.env.PERENUAL_API_KEY}`);
      return plantDetails.data;
    } catch (err: unknown) {
      console.log('Could not get plant details.');
      return {};
    }
  },
}

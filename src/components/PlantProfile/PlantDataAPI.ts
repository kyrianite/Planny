// https://perenual.com/docs/api

import axios, { AxiosResponse } from 'axios';
import * as PlantTypes from './PlantTypes';
import { PERENUAL_API_KEY } from '@env';

const baseURL = 'https://perenual.com/api/';
const axiosOption = {headers: {'content-type': 'application/json'}};

export async function getPlantList (name: string) {
  try {
    const plants = await axios.get(`${baseURL}species-list?q=${name}&page=1&key=${PERENUAL_API_KEY}`, axiosOption);
    return plants.data;
  } catch (err: unknown) {
    console.log('Could not get plant list.', err);
    return [];
  }
};

export async function getPlantDetails (id: number) {
  try {
    const plantDetails = await axios.get(`${baseURL}species/details/${id}?key=${process.env.PERENUAL_API_KEY}`);
    return plantDetails.data;
  } catch (err: unknown) {
    console.log('Could not get plant details.');
    return {};
  }
};

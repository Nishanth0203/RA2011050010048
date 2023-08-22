import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144:80/train';

export const registerCompany = async (companyInfo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, companyInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAuthorizationToken = async (authInfo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, authInfo);
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
};

export const getAllTrains = async (accessToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trains`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

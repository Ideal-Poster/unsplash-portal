import axios from 'axios';

const { PROXY_HOST, PROXY_PORT } = process.env;
const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com/search/photos',
  timeout: 5000,
  headers: { Authorization: `Client-ID 74a2c2a5faba167281d63307340fdff8925b30337319ec1e95471ab93ebea12b` }
});

searchUnslpash = async (searchTerm, page = 1) => {
  try {
    res = await unsplash.get('/', {
      params: {
        query: searchTerm,
        page,
        per_page: 20
      }
    });
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default searchUnslpash;

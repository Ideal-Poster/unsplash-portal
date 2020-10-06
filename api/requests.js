import axios from 'axios';

const { PROXY_HOST, PROXY_PORT } = process.env;
const unsplash = axios.create({
  baseURL: PROXY_HOST + PROXY_PORT || 'http://localhost:5000',
  timeout: 5000
});

searchUnslpash = async (searchTerm, page = 1, callback) => {
  try {
    res = await unsplash.get('/api', {
      params: {
        query: searchTerm,
        page,
        per_page: 20
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default searchUnslpash;

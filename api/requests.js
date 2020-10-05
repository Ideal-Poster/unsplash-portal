import axios from 'axios';

const { PROXY_HOST, PROXY_PORT } = process.env;
const unsplash = axios.create({
  baseURL: PROXY_HOST + PROXY_PORT || 'http://localhost:5000',
  timeout: 5000
});

function searchUnslpash(searchTerm, page = 1, callback) {
  unsplash
    .get('/api', {
      params: {
        query: searchTerm,
        page,
        per_page: 20
      }
    })
    .then(res => {
      callback(res.data.results);
      console.log(res.data);
    })
    .catch(console.log);
}

export default searchUnslpash;

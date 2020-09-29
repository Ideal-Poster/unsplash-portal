import axios from 'axios'

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
  // baseURL: 'http://localhost:5000',
  timeout: 5000,
  headers: {
    Authorization: `Client-ID`
  }
})

function searchUnslpash(searchTerm, page = 1, callback) {
  unsplash
    .get('/', {
      params: {
        query: searchTerm,
        page,
        per_page: 20
      }
    })
    .then(res => {
      callback(res.data.results)
      console.log(res.data)
    })
    .catch(console.log)
}

export default searchUnslpash

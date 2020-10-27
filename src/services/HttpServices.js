import axios from "axios";


const httpService = axios.create({
  baseURL: 'https://minutrade-react-test.glitch.me',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


export async function getProducts() {
    return await httpService.get('/')
        .then((response) => {
            return response;
    })
        .catch((error) => {
            return error.response;
    })
}


export async function postProduct(data) {
  return await httpService.post('/products', data)
      .then((response) => {
          return response;
  })
      .catch((error) => {
          return error.response;
  })
}

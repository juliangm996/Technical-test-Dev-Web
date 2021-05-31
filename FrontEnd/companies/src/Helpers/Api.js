import { BASE_URL } from './Const';

const ApiService = {
  getObject: async (object) => {
    try {
      const url = `${BASE_URL}/${object.url}`;
      const params = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  postObject: async (object) => {
    try {
      const url = `${BASE_URL}/${object.url}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object.data),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  putObject: async (object) => {
    try {
      const url = `${BASE_URL}/${object.url}`;
      const params = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object.data),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteObject: async (object) => {
    try {
      const url = `${BASE_URL}/${object.url}`;
      const params = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object.data),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default ApiService;

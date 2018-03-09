// web requests go here
import { API_ROOT } from './api-config';

export default class Api {
  /****************** User functions ******************/

  // adds a user
  static register(user_params) {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await fetch(`${API_ROOT}/users`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user_params)
        });
      } catch (err) {
        return reject(err);
      }

      const token_json = await res.json();
      if (res.ok) {
        localStorage.setItem('floratoken', token_json.token);
        return resolve(true);
      }
      return reject(token_json.message);
    });
  }

  // logs a user in with the given params
  static login(user_params) {
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await fetch(`${API_ROOT}/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user_params)
        });
      } catch (err) {
        return reject(err);
      }
      console.log(res);
      if (res.ok) {
        const token_json = await res.json();
        console.log(token_json);
        localStorage.setItem('floratoken', token_json.token);
        return resolve(true);
      }
      return reject(new Error());
    });
  }

  /****************** User Plant functions ******************/

  // gets all the user plants from the api
  static getUserPlants() {
    return new Promise(async (resolve, reject) => {
      // grab the middle part of the base64 decoded token
      let jwt_body = JSON.parse(atob(localStorage.floratoken.split('.')[1]));
      let res;
      try {
        res = await fetch(`${API_ROOT}/users/${jwt_body.user}/user_plants`, {
          method: 'GET',
          headers: {
            Authorization: localStorage.floratoken
          }
        });
      } catch (err) {
        console.log(err.toString());
        return reject(err);
      }

      if (res.ok) {
        console.log(res);
        return resolve(await res.json());
      }
      return reject(new Error());
    });
  }

  // adds a user plant for the user
  static addUserPlant(user_plant_params) {
    return new Promise(async (resolve, reject) => {
      // grab the middle part of the base64 decoded token
      let jwt_body = JSON.parse(atob(localStorage.floratoken.split('.')[1]));
      let res;
      try {
        res = await fetch(`${API_ROOT}/users/${jwt_body.user}/user_plants`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage.floratoken
          },
          body: JSON.stringify({ user_plant: user_plant_params })
        });
      } catch (err) {
        console.log(err.toString());
        return reject(err);
      }

      if (res.ok) {
        console.log(res);
        return resolve(await res.json());
      }
      return reject(new Error());
    });
  }

  static waterUserPlant(userPlantId) {
    return new Promise(async (resolve, reject) => {
      // grab the middle part of the base64 decoded token
      let jwt_body = JSON.parse(atob(localStorage.floratoken.split('.')[1]));
      let res;
      try {
        res = await fetch(
          `${API_ROOT}/users/${jwt_body.user}/user_plants/${userPlantId}/water`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: localStorage.floratoken
            }
          }
        );
      } catch (err) {
        console.log(err.toString());
        return reject(err);
      }

      if (res.ok) {
        console.log(res);
        return resolve(await res.json());
      }
      return reject(new Error());
    });
  }

  /****************** Plant functions ******************/

  // Performs a fuzzy search of the given query on the Plants table
  static searchPlants(query) {
    return fetch(`${API_ROOT}/search?query=${query}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.floratoken
      }
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  }

  /****************** Pushy functions ******************/

  // adds a Pushy token
  // @token: device id
  static registerDevice(token) {
    let jwt_body = JSON.parse(atob(localStorage.floratoken.split('.')[1]));
    return new Promise(async (resolve, reject) => {
      let res;
      try {
        res = await fetch(`${API_ROOT}/users/${jwt_body.user}/pushies`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage.floratoken
          },
          body: JSON.stringify({ pushy: { token: token } })
        });
      } catch (err) {
        return reject(err);
      }

      if (res.ok) {
        console.log(res);
        return resolve(await res.json());
      }
      return reject(new Error());
    });
  }
}

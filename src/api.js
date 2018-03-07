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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user_params)
        });
      } catch (err) {
        return reject(err)
      }

      if (res.ok) {
        const token_json = await res.json();
        localStorage.setItem('floratoken', token_json.token);
        return resolve(true);
      }
      return reject(new Error());
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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user_params)
        });
      } catch (err) {
        return reject(err)
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
            'Authorization': localStorage.floratoken
          }
        });
      } catch (err) {
        console.log(err.toString());
        return reject(err);
      }

      if (res.ok) {
        console.log(res)
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
            'Authorization': localStorage.floratoken
          },
          body: JSON.stringify({'user_plant': user_plant_params})
        });
      } catch (err) {
        console.log(err.toString());
        return reject(err);
      }

      if (res.ok) {
        console.log(res)
        return resolve(await res.json());
      }
      return reject(new Error());
    });
  }


  /****************** Plant functions ******************/
  static searchPlantsPromise(query) {
    return new Promise(async (resolve, reject) => {
      // grab the middle part of the base64 decoded token
      let res;
      try {
        res = await fetch(`${API_ROOT}/search?${query}`, {
          method: 'GET',
          headers: {
            'Authorization': localStorage.floratoken
          }
        });
      } catch (err) {
        console.log(err.toString());
        return reject(err);
      }

      if (res.ok) {
        console.log(res)
        return resolve(await res.json());
      }
      return reject(new Error());
    });
  }
  
  static searchPlants(query) {
    return fetch(`${API_ROOT}/search?${query}`, {
      method: 'GET',
      headers: {
        'Authorization': localStorage.floratoken
      }
    }).then((res) => {
      console.log(res);
      return res.json()});
  }
}

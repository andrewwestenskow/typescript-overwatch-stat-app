import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

interface RequestArgs {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  data?: Object;
}

export default async (args: RequestArgs): Promise<any> => {
  const {method, url, data} = args;
  //TODO Replace this later

  //! TEST
  // const fullUrl = 'http://10.0.0.23:3050/api' + url;

  //!WIFI
  // const fullUrl = 'http://10.0.0.72:3050/api' + url;

  //! PROD
  const fullUrl = 'http://64.227.14.5:3050/api' + url;

  const authToken = await AsyncStorage.getItem('token');

  return new Promise((resolve, reject) => {
    axios({
      data,
      headers: {
        Authorization: authToken,
      },
      method,
      url: fullUrl,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.warn(err);
        if (!authToken) {
          console.log('Token: ', authToken);
        }
        reject(err);
      });
  });
};

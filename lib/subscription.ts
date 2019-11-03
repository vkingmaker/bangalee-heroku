import axios from 'axios';
import { baseURL } from './auth';
import cookie from 'js-cookie';

export const Subscription = async (
  cardNumber: number,
  cvv: number,
  userId: string,
  postCode: number,
  Month: number,
  year: number
) => {
  const response = await axios.post(
    `${baseURL}/starrecords/subscription`,
    { cardNumber, cvv, userId: userId, postCode, Month, year },
    {
      headers: {
        'X-API-Key': cookie.get('superstar_token')
      }
    }
  );

  return response;
};

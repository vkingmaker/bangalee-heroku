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
  const response = await axios({
    method: 'POST',
    url: `${baseURL}/starrecords/subscription`,
    data: { cardNumber, cvv, userId: userId, postCode, Month, year },
    headers: {
      'x-access-token': cookie.get('superstar_token')
    }
  });

  return response;
};

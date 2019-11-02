import axios from 'axios';
import cookie from 'js-cookie';
import { baseURL } from './auth';

export const getMusic = async () => {
  const response = await axios.get(`${baseURL}/starrecords/musics`);

  return response;
};

export const addMusic = async (
  albumart: string,
  title: string,
  url: string
) => {
  const response = await axios.post(`${baseURL}/starrecords/musics`, {
    data: { albumart, title, url },
    headers: {
      'x-access-token': cookie.get('superstar_token'),
      'Content-Type': 'application/json'
    }
  });

  return response;
};

export const deleteMusic = async (musicId: string, title: string) => {
  const response = await axios.delete(
    `${baseURL}/starrecords/musics/${musicId}`,
    {
      data: { title },
      headers: {
        'x-access-token': cookie.get('superstar_token'),
        'Content-Type': 'application/json'
      }
    }
  );

  return response;
};

export const likeMusic = async (musicId: string, title: string) => {
  const response = await axios.patch(
    `${baseURL}/starrecords/musics/${musicId}/like`,
    {
      data: { title }
    },
    {
      headers: {
        'x-access-token': cookie.get('superstar_token'),
        'Content-Type': 'application/json'
      }
    }
  );
  return response;
};

export const likePicture = async (photoId: string, caption: string) => {
  const response = await axios.patch(
    `${baseURL}/starrecords/photos/${photoId}/like`,
    {
      data: { caption }
    },
    {
      headers: {
        'x-access-token': cookie.get('superstar_token'),
        'Content-Type': 'application/json'
      }
    }
  );
  return response;
};

export const deletePicture = async (photoId: string, caption: string) => {
  const response = await axios.delete(
    `${baseURL}/starrecords/photos/${photoId}`,
    {
      data: { caption },
      headers: {
        'x-access-token': cookie.get('superstar_token'),
        'Content-Type': 'application/json'
      }
    }
  );

  return response;
};

export const getPicture = async () => {
  const response = await axios.get(`${baseURL}/starrecords/photos`);

  return response;
};

export const addPicture = async (caption: string, url: string) => {
  const response = await axios.post(
    `${baseURL}/starrecords/photos`,
    { data: { caption, url } },
    {
      headers: {
        Authorization: cookie.get('superstar_token'),
        'x-access-token': cookie.get('superstar_token'),
        'Content-Type': 'application/json'
      }
    }
  );

  return response;
};

export const getTour = async () => {
  const response = await axios.get(`${baseURL}/starrecords/tours`);

  return response;
};

export const addTour = async (venue: string) => {
  const response = await axios.post(
    `${baseURL}/starrecords/tours`,
    {
      data: { venue }
    },
    {
      headers: {
        'x-access-token': cookie.get('superstar_token'),
        'Content-Type': 'application/json'
      }
    }
  );

  return response;
};

export const addVideo = async (
  title: string,
  thumb_nail: string,
  url: string
) => {
  const response = await axios.post(
    `${baseURL}/starrecords/videos`,
    {
      data: { title, thumb_nail, url }
    },
    {
      headers: {
        'x-access-token': cookie.get('superstar_token'),
        'Content-Type': 'application/json'
      }
    }
  );

  return response;
};

export const getVideo = async () => {
  const response = await axios.get(`${baseURL}/starrecords/videos`);

  return response;
};

export const likeVideo = async (videoId: string, title: string) => {
  const response = await axios.patch(
    `${baseURL}/starrecords/videos/${videoId}/like`,
    {
      data: { title }
    },
    {
      headers: {
        'x-access-token': cookie.get('superstar_token'),
        'Content-Type': 'application/json'
      }
    }
  );
  return response;
};

export const deleteVideo = async (videoId: string, title: string) => {
  const response = await axios.delete(
    `${baseURL}/starrecords/videos/${videoId}`,
    {
      data: { title },
      headers: {
        'x-access-token': cookie.get('superstar_token'),
        'Content-Type': 'application/json'
      }
    }
  );

  return response;
};

export const addComment = async (
  comment: string,
  videoId: string,
  mediaType: string
) => {
  const userId = cookie.get('superstar_userId');
  const response = await axios.post(
    `${baseURL}/starrecords/videos/${videoId}/comment`,
    {
      data: { userId, comment, mediaType },
      headers: {
        'x-access-token': cookie.get('superstar_token'),
        'Content-Type': 'application/json'
      }
    }
  );

  return response;
};

export const getComment = async (mediaType: string) => {
  const response = await axios.get(
    `${baseURL}/starrecords/${mediaType}/comments`
  );

  return response;
};

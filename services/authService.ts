import api from './axios';

export const login = async (email: string, password: string): Promise<any> => {

  try {
    const response = await api.post('users/login', {
      email,
      password,
    });

    if (response.data.data.token) {
      return response.data.data;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Something went wrong');
  }
};

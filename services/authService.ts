import axios from 'axios';

export const login = async (email: string, password: string): Promise<string> => {
  console.log(email, password);

  try {
    const response = await axios.post('http://192.168.1.7:5000/api/users/login', {
      email,
      password,
    });
    console.log(response);

    if (response.data.data.token) {
      return response.data.data.token;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Something went wrong');
  }
};

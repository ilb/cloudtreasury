import { signIn as auth } from 'next-auth/react';
import Api from '../helpers/Api';

export const signUp = async (data) => {
  return Api.post('/auth/signup', data);
}

export const signIn = async (credentials) => {
  return auth('credentials', { redirect: false, ...credentials });
}
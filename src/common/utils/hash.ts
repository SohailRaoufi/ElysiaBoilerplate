import argon2 from 'argon2';

export const hashPassword = async (plain: string) => {
  return await argon2.hash(plain);
};

export const verifyPassword = async (plain: string, hash: string) => {
  return await argon2.verify(hash, plain);
};

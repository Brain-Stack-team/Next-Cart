import { jwtVerify, SignJWT } from 'jose';
import bcrypt from 'bcryptjs';

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error('The environment variable JWT_SECRET is not set.');
  }
  return new TextEncoder().encode(secret);
};

export const signToken = async (payload) => {
  try {
    const secret = getJwtSecretKey();
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d') // Token expires in 7 days
      .sign(secret);
    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    const secret = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

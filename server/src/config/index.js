import 'dotenv/config';

export const config = {
  port: process.env.PORT || 4000,
  dbUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL,
};
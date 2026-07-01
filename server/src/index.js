import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const port = process.env.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Doctor Appoints API listening on port ${port}`);
  });
}

start();

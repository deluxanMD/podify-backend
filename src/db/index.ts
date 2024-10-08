import mongoose from 'mongoose';
import { MONGODB_URI } from '#/utils/variables';

mongoose.set('strictQuery', true);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('database connected successfully'))
  .catch((err) => console.log(`connection error ${err}`));

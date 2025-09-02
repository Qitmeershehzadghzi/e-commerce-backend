import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conDb from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import producterRoute from './routes/productRoute.js';
// import uploadRoute from './routes/uploadRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

conDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', userRouter);
// app.use('/api/upload', uploadRoute);
app.use('/api/product', producterRoute);

app.get('/', (req, res) => {
  res.send('server is running !');
});

app.listen(port, () => console.log(`server is started on port : ${port}`));

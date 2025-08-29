import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import conDb from './config/mongodb.js';
import ConnectCloud from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

conDb();
ConnectCloud()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.use('/api/user',userRouter)




app.get('/', (req, res) => {
  res.send('server is running !');
});

app.listen(port, () => console.log(`server is started on port : ${port}`));

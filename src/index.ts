// src/index.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import newsPostRoutes from './routes/newsPostRoutes';
import apiNewsPostRoutes from './routes/apiNewsPostRoutes';
import commetnRoutes from './routes/commentRoutes'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoConnectionOptions from './mongo-connection-options';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/anchor-news-v2';

const mongoOptions: MongoConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

mongoose.connect(mongoUri, mongoOptions);

app.use('/api/users', userRoutes);
app.use('/api/news', newsPostRoutes);
app.use('/api/apinews', apiNewsPostRoutes);
app.use('/api/comments', commetnRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to Anchor News!');
});


const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB database.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



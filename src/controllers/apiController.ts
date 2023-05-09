import axios from 'axios';
import NewsApiData from '../models/NewsApiData';
import { Request, Response } from 'express';
import dotenv from 'dotenv';


dotenv.config();


// Fetch news data from the NewsAPI
const fetchNewsData = async () => {
    try {
        const apiKey = process.env.API_KEY;
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

        const response = await axios.get(apiUrl);
        const newsData = response.data.articles;

        // Map the fetched data to fit the News Post model
        const mappedNewsData = newsData.map((article: any) => {
            return {
                headline: article.title,
                shortDescription: article.description,
                fullDescription: article.content,
                image: article.urlToImage,
                category: 'API', // Set the category as needed
                isBreakingNews: false, // Assuming the fetched data is not for breaking news
                createdAt: new Date(article.publishedAt),
            };
        });

        return mappedNewsData;
    } catch (error) {
        console.error('Failed to fetch news data:', error);
        return null;
    }
};

const saveNewsData = async (newsData: typeof NewsApiData[]) => {
    try {
        // Create and save news documents to the separate collection
        await NewsApiData.create(newsData);
    } catch (error) {
        console.error('Failed to save news data:', error);
    }
};

const fetchAndSaveNewsData = async (req: Request, res: Response) => {
    const newsData = await fetchNewsData();

    if (newsData) {
        await saveNewsData(newsData);
        res.status(200).json({ message: 'News data fetched and saved successfully' });
    } else {
        res.status(500).json({ error: 'Failed to fetch and save news data' });    }
};

const getAllApiNewsPosts = async (req: Request, res: Response) => {
    try {
      const apiNews = await NewsApiData.find().sort({ createdAt: -1 });
      res.json(apiNews);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve news posts' });
    }
  };


export default {
    fetchAndSaveNewsData,
    getAllApiNewsPosts
};
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const newsPostRoutes_1 = __importDefault(require("./routes/newsPostRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/anchor-news-v2';
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose_1.default.connect(mongoUri, mongoOptions);
app.use('/api/users', userRoutes_1.default);
app.use('/api/news', newsPostRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Anchor News!');
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB database.");
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

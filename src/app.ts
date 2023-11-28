import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { AllRoutes } from './routes';

// Express application cerated
const app: Application = express();

// express parsers
app.use(express.json());
app.use(cors());

// all routes
app.use('/api/v1', AllRoutes)

// home route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../view/index.html'));
});

export default app;
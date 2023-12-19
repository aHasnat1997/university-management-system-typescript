import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { AllRoutes } from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

// Express application cerated
const app: Application = express();

// express parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// all valid routes
app.use('/api/v1', AllRoutes);

// home route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../view/index.html'));
});

// all not-valid routes
app.use((req: Request, res: Response) => {
    res.status(404).json({
        'success': false,
        'massage': `'${req.originalUrl}' is not a valid route`,
    });
});

// global error handler
app.use(globalErrorHandler);

export default app;
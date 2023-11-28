import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
// import { UserRoute } from './routes/user.routes';

// Express application cerated
const app: Application = express();

// express parsers
app.use(express.json());
app.use(cors());

// all routes
// app.use('/api/users', UserRoute)

// home route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../view/index.html'));
});

export default app;
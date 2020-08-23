import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import errorHandler from './middleware/errorHandler';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(session({
  secret: 'happenings',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
}));

app.use(routes);

app.get('/', (_, response) => {
  response.status(200).json({
    status: 'success',
    message: 'welcome to "Happenings" API',
  });
});

app.all('*', (_, response) => {
  response.status(404).json({
    status: 'error',
    error: 'resource not found',
  });
});

app.use(errorHandler);

module.exports = app;

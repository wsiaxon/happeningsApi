import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';

import publicRoutes from './routes/public';
import apiRoutes from './routes/api';
import adminRoutes from './routes/admin';
import apiMiddleware from './middleware/apiAuth';
import adminMiddleware from './middleware/adminAuth';
import errorHandler from './middleware/errorHandler';

dotenv.config();
require('./config/sequelize');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/', publicRoutes);
app.use('/api', apiMiddleware, apiRoutes);
app.use('/api/admin', apiMiddleware, adminMiddleware, adminRoutes);

app.use(session({
  secret: 'happenings',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

app.use(errorHandler);

module.exports = app;

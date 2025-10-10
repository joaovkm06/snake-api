import serverless from 'serverless-http';
import app from '../Snake-API/src/app.js';

export const handler = serverless(app);

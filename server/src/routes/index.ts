import * as express from 'express';

import {pageRoutes} from './pages';

export const routes = express.Router();

routes.use(pageRoutes);

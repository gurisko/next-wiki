import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

require('dotenv').config();

import {connect as connectMongo} from './lib/mongo';
import {errorHandler} from './middlewares/errors';
import {routes} from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(routes);
// @TODO: Add `notFoundHandler`
app.use(errorHandler);

void async function() {
  try {
    await connectMongo();
    app.listen(process.env.PORT);
  } catch (err) {
    console.error(err.toString());
    process.exit(1);
  }
}();

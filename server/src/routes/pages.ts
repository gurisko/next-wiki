import * as express from 'express';
import Joi from 'joi';
import { castArray } from '../lib/castArray';

import { asyncHandler } from '../middlewares/asyncHandler';
import { validateBody, validateQuery } from '../middlewares/validate';
import { Page, PageDocument } from '../models/pages';

const router = express.Router();

/**
 * Get all pages
 *
 * GET /pages
 */
interface GetPagesQuery {
  limit: number;
  start: number;
}

const getPagesQuerySchema = Joi.object<GetPagesQuery>({
  limit: Joi.number().min(1).max(100).default(10),
  start: Joi.number().min(0).default(0),
});

router.get('/pages', validateQuery(getPagesQuerySchema), async (req, res) => {
  const {limit, start} = req.query as unknown as GetPagesQuery;
  const query = Page.find({})
    .sort({createdAt: 1})
    .lean()
    .toConstructor<PageDocument[]>();
  const [data, fullCount] = await Promise.all([
    new query().skip(start).limit(limit).exec(),
    new query().countDocuments(),
  ]);
  return res.status(200).json({
    data,
    _meta: {
      start,
      limit,
      fullCount,
      count: data.length,
    },
  });
});

/**
 * Get page by its path (slug)
 *
 * GET /pages/:path
 */
router.get(
  '/pages/:path',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const {path} = req.params;
    const page = await Page.findOne({path}).sort({createdAt: -1}).lean().exec();
    if (!page) {
      return res.status(404).end();
    }
    return res.status(200).json(page);
  }),
);

/**
 * Create a new page
 *
 * POST /pages
 */
interface CreatePageRequest {
  title: string;
  content: string;
}

const postPagesBodySchema = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().min(1).required(),
});

function getIpAddress(req: express.Request): string | null {
  return castArray(req.headers['x-real-ip'])[0] || req.connection.remoteAddress || null;
}

router.post(
  '/pages',
  validateBody(postPagesBodySchema),
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const {content: markdownContent, title} = req.body as CreatePageRequest;
    const ipAddress = getIpAddress(req);
    const newPage = await (new Page({
      ipAddress,
      markdownContent,
      title,
    }).save());
    return res.status(201).json(newPage);
  }),
);

export const pageRoutes = router;

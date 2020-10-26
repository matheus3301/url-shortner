import { Router, Request, Response } from 'express';
import path from 'path';
import LinksController from './controllers/LinksController';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

routes.get('/:slug', LinksController.redirect);

routes.post('/link', LinksController.create);
routes.get('/link/:slug', LinksController.showBySlug);

export default routes;

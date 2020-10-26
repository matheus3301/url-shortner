import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import path from 'path';

import Link from '../models/Link';

export default {
  async showBySlug(request: Request, response: Response) {
    const linksRepository = getRepository(Link);

    const { slug } = request.params;

    const link = await linksRepository
      .createQueryBuilder('links')
      .where('links.slug = :slug', { slug })
      .getOne();

    return response.json(link);
  },

  async create(request: Request, response: Response) {
    const linksRepository = getRepository(Link);

    const { slug, to } = request.body;

    console.log('new request', {
      slug,
      to,
    });

    const link = linksRepository.create({ slug, to });

    await linksRepository.save(link);

    return response.status(201).json(link);
  },

  async redirect(request: Request, response: Response) {
    const linksRepository = getRepository(Link);

    const { slug } = request.params;

    const link = await linksRepository
      .createQueryBuilder('links')
      .where('links.slug = :slug', { slug })
      .getOne();

    if (typeof link === 'undefined') {
      return response.sendFile(
        path.join(path.join(__dirname, '..', 'web', 'invalid-slug.html'))
      );
    }

    return response.redirect(link.to);
  },
};

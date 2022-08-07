import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

const slug = async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query['slug'];

    if (!slug || typeof slug !== 'string') {
        return res.status(404).send('use a slug');
    }
    console.log(slug);

    const data = await prisma.shortLink.findFirst({ where: { slug: { equals: slug } } });
    console.log(data);

    if (!data) {
        return res.status(404).send('slug not found');
    }

    return res.redirect(data.url);
};

export default slug;

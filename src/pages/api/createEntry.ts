import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

function isValidHttpUrl(string: string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    const { url, slug }: { url: string; slug: string } = JSON.parse(req.body);

    if (!isValidHttpUrl(url)) {
        res.status(400).send('Invalid URL');
        return;
    }

    if (!slug) {
        res.status(400).send('Enter a slug');
        return;
    }

    if (slug.length > 30) {
        res.status(400).send("Slug can't be over 30 characters long");
        return;
    }

    const urlExists = await prisma.shortLink.count({
        where: {
            url,
        },
    });

    if (urlExists) {
        res.status(400).send('URL already exists');
        return;
    }

    const slugExists = await prisma.shortLink.count({
        where: {
            slug,
        },
    });

    if (slugExists) {
        res.status(400).send('Slug already exists');
        return;
    }

    res.status(200).end();

    await prisma.shortLink.create({ data: { url, slug } });
};

export default createEntry;

import { MongoClient } from 'mongodb';
require('dotenv').config();

const dbUrl = process.env.COMMENTS_URL;


async function handler(req, res) {
    const eventId = req.query.eventId;
    const client = await MongoClient.connect(dbUrl);

    if (req.method === 'POST') {
        const { email, name, text } = req.body;
        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'Invalid input.' })
            return;
        }
        const newComment = {
            email,
            name,
            text,
            eventId
        }

        const db = client.db()
        const result = await db.collection('comments').insertOne(newComment)
        console.log(result)
        res.status(201).json({ message: ' Added comment.', comment: newComment })
    }
    if (req.method === 'GET') {
        const dummyList = [
            { id: 'c1', name: 'Xian', text: 'A first comment' },
            { id: 'c2', name: 'Li', text: 'A second comment' }
        ];

        res.status(200).json({ comments: dummyList })
    }
};

export default handler;
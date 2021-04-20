import { MongoClient } from 'mongodb';
require('dotenv').config();

const dbUrl = process.env.COMMENTS_URL;

async function connectDatabase() {
    const client = await MongoClient.connect(dbUrl)

    return client;
}

async function insertDocument(client, document) {
    const db = client.db();

    const result = await db.collection('comments').insertOne(document);

    return result;
}


async function handler(req, res) {
    const eventId = req.query.eventId;
    let client;

    try {
        client = await connectDatabase()
    } catch (error) {
        res.status.json({ message: 'Connecting to the database failed!' })
    }

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

        let result;

        try {
            result = await insertDocument(client, newComment)
            newComment._id = result.insertedId;
            res.status(201).json({ message: ' Added comment.', comment: newComment })
        } catch (error) {
            res.status(500).json({ message: 'Inserting comment failed!' })
        }

    }
    if (req.method === 'GET') {
        try {
            const db = client.db();

            const documents = await db
                .collection('comments')
                .find()
                .sort({ _id: -1 })
                .toArray();

            res.status(200).json({ comments: documents })
        } catch (error) {
            res.status(500).json({ message: ' Getting comments failed!' })
        }
    }
};

export default handler;
import { MongoClient } from 'mongodb';
require('dotenv').config();

const dbUrl = process.env.URL;

async function connectDatabase() {
    const client = await MongoClient.connect(dbUrl)

    return client;
}

async function insertDocument(client, document) {
    const db = client.db();

    const result = await db.collection('emails').insertOne(document);

    return result;
}

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;
        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address.' })
            return;
        }
        let client;
        try {
            client = await connectDatabase();
        } catch (error) {
            res.status(500).json({ message: 'Connecting to the database failed.' });
            return;
        }
        try {
            await insertDocument(client, { email: userEmail });
            client.close();
        } catch (error) {
            res.status(500).json({ message: 'Inserting data failed.' });
            return;
        }

        res.status(201).json({ message: 'Signed up.' })
    }
};

export default handler;
import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Codex',
    })
})

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await client.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-4o',
          });
        res.status(200).send({
            bot: response.choices[0].message.content
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))
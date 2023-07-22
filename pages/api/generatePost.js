// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai"

export default async function handler(req, res) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })

    const openai = new OpenAIApi(configuration)

    const response = await openai.completions.create({
        // model: "gpt-3.5-turbo",
        model: "text-davinci-003",
        temperature: 0.5,
        max_tokens: 3600,
        prompt: "Generate a blog post about owning dogs.",
    })

    res.status(200).json({ name: 'Generate Post' })
  }
  
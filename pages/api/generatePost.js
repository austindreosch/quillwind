// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai"

export default async function handler(req, res) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)

    const topic = "Top 10 tips for dog owners"
    const keywords = "first time dog owner, common dog health issues, cutest dog breeds"

    // model: "gpt-3.5-turbo",
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.5,
        max_tokens: 3600,
        prompt: `Write a long and detailed SEO-friendly blog post about ${topic}. that targets the following comma-separated keywords: ${keywords}. The content should be formatted in SEO-minded HTML, and the response must also include appropriate HTML, title, and meta description content. The return format must be stringified JSON in the following format:
        {
            "postContent": post content here,
            "title": title here,
            "metaDescription": meta description here,
        }
        `,
    })

    res.status(200).json({ post: response.data.choices[0].text })
  }
  
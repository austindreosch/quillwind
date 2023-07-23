// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)
    const { topic, keywords } = req.body;

    // const response = await openai.createCompletion({
    //     // model: "text-davinci-003",
    //     model: "gpt-3.5-turbo",
    //     temperature: 0.5,
    //     max_tokens: 3600,
    //     prompt: `Write a long and detailed SEO-friendly blog post about ${topic}. that targets the following comma-separated keywords: ${keywords}. The content should be formatted in SEO-minded HTML, and the response must also include appropriate HTML, title, and meta description content. The return format must be stringified JSON in the following format:
    //     {
    //         "title": title here,
    //         "metaDescription": meta description here,
    //         "postContent": post content here,
    //     }
    //     `,
    // })

    const postContentResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.3,
        // max_tokens: 3600,
        messages: [{
            role: "system",
            content: "You are a blog post generator."
            }, {
                role: "user",
                content: `Write a long and detailed SEO-friendly blog post about ${topic}. that targets the following comma-separated keywords: ${keywords}. The content should be formatted in SEO-minded HTML, limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, ul, ol, li, i, img, and blockquote.`
            }
        ]
    })

    // console.log("response", postContentResponse.data)
    console.log("response", postContentResponse.data.choices[0]?.message?.content);

    try {
        const post = JSON.parse(postContentResponse.data.choices[0]?.text.split("\n").join(""));
        res.status(200).json({ post: post })
    } catch (error) {
        console.log('error on json parse:', error);
        res.status(500).json({ error: 'Error parsing the OpenAI response.' })
    }
  }
  
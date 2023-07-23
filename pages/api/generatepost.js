// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import ClientPromise from "../../lib/mongodb";

export default withApiAuthRequired (async function handler(req, res) {
    const { user } = await getSession(req, res);
    const client = await ClientPromise;
    const db = client.db('quillwind');
    const userProfile = await db.collection('users').findOne({
        auth0Id: user.sub
    })
    if (!userProfile.availableQuillbucks || userProfile.availableQuillbucks < 10) {
        return res.status(400).json({ error: 'You do not have enough Quillbucks to generate a post.' })
    }

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const openai = new OpenAIApi(configuration)
    const { topic, keywords } = req.body;

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
    // post
    const postContent = postContentResponse.data.choices[0]?.message?.content || "Error parsing the OpenAI response.";
    const TitleResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.3,
        // max_tokens: 3600,
        messages: [{
            role: "system",
            content: "You are a blog post generator."
            }, {
                role: "user",
                content: `Write a long and detailed SEO-friendly blog post about ${topic}. that targets the following comma-separated keywords: ${keywords}. The content should be formatted in SEO-minded HTML, limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, ul, ol, li, i, img, and blockquote.`
            }, {    
                role: "assistant",
                content: postContent
            },{
                role: "user",
                content: "Generate appropriate title tag text for this post."
            }
        ]
    })
    const MetaResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.3,
        // max_tokens: 3600,
        messages: [{
            role: "system",
            content: "You are a blog post generator."
        }, {
            role: "user",
            content: `Write a long and detailed SEO-friendly blog post about ${topic}. that targets the following comma-separated keywords: ${keywords}. The content should be formatted in SEO-minded HTML, limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, ul, ol, li, i, and blockquote.`
        }, {    
            role: "assistant",
            content: postContent
        },{
            role: "user",
            content: "Generate SEO-friendly meta description text appropriate for the above blog post."
        }
    ]
    })
    // title and meta
    const title = TitleResponse.data.choices[0]?.message?.content || "Error parsing the OpenAI response.";
    const metaDescription = MetaResponse.data.choices[0]?.message?.content || "Error parsing the OpenAI response.";
    
    console.log("POSTCONTENT:", postContent)
    console.log("TITLE:", title)
    console.log("METADESCRIPTION:", metaDescription)

    await db.collection('users').updateOne({
        auth0Id: user.sub
    },{
        $inc: {
            availableQuillbucks: -1
        }
    });

    const post = await db.collection('posts').insertOne({
        postContent:  postContent,
        title: title,
        metaDescription: metaDescription,
        topic: topic,
        keywords: keywords,
        userId: userProfile._id,
        created: new Date()
    })
    
    try {
        res.status(200).json({ post: { postContent, title, metaDescription } })
    } catch (error) {
        res.status(500).json({ error: 'Error parsing the OpenAI response.' })
    }
    
})
  
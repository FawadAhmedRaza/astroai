import { Configuration, OpenAIApi } from "openai";

const openai = async (req, res) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.API_KEY,
    });

    const openaiApi = new OpenAIApi(configuration);
    const { messages } = JSON.parse(req.body);

    const openaiRes = await openaiApi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      //Marie: added this to get the response chunk by chunk
      stream: true
    });
    
    //Marie: added this to get the response chunk by chunk
    for await (const chunk of response) {
    console.log(chunk);
    }
    
    res.status(200).json(openaiRes.data);
  } catch (error) {
    console.error("Error processing OpenAI request:", error);
    res.status(500).json({
      error: error + "An error occurred while processing the request.",
    });
  }
};

export default openai;

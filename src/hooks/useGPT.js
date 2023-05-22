import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.GPT_KEY,
  })
);

const useGPT = () => {
  openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      message: [{ role: "user", content: "hello chatgpt" }],
    })
    .then((res) => console.log(res));

  return <div>useGPT</div>;
};

export default useGPT;

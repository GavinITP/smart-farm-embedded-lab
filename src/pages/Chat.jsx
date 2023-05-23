import { useState, useEffect } from "react";

const ChatComponent = ({ data, allowedToSend }) => {
  const [responseData, setResponseData] = useState(null);

  const myPrompt = `Farm data:
  Temperature: ${data.temperature}
  Humidity: ${data.humidity}% RH
  Water storage level: ${data.height}cm
  Farm size: ${data.farmSizeInAcre} acres
  Location: ${data.location}
  Crop type: ${data.cropType}
  Provide improvements, concerns, and environmentally conscious farming recommendations for each data point.`;

  useEffect(() => {
    const fetchData = async () => {
      if (!allowedToSend) {
        return;
      }

      const GPT_KEY = "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";

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GPT_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: myPrompt }],
          max_tokens: 100,
        }),
      };

      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          options
        );
        const data = await response.json();
        setResponseData(data.choices[0].message.content);
      } catch (err) {
        setResponseData("Error");
        console.log(err);
      }
    };

    fetchData();
  }, [allowedToSend]);

  return (
    <div>
      {responseData ? (
        <p>{JSON.stringify(responseData, null, 2)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChatComponent;

import { useEffect, useState } from "react";
import axios from "axios";

const useNetpie = () => {
  const NETPIE_NODE = "https://api.netpie.io/v2/device/shadow/data";
  const CLIENT_ID = "6df8dd31-9065-485f-9361-1f2991420729";
  const TOKEN = "xC6993zTngx9mNnQ4TMCtW6hNULZFWKB";

  const options = {
    headers: {
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${TOKEN}`)}`,
    },
  };

  const fetchData = () => {
    axios
      .get(NETPIE_NODE, options)
      .then((res) => {
        const dataObj = res.data.data;
        // console.log(dataObj);

        setTemperature(dataObj.temperature);
        setHumidity(dataObj.humidity);
        setHeight(dataObj.height);
        setLight(dataObj.light);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [height, setHeight] = useState(0);
  const [light, setLight] = useState(0);

  return { temperature, humidity, height, light };
};

export default useNetpie;

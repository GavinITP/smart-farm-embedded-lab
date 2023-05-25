// @mui
import {
  Alert,
  Autocomplete,
  Box,
  Skeleton,
  Stack,
  Button,
  Divider,
  TextField,
  Container,
  Typography,
} from "@mui/material";

import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useNetpie from "../hooks/useNetpie";

// components
const provinces = [
  { id: "amnat_charoen", name: "Amnat Charoen" },
  { id: "ang_thong", name: "Ang Thong" },
  { id: "bangkok", name: "Bangkok" },
  { id: "bueng_kan", name: "Bueng Kan" },
  { id: "buri_ram", name: "Buri Ram" },
  { id: "chachoengsao", name: "Chachoengsao" },
  { id: "chai_nat", name: "Chai Nat" },
  { id: "chaiyaphum", name: "Chaiyaphum" },
  { id: "chanthaburi", name: "Chanthaburi" },
  { id: "chiang_mai", name: "Chiang Mai" },
  { id: "chiang_rai", name: "Chiang Rai" },
  { id: "chon_buri", name: "Chon Buri" },
  { id: "chumphon", name: "Chumphon" },
  { id: "kalasin", name: "Kalasin" },
  { id: "kamphaeng_phet", name: "Kamphaeng Phet" },
  { id: "kanchanaburi", name: "Kanchanaburi" },
  { id: "khon_kaen", name: "Khon Kaen" },
  { id: "krabi", name: "Krabi" },
  { id: "lampang", name: "Lampang" },
  { id: "lamphun", name: "Lamphun" },
  { id: "loei", name: "Loei" },
  { id: "lop_buri", name: "Lop Buri" },
  { id: "mae_hong_son", name: "Mae Hong Son" },
  { id: "maha_sarakham", name: "Maha Sarakham" },
  { id: "mukdahan", name: "Mukdahan" },
  { id: "nakhon_nayok", name: "Nakhon Nayok" },
  { id: "nakhon_pathom", name: "Nakhon Pathom" },
  { id: "nakhon_phanom", name: "Nakhon Phanom" },
  { id: "nakhon_ratchasima", name: "Nakhon Ratchasima" },
  { id: "nakhon_sawan", name: "Nakhon Sawan" },
  { id: "nakhon_si_thammarat", name: "Nakhon Si Thammarat" },
  { id: "nan", name: "Nan" },
  { id: "narathiwat", name: "Narathiwat" },
  { id: "nong_bua_lam_phu", name: "Nong Bua Lam Phu" },
  { id: "nong_khai", name: "Nong Khai" },
  { id: "nonthaburi", name: "Nonthaburi" },
  { id: "pathum_thani", name: "Pathum Thani" },
  { id: "pattani", name: "Pattani" },
  { id: "phang_nga", name: "Phang Nga" },
  { id: "phatthalung", name: "Phatthalung" },
  { id: "phayao", name: "Phayao" },
  { id: "phetchabun", name: "Phetchabun" },
  { id: "phetchaburi", name: "Phetchaburi" },
  { id: "phichit", name: "Phichit" },
  { id: "phitsanulok", name: "Phitsanulok" },
  { id: "phra_nakhon_si_ayutthaya", name: "Phra Nakhon Si Ayutthaya" },
  { id: "phrae", name: "Phrae" },
  { id: "phuket", name: "Phuket" },
  { id: "prachinburi", name: "Prachinburi" },
  { id: "prachuap_khiri_khan", name: "Prachuap Khiri Khan" },
  { id: "ranong", name: "Ranong" },
  { id: "ratchaburi", name: "Ratchaburi" },
  { id: "rayong", name: "Rayong" },
  { id: "roi_et", name: "Roi Et" },
  { id: "sa_kaeo", name: "Sa Kaeo" },
  { id: "sakon_nakhon", name: "Sakon Nakhon" },
  { id: "samut_prakan", name: "Samut Prakan" },
  { id: "samut_sakhon", name: "Samut Sakhon" },
  { id: "samut_songkhram", name: "Samut Songkhram" },
  { id: "saraburi", name: "Saraburi" },
  { id: "satun", name: "Satun" },
  { id: "sing_buri", name: "Sing Buri" },
  { id: "sisaket", name: "Sisaket" },
  { id: "songkhla", name: "Songkhla" },
  { id: "sukhothai", name: "Sukhothai" },
  { id: "suphanburi", name: "Suphanburi" },
  { id: "surat_thani", name: "Surat Thani" },
  { id: "surin", name: "Surin" },
  { id: "tak", name: "Tak" },
  { id: "trang", name: "Trang" },
  { id: "trat", name: "Trat" },
  { id: "ubon_ratchathani", name: "Ubon Ratchathani" },
  { id: "udon_thani", name: "Udon Thani" },
  { id: "uthai_thani", name: "Uthai Thani" },
  { id: "uttaradit", name: "Uttaradit" },
  { id: "yala", name: "Yala" },
  { id: "yasothon", name: "Yasothon" },
];

const crops = [
  { id: "Coconut", name: "Coconut" },
  { id: "Cassava", name: "Cassava" },
  { id: "Fruits", name: "Fruits" },
  { id: "Maize (Corn)", name: "Maize (Corn)" },
  { id: "Palm Oil", name: "Palm Oil" },
  { id: "Pineapple", name: "Pineapple" },
  { id: "Rice", name: "Rice" },
  { id: "Rubber", name: "Rubber" },
  { id: "Sugarcane", name: "Sugarcane" },
  { id: "Tapioca", name: "Tapioca" },
];

export default function AnalyticsPage() {
  const [farmSize, setFarmSize] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCropType, setSelectedCropType] = useState(null);

  const [responseData, setResponseData] = useState(
    "Please provide all necessary information and then click analyze data to get analytics from AI."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [resErr, setResErr] = useState(false);

  const netpieData = useNetpie();

  async function fetchDataFromGPT() {
    const myPrompt = `Farm data:
    Temperature: ${netpieData.temperature}
    Humidity: ${netpieData.humidity}% RH
    Water storage level: ${netpieData.height}cm
    Farm size: ${farmSize}acres
    Location: ${selectedProvince.name}
    Crop type: ${selectedCropType.name}
    Provide improvements and concerns for each data point.
    Write a properly formatted short paragraph and give an
     environmental recommendation at the end.`;

    // console.log(myPrompt);
    setIsLoading(true);
    setResErr(false);

    const GPT_KEY = process.env.REACT_APP_GPT_KEY;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GPT_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: myPrompt }],
      }),
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
      );
      const data = await response.json();
      console.log(data.choices[0].message.content);
      setResponseData(data.choices[0].message.content);
      setIsLoading(false);
    } catch (err) {
      const general = [
        "Based on the provided farm data, there are a few improvements and concerns to consider. The temperature now indicates a warm climate, which can be suitable for certain crops. However, it is important to monitor and maintain optimal temperature conditions for different plant varieties to ensure their growth and productivity. The humidity is within a moderate range, which generally supports plant growth. However, it is crucial to prevent excessive humidity, which can lead to fungal diseases and rot. Additionally, as the location is mentioned, it is essential to address the potential concerns related to water availability and irrigation management due to the country's tropical climate. To ensure an environmentally sustainable approach, it is recommended to implement efficient irrigation systems, such as drip irrigation, to minimize water waste and promote water conservation on the farm.",
        "Based on the farm data provided, the temperature and humidity levels, These conditions suggest a warm and moderately humid climate, which can be advantageous for certain agricultural practices. However, it is essential to consider potential improvements and concerns. Firstly, farmers could explore implementing measures to regulate temperature and humidity levels to ensure optimal growing conditions for crops and livestock. This might involve installing ventilation systems or employing shade structures to mitigate excessive heat. Additionally, managing irrigation practices based on the humidity level can help maintain proper moisture levels in the soil. Furthermore, given the location of the farm, it is important to address the potential impacts of climate change, such as increased temperatures and shifts in rainfall patterns. Considering this, an environmental recommendation would be to invest in sustainable farming practices, including water-efficient irrigation techniques, organic fertilizers, and the use of renewable energy sources. These measures can contribute to long-term environmental sustainability and resilience in the face of changing climatic conditions.",
        "Based on the provided farm data, one improvement that can be considered is the optimization of temperature control. With the temperature now, it falls within a suitable range for various crops, but it is essential to ensure that temperature fluctuations are minimal. Maintaining a consistent temperature can be achieved by implementing efficient ventilation systems, shade structures, or cooling mechanisms, especially during periods of extreme heat. Additionally, the relative humidity is now relatively moderate, but it is important to monitor and regulate humidity levels to prevent potential issues such as mold or plant diseases. Considering the location, a concern may arise regarding the availability of water resources. It is crucial to adopt water-efficient irrigation methods, such as drip irrigation or smart irrigation systems, to minimize water waste and ensure sustainable water management practices. In light of environmental sustainability, one recommendation would be to explore the use of renewable energy sources, such as solar panels, to power farm operations. This approach would help reduce reliance on fossil fuels and lower carbon emissions, contributing to a greener and more environmentally friendly farming system.",
        "Based on the provided farm data, the temperature and humidity indicate a warm and moderately humid environment, which can have both positive and negative implications for farming. On the positive side, the warm temperature can promote plant growth and accelerate the maturation process. However, it is important to closely monitor the humidity level to prevent potential issues such as fungal diseases or pest infestations, which tend to thrive in high humidity. Additionally, high temperatures combined with moderate humidity may increase the risk of water evaporation, potentially leading to soil dehydration and crop stress. To address these concerns, it is recommended to implement effective irrigation systems that ensure an adequate water supply while minimizing water loss through evaporation. Additionally, employing proper ventilation techniques can help control humidity levels and reduce the risk of plant diseases.",
        "Based on the provided farm data, the temperature appears to be within a favorable range for most crops, as it falls within the optimal temperature range for plant growth. However, the humidity level seems slightly low, which could potentially lead to increased evaporation and water stress for the plants. It is advisable to monitor the humidity closely and consider implementing measures to increase the moisture content in the air, such as using misters or fogging systems. Adequate humidity levels can help promote healthy plant growth and reduce the risk of dehydration. Additionally, maintaining proper irrigation practices and mulching the soil can further enhance water retention and mitigate the impact of low humidity.",
      ];
      const i = Math.floor(Math.random() * general.length);

      const selected = general[i];
      setTimeout(function () {
        setResponseData(selected);
        setIsLoading(false);
        setResErr(true);
      }, 7000);

      console.log(err);
    }
  }

  const [formError, setFormError] = useState(false);

  const generateResponse = () => {
    setFormError(false);
    if (
      farmSize < 0 ||
      farmSize === null ||
      selectedProvince === null ||
      selectedCropType == null
    ) {
      setFormError(true);
    }
    if (
      !formError &&
      farmSize !== null &&
      selectedProvince !== null &&
      selectedCropType !== null
    ) {
      fetchDataFromGPT();
    }
  };

  return (
    <>
      <Helmet>
        <title> AI-based farm analyzer </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h3" gutterBottom>
            AI-based farm analyzer
          </Typography>
        </Stack>

        <Stack
          divider={<Divider orientation="vertical" flexItem />}
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ my: "2rem" }}
        >
          <TextField
            fullWidth
            id="standard-basic"
            label="Farm Size (unit: acre)"
            variant="standard"
            onChange={(event, value) => setFarmSize(event.target.value)}
            type="number"
            sx={{ m: 1, minWidth: 120 }}
          />

          <Autocomplete
            fullWidth
            options={provinces}
            getOptionLabel={(option) => option.name}
            value={selectedProvince}
            onChange={(event, value) => setSelectedProvince(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location (Province)"
                variant="outlined"
              />
            )}
          />

          <Autocomplete
            fullWidth
            options={crops}
            getOptionLabel={(option) => option.name}
            value={selectedCropType}
            onChange={(event, value) => setSelectedCropType(value)}
            renderInput={(params) => (
              <TextField {...params} label="Crop Type" variant="outlined" />
            )}
          />
        </Stack>

        {formError && (
          <Container
            sx={{
              color: "red",
              textAlign: "center",
            }}
          >
            <Alert severity="error">Please provide correct information.</Alert>
          </Container>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ my: "4rem" }}
        >
          <Container
            sx={{
              backgroundColor: "#D0F2FF",
              padding: "2rem",
              borderRadius: "1rem",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" style={{ color: "#042979" }}>
              Current data from sensors
            </Typography>
            <Container
              sx={{
                my: "1rem",
              }}
            >
              <Typography style={{ color: "#40619F" }}>
                Water level: {netpieData.height} cm
              </Typography>
              <Typography style={{ color: "#40619F" }}>
                Humidity: {netpieData.humidity} %RH
              </Typography>
              <Typography style={{ color: "#40619F" }}>
                Temperature: {netpieData.temperature} celcius
              </Typography>
            </Container>
          </Container>

          <Container
            sx={{
              backgroundColor: "#ffe7d9",
              padding: "2rem",
              borderRadius: "1rem",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" style={{ color: "#7A0B2E" }}>
              Given data from the user
            </Typography>

            <Container
              sx={{
                my: "1rem",
              }}
            >
              <Typography style={{ color: "#A14E5E" }}>
                Farm size: {farmSize || " --- "} acre
              </Typography>
              <Typography style={{ color: "#A14E5E" }}>
                Location: {selectedProvince ? selectedProvince.name : " --- "}
              </Typography>
              <Typography style={{ color: "#A14E5E" }}>
                Crop Type: {selectedCropType ? selectedCropType.name : " --- "}
              </Typography>
            </Container>
          </Container>
        </Stack>

        <Container
          sx={{
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => generateResponse()}
          >
            Analyze Data
          </Button>
          <Typography
            style={{ color: "grey", fontSize: "0.8rem", margin: "1rem" }}
          >
            (It may take a bit of time for AI to generate analytics.)
          </Typography>
        </Container>

        <Container
          sx={{
            backgroundColor: "#E8EBEE",
            padding: "0.5rem",
            marginY: "3rem",
            borderRadius: "0.5rem",
            textAlign: "center",
          }}
        >
          {isLoading ? (
            <Box sx={{ my: "3rem" }}>
              <Box sx={{ my: 2 }}>
                <Skeleton />
              </Box>
              <Box sx={{ my: 2 }}>
                <Skeleton animation="wave" />
              </Box>
              <Box sx={{ my: 2 }}>
                <Skeleton />
              </Box>
              <Box sx={{ my: 2 }}>
                <Skeleton animation="wave" />
              </Box>
              <Box sx={{ my: 2 }}>
                <Skeleton />
              </Box>
              <Box sx={{ my: 2 }}>
                <Skeleton animation="wave" />
              </Box>
            </Box>
          ) : (
            <Typography sx={{ my: "3rem" }}>{responseData}</Typography>
          )}
        </Container>
      </Container>
    </>
  );
}

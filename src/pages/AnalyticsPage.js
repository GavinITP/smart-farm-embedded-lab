// @mui
import {
  Alert,
  Autocomplete,
  Box,
  Skeleton,
  Card,
  Stack,
  Button,
  Grid,
  Divider,
  TableRow,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TableBody,
  TableCell,
  TextField,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";

import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useNetpie from "../hooks/useNetpie";
import Chat from "../pages/Chat";

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

  const allData = {
    temperature: netpieData.temperature,
    humidity: netpieData.humidity,
    height: netpieData.height,
    farmSize: farmSize,
    location: selectedProvince,
    cropType: selectedCropType,
  };

  const myPrompt = `Farm data:
    Temperature: ${allData.temperature}
    Humidity: ${allData.humidity}% RH
    Water storage level: ${allData.height}cm
    Farm size: ${allData.farmSize}acres
    Location: ${allData.location}
    Crop type: ${allData.cropType}
    Provide improvements and concerns for each data point.
    Write a properly formatted short paragraph and give an
     environmental recommendation at the end.`;

  async function fetchDataFromGPT() {
    setIsLoading(true);
    setResErr(false);

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
      setResponseData("Error");
      setIsLoading(false);
      setResErr(true);

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
                Water level: {allData.height} cm
              </Typography>
              <Typography style={{ color: "#40619F" }}>
                Humidity: {allData.humidity} %RH
              </Typography>
              <Typography style={{ color: "#40619F" }}>
                Temperature: {allData.temperature} celcius
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

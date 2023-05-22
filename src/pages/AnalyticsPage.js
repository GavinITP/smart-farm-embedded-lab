// @mui
import {
  Autocomplete,
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
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

export default function AnalyticsPage() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedCropType, setSelectedCropType] = useState(null);

  return (
    <>
      <Helmet>
        <title> Analytics </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h3" gutterBottom>
            Analytics
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Stack
          divider={<Divider orientation="vertical" flexItem />}
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <TextField
            fullWidth
            id="standard-basic"
            label="Farm Size (unit: acre)"
            variant="standard"
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
            options={provinces}
            getOptionLabel={(option) => option.name}
            value={selectedCropType}
            onChange={(event, value) => setSelectedCropType(value)}
            renderInput={(params) => (
              <TextField {...params} label="Crop Type" variant="outlined" />
            )}
          />
        </Stack>

        <Button variant="contained">Analyze Data</Button>
      </Container>
    </>
  );
}

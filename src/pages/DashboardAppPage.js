import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";

// sections
import { AppWebsiteVisits, AppWidgetSummary } from "../sections/@dashboard/app";

import useNetpie from "../hooks/useNetpie";

// ----------------------------------------------------------------------

const tempArr = Array(11).fill(0);
const humdArr = Array(11).fill(0);
const heightArr = Array(11).fill(0);
const lightArr = Array(11).fill(0);

const updateArr = (netpieData) => {
  tempArr.push(netpieData.temperature);
  humdArr.push(netpieData.humidity);
  heightArr.push(netpieData.height);
  lightArr.push(netpieData.light);

  if (tempArr.length > 11) tempArr.shift();
  if (humdArr.length > 11) humdArr.shift();
  if (heightArr.length > 11) heightArr.shift();
  if (lightArr.length > 11) lightArr.shift();
};

export default function DashboardAppPage() {
  const theme = useTheme();
  const netpieData = useNetpie();

  updateArr(netpieData);

  useEffect(() => {
    const delay = 2000;

    const timer = setTimeout(() => {}, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // const dailyTasks = [
  //   { id: '1', label: 'Create FireStone Logo' },
  //   { id: '2', label: 'Add SCSS and JS files if required' },
  //   { id: '3', label: 'Stakeholder Meeting' },
  //   { id: '4', label: 'Scoping & Estimations' },
  //   { id: '5', label: 'Sprint Showcase' },
  // ];

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 1 }}>
          Agriculture Metrics Dashboards
        </Typography>
        <Typography sx={{ mb: 5, color: "grey" }}>
          (Make sure that NodeMCU is connected online, so this website will get
          real-time data.)
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Water Level (cm)"
              total={netpieData.height}
              icon={"ant-design:experiment-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Humidity (%RH)"
              total={netpieData.humidity}
              color="info"
              icon={"ant-design:cloud-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Light (unit)"
              total={netpieData.light}
              color="warning"
              icon={"ant-design:bulb-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Temperature (°C)"
              total={netpieData.temperature}
              color="error"
              icon={"ant-design:fire-filled"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWebsiteVisits
              title="Water level"
              subheader="Monitor the level of water storage on your farm"
              chartLabels={[
                "20s",
                "18s",
                "16s",
                "14s",
                "12s",
                "10s",
                "8s",
                "6s",
                "4s",
                "2s",
                "0s",
              ]}
              chartData={[
                {
                  name: "Water level",
                  type: "column",
                  fill: "solid",
                  data: heightArr,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWebsiteVisits
              title="Humidity"
              subheader="monitor the humidity of the air in the farm area"
              chartLabels={[
                "20s",
                "18s",
                "16s",
                "14s",
                "12s",
                "10s",
                "8s",
                "6s",
                "4s",
                "2s",
                "0s",
              ]}
              chartData={[
                {
                  name: "Humidity",
                  type: "area",
                  fill: "gradient",
                  data: humdArr,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWebsiteVisits
              title="Light"
              subheader="monitor analog light data "
              chartLabels={[
                "20s",
                "18s",
                "16s",
                "14s",
                "12s",
                "10s",
                "8s",
                "6s",
                "4s",
                "2s",
                "0s",
              ]}
              chartData={[
                {
                  name: "Light",
                  type: "area",
                  fill: "gradient",
                  data: lightArr,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppWebsiteVisits
              title="Temperature"
              subheader="monitor the temperature of the farm"
              chartLabels={[
                "20s",
                "18s",
                "16s",
                "14s",
                "12s",
                "10s",
                "8s",
                "6s",
                "4s",
                "2s",
                "0s",
              ]}
              chartData={[
                {
                  name: "Temperature",
                  type: "area",
                  fill: "gradient",
                  data: tempArr,
                },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={8}>
            <AppTasks title="Tasks" list={dailyTasks} />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

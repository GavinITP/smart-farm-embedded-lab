import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";

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
        <Typography variant="h3" sx={{ mb: 5 }}>
          Farm Dashboard for Smart Agriculture
        </Typography>

        <Typography sx={{ mb: 5 }}>
          The Farm Dashboard developed for the university project "2110366
          EMBEDDED SYS LAB I" is a comprehensive system designed to assist
          farmers in optimizing their farming practices while prioritizing
          environmental sustainability. The dashboard integrates various
          sensors, a microcontroller board, IoT capabilities, cloud storage,
          Line Notify API, and OpenAI API to provide farmers with real-time data
          analysis and proactive notifications.
        </Typography>

        <Typography sx={{ mb: 5 }}>
          The system utilizes three types of sensors, namely the DHT11, LDR, and
          ultrasonic sensors. The DHT11 sensor measures temperature and
          humidity. levels, the LDR sensor detects light intensity, and the
          ultrasonic sensor provides distance measurements to detect the level
          of water storage. These sensors are connected to the Nucleo Board 411,
          a powerful microcontroller board known for its reliability and
          compatibility.
        </Typography>

        <Typography sx={{ mb: 5 }}>
          The Nucleo Board 411 acts as the central hub for collecting data from
          the sensors. It processes the incoming data and sends it to the Farm
          Dashboard through a communication protocol. The data is transmitted to
          the dashboard via a NodeMCU device, which acts as an IoT gateway,
          facilitating seamless connectivity between the sensors and the cloud.
        </Typography>

        <Typography sx={{ mb: 5 }}>
          The Farm Dashboard leverages Netpie, a cloud-based IoT platform, to
          organize and store the collected data. Netpie ensures secure storage
          and efficient management of sensor data, enabling easy access and
          retrieval for analysis and decision-making.
        </Typography>

        <Typography sx={{ mb: 5 }}>
          One of the key features of the Farm Dashboard is its ability to alert
          farmers about critical events and conditions in their farms. This is
          achieved through integration with the Line Notify API, a popular
          messaging platform. Farmers receive real-time notifications on their
          Line accounts, enabling them to respond promptly to changing
          environmental conditions or unexpected events.
        </Typography>

        <Typography sx={{ mb: 5 }}>
          To enhance farmers' decision-making processes, the Farm Dashboard
          utilizes the OpenAI API. This enables farmers to input information
          about their farms and receive detailed analysis and recommendations
          regarding farming practices and environmental impact mitigation. By
          leveraging the capabilities of natural language processing, the OpenAI
          API provides valuable insights to optimize farming practices.
        </Typography>

        <Typography sx={{ mb: 5 }}>
          The user interface of the Farm Dashboard is built using React, a
          popular JavaScript library for building user interfaces, and MUI
          (Material-UI), a UI framework that provides a set of reusable React
          components. This combination ensures a visually appealing and
          intuitive dashboard, enabling farmers to monitor sensor data, analyze
          trends, and access valuable insights effortlessly.
        </Typography>

        <Typography sx={{ mb: 5 }}>
          In summary, the Farm Dashboard developed for the university subject
          "2110366 EMBEDDED SYS LAB I" is a comprehensive solution that empowers
          farmers with real-time data analysis, data monitoring, proactive
          notifications. By combining sensor data, IoT capabilities, cloud
          storage, and AI-powered analysis, the dashboard helps farmers adopt
          best practices for sustainable and efficient farming while minimizing
          environmental impact.
        </Typography>
      </Container>
    </>
  );
}

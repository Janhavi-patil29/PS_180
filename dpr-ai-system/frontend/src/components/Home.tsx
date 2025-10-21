import React from 'react';
// Import MUI components for layout and cards
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper'; // Use Paper for chart backgrounds

// Import MUI icons (replace old ones)
import ArchiveIcon from '@mui/icons-material/Archive';
import DangerousIcon from '@mui/icons-material/Dangerous'; // Example for High Risk
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Example for Medium Risk
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Example for Low Risk

// Import charting components from recharts
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Home() {
  // Placeholder data for the charts (same as before)
  const data = [
    { name: 'Jan', highRisk: 4, mediumRisk: 24, lowRisk: 24 },
    { name: 'Feb', highRisk: 3, mediumRisk: 13, lowRisk: 22 },
    { name: 'Mar', highRisk: 2, mediumRisk: 98, lowRisk: 22 },
    { name: 'Apr', highRisk: 2, mediumRisk: 39, lowRisk: 20 },
    { name: 'May', highRisk: 1, mediumRisk: 48, lowRisk: 21 },
    { name: 'Jun', highRisk: 2, mediumRisk: 38, lowRisk: 25 },
  ];

  // Define card data for easier mapping
  const cardData = [
      { title: "TOTAL PROJECTS", value: 300, icon: <ArchiveIcon fontSize="large" />, color: "#2962ff" },
      { title: "HIGH RISK", value: 12, icon: <DangerousIcon fontSize="large" />, color: "#d50000" },
      { title: "MEDIUM RISK", value: 33, icon: <WarningAmberIcon fontSize="large" />, color: "#ff6d00" },
      { title: "LOW RISK", value: 42, icon: <CheckCircleOutlineIcon fontSize="large" />, color: "#2e7d32" },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1 }}> {/* Use Box instead of <main> */}
        <Typography variant="h5" gutterBottom component="div" sx={{ fontWeight: 'bold', mb: 3 }}>
          DASHBOARD
        </Typography>

        {/* Metric Cards Section using Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}> {/* Add margin-bottom */}
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}> {/* Responsive grid items */}
              <Card sx={{ backgroundColor: card.color, color: '#ffffff' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'medium' }} gutterBottom>
                      {card.title}
                    </Typography>
                    {card.icon}
                  </Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                    {card.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section using Grid */}
        <Grid container spacing={3} className="charts"> {/* Use className for height */}
          {/* Bar Chart */}
          <Grid item xs={12} md={6}> {/* Takes full width on small, half on medium+ */}
            <Paper sx={{ p: 2, height: '100%' }}> {/* Paper provides background */}
              <Typography variant="h6" gutterBottom>Risk Distribution (Bar)</Typography>
              <ResponsiveContainer width="100%" height={250}> {/* Adjust height */}
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }} // Adjust margins
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc"/> {/* Lighter grid */}
                    <XAxis dataKey="name" stroke="#555"/>
                    <YAxis stroke="#555"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="highRisk" fill="#d50000" name="High Risk"/>
                    <Bar dataKey="mediumRisk" fill="#ff6d00" name="Medium Risk"/>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Line Chart */}
          <Grid item xs={12} md={6}>
             <Paper sx={{ p: 2, height: '100%' }}>
               <Typography variant="h6" gutterBottom>Risk Trends (Line)</Typography>
               <ResponsiveContainer width="100%" height={250}>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc"/>
                    <XAxis dataKey="name" stroke="#555"/>
                    <YAxis stroke="#555"/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="highRisk" stroke="#d50000" name="High Risk" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="mediumRisk" stroke="#ff6d00" name="Medium Risk"/>
                    <Line type="monotone" dataKey="lowRisk" stroke="#2e7d32" name="Low Risk"/>
                </LineChart>
               </ResponsiveContainer>
             </Paper>
          </Grid>
        </Grid>
    </Box>
  );
}

export default Home;
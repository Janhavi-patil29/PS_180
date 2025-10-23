import React from 'react';
// Import MUI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; // Using Grid v2
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

// Import MUI icons
import ArchiveIcon from '@mui/icons-material/Archive';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Import charting components and specific elements
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom Tooltip component for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'rgba(38, 48, 67, 0.9)', padding: '10px', border: '1px solid #555', borderRadius: '4px', color: '#fff' }}>
        <p style={{ margin: 0, marginBottom: '5px', fontWeight: 'bold' }}>{`Month: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ margin: 0, color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};


function Home() {
  // Chart data
  const data = [
    { name: 'Jan', highRisk: 4, mediumRisk: 24, lowRisk: 24 }, { name: 'Feb', highRisk: 3, mediumRisk: 13, lowRisk: 22 }, { name: 'Mar', highRisk: 2, mediumRisk: 98, lowRisk: 22 }, { name: 'Apr', highRisk: 2, mediumRisk: 39, lowRisk: 20 }, { name: 'May', highRisk: 1, mediumRisk: 48, lowRisk: 21 }, { name: 'Jun', highRisk: 2, mediumRisk: 38, lowRisk: 25 },
  ];

  // Card data
  const cardData = [
      { title: "TOTAL PROJECTS", value: 300, icon: <ArchiveIcon fontSize="large" />, color: "#2962ff", comparison: "+5% than last month" }, { title: "HIGH RISK", value: 12, icon: <DangerousIcon fontSize="large" />, color: "#d50000", comparison: "-2% than last month" }, { title: "MEDIUM RISK", value: 33, icon: <WarningAmberIcon fontSize="large" />, color: "#ff6d00", comparison: "+8% than last month" }, { title: "LOW RISK", value: 42, icon: <CheckCircleOutlineIcon fontSize="large" />, color: "#2e7d32", comparison: "+1% than last month" },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ fontWeight: 'bold', mb: 3, color: '#e0e0e0' /* Lighter Title */ }}>
          DASHBOARD
        </Typography>

        {/* Metric Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {cardData.map((card, index) => (
            <Grid key={index} xs={12} sm={6} md={3}>
              <Card sx={{ backgroundColor: card.color, color: '#ffffff' }}> <CardContent> <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}> <Box> <Typography sx={{ fontSize: 14, fontWeight: 'medium' }} gutterBottom>{card.title}</Typography> <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>{card.value}</Typography> <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>{card.comparison}</Typography> </Box> {card.icon} </Box> </CardContent> </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} className="charts">
          {/* Bar Chart */}
          <Grid xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%', backgroundColor: '#263043', color: '#e0e0e0' }} elevation={3}> {/* Dark Paper BG */}
              <Typography variant="h6" gutterBottom>Risk Distribution (Bar)</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}> {/* Adjust left margin */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#3e4d5a"/> {/* Darker grid */}
                    <XAxis dataKey="name" stroke="#9e9ea4" tick={{ fill: '#9e9ea4', fontSize: 12 }} /> {/* Axis styling */}
                    <YAxis stroke="#9e9ea4" tick={{ fill: '#9e9ea4', fontSize: 12 }} /> {/* Axis styling */}
                    {/* Use Custom Tooltip */}
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}/>
                    <Legend wrapperStyle={{ color: '#9e9ea4', fontSize: 12, paddingTop: '10px' }} /> {/* Legend styling */}
                    <Bar dataKey="highRisk" fill="#d50000" name="High Risk"/>
                    <Bar dataKey="mediumRisk" fill="#ff6d00" name="Medium Risk"/>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Line Chart */}
          <Grid xs={12} md={6}>
             <Paper sx={{ p: 2, height: '100%', backgroundColor: '#263043', color: '#e0e0e0' }} elevation={3}> {/* Dark Paper BG */}
               <Typography variant="h6" gutterBottom>Risk Trends (Line)</Typography>
               <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3e4d5a"/> {/* Darker grid */}
                    <XAxis dataKey="name" stroke="#9e9ea4" tick={{ fill: '#9e9ea4', fontSize: 12 }} /> {/* Axis styling */}
                    <YAxis stroke="#9e9ea4" tick={{ fill: '#9e9ea4', fontSize: 12 }} /> {/* Axis styling */}
                    {/* Use Custom Tooltip */}
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.2)', strokeWidth: 1 }}/>
                    <Legend wrapperStyle={{ color: '#9e9ea4', fontSize: 12, paddingTop: '10px' }} /> {/* Legend styling */}
                    <Line type="monotone" dataKey="highRisk" stroke="#d50000" name="High Risk" activeDot={{ r: 6, fill: '#d50000', stroke: '#fff', strokeWidth: 2 }} dot={{ r: 3, fill: '#d50000' }}/>
                    <Line type="monotone" dataKey="mediumRisk" stroke="#ff6d00" name="Medium Risk" activeDot={{ r: 6, fill: '#ff6d00', stroke: '#fff', strokeWidth: 2 }} dot={{ r: 3, fill: '#ff6d00' }}/>
                    <Line type="monotone" dataKey="lowRisk" stroke="#2e7d32" name="Low Risk" activeDot={{ r: 6, fill: '#2e7d32', stroke: '#fff', strokeWidth: 2 }} dot={{ r: 3, fill: '#2e7d32' }}/>
                </LineChart>
               </ResponsiveContainer>
             </Paper>
          </Grid>
        </Grid>
    </Box>
  );
}

export default Home;
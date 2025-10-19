import React from 'react';
// Import icons
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
// Import charting components from recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function Home() {

  // Placeholder data for the charts
  const data = [
    { name: 'Jan', highRisk: 4, mediumRisk: 24, lowRisk: 24 },
    { name: 'Feb', highRisk: 3, mediumRisk: 13, lowRisk: 22 },
    { name: 'Mar', highRisk: 2, mediumRisk: 98, lowRisk: 22 },
    { name: 'Apr', highRisk: 2, mediumRisk: 39, lowRisk: 20 },
    { name: 'May', highRisk: 1, mediumRisk: 48, lowRisk: 21 },
    { name: 'Jun', highRisk: 2, mediumRisk: 38, lowRisk: 25 },
  ];

  return (
    <main className='main-container'> {/* Main content area */}
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        {/* Metric Cards Section */}
        <div className='main-cards'>
            <div className='card'> {/* Card 1 */}
                <div className='card-inner'>
                    <h3>TOTAL PROJECTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>300</h1> {/* Placeholder number */}
            </div>
            <div className='card'> {/* Card 2 */}
                <div className='card-inner'>
                    <h3>HIGH RISK</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>12</h1> {/* Placeholder number */}
            </div>
            <div className='card'> {/* Card 3 */}
                <div className='card-inner'>
                    <h3>MEDIUM RISK</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>33</h1> {/* Placeholder number */}
            </div>
            <div className='card'> {/* Card 4 */}
                <div className='card-inner'>
                    <h3>LOW RISK</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1> {/* Placeholder number */}
            </div>
        </div>

        {/* Charts Section */}
        <div className='charts'>
            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="highRisk" fill="#8884d8" />
                <Bar dataKey="mediumRisk" fill="#82ca9d" />
            </BarChart>
            </ResponsiveContainer>

            {/* Line Chart */}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="highRisk" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="mediumRisk" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </main>
  )
}

export default Home;

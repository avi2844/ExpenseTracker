import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';



function BarChartComponent({data}){
    return (
        <ResponsiveContainer width={700} height={300}>
          <BarChart data={data} layout="vertical">
          <XAxis type="number" hide={true} />
        <YAxis 
          dataKey="name" 
          type="category" 
          width={150} // Ensure enough space for labels
          tick={{ fill: "#333", fontSize: 14 }} // Improve label styling
        />
        <Bar dataKey="value" fill="#8884d8" barSize={40} />
      </BarChart>
        </ResponsiveContainer>
      );
}

export default BarChartComponent;
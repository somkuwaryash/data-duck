'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes'
import Plotly from 'plotly.js-dist-min';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface ChartProps {
  type: 'line' | 'bar' | 'pie';
  data: Array<{ [key: string]: string | number }>;
  xKey: string;
  yKey: string;
  title: string;
}

const Chart: React.FC<ChartProps> = ({ type, data, xKey, yKey, title }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const chartColor = isDark ? '#38bdf8' : '#0ea5e9'
  const backgroundColor = isDark ? '#1f2937' : '#ffffff'
  const textColor = isDark ? '#f3f4f6' : '#1f2937'

  const plotData: Plotly.Data[] = [{
    x: data.map(item => item[xKey]),
    y: data.map(item => item[yKey]),
    type: type as Plotly.PlotType,
    marker: { color: chartColor },
  }];

  const layout: Partial<Plotly.Layout> = {
    title: {
      text: title,
      font: { color: textColor },
    },
    paper_bgcolor: backgroundColor,
    plot_bgcolor: backgroundColor,
    xaxis: { title: xKey, color: textColor },
    yaxis: { title: yKey, color: textColor },
  };

  return (
    <div className="w-full h-full">
      <Plot
        data={plotData}
        layout={layout}
        config={{ responsive: true }}
        className="w-full h-full"
      />
    </div>
  );
};

export default Chart;
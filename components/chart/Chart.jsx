import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { calculatePercentages } from '@/functions';
import { useEffect, useState } from 'react';

const Chart = (props) => {

  const [showXTicks, setShowXTicks] = useState(true);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: {
          display: showXTicks,
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`
        }
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart',
      },
      tooltip: {
          enabled: true,
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.parsed.y.toFixed(2);
              return `${label}: ${value}%`;
            },
          },
      },
    },
  };

  const percentages = calculatePercentages(props.data);

  const data = {
    labels: Object.keys(percentages),
    datasets: [
      {
        label: 'Percentage of Total Sweaters',
        data: Object.values(percentages),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      setShowXTicks(window.innerWidth > 576);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <Bar options={options} data={data} />;
};

export default Chart;
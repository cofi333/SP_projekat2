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
import { calculatePercentage } from '@/functions';
import './chart.scss'
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
              const value = context.parsed.y.toFixed(2); // Format to two decimal places
              return `${label}: ${value}%`;
            },
          },
      },
    },
  };

  const calculatePercentages = (data) => {
    let szent_istvan = 0;
    let autizmus_alapitvany = 0;
    let elemiszer_bankegysulet = 0;
    let lampas_92 = 0;
  
    if (data.length !== 0) {
      data.forEach((request) => {
        szent_istvan += parseInt(request.szent_istvan_kiraly_zenei_alapitvany);
        autizmus_alapitvany += parseInt(request.autizmus_alapitvany);
        elemiszer_bankegysulet += parseInt(request.elemiszer_bankegysulet);
        lampas_92 += parseInt(request.lampas_92_alapitvany);
      });
    }
  
    const allSweaters = data.length * 12;
  
    const percentages = {
      szent_istvan: calculatePercentage(szent_istvan, allSweaters),
      autizmus_alapitvany: calculatePercentage(autizmus_alapitvany, allSweaters),
      elemiszer_bankegysulet: calculatePercentage(elemiszer_bankegysulet, allSweaters),
      lampas_92: calculatePercentage(lampas_92, allSweaters),
    };
  
    return percentages;
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
      setShowXTicks(window.innerWidth > 500);
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
import React, { useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import jsonData from '../data.json';
import './chart.css'

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Legend ni olib tashlash
    },
  },
};

export function Chart() {
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);

  const handleBatchClick = useCallback(index => {
    setSelectedBatchIndex(index);
  }, []);

  const batch = jsonData.batchList[selectedBatchIndex];

  const labels = [];
  const rates = [];

  batch.rates.forEach((rate, index) => {
    labels.push(new Date(batch.startTime + index * batch.interval));
    rates.push(rate);
  });

  const dataset = {
    label: `Batch ${selectedBatchIndex + 1}`,
    data: rates,
    borderColor: 'rgb(0, 113, 235)',
    backgroundColor: 'rgb(0, 113, 235)',
  };

  const data = {
    labels,
    datasets: [dataset],
  };

  return (
    <div>
      <div className='header'>
        {jsonData.batchList.map((_, index) => (
          <button key={index} onClick={() => handleBatchClick(index)}>
            Batch {index + 1}
          </button>
        ))}
      </div>
      <Line options={options} data={data} />
    </div>
  );
}

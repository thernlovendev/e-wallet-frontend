import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card } from '@mui/material';
import SoftTypography from 'components/SoftTypography';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dona ({amount, totalAmount}) {

  useEffect(() => {

  }, [amount, totalAmount])

    const data = {
        labels: ['GBP', 'USD', 'EUR'],
        datasets: [
          {
            label: '$',
            data: amount,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    return(
      <Card >
        <div style={{ position: 'relative' }}>
          <Doughnut data={data} />
          <SoftTypography
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {totalAmount.toFixed(2)}
          </SoftTypography>
        </div>
      </Card>
    )
}
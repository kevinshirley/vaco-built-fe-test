import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
// import { has, isNil, toLower, sum } from 'ramda';

const BEM_BLOCK_ID = 'c-stock-chart';

export default function StockChart({ size, name }: any) {
  // const [monthKeys, setMonthKeys]: any = useState([]);
  // const [amountItems, setAmountItems] = useState([]);

  useEffect(() => {
    const ctx: any = document.getElementById(BEM_BLOCK_ID);
    Chart.register(...registerables);

    const monthlySalesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['12:00pm', '4:00pm', '8:00pm'],
        datasets: [
          {
            label: name,
            data: ['260', '265', '270', '275'],
            backgroundColor: '#093170',
          }
        ]
      },
      options: {
        // maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }
    });

    return () => monthlySalesChart.destroy();
  }, []);

  return (
    <canvas id={BEM_BLOCK_ID} width={size} height={size} />
  );
}

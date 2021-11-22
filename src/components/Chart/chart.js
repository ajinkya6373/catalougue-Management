import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function PieChart({ allProducts }) {
  let m = 0;
  let e = 0;
  let j = 0;
  let w = 0;
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].category === "men's clothing") {
      m++;
    } else if (allProducts[i].category === "women's clothing") {
      w++;
    } else if (allProducts[i].category === "electronics") {
      e++;
    } else {
      j++;
    }
   

  }
  let count =[m,e,j,w];
  console.log(count);

  const data = {
    labels: ["men's clothing", "electronics", "jewelery", "women's clothing"],
    datasets: [
      {
        label: '# of Votes',
        data: count,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Pie data={data} />
    </>
  )
}



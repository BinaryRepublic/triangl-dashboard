export const chartData = {
  type: 'line',
  data: {
    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [

      {
        type: 'line',
        data: [40, 31, 67, 62, 27, 67, 62, 27],
        borderColor: 'rgb(57, 122, 242)',
        borderWidth: 2,
        color: 'rgba(255,0,0,1)',
        fill: false,
        pointRadius: 0,
        lineTension: 0,
        pointHoverRadius: 3,
        pointHitRadius: 20,
        pointHoverBackgroundColor: 'rgb(57, 122, 242)',
        pointHoverBorderWidth: 0
      }
    ]
  },
  options: {
    legend: false,
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          padding: 20,
          maxTicksLimit: 6
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true,
          padding: 5
        }
      }]
    }
  }
}

export default chartData

const ctx = document.getElementById('myChart');
const aggregate = document.getElementById('aggregate');

new Chart(ctx, {
  type: 'polarArea',
  data: {
    datasets: [{

      label: 'Aggregate resoponses',
      data: [12, 19,],
      labels: ['Questions', 'Responses'],
      borderWidth: 1
    }]
    },
  options: {
    scales: {
    y: {
        beginAtZero: true
      }
    }
  }
});


  new Chart(aggregate, {
    type: 'bar',
    data: {
      labels: ['Questions', 'Responses'],
      datasets: [{
        label: 'Aggregate resoponses',
        data: [12, 19,],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
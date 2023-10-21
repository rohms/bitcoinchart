const ctx = document.getElementById('myChart');
let time, usd, gbp, eur;

async function getData() {
    const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
    const data = await response.json();
    console.log(data);

    time = data.time.updated;
    usd = parseFloat(data.bpi.USD.rate.replace(',', ''));
    gbp = parseFloat(data.bpi.GBP.rate.replace(',', ''));
    eur = parseFloat(data.bpi.EUR.rate.replace(',', ''));

    return { time, usd, gbp, eur };
}

async function drawChart() {
    const { time, usd, gbp, eur } = await getData();

    const maxVal = Math.max(usd, gbp, eur);
    const topVal = maxVal + 10000;

    new Chart(ctx, {

        type: 'bar',
        data: {
            labels: ['USD', 'GBP', 'EUR'],
            datasets: [{
                label: '# Rate of Bitcoin at: ' + time,
                data: [usd, gbp, eur],
                borderWidth: 1,
                backgroundColor: [
                    "#3e95cd", 
                    "#8e5ea2",  
                    "#3cba9f"
                ],
                barPercentage: 0.7, // Adjust the width of the bars
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5000,
                    },
                   max: topVal
                }
            }
        }
    });

}

drawChart();
            
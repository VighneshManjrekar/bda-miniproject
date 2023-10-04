const BASE_URI = "https://bda-miniproject-api.onrender.com/api/";

const fetchData = async (route, type) => {
  const res = await fetch(BASE_URI + route.toLowerCase());
  const data = await res.json();
  const ctx = document.getElementById(`${route.toLowerCase()}-chart`);

  const labels = data.map((i) => i.label);
  const labelData = data.map((i) => i.data);

  new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [
        {
          label: route.split("-").join(" "),
          data: labelData,
          borderWidth: 1,
          barPercentage: 0.5,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
        },
      ],
    },
    options: {},
  });
};

const dailySalesData = async () => {
  const res = await fetch(BASE_URI + "daily-sales");
  const data = await res.json();
  const ctx = document.getElementById(`daily-sales-chart`);

  const d = data.map((i,idx) => ({ x: idx+1, y: i.data }));
  const labels = data.map((i) => i.label);

  new Chart(ctx, {
    type: "scatter",
    data: {
      labels,
      datasets: [
        {
          label: "Daily Sales",
          data: d,
          backgroundColor: "rgb(255, 99, 132)",
        },
      ],
    },
    options:{
      title: {
        display: true,
        text: 'Original Data'
      },
    }
  });
};

fetchData("City-Wise-Purchases", "bar");
fetchData("Product-Wise-Purchases", "polarArea");
fetchData("Product-Average-Ratings", "doughnut");
fetchData("Week-Wise-Purchases", "line");
dailySalesData();

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/Compare.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Compare = () => {
  const { state } = useLocation();
  const query = state?.query; // data is fetched using product title
  const [product, setProduct] = useState(null);
  const [compareData, setCompareData] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch the same product from all 3 sources
        const apiList = [
          { url: "https://fakestoreapi.com/products", source: "FakeStore" },
          { url: "https://dummyjson.com/products", source: "DummyJSON" },
          {
            url: "https://dummyjson.com/products/category/smartphones",
            source: "ElectronicsAPI",
          },
        ];

        const results = await Promise.allSettled(
          apiList.map((api) => fetch(api.url).then((res) => res.json()))
        );

        const allProducts = results.flatMap((res, i) => {
          if (res.status !== "fulfilled") return [];
          const source = apiList[i].source;
          const data = res.value.products || res.value; // different key in APIs

          return data.map((p) => ({
            title: p.title,
            price: p.price,
            image: p.image || p.thumbnail,
            description: p.description,
            category: p.category,
            source,
          }));
        });

        // Find first matching product (case insensitive)
        const selected = allProducts.find(
          (p) => p.title.toLowerCase() === query.toLowerCase()
        );

        // If exact not found, pick a partial match
        const fallback =
          selected ||
          allProducts.find((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
          );

        if (fallback) setProduct(fallback);

        // Create dummy compare data for 3 platforms, will be updated based on the data fetched at backend api
        const compareList = [
          {
            platform: "Flipkart",
            price: Math.round(fallback?.price * 1.05),
            desc: `Available on Flipkart at slightly higher price.`,
          },
          {
            platform: "Amazon",
            price: Math.round(fallback?.price * 1.15),
            desc: `Available on Amazon with fast delivery.`,
          },
          {
            platform: "Gem",
            price: Math.round(fallback?.price * 0.95),
            desc: `Available on Gem at discounted rate.`,
          },
        ];

        setCompareData(compareList);
      } catch (err) {
        console.error("Error fetching product comparison:", err);
      }
    };
    if (query) fetchProductDetails();
  }, [query]);

  if (!query)
    return (
      <div className="compare-container">
        <h2>No product selected for comparison - please select any product to access this page.</h2>
      </div>
    );

  const chartData = {
    labels: compareData.map((d) => d.platform),
    datasets: [
      {
        label: "Price (₹)",
        data: compareData.map((d) => d.price),
        backgroundColor: ["#1E90FF", "#FF9900", "#34A853"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (items) => compareData[items[0].dataIndex].platform,
          label: (tooltipItem) =>
            `₹${compareData[tooltipItem.dataIndex].price}`,
          afterLabel: (tooltipItem) =>
            compareData[tooltipItem.dataIndex].desc,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v) => `₹${v}` },
      },
    },
  };

  return (
    <div className="compare-container">
      <h2 className="compare-heading">
      </h2>

      {product ? (
        <div className="top-section">
          <div className="left">
            <img
              src={
                product.image ||
                "https://via.placeholder.com/250/1E90FF/FFFFFF?text=No+Image"
              }
              alt={product.title}
            />
          </div>
          <div className="right">
            <h3>{product.title}</h3>
            <p className="desc">{product.description}</p>
            <b>Category:</b> {product.category}<br/><br/>
            <b>Base Price:</b> ₹{product.price}<br/><br/>
            <b>Source:</b> {product.source}
          </div>
        </div>
      ) : (
        <p className="loading">Fetching product details...</p>
      )}

      <div className="bottom-section">
        <h3>Price Comparison Across Platforms</h3>
        <div className="chart-container">
          <Bar data={chartData} options={options} />
        </div>
      </div>
      <p>will list the product cards here which are mention in the chart</p>
    </div>
  );
};

export default Compare;

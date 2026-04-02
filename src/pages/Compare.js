import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "../styles/Compare.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ register
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Compare = () => {
  const location = useLocation();
  const products = location.state?.compareList || [];

  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);

  const platformColors = {
    amazon: "#FF3B30",    // 🔴 red
    flipkart: "#FFD700",  // 🟡 yellow
    gem: "#28a745",       // 🟢 green
  };

  // ✅ discount extractor
  const extractDiscount = (offer) => {
    if (!offer) return 0;
    const match = offer.match(/(\d+)%/);
    if (match) {
      const val = parseInt(match[1]);
      return val >= 1 && val <= 100 ? val : 0;
    }
    return 0;
  };

  // 🧠 best price
  const getBestPrice = () => {
    return Math.min(...products.map((p) => p.price || Infinity));
  };

  // 🧠 best discount
  const getBestDiscount = () => {
    return Math.max(
      ...products.map((p) => extractDiscount(p.description))
    );
  };

  // ✅ charts
  useEffect(() => {
    if (products.length > 0) {
      setBarData({
        labels: products.map((p, i) => `${p.source} ${i + 1}`), // unique label
        datasets: [
          {
            label: "Price (₹)",
            data: products.map((p) => p.price),
            backgroundColor: products.map(
              (p) => platformColors[p.source] || "#999"
            ),
            borderRadius: 6,
          },
        ],
      });

      setPieData(() => {
        const platformMap = {};

        products.forEach((p) => {
          const key = p.source;

          if (!platformMap[key]) {
            platformMap[key] = 0;
          }

          platformMap[key] += extractDiscount(p.description);
        });

        const labels = Object.keys(platformMap);
        const data = Object.values(platformMap);

        return {
          labels: labels.map((l) => l.toUpperCase()),
          datasets: [
            {
              label: "Discount %",
              data: data,
              backgroundColor: labels.map(
                (p) => platformColors[p] || "#999"
              ),
            },
          ],
        };
      });
    }
  }, [products]);

  return (
    <div className="compare-container">
      <h2 className="heading">Compare Products</h2>

      {products.length === 0 ? (
        <p>No products selected</p>
      ) : (
        <>
          {/* 🔥 CARDS */}
          <div className="card-grid">
            {products.map((p, i) => {
              const bestPrice = getBestPrice();
              const bestDiscount = getBestDiscount();

              return (
                <div className="compare-card" key={i}>
                  <img src={p.image} alt={p.title} />

                  <h4>{p.title}</h4>

                  <p><b>₹{p.price}</b></p>

                  <p>{p.source}</p>

                  <p>{p.delivery}</p>

                  {/* 🏆 badges */}
                  {p.price === bestPrice && (
                    <span className="badge green">
                      Best Price
                    </span>
                  )}

                  {extractDiscount(p.description) === bestDiscount && (
                    <span className="badge orange">
                      Best Deal
                    </span>
                  )}

                  <button
                    onClick={() =>
                      window.open(p.product_url, "_blank")
                    }
                  >
                    Visit
                  </button>
                </div>
              );
            })}
          </div>

          {/* 🔥 TABLE */}
          <div className="table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Visit</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p, i) => (
                  <tr
                    key={i}
                    className={
                      p.price === getBestPrice()
                        ? "highlight"
                        : ""
                    }
                  >
                    <td>{p.source}</td>
                    <td>₹{p.price}</td>
                    <td>
                      {extractDiscount(p.description)}%
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          window.open(
                            p.product_url,
                            "_blank"
                          )
                        }
                      >
                        Visit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔥 CHARTS */}
          <div className="charts">
            <div className="chart-box">
              <h3>Price Comparison</h3>
              {barData && (
                <Bar data={barData} options={barOptions} />
              )}
            </div>

            <div className="chart-box">
              <h3>Discount Comparison</h3>
              {pieData && <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom"
                    }
                  }
                }}
              />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// 🔥 chart options
const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (v) => `₹${v}`,
      },
    },
  },
};

export default Compare;
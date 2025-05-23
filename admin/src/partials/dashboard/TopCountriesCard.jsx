import React from "react";
import DoughnutChart from "../../charts/DoughnutChart";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function TopCountriesCard({ guests }) {
  // Filter out guests without nationality
  const guestsWithNationalities = guests.filter((item) => item.nationality);

  // Count guests by nationality
  const countryCount = {};
  guestsWithNationalities.forEach((guest) => {
    const nationality = guest.nationality;
    if (nationality) {
      countryCount[nationality] = (countryCount[nationality] || 0) + 1;
    }
  });

  // Convert to array, sort by count (descending), and take top 5
  let countries = Object.entries(countryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Prepare chart data
  const chartData = {
    labels: countries.map(([name]) => name),
    datasets: [
      {
        label: "Top Countries",
        data: countries.map(([, count]) => count),
        backgroundColor: [
          tailwindConfig().theme.colors.violet[500],
          tailwindConfig().theme.colors.sky[500],
          tailwindConfig().theme.colors.violet[800],
          tailwindConfig().theme.colors.indigo[900],
          tailwindConfig().theme.colors.green[500],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.violet[600],
          tailwindConfig().theme.colors.sky[600],
          tailwindConfig().theme.colors.violet[900],
          tailwindConfig().theme.colors.indigo[900],
          tailwindConfig().theme.colors.indigo[500],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Top Countries</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default TopCountriesCard;

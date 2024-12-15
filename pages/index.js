import ChartsContainer from "../components/charts";
import React, { useEffect, useState } from "react";
import CardStats from "../components/CardStats";

export default function Home() {
  const [cardStatArr, setCardStatArr] = useState([]);
  const lineChartData = [
    {
      name: "2019",
      userCount: 200000,
    },
    {
      name: "2020",
      userCount: 300000,
    },
    {
      name: "2021",
      userCount: 600000,
    },
    {
      name: "2022",
      userCount: 800000,
    },
    {
      name: "2023",
      userCount: 1000000,
    },
  ];
  const pieChartData = [
    { name: "Hair cut", value: 400 },
    { name: "Hair styling", value: 300 },
    { name: "Beard shaving", value: 300 },
    { name: "Skin Care", value: 200 },
  ];
  return (
    <div
      className="h-full flex flex-col justify-start"
      style={{ width: "calc(100% - 256px)" }}
    >
      <div className="grid gap-4 w-full lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-5">
        {[
          {
            statSubtitle: "Total Income",
            statTitle: "120,000 $",
            statArrow: "up",
            statPercent: "3.48",
            statDescripiron: "Since last month",
            statIconName: "Income",
          },
          {
            statSubtitle: "Total Profit",
            statTitle: "24,000 $",
            statArrow: "up",
            statPercent: "3.48",
            statDescripiron: "Since last month",
            statIconName: "Profit",
          },
          {
            statSubtitle: "Total Sales",
            statTitle: "100,000 $",
            statArrow: "up",
            statPercent: "3.48",
            statDescripiron: "Since last month",
            statIconName: "Sales",
          },
          {
            statSubtitle: "Total Visitors",
            statTitle: "5000",
            statArrow: "down",
            statPercent: "12.3",
            statDescripiron: "Since last month",
            statIconName: "View",
          },
        ].map((card, index) => (
          <CardStats
            key={index}
            statTitle={card.statTitle}
            statDescripiron={card.statDescripiron}
            statPercent={card.statPercent}
            statSubtitle={card.statSubtitle}
            statIconName={card.statIconName}
            statArrow={card.statArrow}
          />
        ))}
      </div>
      <div className="mt-12">
        <ChartsContainer
          pieChartData={pieChartData}
          lineChartData={lineChartData}
        />
      </div>
    </div>
  );
}

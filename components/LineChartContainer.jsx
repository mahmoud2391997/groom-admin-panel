import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function LineChartContainer({ lineChartData }) {
  lineChartData;

  return (
    <div className="w-full h-72">
      <h2 className="text-center text-lg font-semibold mb-4 text-main">
        Number of Users from 2019-2023
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={lineChartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" stroke="#4a90e2" />
          <YAxis
            stroke="#4a90e2"
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip formatter={(value) => `${value.toLocaleString()} Users`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="userCount"
            name="Number of Users"
            stroke="#4a90e2"
            strokeWidth={5}
            dot={{ r: 6, fill: "#FFA500" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

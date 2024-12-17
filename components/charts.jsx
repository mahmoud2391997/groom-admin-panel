import LineChartContainer from "./LineChartContainer";
import PieChartContainer from "./PieChartContainer";
import PropTypes from "prop-types";

export default function ChartsContainer({ pieChartData, lineChartData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 p-4">
      <div className="w-full h-full">
        <LineChartContainer lineChartData={lineChartData} />
      </div>
      <div className="w-full h-full">
        <PieChartContainer pieChartData={pieChartData} />
      </div>
    </div>
  );
}
ChartsContainer.propTypes = {
  pieChartData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  lineChartData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

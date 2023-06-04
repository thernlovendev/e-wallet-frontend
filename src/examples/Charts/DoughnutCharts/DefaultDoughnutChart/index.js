import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Doughnut } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// DefaultDoughnutChart configurations
import configs from "examples/Charts/DoughnutCharts/DefaultDoughnutChart/configs";

function DefaultDoughnutChart({ title, description, height, chart }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {}, chart.cutout);
  const renderChart = (
    <SoftBox p={2}>
      {useMemo(
        () => (
          <SoftBox height={height} position="relative">
            {title || description ? (
              <SoftBox
                px={description ? 1 : 0}
                pt={description ? 1 : 0}
                position="absolute"
                style={{
                  height: "100%",
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {title && title}
                {description && description}
              </SoftBox>
            ) : null}
            <Doughnut data={data} options={options} />
          </SoftBox>
        ),
        [height, data, options, title, description]
      )}
    </SoftBox>
  );

  return title || description ? (
    <Card style={{ background: "transparent", boxShadow: "none" }}>{renderChart}</Card>
  ) : (
    renderChart
  );
}

// Setting default values for the props of DefaultDoughnutChart
DefaultDoughnutChart.defaultProps = {
  title: "",
  description: "",
  height: "19.125rem",
};

// Typechecking props for the DefaultDoughnutChart
DefaultDoughnutChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default DefaultDoughnutChart;

import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const Charts = ({ xaxis, yaxis, type, isCustomCss }) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  const handleChartData = () => {
    if (type === 'pie') {
      setSeries(yaxis);
      setOptions({
        chart: {
          type,
        },
        labels: xaxis,
      });
    } else {
      const option = {
        chart: {
          id: 'apexchart-example',
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: xaxis,
        },
      };
      const serie = [
        {
          data: yaxis,
        },
      ];
      setOptions(option);
      setSeries(serie);
    }
  };

  useEffect(() => {
    handleChartData();
  }, []);

  return (
    <React.Fragment>
      {isCustomCss ? (
        <ReactApexChart options={options} series={series} type={type} width={380} height={300} />
      ) : (
        <ReactApexChart options={options} series={series} type={type} />
      )}
    </React.Fragment>
  );
};

Charts.prototype = {
  xaxis: PropTypes.instanceOf(Array).isRequired,
  yaxis: PropTypes.instanceOf(Array).isRequired,
  type: PropTypes.string.isRequired,
  isCustomCss: PropTypes.bool.isRequired,
};

export default Charts;

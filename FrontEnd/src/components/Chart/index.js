import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  const MonthlyBarChart = (props) => {
    const { productData } = props;


   
  
    const data = productData.sort((a, b) => {
      const rangeA = parseInt(a.range.split("-")[0]);
      const rangeB = parseInt(b.range.split("-")[0]);
  
      return rangeA - rangeB;
    });



  
    const DataFormatter = (number) => {
      return number.toString();
    };
  
    return (
      <ResponsiveContainer width="80%" height={300}>
        <BarChart
          data={productData}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="range"
            tick={{
              stroke: "gray",
              strokeWidth: 0,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: "gray",
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="count" name="count" fill="#03fcec" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  export default MonthlyBarChart;
  
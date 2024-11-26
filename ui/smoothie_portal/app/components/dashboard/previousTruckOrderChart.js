import React from "react";
import dynamic from "next/dynamic";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import { useState, useEffect } from "react";

require("highcharts/modules/exporting")(Highcharts);

// Initialize exporting module
if (typeof Highcharts === "object") {
  exportingInit(Highcharts);
}

// Dynamically import HighchartsReact to avoid SSR issues
const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

const PreviousTruckOrderChart = ({ truckOrder }) => {
  // -total products : 100
  // -dry goods: 30
  // -refrigerated goods: 20
  // -frozen goods: 10
  console.log("truckorderProp:", truckOrder);

  const [dryGoods, setDryGoods] = useState(0);
  const [refrigeratedGoods, setRefrigeratedGoods] = useState(0);
  const [frozenGoods, setFrozenGoods] = useState(0);

  const filterGoods = (truckOrder, category) => {
    return truckOrder.purchaseOrder.filter(
      (product) => product.product.category == category
    );
  };
  // useEffect that filters dry / refrigerated / frozen and sets them to the data points

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("truckOrder:", truckOrder);
    if (truckOrder) {
      const filterCaseAmounts = () => {
        const dryGoods = filterGoods(truckOrder, "dry");
        const refrigeratedGoods = filterGoods(truckOrder, "refrigerated");
        const frozenGoods = filterGoods(truckOrder, "frozen");

        setDryGoods(dryGoods.length);
        setRefrigeratedGoods(refrigeratedGoods.length);
        setFrozenGoods(frozenGoods.length);
      };

      filterCaseAmounts();
    }
  }, [truckOrder]);

  const totalGoods = dryGoods + refrigeratedGoods + frozenGoods;

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Previous Truck Order",
    },
    subtitle: {
      text: `Total: ${totalGoods} cases`,
      align: "center",
      verticalAlign: "top",
      style: {
        fontSize: "1em",
        color: "#333333",
      },
    },
    tooltip: {
      pointFormatter: function () {
        return `<b>${this.name}</b>: ${this.y} cases`;
      },
      style: {
        fontSize: "1em",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        data: [
          {
            name: "Dry Goods",
            sliced: true,
            selected: true,
            y: dryGoods,
          },
          {
            name: "Refrigerated Goods",
            y: refrigeratedGoods,
          },
          {
            name: "Frozen Goods",
            y: frozenGoods,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex-1 overflow-hidden">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ className: "h-80" }}
      />
    </div>
  );
};

export default PreviousTruckOrderChart;

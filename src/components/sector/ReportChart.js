import { useEffect } from "react";
import Chart from "chart.js";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { Trans } from "react-i18next";

export default function ReportChart({ resolved, spam, unresolved }) {
  var data_resolved = resolved;
  var data_unresolved = unresolved;
  var data_spam = spam;
  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Resolved Reports",
            backgroundColor: "#03a9f4",
            borderColor: "#03a9f4",
            // data: [65, 78, 66, 44, 56, 67, 75],
            data: data_resolved,
            fill: false,
          },
          {
            label: "Active Reports",
            fill: false,
            backgroundColor: "#ff9800",
            borderColor: "#ff9800",
            data: data_unresolved,
            // data: [40, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Report Status Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "black",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(17,17,17,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(17,17,17,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(17, 17, 17, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);

  return (
    <Card>
      <CardHeader color="brown" contentPosition="left">
        <h6 className="uppercase text-gray-200 text-xs font-medium">
          <Trans i18nKey="sectorDashboard.Overview"> Overview</Trans>
        </h6>
        <h2 className="text-white text-2xl">
          {" "}
          <Trans i18nKey="sectorDashboard.ReportStatus">Report Status</Trans>
        </h2>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <canvas data-cy="canvas" id="line-chart"></canvas>
        </div>
      </CardBody>
    </Card>
  );
}

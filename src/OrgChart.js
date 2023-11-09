import React, { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  let chart = null;

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeContent(function (d, i, arr, state) {
          return `
    <div style="display:flex;flex-direction:column;align-items:center;">     
      <div style="background-color:#3AB6E3;height:10px;width:${
        d.width - 2
      }px;border-radius:1px"></div>
      <div style="padding:20px; padding-top:35px;text-align:center">
          <div style="color:#111672;font-size:16px;font-weight:bold"> ${
            d.data.name
          } </div>
          <div style="color:#404040;font-size:16px;margin-top:4px"> ${
            d.data.managerName ?? ""
          } </div>
          <div style="color:#404040;font-size:16px;margin-top:4px"> ${
            d.data.office ?? ""
          } </div>
          <div style="color:#404040;font-size:16px;margin-top:6px"> ${
            d.data.salary ? "💵 " + d.data.salary + "k" : ""
          } </div>
          <div style="color:#404040;font-size:16px;margin-top:6px"> ${
            d.data.skills ? "🔹 " + d.data.skills[0] + ", " + d.data.skills[1] + ", " + d.data.skills[2] : ""
          } </div>
      </div> 
      <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
        <div > ${d.data._totalSubordinates > 0 ? "Oversees: " + d.data._totalSubordinates + "👤" : ""} </div>    
      </div>
    </div>     
          `;
        })
        .expandAll()
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};

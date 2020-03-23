import * as d3 from 'd3';
import * as webcola from 'webcola'

import React, { useRef, useEffect } from 'react';

const LineChart = () => {

  const divRef = useRef()

  useEffect(() => {
    const width = 300;
    const height = 300;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const cola = webcola.d3adaptor(d3)
      .linkDistance(120)
      .avoidOverlaps(true)
      .size([width, height]);

    const svg = d3.select(divRef.current).append("svg")
      .attr("width", width)
      .attr("height", height);

    const graph = {
      "nodes": [
        { "name": "a", "width": 60, "height": 40, "x": 50, "y": 50 },
        { "name": "b", "width": 60, "height": 40, "x": 50, "y": 50 },
        { "name": "c", "width": 60, "height": 40, "x": 50, "y": 50 },
        { "name": "d", "width": 60, "height": 40, "x": 50, "y": 50 },
        { "name": "e", "width": 60, "height": 40, "x": 50, "y": 50 },
      ],
      "links": [
        { "source": 0, "target": 1 },
        { "source": 1, "target": 2 },
        { "source": 2, "target": 0 },
        { "source": 2, "target": 3 }
      ]
    }

    cola
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

    const link = svg.selectAll(".link")
      .data(graph.links)
      .enter().append("line")
      .style("stroke", "#000")
      .style("stroke-width", "1.5px")

    const node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("rect")
      .attr("class", "node")
      .attr("width", d => d.width)
      .attr("height", d => d.height)
      .attr("rx", 5).attr("ry", 5)
      .style("fill", color("1"))
      .call(cola.drag);

    const label = svg.selectAll(".label")
      .data(graph.nodes)
      .enter().append("text")
      .attr("class", "label")
      .text(d => d.name)
      .call(cola.drag);

    node.append("title")
      .text(d => d.name);

    cola.on("tick", function () {

      link
        .attr("x1", (d: any) => d.source.x) //型が死んでる，なぜ
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node
        .attr("x", d => d.x - d.width / 2)
        .attr("y", d => d.y - d.height / 2);

      label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });
  }, []);

  return (
    <div ref={divRef}>aaa</div>
  );
}

export default LineChart

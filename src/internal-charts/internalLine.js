/*
This is required for d3 to load.
*/
/*  global d3  */

import utils from '../utils/utils';

const InternalLine = {

  /*
  @private
  @function styleChart
  @description Updates the chart's style on the element
  @param {Object} context Chart object
  @returns {Object} context Chart object
  */

  styleChart(context) {
    context.element.select('svg')
        .style('font-family', context.getFontStyle)
        .attr('font-size', context.getFontSize)
        .append('text')
        .attr('class', 'title')
        .attr('x', context.getWidth * 0.5)
        .attr('y', 20)
        .text(context.getTitle);

    return context;
  },

  /*
  @private
  @function buildLine
  @description Builds up the line
  @returns {Object} context Chart object
  */

  buildLine(context) {
    /*
    Build the d3 line using by mapping the x and y values to the data
    */
    context.line = d3.svg.line()
        .x((d) => { return context.xScale(d.x); })
        .y((d) => { return context.yScale(d.y); });

    return context;
  },

  /*
  @private
  @function buildYAxis
  @description Builds up the y-axis
  @param {Object} context Chart object
  @returns {Object} context Chart object
  */

  buildYAxis(context) {
    context.svg.append('g')
             .attr('class', 'y axis')
             .call(context.yAxis)
             .append('text')
             .attr('transform', 'rotate(-90)')
             .attr('y', -45)
             .attr('x', -context.getMargins.bottom * 2)
             .attr('dy', '.4em')
             .style('text-anchor', 'end')
             .text(context.getyAxisLabel);

    return context;
  },

  /*
  @private
  @function updateYAxis
  @description Updates and rebuilds the y-axis
  @param {Object} context Chart object
  @returns {Object} context Chart object
  */

  updateYAxis(context) {
    /*
    Updated the y-axis on chart by rebuilding it. Used when properties on a chart are changed and require a rebuild.
    */
    context.element
           .select('svg')
           .selectAll('g .y.axis')
           .call(context.yAxis);

    context.element.select('.y-axis-label')
           .attr('class', 'y-axis-label')
           .attr('transform', 'rotate(-90)')
           .attr('y', -45)
           .attr('x', -context.getMargins.bottom * 2)
           .attr('dy', '.4em')
           .style('text-anchor', 'end')
           .text(context.getyAxisLabel);

    return context;
  },

  /*
  @private
  @function setXScale
  @description Sets the x-scale according to the data
  @param {Object} context Chart object
  @returns {Object} context Chart object
  */
  setXScale(context) {
    context.setxAxisLabel = context.xColumnName;
    context.xScale = d3.time.scale()
                    .range([0, context.getWidth]);
    context.xScale.domain(
      [d3.min(context.data, d => { return d3.min(d.values, v => {return v[context.xColumnName]; }); }),
      d3.max(context.data, d => { return d3.max(d.values, v => {return v[context.xColumnName]; }); })]);

    return context;
  },

  /*
  @private
  @function setYScale
  @description Sets the y-scale according to the data
  @param {Object} context Chart object
  @returns {Object} context Chart object
  */
  setYScale(context) {
    // context.yColumnName = utils.getFirstLinearColumn(context.data);

    context.setyAxisLabel = 'Default Label';
    context.yScale = d3.scale.linear()
                    .range([context.getHeight, 0]);

    context.yScale.domain(
      [d3.min(context.data, d => { return d3.min(d.values, v => {return v[d.name]; }); }),
      d3.max(context.data, d => { return d3.max(d.values, v => {return v[d.name]; }); })]);

    return context;
  },

  /*
  @private
  @function buildChartComponents
  @description Builds the actual chart components with data
  @param {Object} context Chart object
  @returns {Object} context Chart object
   */

  buildChartComponents(context) {
    const groups = context.svg.selectAll('.line')
    .data(context.data)
    .enter()
    .append('g');

    const lines = groups.append('path')
                        .attr('class', 'line');

    let k = context.data[0].values.length;
    const length = k;
    d3.timer(() => {
      if (k > 0) {
        k -= 7;
        lines.attr('d', (d) => {
          return context.line(d.values.map(v => {
            return { x: v[context.xColumnName], y: v[d.name] };
          }).slice(0, length - k)); });
      } else {
        return true;
      }
    });

    lines.on('mouseover', (d, i) => {
      context.element.selectAll('.line')
      .style('opacity', (data, index) => {
        if (index !== i) {
          return 0.25;
        }
        return 1;
      });
      context.tooltip.transition()
       .duration(200)
       .style('display', 'block')
       .style('opacity', 0.9);

      context.tooltip
       .html(() => {
         return `${context.xColumnName}: ${context.xScale.invert(d3.event.pageX - context.getMargins.left - context.getMargins.right).toLocaleString()}\
        ${context.yColumnName}: ${context.yScale.invert(d3.event.pageY - context.getMargins.top - context.getMargins.bottom).toFixed(3)}`;
       })
       .style('left', (d3.event.pageX + 'px'))
       .style('top', (d3.event.pageY + 'px'));
    });

    lines.on('mouseout', () => {
      context.tooltip.transition().delay(1000).style('opacity', 0).style('display', 'none');
      context.element.selectAll('.line').transition().delay(1000).style('opacity', 1.0);
    });

    return context;
  },

  /*
  @private
  @function updateChartComponents
  @description Rebuilds the line on the chart
  @param {Object} context Chart object
  @returns {Object} context Chart object
  */

  updateChartComponents(context) {
    context.svg.select('.line').remove();
    context.svg.append('path')
            .datum(context.data)
            .attr('class', 'line')
            .style({
              fill: 'none',
              stroke: context.getColors[0],
              'stroke-width': 'crispEdges',
            })
            .attr('d', context.line);

    return context;
  },

  /*
  @private
  @function updateColors
  @description Updates color of bar chart after initial render
  @param {Array} colors
    @description Array of colors to update the chart to
  */

  updateColors(context) {
    context.element.select('svg')
        .selectAll('.line')
        .style({
          fill: 'none',
          'stroke-width': 'crispEdges',
        })
        .style('stroke', (d, i) => {
          return context.getColors[i];
        });

    return context;
  },

  /*
  @private
  @function convertData
  @description Converts the data needed for the chart
  @param {Object} context Chart object
  */

  convertData(context) {
    context.data = utils.parseTimeData(context.data, context.xColumnName, context.dateFormat);
    const list = [];
    const dataWorker = (i, columns) => {
      list.push({
        name: columns[i],
        values: context.data.map(val => {
          return { [context.xColumnName]: val[context.xColumnName], [columns[i]]: Number(val[columns[i]]) };
        }),
      });
    };
    const columns = utils.getColumnNames(context.data);
    for (let i = 0; i < columns.length; i++) {
      if (columns[i] !== context.xColumnName && utils.isLinear(context.data, columns[i])) {
        dataWorker(i, columns);
      }
    }
    context.data = list;

    return context;
  },

  /*
  @private
  @function setColumnNames
  @description Sets the column names
  @param {Object} context Chart object
  */

  setColumnNames(context) {
    context.xColumnName = utils.getFirstOrdinalColumn(context.data, context.dateFormat);
    context.xColumnName = 'date';
    // This a check for data sets that have more than one linear column
  },
};

export default InternalLine;

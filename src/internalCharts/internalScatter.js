/* global d3 */

import utils from '../utils/utils';

const scatter = {
// Parses and sets the column names for a particular chart instance
/*
@private
@function setColumns
@description Parses and sets the column names for a particular chart instance
@param {Object} context (chart instance)
@returns {Object} context (chart instance)
*/

  setColumns(context) {
    context.xColumnName = utils.getFirstLinearColumn(context.data);
    context.yColumnName = utils.getColumnNames(context.data)[1];
    context.ordinalNames = utils.getFirstOrdinalColumn(context.data);

    return context;
  },
// Sets the scale for the x-axis based on the results of the setColumns function
/*
@private
@function setXscale
@description Sets the scale for the x-axis based on the results of the setColumns function
@param {Object} context (chart instance)
@returns {Object} context (chart instance)
*/

  setXscale(context) {
    context.setxAxisLabel = context.xColumnName;
    context.xScale = d3.scale.linear()
                    .range([0, context.getChartWidth]);
    context.xScale.domain(d3.extent(context.data, (d) => { return +d[context.xColumnName]; })).nice();

    return context;
  },
// Sets the scale for the y-axis based on the results of the setColumns function
/*
@private
@function setYscale
@description Sets the scale for the y-axis based on the results of the setColumns function
@param {Object} context (chart instance)
@returns {Object} context (chart instance)
*/

  setYscale(context) {
    context.setyAxisLabel = context.yColumnName;
    context.yScale = d3.scale.linear()
                       .range([context.getChartHeight, 0]);
    context.yScale.domain(d3.extent(context.data, (d) => { return +d[context.yColumnName]; })).nice();
    return context;
  },
// Builds the actual chart components with data
/*
@private
@function buildChartComponents
@description Builds the actual chart components with data
@param {Object} context (chart instance)
@returns {Object} context (chart instance)
*/

  buildChartComponents(context) {
    const tooltip = context.tooltip;

    context.svg.selectAll('.scatter')
         .data(context.data)
         .enter()
         .append('circle')
         .attr('class', 'dot')
         .on('mouseover', (d) => {
           d3.select(d3.event.target).transition()
           .duration(200)
           .attr('r', 7);
           tooltip.show();
           tooltip.setContent(`${context.yColumnName}: ${d[context.yColumnName]}\
           ${context.xColumnName}: ${d[context.xColumnName]}`);
         })
        .on('mouseout', () => {
          d3.select(d3.event.target).transition()
            .duration(200)
            .attr('r', 4);
          tooltip.hide();
        })
         .attr('r', 4)
         .attr('cx', (d) => { return context.xScale(d[context.getxAxisLabel]); })
         .attr('cy', (d) => { return context.yScale(d[context.getyAxisLabel]); })
         .style('fill', (d) => { return context.getColorScale(d[context.ordinalNames]); })
         .style('opacity', 0)
         .transition()
         .delay((d, i) => { return i * (Math.random() * 20); })
         .style('opacity', 1);


    return context;
  },
// Updates the chart's style on the element
/*
@private
@function styleChart
@description Updates the chart's style on the element
@param {Object} context (chart instance)
@returns {Object} context (chart instance)
*/

  styleChart(context) {
    context.element.select('svg')
        .style('font-family', context.getFontStyle)
        .attr('font-size', context.getFontSize)
        .append('text')
        .attr('class', 'title')
        .attr('x', context.getChartWidth * 0.5)
        .attr('y', 20)
        .text(context.getTitle);

    return context;
  },

  updateChartComponents(context) {
    context.svg.select('.scatter').remove();
    context.svg.selectAll('.dot').remove();
    context.svg.selectAll('.legend').remove();
    context.element.select('.title').remove();

    this.buildChartComponents(context);
    this.styleChart(context);
    return context;
  },
  // Updates the chart's colors
  /*
  @private
  @function  updateColors
  @description Updates the chart's colors
  @param {Object} context (chart instance)
  @returns {Object} context(chart instance)
  */

  updateColors(context) {
    context.element.select('svg')
        .selectAll('.dot')
        .style('fill', (d) => { return context.getColorScale(d[context.ordinalNames]); });

    context.element.selectAll('.legend-data rect')
    .style('fill', context.getColors);

    return context;
  },


};

export default scatter;

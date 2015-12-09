/* global d3 */
import Internal from '../subModules/internal';
/**
@private
Holds various utility functions used throughout the library,
particularly for creating, building and modifying chart elements.
*/

const utils = {

  /**
  @private
  @function Creates the main SVG element
  @param {Object} element
    @description The main SVG chart element
  @param {Number} width
    @description Width of SVG chart element
  @param {Number} width
    @description Width of SVG chart element
  @returns {Object} The decorated main SVG chart element
  */

  createSVGElement(element, width, height, margin) {
    const svgElement = element
                     .append('svg')
                     .attr('width', width + margin.left + margin.right)
                     .attr('height', height + margin.top + margin.bottom)
                     .append('g')
                     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    return svgElement;
  },

  /**
  @private
  @function Used for setting the default margins for all charts
  @returns {Object} Constructor Class for Margins
  */

  setDefaultMargins() {
    return new Internal.config.Margins({ top: 30, right: 30, bottom: 30, left: 50 });
  },

  /**
  @private
  @function  Used for setting the default height for all charts to 600px
  @returns {Object} Constructor Class for Height
  */

  setDefaultWidth() {
    return new Internal.config.Width(600);
  },

  /**
  @private
  @function  Used for setting default width for all charts to 300px
  @returns {Object} Constructor Class for Width
  */

  setDefaultHeight() {
    return new Internal.config.Height(300);
  },

  /**
  @private
  @function Used for setting an oridinal scale on chart
  @param {Number} length
    @description Width or Height property of chart
  @returns {Object} d3 ordinal scale set to length param
  */

  setOridinalScale(length) {
    const scale = d3.scale.ordinal() // Add check to figure out scale
                    .rangeRoundBands([0, length], 0.1);
    return scale;
  },

  /**
  @private
  @function Used for setting a linear scale on chart
  @param {Number} length
    @description Width or Height property of chart
  @returns {Object} d3 linear scale set to length param
  */

  setLinearScale(length) {
    const scale = d3.scale.linear()
                    .range([length, 0]);
    return scale;
  },

  /**
  @private
  @function Sets the input domain of the ordinal scale to the specified array of discrete values. The first element in values will be mapped to the first element in the output range, the second domain value to the second range value, and so on
  @param {Object} scale
    @description y-scale or x-scale of the chart
  @param {Array} data
    @description chart data values for the column we are working with
  @param {Object} input
    @description column name for the current data value
  */

  mapDataDomainToString(scale, data, input) {
    scale.domain(data.map(d => { return d[input]; }));
  },

  /**
  @private
  @function Sets the input domain of the linear scale to the specified array of data values. The first element in values will be mapped to the first element in the output range, the second domain value to the second range value, and so on
  @param {Object} scale
    @description y-scale or x-scale of the chart
  @param {Array} data
    @description chart data values for the column we are working with
  @param {Object} input
    @description column name for the current data value
  */

  mapDataDomainToNumber(scale, data, input) {
    scale.domain([0, d3.max(data, d => { return d[input]; })]);
  },

  /**
  @private
  @function Sets Axis label on chart
  @param {String} label
    @description The string value of the axis label to be set
  @returns {Object} Constructor Class for Height
  */

  setAxisLabel(label) {
    return new Internal.config.AxisLabel(label);
  },

  setColors(colorsArray) {
    return new Internal.config.Color(colorsArray);
  },

  setTitle(title) {
    return new Internal.config.Title(title);
  },

  setFontStyle(font) {
    return new Internal.config.Fontstyle(font);
  },

  setFontSize(size) {
    return new Internal.config.Fontsize(size);
  },

  /**
  @private
  @function Builds d3 axis
  @param {String} orientation
    @description The orientation of the scale's ticks ('bottom' vs. 'top', etc)
  @returns {Object} scale
    @description y-scale or x-scale of the chart
  @returns d3 axis
  */

  createAxis(orientation, scale) {
    const axis = d3.svg.axis()
                 .scale(scale)
                 .orient(orientation);
    return axis;
  },

  /**
  @private
  @function Sets style properties for chart axis
  @param {Object} svg
    @description SCG element of chart
  @param {String} part
    @description The part of the axis we are generating
  @param {String} fill
    @description Fill color of axis
  @param {String} stroke
    @description Stroke style of axis
  @returns {String} shapeRerendering
    @description TODO
  */

  setAxisStyle(svg, part, fill, stroke, shapeRerendering) {
    svg.selectAll('.axis').selectAll(part)
       .style({
         fill: fill,
         stroke: stroke,
         'shape-rendering': shapeRerendering,
       });
  },

  isAcceptableFileExtension(extension) {
    const okayExtensions = {
      'json': true,
      'tsv': true,
      'csv': true,
    };
    return extension in okayExtensions;
  },

  /**
  @private
  @param {Object, String} rawData
    @description The raw data from user
  @returns {String} The type of data that was entered
  */

  getDataType(rawData) {
    if (rawData.constructor === String) {
      try {
        JSON.parse(rawData);
        return 'json';
      } catch (e) {
        const temp = rawData.split('.');
        if (temp.length === 2) {
          return 'location';
        } else if (temp.length > 2 || temp.length < 2) {
          throw new Error('Wrong input type!!');
        }
      }
    } else if (rawData instanceof Array) {
      return 'array';
    } else if (rawData instanceof Object) {
      return 'object';
    }
  },

  /**
  @private
  @param {Object, String} rawData
    @description The raw data from user
  @returns {Promise} A promise with that gets resolved when the data is available
  */

  getData(rawData) {
    const dataType = utils.getDataType(rawData);
    if (dataType === 'location') {
      const fileExtension = rawData.split('.')[1];
      if (utils.isAcceptableFileExtension(fileExtension)) {
        return new Promise((resolve, reject) => {
          d3[fileExtension](rawData, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      }
    } else if (dataType === 'json') {
      return new Promise(resolve => {
        resolve(JSON.parse(rawData));
      });
    } else if (dataType === 'object') {
      return new Promise(resolve => {
        resolve(rawData);
      });
    } else if (dataType === 'array') {
      return new Promise(resolve => {
        resolve(rawData);
      });
    }
  },

  /**
  @private
  @param {Object} data
    @description The graph data object
  @param {Object} columnName
    @description The column from the data
  @returns {Boolean} If the column scale is Ordinal
  */

  isOrdinal(data, columnName) {
    const dataType = utils.getDataType(data);
    if (dataType === 'array') {
      if (Number(data[0][columnName])) {
        return false;
      }
    } else if (dataType === 'object') {
      if (Number(data[columnName])) {
        return false;
      }
    }
    return true;
  },

  /**
  @private
  @param {Object} data
    @description The graph data object
  @param {Object} columnName
    @description The column from the data
  @returns {Boolean} If the column scale is Linear
  */

  isLinear(data, columnName) {
    if (!utils.isOrdinal(data, columnName)) {
      return true;
    }
    return false;
  },

  /**
  @private
  @param {Object} data
    @description The graph data object
  @returns {Boolean} If the column scale is Linear
  */

  getColumnNames(data) {
    const dataType = utils.getDataType(data);
    if (dataType === 'object') {
      return Object.keys(data);
    } else if (dataType === 'array') {
      return Object.keys(data[0]);
    }
  },

  /**
  @private
  @param {Object} data
    @description The graph data object
  @returns {String} The first column that can be oridinal
  */

  getFirstOrdinalColumn(data) {
    const columnNames = utils.getColumnNames(data);
    for (let i = 0; i < columnNames.length; i++) {
      if (utils.isOrdinal(data, columnNames[i])) {
        return columnNames[i];
      }
    }
    return null;
  },

  /**
  @private
  @param {Object} data
    @description The graph data object
  @returns {String} The first column that can be linear
  */

  getFirstLinearColumn(data) {
    const columnNames = utils.getColumnNames(data);
    for (let i = 0; i < columnNames.length; i++) {
      if (utils.isLinear(data, columnNames[i])) {
        return columnNames[i];
      }
    }
    return null;
  },

};

export default utils;

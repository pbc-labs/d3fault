import { ChartMain } from '../core/ChartMain';
import Internal from '../internal-charts/internal';
import InternalArea from '../internal-charts/internalArea';

export class AreaChart extends ChartMain {
  constructor() {
    super();
    this.dateFormat = '';
  }

  /*
  @private
  @function build
  @description Build up all the components for the chart
  @returns {Object} this Chart object
  */

  build() {
    Internal.selectElement(this);
    Internal.createSVGElement(this);
    InternalArea.setColumnNames(this);
    InternalArea.convertData(this);
    InternalArea.setXScale(this);
    InternalArea.setYScale(this);
    Internal.createxAxis(this);
    Internal.buildXAxis(this);
    Internal.createyAxis(this);
    InternalArea.buildYAxis(this);
    InternalArea.buildArea(this);
    Internal.setAxisStyle(this, 'path', 'none', '#000', 'crispEdges');
    Internal.setAxisStyle(this, 'line', 'none', '#000', 'crispEdges');
    InternalArea.updateColors(this);
    Internal.createToolTip(this);
    InternalArea.buildChartComponents(this);
    InternalArea.styleChart(this);

    return this;
  }

  /*
  @private
  @function updateChartComponents
  @description Updates the area on the chart
  @returns {Object} this Chart object
  */

  updateChartComponents() {
    InternalArea.updateChartComponents(this);

    return this;
  }

  /*
  @private
  @function updateHeight
  @description Updates the chart's height on the element
  @returns {Object} this Chart object
  */

  updateHeight() {
    Internal.updateSVGElement(this);
    InternalArea.setYScale(this);
    Internal.createyAxis(this);
    InternalArea.buildYAxis(this);
    Internal.updateXAxisPosition(this);
    InternalArea.buildArea(this);
    InternalArea.updateChartComponents(this);

    return this;
  }

  /*
  @private
  @function updateWidth
  @description Updates the chart's width on the element
  @returns {Object} this Chart object
  */

  updateWidth() {
    Internal.updateSVGElement(this);
    InternalArea.setXScale(this);
    Internal.createxAxis(this);
    Internal.buildXAxis(this);
    InternalArea.buildArea(this);
    InternalArea.updateChartComponents(this);
    return this;
  }

  /*
  @private
  @function updateMargins
  @description Updates the chart's margin on the element
  @@returns {Object} this Chart object
  */

  updateMargins() {
    this.updateWidth();
    this.updateHeight();
    return this;
  }

  /*
  @function updateColors
  @description Update color of area in chart
  @returns {Object} this Chart object
  */

  updateColors() {
    InternalArea.updateColors(this);
    return this;
  }

}

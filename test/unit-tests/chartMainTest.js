/* eslint-disable no-unused-expressions, no-unused-vars */
export default function (d3fault, expect, assert, should) {
  describe('Main Chart Constructor', () => {
    xit('should return an object when called to make a chart', () => {
      expect(d3fault.make('BarChart')).to.exist;
      expect(d3fault.make('BarChart')).to.be.an('Object');
    });

    describe('Methods', () => {
      const chart = d3fault.make('BarChart');

      describe('Creation Methods', () => {
        xit('should have a using method', () => {
          expect(chart.using).to.exist;
        });

        xit('should have an in method', () => {
          expect(chart.in).to.exist;
        });
      });

      describe('selectElement', () => {
        xit('should have a selectElement method', () => {
          expect(chart.selectElement).to.exist;
        });
      });

      describe('setMargin', () => {
        xit('should have a setMargin method', () => {
          expect(chart.setMargins).to.exist;
        });

        xit('should set default margins if no parameters are passed in', () => {
          const defaultMargins = { '_bottom': 30, '_left': 50, '_right': 30, '_top': 30 };
          expect(chart.setMargins().margins).to.eql(defaultMargins);
        });

        xit('should set custom margins if parameters are passed in', () => {
          const customMargins = { 'bottom': 1, 'left': 1, 'right': 1, 'top': 1 };
          expect(chart.setMargins(customMargins).margins).to.eql(customMargins);
        });
      });

      describe('setWidth', () => {
        xit('should have a setWidth method', () => {
          expect(chart.setWidth).to.exist;
        });

        xit('should set default width if no parameters are passed in', () => {
          expect(chart.setWidth().width.width).to.equal(600);
        });

        xit('should set custom width if parameters are passed in', () => {
          expect(chart.setWidth(300).width.width).to.equal(300);
        });
      });

      describe('setHeight', () => {
        xit('should have a setHeight method', () => {
          expect(chart.setHeight).to.exist;
        });

        xit('should set default height if no parameters are passed in', () => {
          expect(chart.setHeight().height.height).to.equal(300);
        });

        xit('should set custom height if parameters are passed in', () => {
          expect(chart.setHeight(700).height.height).to.equal(700);
        });
      });

      describe('setScale methods', () => {
        xit('should have a setXscale method', () => {
          expect(chart.setXscale).to.exist;
        });

        xit('should have a setYscale method', () => {
          expect(chart.setYscale).to.exist;
        });
        // TODO: write test for functionality
      });

      describe('setAxisStyle methods', () => {
        xit('should have a setAxisPathStyle method', () => {
          expect(chart.setAxisPathStyle).to.exist;
        });

        xit('should have a setAxisLineStyle method', () => {
          expect(chart.setAxisLineStyle).to.exist;
        });
        // TODO: write test for functionality
      });

      describe('setColors', () => {
        xit('should have a setColors method', () => {
          expect(chart.setColors).to.exist;
        });

        xit('should set default colors if no parameters are passed in', () => {
          const defaultColors = [];
          expect(chart.setColors().colors).to.eql(defaultColors);
        });

        xit('should set custom colors if parameters are passed in', () => {
          const customColors = ['black', 'grey', 'chartruse'];
          expect(chart.setColors(customColors).colors).to.eql(customColors);
        });
      });

      describe('setTitle', () => {
        xit('should have a setTitle method', () => {
          expect(chart.setTitle).to.exist;
        });

        xit('should set the default title if no parameters are passed in', () => {
          expect(chart.setTitle().title.title).to.eql('Chart');
        });

        xit('should set the title correctly', () => {
          expect(chart.setTitle('ChartNumberOne').title.title).to.eql('ChartNumberOne');
        });
      });

      describe('setFontSize', () => {
        xit('should have a setFontSize method', () => {
          expect(chart.setFontSize).to.exist;
        });

        xit('should set default font size if no parameters are passed in', () => {
          // TODO: write test for default font sizing
        });

        xit('should set custom font size if parameters are passed in', () => {
          // TODO: write test for custom font sizing
        });
      });

      describe('createLegend', () => {
        xit('should have a createLegend method', () => {
          expect(chart.createLegend).to.exist;
        });

        xit('should create a legend with the options passed it', () => {
          // TODO: write tests for functionality
        });
      });
    });
  });
}
import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Chart extends React.Component {
    displayName = 'Chart';

    static defaultProps = {
        height: 350,
        color: ['#57AFFF','#13CE66','#F7BA2A']
    };

    getInstance () {
        return this.chart.getEchartsInstance();
    }

    getLoadOption () {
        const series = [];
        const legends = [];
        const data = this.props.data;
        const legendMap = {};
        for (const legend in data.data) {
            const value = data.data[legend];
            let goal = 0;
            value.forEach((v) => {
                goal += v;
            });
            legends.push(legend);
            legendMap[legend] = goal;
            series.push({
                name: legend,
                value
            });
        }
        const indicator = data.indicators.map((item) => {
            return {
                name: item,
                max: 12
            };
        });
        return {
            color: this.props.color,
            legend: {
                data: legends,
                formatter: (name) => {
                    return `${name} ${legendMap[name]}`;
                }
            },
            radar: {
                indicator
            },
            series: [{
                name: '指标',
                type: 'radar',
                data: series
            }]
        };
    }

    render () {
        return (
            <ReactEchartsCore
                echarts={echarts}
                ref={(e) => { this.chart = e; }}
                option={this.getLoadOption()}
                style={{height: this.props.height}}
            />
        );
    }
}

export default Chart;

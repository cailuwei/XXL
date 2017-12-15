import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class BarChart extends React.Component {
    displayName = 'Chart1';

    static defaultProps = {
        height: 350,
        color: '#57AFFF'
    };

    getInstance () {
        return this.chart.getEchartsInstance();
    }

    getLoadOption () {
        return {
            title: {
                text: this.props.title,
                left: 'left',
                top: 5,
                textStyle: {
                    fontSize: 14
                }
            },
            color: [this.props.color],
            tooltip : {
                trigger: 'axis'
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
                    axisPointer: {
                        lineStyle: {
                            width: 0
                        }
                    },
                    data : this.props.x
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'',
                    type:'bar',
                    showSymbol: false,
                    data: this.props.y
                }
            ]
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

export default BarChart;

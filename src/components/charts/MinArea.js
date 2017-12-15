import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

class Chart extends React.PureComponent {
    displayName = 'Chart';
    static defaultProps = {
        height: 45,
        border: 0,
        areaColor: '#975FE4',
        borderColor: '#1890FF'
    };

    getInstance () {
        return this.chart.getEchartsInstance();
    }

    getLoadOption () {
        return {
            tooltip : {
                trigger: 'axis'
            },
            grid: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 5
            },
            xAxis : [
                {
                    show: false,
                    type : 'category',
                    boundaryGap : false,
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
                    show: false,
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'',
                    type:'line',
                    smooth: true,
                    showSymbol: false,
                    symbolSize: 2,
                    lineStyle: {
                        normal: {
                            width: this.props.border,
                            color: this.props.borderColor
                        }
                    },
                    areaStyle: {normal: {
                        color: this.props.areaColor
                    }},
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
                notMerge={true}
                lazyUpdate={true}
                style={{height: this.props.height}}
            />
        );
    }
}

export default Chart;

import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

class PieChart extends React.Component {
    displayName = 'PieChart';

    static defaultProps = {
        height: 350,
        color: ['#58AFFF', '#53D3D3','#A676E9','#F47A8E','#FCDA54','#68D387']
    };

    getInstance () {
        return this.chart.getEchartsInstance();
    }

    getLoadOption () {
        return {
            color: this.props.color,
            title: {
                text: this.props.title,
                left: 'left',
                top: 5,
                textStyle: {
                    fontSize: 14
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: true,
                orient : 'vertical',
                x : 'right',
                y : 'center',
                data: this.props.legends
            },
            series : [
                {
                    name: this.props.title,
                    type: 'pie',
                    radius : ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
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

export default PieChart;

import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';

class Chart extends React.PureComponent {
    displayName = 'Chart';
    static defaultProps = {
        height: 253,
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
            series : [
                {
                    name:'xx',
                    type:'gauge',
                    center : ['50%', '50%'],    // 默认全局居中
                    axisLine: {            // 坐标轴线
                        show: true,        // 默认显示，属性show控制显示与否
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.85, '#4293FE'], [1, '#EEF0F4']], 
                            width: 20
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    pointer: {
                        width: 3
                    },
                    axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                        show: true,
                        formatter (v) {
                            switch (`${v}`) {
                                case '30': return '差';
                                case '50': return '中';
                                case '70': return '良';
                                case '90': return '优';
                                default: return '';
                            }
                        },
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#333'
                        }
                    },
                    title : {
                        show : true,
                        offsetCenter: [0, '65%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            color: '#333',
                            fontSize : 15
                        }
                    },
                    data:[{value: 85, name: '仪表盘'}]
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
                lazyUpdate={true}
                style={{height: this.props.height}}
            />
        );
    }
}

export default Chart;

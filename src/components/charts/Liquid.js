import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts-liquidfill';

class Chart extends React.PureComponent {
    displayName = 'Chart';
    static defaultProps = {
        height: 200,
        border: 0,
        areaColor: '#975FE4',
        borderColor: '#1890FF'
    };

    getInstance () {
        return this.chart.getEchartsInstance();
    }

    getLoadOption () {
        return {
            grid:{
                top: 0,
                bottom: 0
            },
            color: ['#4293FE'],
            series: [{
                type: 'liquidFill',
                radius: '92%',
                outline: {
                    itemStyle: {
                        borderColor: '#4293FE'
                    }
                },
                backgroundStyle: {
                    borderWidth: 0,
                    color: 'transparent'
                },
                data: [{
                    value: this.props.value,
                    itemStyle: {
                        normal: {
                            color: '#4293FE'
                        }
                    }
                }]
            }]
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

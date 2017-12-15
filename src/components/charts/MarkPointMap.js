import React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import ChinaData from './data/china';

echarts.registerMap('china', ChinaData);

class MarkPointMap extends React.PureComponent {
    displayName = 'MarkPointMap';

    static defaultProps = {
        height: 450,
        color: '#57AFFF'
    };

    getInstance () {
        return this.chart.getEchartsInstance();
    }

    getLoadOption () {
        const option = {
            tooltip: {},
            visualMap: {
                min: 0,
                max: 1500,
                left: 'left',
                top: 'bottom',
                text: ['High','Low'],
                seriesIndex: [0],
                inRange: {
                    color: ['#e0ffff', '#006edd']
                },
                calculable : true
            },
            geo: {
                map: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                itemStyle: {
                    normal:{
                        borderColor: '#58B7FF'
                    },
                    emphasis:{
                        areaColor: null,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            series : [
                // {
                //     type: 'scatter',
                //     coordinateSystem: 'geo',
                //     data: convertData(data),
                //     symbolSize: 20
                // },
                {
                    name: '销售额',
                    type: 'map',
                    geoIndex: 0,
                    data: this.props.data
                }
            ]
        };

        return option;
    }

    
    render () {
        return (
            <ReactEcharts
                ref={(e) => { this.chart = e; }}
                option={this.getLoadOption()}
                lazyUpdate={true}
                notMerge={false}
                style={{height: this.props.height}}
            />
        );
    }
}
export default MarkPointMap;

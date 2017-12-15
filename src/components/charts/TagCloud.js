import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts-wordcloud';

class Chart extends React.Component {
    displayName = 'Chart';
    static defaultProps = {
        height: 200,
        border: 0,
        areaColor: '#975FE4',
        borderColor: '#1890FF'
    };

    constructor (props) {
        super(props);

        const option = this.getLoadOption();
        this.state = {
            option
        };
    }

    getInstance () {
        return this.chart.getEchartsInstance();
    }

    shouldComponentUpdate () {
        return false;
    }

    getLoadOption () {
        return {
            series: [{
                type: 'wordCloud',
                gridSize: 2,
                sizeRange: [8, 20],
                rotationRange: [-90, 90],
                shape: 'circle',
                width: 259,
                height: 150,
                drawOutOfBound: false,
                textStyle: {
                    normal: {
                        color () {
                            return `rgb(${[
                                Math.round(Math.random() * 250),
                                Math.round(Math.random() * 250),
                                Math.round(Math.random() * 250)
                            ].join(',')})`;
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#eee'
                    }
                },
                data: this.props.data
            }]
        };
    }
    
    render () {
        return (
            <ReactEchartsCore
                key='chart'
                echarts={echarts}
                ref={(e) => { this.chart = e; }}
                option={this.state.option}
                lazyUpdate={true}
                style={{height: this.props.height}}
            />
        );
    }
}

export default Chart;

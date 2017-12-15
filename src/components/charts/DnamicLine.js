import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

class DnamicLine extends React.PureComponent {
    displayName = 'DnamicLine';
    static defaultProps = {
        height: 80,
        border: 1,
        areaColor: '#975FE4',
        borderColor: '#1890FF'
    };

    // constructor (props) {
    //     super(props);

    //     const option = this.getLoadOption();
    //     this.state = {
    //         option
    //     };
    // }

    getInstance () {
        return this.chart.getEchartsInstance();
    }

    componentWillReceiveProps (nextProps) {
        this.chart.setOption({
            series: [{
                data: nextProps.y
            }]
        });
    }

    componentDidMount () {
        const chart = echarts.init(this.node);
        chart.setOption(this.getLoadOption());
        this.chart = chart;
    }

    saveChartRef = (ref) => {
        this.node = ref;
    }

    getLoadOption () {
        return {
            tooltip : {
                trigger: 'axis'
            },
            grid: {
                left: 0,
                right: 0,
                top: 5,
                bottom: 20
            },
            xAxis : [
                {
                    type : 'time',
                    splitLine: {
                        show: false
                    },
                    axisPointer: {
                        lineStyle: {
                            width: 0
                        }
                    }
                }
            ],
            calculate: true,
            yAxis : [
                {
                    show: false,
                    type : 'value',
                    splitLine: {
                        show: false
                    }
                }
            ],
            series : [
                {
                    name:'',
                    type:'line',
                    smooth: true,
                    showSymbol: false,
                    hoverAnimation: false,
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
                    markLine: {
                        data: [{
                            name: '标线',
                            type: 'average'
                        }]
                    },
                    data: this.props.y
                }
            ]
        };
    }
    
    render () {
        return (
            // <ReactEchartsCore
            //     echarts={echarts}
            //     ref={(e) => { this.chart = e; }}
            //     option={this.getLoadOption()}
            //     lazyUpdate={true}
            //     style={{height: this.props.height}}
            // />
            <div ref={this.saveChartRef} style={{height: this.props.height}}></div>
        );
    }
}

export default DnamicLine;

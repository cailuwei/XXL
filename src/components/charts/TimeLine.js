import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class TimeLine extends React.Component {
    displayName = 'TimeLine';

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
                text: this.props.title || '',
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
                    data : this.props.x
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    boundaryGap: [0, '100%']
                }
            ],
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series : [
                {
                    name:'',
                    type:'line',
                    showSymbol: false,
                    smooth:true,
                    symbol: 'none',
                    sampling: 'average',
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

export default TimeLine;

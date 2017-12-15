import React from 'react';
import moment from 'moment';
import Card from 'r-cmui/components/Card';
import Select from 'r-cmui/components/Select';
import DateRange from 'r-cmui/components/DateRange';
import RadioGroup from 'r-cmui/components/RadioGroup';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import './style.less';
import fetch from 'r-cmui/components/utils/fetch';
import { inject, observer } from 'mobx-react';

@inject('monitor')
@observer
class Profile extends React.Component {
    displayName = 'Profile';

    constructor (props) {
        super(props);

        this.currentProvince = null;
        this.provinces = [
            {id: '000', text: '全国'},
            {id: '210', text: '上海'},
            {id: '571', text: '浙江'},
            {id: '791', text: '江西'},
            {id: '471', text: '内蒙古'},
            {id: '280', text: '四川'},
            {id: '531', text: '山东'},
            {id: '371', text: '河南'},
            {id: '731', text: '湖南'},
            {id: '250', text: '江苏'},
            {id: '100', text: '北京'},
            {id: '551', text: '安徽'},
            {id: '220', text: '天津'},
            {id: '230', text: '重庆'},
            {id: '311', text: '河北'},
            {id: '351', text: '山西'},
            {id: '240', text: '辽宁'},
            {id: '431', text: '吉林'},
            {id: '451', text: '黑龙江'},
            {id: '591', text: '福建'},
            {id: '270', text: '湖北'},
            {id: '200', text: '广东'},
            {id: '771', text: '广西'},
            {id: '898', text: '海南'},
            {id: '851', text: '贵州'},
            {id: '871', text: '云南'},
            {id: '891', text: '西藏'},
            {id: '290', text: '陕西'},
            {id: '931', text: '甘肃'},
            {id: '971', text: '青海'},
            {id: '951', text: '宁夏'},
            {id: '991', text: '新疆'}
        ];
    }

    selectProvince = (value, selectedItem) => {
        const ids = value.split(',');
        const {profile} = this.props.monitor;
        if (selectedItem.text !== '全国') {
            const index = ids.indexOf('000');
            if (index > -1) {
                ids.splice(index, 1);
                value = ids.join(',');
                this.refs.provinceSelect.setValue(value);
            }
        } else {
            value = selectedItem.id;
            this.refs.provinceSelect.setValue(value);
        }
        profile.setProvinceParam(value);
    }

    dateRangeChange = () => {
        window.setTimeout(() => {
            this.filterUnits();
        }, 0);
    }

    selectDate = (value) => {
        const today = moment();
        const end = moment();
        const start = today.add(parseInt(value, 10), 'days');
        const range = `${start.format('YYYY-MM-DD')}~${end.format('YYYY-MM-DD')}`;

        this.refs.daterange.setValue(range);
        window.setTimeout(() => {
            this.filterUnits();
        }, 0);
    }

    /**
     * 时间粒度修改  完成后重新渲染统计图
     * @return {[type]} [description]
     */
    filterUnits () {
        const range = this.refs.daterange.getValue();
        const start = moment(range[0]);
        const end = moment(range[1]);
        end.set('hour', 0);end.set('minute', 0);end.set('second', 0);end.set('millisecond', 0);
        start.set('hour', 0);start.set('minute', 0);start.set('second', 0);start.set('millisecond', 0);
        const days = end.diff(start, 'days');

        const timeUnit = this.refs.unit;
        const unit = timeUnit.getValue();
        if (days <= 1) {
            timeUnit.enableItemByValue('minute');
            timeUnit.enableItemByValue('hour');
            timeUnit.disableItemByValue('day');
            if (unit === 'day') {
                timeUnit.setValue('minute');
            }
        }
        if (days > 1) {
            timeUnit.disableItemByValue('minute');
            timeUnit.disableItemByValue('hour');
            timeUnit.enableItemByValue('day');
            if (unit !== 'day') {
                timeUnit.setValue('day');
            }
        }
        const {profile} = this.props.monitor;
        profile.setDateRangeAndUnitParam(range, unit);

        this.renderCharts();
    }

    renderTitle () {
        const today = moment().format('YYYY-MM-DD');
        const value = `${today}~${today}`;
        const rangeData = [
            {id: '0', text: '今天'},
            {id: '-1', text: '昨天'},
            {id: '-7', text: '过去一周'},
            {id: '-30', text: '过去一个月'}
        ];
        const {profile} = this.props.monitor;
        return (
            <div>
                {
                    this.currentProvince ? <span>省份：{this.currentProvince.text}</span>
                        : <Select onHide={this.onProvinceChange} ref='provinceSelect' data={profile.getProvinces()} value='000' multi onChange={this.selectProvince}></Select>
                }
                <span ref='promote' style={{display: 'none', fontSize: 12}} className='ml-10 error-tip'>最多可同时选择5项查看对比数据</span>
                <div className='pull-right'>
                    <DateRange ref='daterange' onChange={this.dateRangeChange} value={value} endDate={today} style={{lineHeight: 'initial'}} className='mr-15'></DateRange>
                    <Select ref='rangeSelect'
                        value='0'
                        data={rangeData}
                        style={{width: 90}}
                        grid={1}
                        minWidth={90}
                        onChange={this.selectDate}
                    ></Select>
                    <RadioGroup ref='unit' className='ml-15' stick value='minute' data={[{id: 'minute', text: '分钟'},{id: 'hour', text: '小时'},{id: 'day', text: '天'}]}></RadioGroup>
                </div>
            </div>
        );
    }

    /**
     * 当前的省份id
     * @return {[type]} [description]
     */
    getSelectedProvinces () {
        const select = this.refs.provinceSelect;
        if (this.currentProvince) {
            return this.currentProvince.id;
        }
        if (select) {
            return select.getValue();
        }
    }

    /**
     * 完成后渲染图表
     * @return {[type]} [description]
     */
    componentDidMount () {
        const timeUnit = this.refs.unit;
        timeUnit.disableItemByValue('day');

        this.renderCharts();
        // this.renderStatusChart();
    }

    renderCharts () {
        this.renderLoadChart();
        this.renderServerChart();
    }

    async renderLoadChart () {
        // const option = await this.getLoadOption();
        // if (this.loadChart) {
        //     this.loadChart.getEchartsInstance().setOption(option);
        // }
        const {profile} = this.props.monitor;
        profile.getLoadChartData();
    }

    async renderServerChart () {
        
        // const option = await this.getServerOption();
        // if (this.serverChart) {
        //     this.serverChart.getEchartsInstance().setOption(option);
        // }
    }

    async getLoadOption () {
        const range = this.refs.daterange.getValue();
        const timeUnit = this.refs.unit;
        const unit = timeUnit.getValue();
        const map = {
            'minute': '5m', 'hour': '1h', 'day': '1d'
        };

        const data = await fetch('http://192.168.105.202:8415/mock/cdn-ops/summary/info/load', {
            flag: false,
            type: 0,
            startTime: `${range[0]} 00:00:00`,
            endTime: `${range[1]} 23:59:59`,
            sampleType: map[unit],
            provinceCodes: this.getSelectedProvinces()
        });

        return this.getLineChartOption(data);
    }

    async getServerOption () {
        const option = {
            tooltip : {
                trigger: 'item',
                formatter: '{b} : {c}%'
            },
            color: ['#488DCC','#FF9900','#A5A5A5'],
            legend: {
                y : 'bottom',
                data: ['正常', '异常', '停用'],
                itemWidth: 15,
                itemHeight: 10
            },
            series : [
                {
                    name:'服务器状态',
                    type:'pie',
                    center: ['55%', '50%'],
                    radius : '55%',
                    data: [{name: '正常', value: 64},{name: '异常', value: 32},{name: '停用', value: 4}],
                    itemStyle: {
                        normal: {
                            label : {
                                show: false
                            },
                            labelLine: {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : false
                            }
                        }
                    }
                }
            ]
        };

        return option;
    }

    getLineChartOption (data) {
        const timeUnit = this.refs.unit;
        const unit = timeUnit.getValue();
        const y = [];
        const x = [];
        const legends = [];
        let hasx = false;
        data.forEach((item) => {
            const series = {};
            y.push(series);
            series.name = item.province;
            series.value = [];
            legends.push(series.name);
            for (const metric in item.data) {
                const metricData = item.data[metric];
                for (const time in metricData) {
                    if (!hasx) {
                        x.push(this.formatTime(time, unit));
                    }
                    series.value.push(metricData[time]);
                }
            }
            hasx = true;
        });

        const newData = y.map((item) => {
            return {
                name: item.name,
                type:'line',
                showSymbol: false,
                hoverAnimation: false,
                data: item.value
            };
        });
        const option = {
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                show: true,
                y: 'bottom',
                data: legends,
                textStyle: {
                    fontSize: 10
                },
                itemWidth: 15,
                itemHeight: 10
            },
            grid: {
                top: 20
            },
            xAxis : {
                type : 'category',
                data : x,
                boundaryGap: true,
                splitLine: {
                    show: false
                }
            },
            yAxis : {
                type: 'value',
                splitLine: {
                    show: false
                }
            },
            series : newData
        };

        return option;
    }
    
    render () {
        const title = this.renderTitle();
        const {profile} = this.props.monitor;
        return (
            <Card title={title} className='customCardTitle'>
                <Row>
                    <Col grid={0.25} className='ph-8'>
                        <Card className='text-center'>
                            <div className='big-font text-blue'>111</div>
                            <div>节点总数</div>
                        </Card>
                    </Col>
                    <Col grid={0.25} className='ph-8'>
                        <Card className='text-center'>
                            <div className='big-font text-success'>10</div>
                            <div>主机总数</div>
                        </Card>
                    </Col>
                    <Col grid={0.25} className='ph-8'>
                        <Card className='text-center'>
                            <div className='big-font text-warning'>50</div>
                            <div>告警数</div>
                        </Card>
                    </Col>
                    <Col grid={0.25} className='ph-8'>
                        <Card className='text-center'>
                            <div className='big-font text-danger'>25</div>
                            <div>未处理告警数</div>
                        </Card>
                    </Col>
                </Row>

                <Row className='mt-30'>
                    <Col grid={0.5}>
                        <Card title='主机负载率' bodyStyle={{padding: 0}}>
                            <ReactEchartsCore
                                echarts={echarts}
                                ref={(e) => { this.loadChart = e; }}
                                option={profile.getLoadOption()}
                                notMerge={true}
                                lazyUpdate={true}/>
                        </Card>
                    </Col>
                    <Col grid={0.25}>
                        <Card title='主机状态' bodyStyle={{padding: 0}}>
                            <ReactEchartsCore
                                echarts={echarts}
                                ref={(e) => { this.serverChart = e; }}
                                option={{}}
                                notMerge={true}
                                lazyUpdate={true}/>
                        </Card>
                    </Col>
                    <Col grid={0.25}>
                        <Card title='节点状态'>
                        </Card>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Profile;

import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import moment from 'moment';

useStrict(true);

export default class Profile {
    @observable searchParams = {
        flag: false,
        type: 0,
        unit: 'minute'
    };

    @observable loadOption = {};

    async getLoadChartData () {
        const data = await fetch('http://172.18.34.66:8415/mock/cdn-ops/summary/info/load', toJS(this.searchParams));

        const unit = this.searchParams.unit;
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

        this.setLoadOption(option);
    }

    @action
    setLoadOption (option) {
        this.loadOption = option;
    }

    getLoadOption () {
        return toJS(this.loadOption);
    }

    formatTime (time, type) {
        if (type === 'minute') {
            return moment(time).format('HH:mm');
        }
        if (type === 'hour') {
            return moment(time).format('HH:00');
        }
        if (type === 'day') {
            return moment(time).format('YYYY-MM-DD');
        }
    }

    getProvinces () {
        return [
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

    @action
    setProvinceParam (provinces) {
        this.searchParams.provinceCodes = provinces;
    }

    @action
    setDateRangeAndUnitParam (range, unit) {
        this.searchParams.startTime = range[0];
        this.searchParams.endTime = range[1];
        this.searchParams.unit = unit;
    }
}

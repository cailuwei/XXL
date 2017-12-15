import {useStrict, observable, action, toJS} from 'mobx';
// import fetch from 'r-cmui/components/utils/fetch';
import moment from 'moment';

useStrict(true);

export default class Analysis {
    @observable chartData1 = {
        x: null,
        y: [120, 132, 101, 134, 90, 230, 210]
    };

    @observable saleData = {
        x: [],
        y: []
    };

    @observable salePieData = {
        legends: [],
        y: []
    };

    @observable shops = [];

    @observable timelineData = {
        x: [],
        y: []
    };

    constructor () {
        for (let i = 0; i < 8; i++) {
            this.shops.push({
                title: `门店${i}`,
                value: 90 - i * 10,
                key: `shop${i}`
            });
        }

        this.updateTimelineData();
    }
    
    salePieDataMap = {
        'all': {
            legends: ['家用电器','食用酒水','个护健康','服饰箱包','母婴产品','其他'],
            y: [
                {name: '家用电器',value: 4544},
                {name: '食用酒水',value: 3321},
                {name: '个护健康',value: 3113},
                {name: '服饰箱包',value: 2341},
                {name: '母婴产品',value: 1231},
                {name: '其他',value: 1231}
            ]
        },
        'online': {
            legends: ['家用电器','食用酒水','个护健康','服饰箱包','母婴产品','其他'],
            y: [
                {name: '家用电器',value: 244},
                {name: '食用酒水',value: 321},
                {name: '个护健康',value: 311},
                {name: '服饰箱包',value: 41},
                {name: '母婴产品',value: 121},
                {name: '其他',value: 111}
            ]
        },
        'offline': {
            legends: ['家用电器','食用酒水','个护健康','服饰箱包','母婴产品','其他'],
            y: [
                {name: '家用电器',value: 99},
                {name: '个护健康',value: 344},
                {name: '服饰箱包',value: 255},
                {name: '母婴产品',value: 1231},
                {name: '其他',value: 65}
            ]
        }
    }

    @action
    updateTimelineData () {
        let base = +new Date(1968, 9, 3);
        const oneDay = 24 * 3600 * 1000;
        const date = [];
        
        const data = [Math.random() * 300];
        for (let i = 1; i < 20000; i++) {
            const now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }
        this.timelineData.x = date;
        this.timelineData.y = data;
    }

    @action
    getChartsData () {
        const now = moment();
        const x = [];
        for (let i = 0; i < 7; i++) {
            x.push(now.add(1, 'days').format('YYYY-MM-DD'));
        }

        this.chartData1.x = x;
    }

    @action
    initSaleData () {
        const sx = []; const sy = [];
        for (let i = 0; i < 12; i++) {
            sx.push(`${i + 1}月`);
            sy.push(Math.round(Math.random() * 1000));
        }

        this.saleData.x = sx;
        this.saleData.y = sy;
    }

    @action
    updateSalesPieData (type) {
        this.salePieData = this.salePieDataMap[type];
    }

    getSalePieData () {
        return toJS(this.salePieData);
    }

    getChartData1 () {
        return toJS(this.chartData1);
    }

    getSaleData () {
        return toJS(this.saleData);
    }

    getShops () {
        return toJS(this.shops);
    }

    getTimelineData () {
        return toJS(this.timelineData);
    }
}

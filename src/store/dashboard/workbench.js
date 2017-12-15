import {useStrict, observable, action, toJS} from 'mobx';

import Mock from 'mockjs';

import iconReact from '../../images/icon-react.png';
import iconAngular from '../../images/icon-angular.png';
import iconVue from '../../images/icon-vue.png';
import iconBootstrap from '../../images/icon-bootstrap.png';
import iconWebpack from '../../images/icon-webpack.png';
import iconGithub from '../../images/icon-github.png';

useStrict(true);

export default class Workbench {
    @observable userInfo = {
        userName: '丽丽安',
        station: '前端开发',
        department: '中移杭研－某某某研发中心－某某平台部－某某技术部－前端开发工程师',
        projectNum: 22,
        rank: 8,
        members: 24,
        visit: 1234
    };

    @observable projects = [{
        name: 'React',
        icon: iconReact,
        desc: '生命就像一盒巧克力，结果往往出人意料',
        group: '项目组1',
        updateTime: '4分钟前'
    },{
        name: 'Angular',
        icon: iconAngular,
        desc: '那是一种内在的东西， 他们到达不了，也无法触及的',
        group: '项目组2',
        updateTime: '1小时前'
    },{
        name: 'Vue',
        icon: iconVue,
        desc: '简单小巧的核心，渐进式技术栈，足以应付任何规模的应用。',
        group: '项目组3',
        updateTime: '1.5小时前'
    },{
        name: 'Bootstrap',
        icon: iconBootstrap,
        desc: 'Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目',
        group: '项目组4',
        updateTime: '1个月前'
    },{
        name: 'webpack',
        icon: iconWebpack,
        desc: '春种一粒粟，秋收万颗子。四海无闲田，农夫犹饿死。锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。',
        group: '项目组5',
        updateTime: '2个月前'
    },{
        name: 'Github',
        icon: iconGithub,
        desc: 'Github是一个面向开源及私有软件项目的托管平台。',
        group: '项目组6',
        updateTime: '3个月前'
    }];

    @observable trends = [
        {
            icon: iconReact,
            name: Mock.Random.cname(),
            project: 'react',
            op: '创建目录 dashboard',
            updateTime: `${Mock.Random.integer(1,20)}小时前`
        },
        {
            icon: iconAngular,
            name: Mock.Random.cname(),
            project: 'angular',
            op: '创建组件 Table',
            updateTime: `${Mock.Random.integer(1,20)}小时前`
        },
        {
            icon: iconVue,
            name: Mock.Random.cname(),
            project: 'vue',
            op: '创建组件 Table',
            updateTime: `${Mock.Random.integer(1,20)}小时前`
        },
        {
            icon: iconBootstrap,
            name: Mock.Random.cname(),
            project: 'bootstrap',
            op: '创建组件 Table',
            updateTime: `${Mock.Random.integer(1,20)}小时前`
        },
        {
            icon: iconWebpack,
            name: Mock.Random.cname(),
            project: 'webpack',
            op: '创建项目 r-cmui',
            updateTime: `${Mock.Random.integer(1,20)}小时前`
        },
        {
            icon: iconGithub,
            name: Mock.Random.cname(),
            project: 'github',
            op: '创建项目 r-cmui',
            updateTime: `${Mock.Random.integer(1,20)}小时前`
        }
    ];

    @observable radar = {
        indicators: ['引用','热度','贡献','产量','口碑'],
        data: {
            '个人': [10,7,5,4,8],
            '团队': [3,1,3,6,9],
            '部门': [4,7,5,6,1]
        }
    };

    @observable teams = [
        {
            icon: iconReact,
            name: 'React 小组'
        },
        {
            icon: iconAngular,
            name: '末日小组'
        },
        {
            icon: iconVue,
            name: '极限挑战'
        },
        {
            icon: iconBootstrap,
            name: '完美小组'
        },
        {
            icon: iconWebpack,
            name: '威朗小组'
        }
    ]

    getRadar () {
        return toJS(this.radar);
    }
}

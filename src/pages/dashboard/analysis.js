import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Progress from 'r-cmui/components/Progress';
import Tab from 'r-cmui/components/Tab';
import Menu from 'r-cmui/components/Menu';
import Dropdown from 'r-cmui/components/Dropdown';
import ChartCard from '../../components/ChartCard';
import NumberInfo from '../../components/NumberInfo';
import MinArea from '../../components/charts/MinArea';
import MinBar from '../../components/charts/MinBar';
import Bar from '../../components/charts/Bar';
import Pie from '../../components/charts/Pie';
import Trend from '../../components/Trend';
import DateRangeTool from '../../components/DateRangeTool';
import TimeLine from '../../components/charts/TimeLine';
import SimpleListPage from 'r-cmui/components/Business/SimpleListPage';
import RadioGroup from 'r-cmui/components/RadioGroup';
import './dashboard.less';

import { inject, observer } from 'mobx-react';
// import { Button } from '../../r-cmui/index';

@inject('dashboard')
@observer
class Analysis extends React.Component {
    displayName = 'Analysis';

    bars = [];

    chartData2 = {
        x: ['2017-11-03','2017-11-04','2017-11-05','2017-11-06','2017-11-07','2017-11-08','2017-11-09'],
        y: [1,6,4,8,3,7,2]
    };

    salesType = [
        {id: 'all', text: '全部渠道'},
        {id: 'online', text: '线上'},
        {id: 'offline', text: '门店'}
    ];

    renderCardMenu () {
        return <Menu>
            <Menu.Item>操作一</Menu.Item>
            <Menu.Item>操作二</Menu.Item>
        </Menu>;
    }

    renderRank () {
        const data = [];
        for (let i = 0; i < 10; i++) {
            data.push({name: '北京', total: Math.round(Math.random() * 100000)});
        }

        return data.map((item, index) => {
            return <li key={index}><span className='mr-20'>{index + 1}</span><span>{item.name}</span><span className='pull-right'>{item.total}</span></li>;
        });
    }

    updateSalesPie = (value) => {
        const {analysis} = this.props.dashboard;
        analysis.updateSalesPieData(value);
    }

    updateTimeline = () => {
        const {analysis} = this.props.dashboard;
        analysis.updateTimelineData();
    }

    componentWillMount () {
        const {analysis} = this.props.dashboard;
        analysis.getChartsData();
        analysis.initSaleData();
        analysis.updateSalesPieData('all');
    }

    render () {
        const {analysis} = this.props.dashboard;
        const chartData1 = analysis.getChartData1();
        const saleData = analysis.getSaleData();
        const salePieData = analysis.getSalePieData();
        const shops = analysis.getShops();
        const timelineData = analysis.getTimelineData();
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>分析页</Breadcrumb.Item>
                </Breadcrumb>

                <Row className='card-row mt-30'>
                    <Col className='card-col' grid={0.25}>
                        <ChartCard 
                            title='总销售额'
                            total={'¥ 126,560'}
                            footer={<span><span>日均销售额</span><span className='ml-10'>￥12,423</span></span>}
                        >
                            <Trend flag='up' style={{marginRight: 16}}>
                                周同比<span className='ml-5'>12%</span>
                            </Trend>
                            <Trend flag='down'>
                                日环比<span className='ml-5'>11%</span>
                            </Trend>
                        </ChartCard>
                    </Col>
                    <Col className='card-col' grid={0.25}>
                        <ChartCard 
                            title='访问量'
                            total={'8,846'}
                            footer={<span><span>日访问量</span><span className='ml-10'>1,234</span></span>}
                        >
                            <MinArea x={chartData1.x} y={chartData1.y}/>
                        </ChartCard>
                    </Col>
                    <Col className='card-col' grid={0.25}>
                        <ChartCard 
                            title='支付笔数'
                            total={'6,560'}
                            footer={<span><span>转化率</span><span className='ml-10'>60%</span></span>}
                        >
                            <MinBar x={chartData1.x} y={chartData1.y}/>
                        </ChartCard>
                    </Col>
                    <Col className='card-col' grid={0.25}>
                        <ChartCard 
                            title='运营活动效果'
                            total={'78%'}
                            footer={<span>
                                <Trend flag='up' style={{marginRight: 16}}>
                                周同比<span className='ml-5'>12%</span>
                                </Trend>
                                <Trend flag='down'>
                                日环比<span className='ml-5'>11%</span>
                                </Trend>
                            </span>}
                        >
                            <Progress value={78} showPercent={false} strokeWidth={5} />
                        </ChartCard>
                    </Col>
                </Row>

                <Card className='mt-30' 
                    order={false}
                >
                    <Tab ref='tab' className='card-tab' tools={<DateRangeTool key='card-tool'/>}>
                        <Tab.Item title='销售额' key='sales'>
                            <Row>
                                <Col grid={0.75}>
                                    <Bar ref={(ref) => { this.bars.push(ref) ; }} title='销售额趋势' 
                                        x={saleData.x} y={saleData.y}
                                    />
                                </Col>
                                <Col grid={0.25}>
                                    <div className='rank-wrap'>
                                        <div className='rank-title'>销售额排名</div>
                                        <ul className='rank-list'>
                                            {this.renderRank()}
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Tab.Item>
                        <Tab.Item title='访问量' key='visit'>
                            <Row>
                                <Col grid={0.75}>
                                    <Bar ref={(ref) => { this.bars.push(ref) ; }} title='访问量趋势' x={saleData.x} y={saleData.y}/>
                                </Col>
                                <Col grid={0.25}>
                                    <div className='rank-wrap'>
                                        <div className='rank-title'>访问量排名</div>
                                        <ul className='rank-list'>
                                            {this.renderRank()}
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Tab.Item>
                    </Tab>
                </Card>

                <Row className='mt-30 card-row'>
                    <Col grid={.5} className='card-col'>
                        <Card title='线上热门搜索'
                            bodyStyle={{padding: '10px 24px'}}
                            tools={[
                                <Dropdown key='tools' overlay={this.renderCardMenu()} align='bottomRight' action='click'>
                                    <span className='cursor-pointer'>...</span>
                                </Dropdown>
                            ]}>
                            <Row>
                                <Col grid={.5}>
                                    <NumberInfo 
                                        tip='指标文案'
                                        title='搜索用户数'
                                        total={<div>12,321<Trend flag='up' style={{marginLeft: 16, fontSize: 13}}>
                                            17.1
                                        </Trend></div>}
                                        className='no-animation'
                                    >
                                        <MinArea areaColor='#D0E9FF' border={2} x={this.chartData2.x} y={this.chartData2.y}/>
                                    </NumberInfo>
                                </Col>
                                <Col grid={.5}>
                                    <NumberInfo 
                                        title='人均搜索次数'
                                        total={<span>2.7<Trend flag='down' style={{marginLeft: 16, fontSize: 13}}>
                                    26.2
                                        </Trend></span>}
                                        className='no-animation'
                                    >
                                        <MinArea areaColor='#D0E9FF' border={2} x={this.chartData2.x} y={this.chartData2.y}/>
                                    </NumberInfo>
                                </Col>
                            </Row>
                            <SimpleListPage pagination displayInfo={false} pageSize={5} columns={[
                                {name: 'rank', text: '排名'},
                                {name: 'keyworld', text: '搜索关键词'},
                                {name: 'userCount', text: '用户数', sort: true},
                                {name: 'weekUp', text: '周涨幅', sort: true, format: (value, column, row) => {
                                    return <Trend flag={row.flag}>{`${value}%`}</Trend>;
                                }}
                            ]}
                            action='http://localhost:1204/dashboard/analysis/rank'
                            ></SimpleListPage>
                        </Card>
                    </Col>
                    <Col grid={.5} className='card-col'>
                        <Card title='销售额类别占比' tools={[
                            <Dropdown key='tools' overlay={this.renderCardMenu()} align='bottomRight' action='click'>
                                <span className='cursor-pointer'>...</span>
                            </Dropdown>
                        ]}>
                            <RadioGroup stick value='all' data={this.salesType} onChange={this.updateSalesPie}></RadioGroup>
                            <div className='mt-30'>
                                <Pie title='销售额' height={347} legends={salePieData.legends} y={salePieData.y}/>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Card className='mt-30'>
                    <Tab onSelect={this.updateTimeline}>
                        {shops.map(shop => <Tab.Item title={<div>
                            <div>{shop.title}</div>
                            <span className='mr-5'>转化率</span>
                            <Progress value={shop.value} type='circle' radius={30} />
                        </div>} key={shop.key}></Tab.Item>)}
                    </Tab>
                    
                    <TimeLine x={timelineData.x} y={timelineData.y}/>
                </Card>
            </div>
        );
    }
}

export default Analysis;

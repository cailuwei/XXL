import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Progress from 'r-cmui/components/Progress';

import MarkPointMap from '../../components/charts/MarkPointMap';
import DnamicLine from '../../components/charts/DnamicLine';
import Gauge from '../../components/charts/Gauge';
import Liquid from '../../components/charts/Liquid';
import TagCloud from '../../components/charts/TagCloud';
import './dashboard.less';

import { inject, observer } from 'mobx-react';

@inject('dashboard')
@observer
class Monitor extends React.Component {
    displayName = 'Monitor';

    render () {
        const {monitor} = this.props.dashboard;
        const evaluationData = monitor.getEvaluationData();
        const mapData = monitor.getMapData();
        const cloudData = monitor.getCloudData();
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>监控页</Breadcrumb.Item>
                </Breadcrumb>

                <Row className='mt-30' gutter={15}>
                    <Col grid={3 / 4}>
                        <Card title='活动实时交易情况'>
                            <Row gutter={15}>
                                <Col grid={.25}>
                                    <div className='text-promote'>今日交易总额</div>
                                    <div className='number-font mt-5'>124,543,233元</div>
                                </Col>
                                <Col grid={.25}>
                                    <div className='text-promote'>销售目标完成率</div>
                                    <div className='number-font mt-5'>90%</div>
                                </Col>
                                <Col grid={.25}>
                                    <div className='text-promote'>活动剩余时间</div>
                                    <div className='number-font mt-5'>01:00:00</div>
                                </Col>
                                <Col grid={.25}>
                                    <div className='text-promote'>每秒交易总额</div>
                                    <div className='number-font mt-5'>200元</div>
                                </Col>
                            </Row>
                            <MarkPointMap data={mapData}></MarkPointMap>
                        </Card>
                    </Col>
                    <Col grid={1 / 4}>
                        <Card title='活动情况预测'>
                            <div className='text-promote'>目标评估</div>
                            <div className='mt-10 font-16 mb-5'>有望达到预期</div>
                            <DnamicLine y={evaluationData}/>
                        </Card>

                        <Card title='券核效率' className='mt-10'>
                            <Gauge />
                        </Card>
                    </Col>
                </Row>

                <Row className='mt-20' gutter={15}>
                    <Col grid={.5}>
                        <Card title='各品类占比' bodyStyle={{padding: '66px 24px'}}>
                            <Row className='text-center'>
                                <Col grid={1 / 3}>
                                    <Progress value={28} strokeWidth={15} radius={45} type='circle' format={(percent) => { 
                                        return <div><div style={{fontSize: 14}}>中式快餐</div><div style={{fontSize: 20, marginTop: 6}}>{`${percent}%`}</div></div>; 
                                    }}/>
                                </Col>
                                <Col grid={1 / 3}>
                                    <Progress value={22} theme='warning' strokeWidth={15} radius={45} type='circle' format={(percent) => { 
                                        return <div><div style={{fontSize: 14}}>西餐</div><div style={{fontSize: 20, marginTop: 6}}>{`${percent}%`}</div></div>; 
                                    }}/>
                                </Col>
                                <Col grid={1 / 3}>
                                    <Progress value={32} theme='success' strokeWidth={15} radius={45} type='circle' format={(percent) => { 
                                        return <div><div style={{fontSize: 14}}>火锅</div><div style={{fontSize: 20, marginTop: 6}}>{`${percent}%`}</div></div>; 
                                    }}/>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col grid={.25}>
                        <Card title='热门搜索'>
                            <TagCloud data={cloudData}/>
                        </Card>
                    </Col>
                    <Col grid={.25}>
                        <Card title='剩余资源'>
                            <Liquid value={0.6}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Monitor;

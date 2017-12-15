import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Radar from '../../components/charts/Radar';
import Styles from './styles';
import './dashboard.less';
import avatar from '../../images/avatar.png';

import { inject, observer } from 'mobx-react';

@inject('dashboard')
@observer
class Workbench extends React.Component {
    displayName = 'Workbench';

    renderProjects () {
        const {workbench} = this.props.dashboard;
        let {projects} = workbench;
        projects = projects.slice();
        return projects.map((project, index) => {
            return (
                <Col key={index} grid={1 / 3}>
                    <Card border={false} title={
                        <span><i className='mr-10 project-icon'><img src={project.icon}/></i><span>{project.name}</span></span>
                    }>
                        <div className='text-promote'>
                            <div>{project.desc}</div>
                            <div className='mt-5'>
                                <span>{project.group}</span>
                                <span className='pull-right'>{project.updateTime}</span>
                            </div>
                        </div>
                    </Card>
                </Col>
            );
        });
    }

    renderTrends () {
        const {workbench} = this.props.dashboard;
        let {trends} = workbench;
        trends = trends.slice();

        return trends.map((trend, index) => {
            return (
                <li key={index}>
                    <i className='mr-10 trends-icon'><img src={trend.icon}/></i>
                    <div>
                        <div>
                            <span>{trend.name}</span> 在 <span className='text-link'>{trend.project}</span> {trend.op}
                        </div>
                        <div>
                            <span className='text-promote'>{trend.updateTime}</span>
                        </div>
                    </div>
                </li>
            );
        });
    }

    renderTeams (teams) {
        return teams.map((team, index) => {
            return <Col grid={.5} key={index}>
                <span className='tram-icon'><img src={team.icon} alt=''/></span>
                <span>{team.name}</span>
            </Col>;
        });
    }

    render () {
        const {workbench} = this.props.dashboard;
        let {userInfo, teams} = workbench;
        const radar = workbench.getRadar();
        teams = teams.slice();
        return (
            <div>
                <Card style={{margin: '-30px -30px 0 -30px'}}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>

                    <div style={Styles.flexBox}>
                        <div style={Styles.flexContent}>
                            <div className='avatar'>
                                <img src={avatar}/>
                            </div>
                            <div className='content'>
                                <p className='content-title'>早安，{userInfo.userName}，祝你开心每一天！</p>
                                <span className='text-promote'>{userInfo.station} | {userInfo.department}</span>
                            </div>
                        </div>
                        <div style={{width: 250, marginRight: 25}}>
                            <Row gutter={20} className='text-center'>
                                <Col grid={1 / 3}>
                                    <div className='text-promote'>项目数</div>
                                    <div className='font-30'>{userInfo.projectNum}</div>
                                </Col>
                                <Col grid={1 / 3}>
                                    <div className='text-promote'>团队内排名</div>
                                    <div className='font-30'>{userInfo.rank}/<span className='font-16 text-promote'>{userInfo.members}</span></div>
                                </Col>
                                <Col grid={1 / 3}>
                                    <div className='text-promote'>项目访问</div>
                                    <div className='font-30'>{userInfo.visit}</div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>

                <Row className='mt-30' gutter={15}>
                    <Col grid={0.7}>
                        <Card title='进行中的项目' tools={[<a key='all'>全部项目</a>]} bodyStyle={{padding: 0}} className='no-animation'>
                            <Row className='project-list'>
                                {this.renderProjects()}
                            </Row>
                        </Card>

                        <Card className='mt-30' title='动态'>
                            <ul className='trends-list'>
                                {this.renderTrends()}
                            </ul>
                        </Card>
                    </Col>
                    <Col grid={0.3}>
                        <Card title='指数'>
                            <Radar data={radar}/>
                        </Card>

                        <Card title='团队' className='mt-30'>
                            <Row className='teams'>
                                {this.renderTeams(teams)}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Workbench;

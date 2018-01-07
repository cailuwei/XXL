import React from 'react';
import asyncComponent from './AsyncComponent';
import {Route, Redirect} from 'react-router-dom';

const routers = [];

const TaskIndex = asyncComponent(() => import('./pages/task/index'));
const LogTask = asyncComponent(() => import('./pages/log/task'));
const LogJob = asyncComponent(() => import('./pages/log/job'));
const Job = asyncComponent(() => import('./pages/job/index'));
// const JobCreate = asyncComponent(() => import('./pages/job/create'));
const ActuatorIndex = asyncComponent(() => import('./pages/actuator/index'));
const ScheduleChart = asyncComponent(() => import('./pages/schedule/index'));

routers.push(<Route key="home" exact path="/" render={() => ( <Redirect to="/task/index"/>)}/>);
routers.push(<Route key='task' path='/task/index' component={TaskIndex}/>);
routers.push(<Route key='logtask' path='/log/task/:taskId' component={LogTask}/>);
routers.push(<Route key='logjob' path='/log/job/:taskInstId' component={LogJob}/>);
routers.push(<Route key='job' path='/job/list' component={Job}/>);
// routers.push(<Route key='jobcreate' path='/job/create' component={JobCreate} />);
routers.push(<Route key='ActuatorIndex' path='/actuator/index' component={ActuatorIndex}/>);
routers.push(<Route key='ScheduleChart' path='/schedule/index/:taskId' component={ScheduleChart}/>);

export default routers;

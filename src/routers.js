import React from 'react';
import asyncComponent from './AsyncComponent';
import { Route } from 'react-router-dom';

const routers = [];

const DashboardAnalysis = asyncComponent(() => import('./pages/dashboard/analysis'));
const TaskIndex = asyncComponent(() => import('./pages/task/index'));
const LogTask = asyncComponent(() => import('./pages/log/task'));
const LogJob = asyncComponent(() => import('./pages/log/job'));
const Job = asyncComponent(() => import('./pages/job/list'));
const ModuleCreate = asyncComponent(() => import('./pages/module/create'));
const ActuatorIndex = asyncComponent(() => import('./pages/actuator/index'));
const ScheduleChart = asyncComponent(() => import('./pages/schedule/index'));
const DashboardMonitor = asyncComponent(() => import('./pages/dashboard/monitor'));
const DashboardWorkbench = asyncComponent(() => import('./pages/dashboard/workbench'));
const FormBase = asyncComponent(() => import('./pages/form/base'));
const FormAdvanced = asyncComponent(() => import('./pages/form/advanced'));
const MonitorHost = asyncComponent(() => import('./pages/monitor/host'));
const XYF = asyncComponent(() => import('./pages/xyf/index'));
const Profile = asyncComponent(() => import('./pages/profile/index'));

routers.push(<Route key='analysis' path='/dashboard/analysis' component={DashboardAnalysis} />);
routers.push(<Route key='task' path='/task/index' component={TaskIndex} />);
routers.push(<Route key='logtask' path='/log/task' component={LogTask} />);
routers.push(<Route key='logjob' path='/log/job' component={LogJob} />);
routers.push(<Route key='job' path='/job/list' component={Job} />);
routers.push(<Route key='module' path='/module/create' component={ModuleCreate} />);
routers.push(<Route key='ActuatorIndex' path='/actuator/index' component={ActuatorIndex} />);
routers.push(<Route key='ScheduleChart' path='/schedule/index/:taskId' component={ScheduleChart} />);
routers.push(<Route key='monitor' path='/dashboard/monitor' component={DashboardMonitor} />);
routers.push(<Route key='workbench' path='/dashboard/workbench' component={DashboardWorkbench} />);
routers.push(<Route key='formbase' path='/form/base' component={FormBase} />);
routers.push(<Route key='formadvanced' path='/form/advanced' component={FormAdvanced} />);
routers.push(<Route key='list' path='/monitor/host' component={MonitorHost} />);
routers.push(<Route key='futbol-o' path='/xyf' component={XYF} />);
routers.push(<Route key='profile' path='/profile' component={Profile} />);

export default routers;

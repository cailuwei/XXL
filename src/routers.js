import React from 'react';
import asyncComponent from './AsyncComponent';
import { Route } from 'react-router-dom';

const routers = [];

const DashboardAnalysis = asyncComponent(() => import('./pages/dashboard/analysis'));
const DashboardMonitor = asyncComponent(() => import('./pages/dashboard/monitor'));
const DashboardWorkbench = asyncComponent(() => import('./pages/dashboard/workbench'));
const FormBase = asyncComponent(() => import('./pages/form/base'));
const FormAdvanced = asyncComponent(() => import('./pages/form/advanced'));
const MonitorHost = asyncComponent(() => import('./pages/monitor/host'));
const XYF = asyncComponent(() => import('./pages/xyf/index'));
const Profile = asyncComponent(() => import('./pages/profile/index'));

routers.push(<Route key='analysis' path='/dashboard/analysis' component={DashboardAnalysis} />);
routers.push(<Route key='monitor' path='/dashboard/monitor' component={DashboardMonitor} />);
routers.push(<Route key='workbench' path='/dashboard/workbench' component={DashboardWorkbench} />);
routers.push(<Route key='formbase' path='/form/base' component={FormBase} />);
routers.push(<Route key='formadvanced' path='/form/advanced' component={FormAdvanced} />);
routers.push(<Route key='list' path='/monitor/host' component={MonitorHost} />);
routers.push(<Route key='futbol-o' path='/xyf' component={XYF} />);
routers.push(<Route key='profile' path='/profile' component={Profile} />);

export default routers;

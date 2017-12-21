import { RouterStore } from 'mobx-react-router';
const routingStore = new RouterStore();
import UserStore from './user';
import Monitor from './monitor';
import Dashboard from './dashboard';
import Task from './task';
import Job from './job';

const stores = {
    // Key can be whatever you want
    routing: routingStore,
    user: new UserStore(),
    monitor: new Monitor(),
    dashboard: new Dashboard(),
    task: new Task(),
    job: new Job()
};

export default stores;

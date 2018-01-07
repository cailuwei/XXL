import { RouterStore } from 'mobx-react-router';
const routingStore = new RouterStore();
import Task from './task';
import Job from './job';
import Actuator from './actuator';
import Schedule from './schedule';

const stores = {
    // Key can be whatever you want
    routing: routingStore,
    task: new Task(),
    job: new Job(),
    actuator: new Actuator(),
    schedule: new Schedule()
};

export default stores;

import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../configs/api';

useStrict(true); // 使用严格模式

export default class Task {

    orignData = {
        'id': '',
        'taskName': '',
        'taskType': '0',
        'taskDesc': '',
        'author': '',
        'timeRange': '',
        'timeType': '',
        'taskCron': '',
        'alarmEmails': ''
    };

    @observable taskType = '0';
    @observable isFetching = false;
    @observable taskInfo = {};

    getSelectData() {
        return [
            {id: '0', text: 'cron'},  //定時任務
            {id: '1', text: '单次任务'}
        ];
    }

    getTaskType() {
        return this.taskType;
    }

    async fecthTaskDetail(taskId) {
        this.setFetchBegin();
        const resp = await fetch(API.TASK.GET_TASK_INFO, {taskId}, 'post');
        if (resp && resp.success) {
            this.setTaskInfo({});
            this.setFetchDone();
        }

    }

    async putTask(params) {
        if (params.taskType === '1') {
            params.endTime = params.timeRange[1];
            params.startTime = params.timeRange[0];
            delete params.timeRange;
            delete params.taskCron;
        } else {
            delete params.timeRange;
        }

        const ret = fetch(API.TASK.ADD_TASK, params, 'post', {}, API.HEADER);
        return ret;
    }

    async updateTask(params) {
        if (params.taskType === '1') {
            params.endTime = params.timeRange[1];
            params.startTime = params.timeRange[0];
            delete params.timeRange;
            delete params.taskCron;
        } else {
            delete params.timeRange;
        }

        const ret = fetch(API.TASK.EDIT_TASK, params, 'post', {}, API.HEADER);
        return ret;
    }

    async deleteTask(id) {
        const ret = fetch(API.TASK.DELETE_TASK, {id}, 'post');
        return ret;
    }

    async toggelTaskStatus(id, op) {
        op = op.toUpperCase();
        const ret = fetch(API.TASK[op], {id}, 'post');
        return ret;
    }

    async startTask(id) {
        const ret = fetch(API.TASK.TRIGGER, {id}, 'post');
        return ret;
    }

    // @action 动作，用与改变状态，且严格模式下状态只能有动作改变
    @action
    setFetchBegin() {
        this.isFetching = true;
    }

    @action
    setFetchDone() {
        this.isFetching = false;
    }

    @action
    handlerTaskTypeChange(value) {
        this.taskType = value;
    }

    @action
    setTaskInfo(data) {
        data.timeRange = data.startTime + '~' + data.endTime;
        data.id = data.id ? data.id.toString() : '';
        data.taskType = data.taskType || data.taskType === 0 ? data.taskType.toString() : '';
        data.timeType = data.timeType ? data.timeType.toString() : '';
        this.taskInfo = data;
    }

    @action
    initAddFormData() {
        this.taskInfo = JSON.parse(JSON.stringify(this.orignData));
    }
}


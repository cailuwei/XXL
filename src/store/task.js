import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../configs/api';

useStrict(true); // 使用严格模式

export default class Task {

    // @observable 监听数据变化
    @observable taskType = '0';

    @observable isFetching = false;

    @observable editTaskType = '0';

    @observable taskInfo = {};

    @observable orignData = {
        'taskName': '',
        'taskType': '',
        'taskDescription': '',
        'manager': '',
        'startTime': '',
        'timeType': '',
        'cron': ''
    };

    getSelectData () {
        return [
            {id: '0', text: 'cron'},
            {id: '1', text: '单次任务'}
        ];
    }

    getTaskType () {
        return this.taskType;
    }

    async fecthTaskDetail (taskId) {
        this.setFetchBegin();
        const resp = await fetch(API.TASK['DETAIL'], {taskId});
        if (resp && resp.success) {
            this.setTaskInfo({
                'taskName': 'asdasd',
                'taskType': '111',
                'taskDescription': '111',
                'manager': '',
                'startTime': '',
                'timeType': '',
                'cron': ''
            });
            this.setFetchDone();
        }

    }

    async putTask (params) {
        const ret = fetch(API.TASK['ADD'], params, 'post');
        return ret;
    }

    async updateTask (params) {
        const ret = fetch(API.TASK['EDIT'], params, 'post');
        return ret;
    }

    async deleteTask (id) {
        const ret = fetch(API.TASK['DELETE'], {id});
        return ret;
    }

    async toggelTaskStatus (id) {
        const ret = fetch(API.TASK['TOGGLE_STATUS'], {id});
        return ret;
    }

    // @action 动作，用与改变状态，且严格模式下状态只能有动作改变
    @action
    setFetchBegin () {
        this.isFetching = true;
    }

    @action
    setFetchDone () {
        this.isFetching = false;
    }

    @action
    handlerTaskTypeChange (value) {
        this.taskType = value;
    }

    @action
    handlerEditTaskTypeChange (value) {
        this.editTaskType = value;
    }

    @action
    setTaskInfo (data) {
        this.taskInfo = data;
    }

    @action
    initAddFormData () {
        this.taskInfo = JSON.parse(JSON.stringify(this.orignData));
    }
}


import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';

useStrict(true); // 使用严格模式

export default class Task {

    urls = {
        'info': 'http://172.18.34.66:8415/mock/xxl/taskManage/detail',
        'log': 'http://172.18.34.66:8415/mock/xxl/taskManage/log'
    };

    // @observable 监听数据变化
    @observable taskType = '0';

    @observable isFetching = false;

    @observable editTaskType = '0';

    @observable taskInfo = {
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

    getEditTaskType () {
        return this.editTaskType;
    }

    getTaskInfo () {
        return toJS(this.taskInfo);
    }

    async getTaskDetailInfo (taskId) {
        this.setFetchBegin();
        const resp = await fetch(this.urls['info'], {taskId});
        // if (resp.successSign) {
        window.setTimeout(()=>{
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
        },1000);


    }

    @action
    setFetchBegin () {
        this.isFetching = true;
    }

    @action
    setFetchDone () {
        this.isFetching = false;
    }

    // @action 动作，用与改变状态，且严格模式下状态只能有动作改变
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
}


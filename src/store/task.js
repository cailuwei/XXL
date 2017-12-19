import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';

useStrict(true); // 使用严格模式

export default class Task {

    urls = {
        'info': 'http://192.168.105.202:8415/mock/xxl/taskManage/detail',
        'log': 'http://192.168.105.202:8415/mock/xxl/taskManage/log'
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

    getTaskDetailInfo (url, taskId, callback) {
        this.setTaskInfo({
            'taskName': 'asd',
            'taskType': '',
            'taskDescription': '',
            'manager': '',
            'startTime': '',
            'timeType': '',
            'cron': ''
        });
        // this.setFetchBegin();
        // const resp = await fetch(urls['info'], {taskId});
        // // if (resp.successSign) {
        // this.setTaskInfo({
        //     'taskName': 'asdasd',
        //     'taskType': '',
        //     'taskDescription': '',
        //     'manager': '',
        //     'startTime': '',
        //     'timeType': '',
        //     'cron': ''
        // });
        // this.setFetchDone();
        // console.log(2222);
        // // }
        // callback ? callback() : null;
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


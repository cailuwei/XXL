import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';

useStrict(true); // 使用严格模式

export default class Job {

    urls = {
        'info': 'http://172.18.34.66:8415/mock/xxl/taskManage/detail',
        'log': 'http://172.18.34.66:8415/mock/xxl/taskManage/log'
    };

    // @observable 监听数据变化
    @observable jobType = '0';

    @observable isFetching = false;

    @observable editJobType = '0';

    @observable jobInfo = {
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

    getJobType () {
        return this.jobType;
    }

    getEdiJobType () {
        return this.editJobType;
    }

    getJobInfo () {
        return toJS(this.jobInfo);
    }

    async getJobDetailInfo (taskId) {
        this.setFetchBegin();
        const resp = await fetch(this.urls['info'], {taskId});
        // if (resp.successSign) {
        window.setTimeout(()=>{
            this.setJobInfo({
                'taskName': 'asdasd',
                'taskType': '',
                'taskDescription': '',
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
    handlerJobTypeChange (value) {
        this.jobType = value;
    }

    @action
    handlerEditJobTypeChange (value) {
        this.editJobType = value;
    }

    @action
    setJobInfo (data) {
        this.jobInfo = data;
    }
}


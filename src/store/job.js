import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../configs/api';

useStrict(true); // 使用严格模式

export default class Job {
    orignData = {
        id: '',
        jobGroup: '',
        jobName: '',
        jobDesc: '',
        author: '',
        executorRouteStrategy: '',
        runMode: ''
    };

    @observable jobInfo = {};
    @observable isFetching = false;
    @observable strategyList = [];
    @observable jobGroupList = [];
    @observable jobGroupMaps = {};

    async putJob(params) {
        const ret = fetch(API.JOB.ADD_JOB, params, 'post', {}, API.HEADER);
        return ret;
    }

    async updateJob(params) {
        const ret = fetch(API.JOB.EDIT_JOB, params, 'post', {}, API.HEADER);
        return ret;
    }

    async deleteJob(id) {
        const ret = fetch(API.JOB.DELETE_JOB, {id}, 'post');
        return ret;
    }

    async fetchJobInfo(id) {
        this.setFetchBegin();
        const resp = await fetch(API.JOB.GET_JOB_INFO, {id}, 'post');
        if (resp && resp.success) {
            this.setJobInfo(resp.info);
            this.setFetchDone();
        }
    }

    async getListInfo() {
        const ret = await fetch(API.JOB.BASE_LIST, {}, 'post');
        if (ret && ret.success) {
            this.setBaseInfo(ret);
        }
    }

    @action
    initAddFormData() {
        this.jobInfo = JSON.parse(JSON.stringify(this.orignData));
    }

    @action
    setFetchBegin() {
        this.isFetching = true;
    }

    @action
    setFetchDone() {
        this.isFetching = false;
    }

    @action
    setJobInfo(data) {
        data.id = data.id ? data.id.toString() : '';
        data.jobGroup = data.jobGroup ? data.jobGroup.toString() : '';
        this.jobInfo = data;
    }

    @action
    setBaseInfo(data) {
        const strategyList = data.ExecutorRouteStrategyEnum || {};
        const list = [];
        for (let key in strategyList) {
            list.push({'id': key, 'text': strategyList[key]});
        }
        this.strategyList = list;

        const map = {};
        this.jobGroupList = data.JobGroupList ? data.JobGroupList.map((item) => {
            map[item.id] = item.title;
            return {'id': item.id.toString(), 'text': item.title};
        }) : [];
        this.jobGroupMaps = map;
    }

    getStrategyList() {
        return toJS(this.strategyList);
    }

    getJobGroupList() {
        return toJS(this.jobGroupList);
    }
}


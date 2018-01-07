import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../configs/api';

useStrict(true); // 使用严格模式

export default class Job {
    orignData = {
        actuator: '',
        desc: '',
        person: '',
        strategy: '',
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
        this.jobInfo = data;
    }

    @action
    setBaseInfo(data) {
        this.strategyList = data.ExecutorRouteStrategyEnum ? data.ExecutorRouteStrategyEnum.map((item) => {
            return {'id': item, 'text': item};
        }) : [];
        let map = {};
        this.jobGroupList = data.JobGroupList ? data.JobGroupList.map((item) => {
            map[item.id] = item.title;
            return {'id': item.id, 'text': item.title};
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


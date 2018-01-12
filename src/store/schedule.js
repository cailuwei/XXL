import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import UUID from 'r-cmui/components/utils/UUID';
import API from '../configs/api';
// import {Map} from 'immutable';

useStrict(true); // 使用严格模式

export default class Schedule {
    origin = {
        id: '',
        taskId: '',
        jobId: '',
        jobDesc: '',
        params: ''
    };

    @observable data;
    @observable nodeData = {
        id: '',
        taskId: '',
        jobId: '',
        jobDesc: '',
        params: ''
    };
    @observable linkFormNodes;
    @observable linkFormData = {
        prefixId: '',
        nextId: ''
    }
    @observable saveFetching = false;
    @observable jobInfoList = [];
    @observable jobInfoMap = {};

    walkList(data) {
        return data.map((item) => {
            item.id = item.id.toString();
            item.jobId = item.jobId.toString();
            item['items'] = item.nextId.split(',');
            return item;
        });
    }

    async fetchScheduleData(taskId) {
        const ret = await fetch(API.SCHEDULE.GET_SCHEDULE, {taskId}, 'post');
        if (ret && ret.success) {
            this.setScheduleData(this.walkList(ret.data));
        }
    }

    async fetchJobInfoList() {
        const ret = await fetch(API.SCHEDULE.GET_JOB_INFO, {}, 'post');
        if (ret && ret.success) {
            this.setJobInfo(ret.jobInfoList);
        }
    }

    async putNode(node, callback) {
        const ret = await fetch(API.SCHEDULE.ADD_NODE, node, 'post', {}, API.HEADER);
        if (callback) {
            callback(ret);
        }
    }

    async updateNode(node, callback) {
        const ret = await fetch(API.SCHEDULE.EDIT_NODE, node, 'post', {}, API.HEADER);
        if (callback) {
            callback(ret);
        }
    }

    async deleteNode(id) {
        const ret = await fetch(API.SCHEDULE.DELETE_NODE, {id}, 'post');
        return ret;
    }

    async fetchScheduleInfo(id) {
        const info = await fetch(API.SCHEDULE.GET_NODE_INFO, {id}, 'post');
        if (info && info.success) {
            this.setNodeInfo(info);
        }
    }

    async saveAllLinks(params) {
        this.saveBegin();
        const ret = await fetch(API.SCHEDULE.SAVE_NODE, params, 'post', {}, API.HEADER);
        this.saveDone();
        return ret;
    }

    @action
    saveBegin() {
        this.saveFetching = true;
    }

    @action
    saveDone() {
        this.saveFetching = false;
    }

    @action
    updateLinkFormData(nodes, prefix, suffix) {
        this.linkFormNodes = nodes;
        this.linkFormData.prefixId = prefix;
        this.linkFormData.nextId = suffix;
    }

    @action
    updateLinkFormPrefix(prefixId) {
        this.linkFormData = {
            prefixId,
            nextId: this.linkFormData.nextId
        };
    }

    @action
    updateLinkFormSuffix(nextId) {
        this.linkFormData = {
            nextId,
            prefixId: this.linkFormData.prefixId
        };
    }

    @action
    setNodeInfo(info) {
        this.nodeData = info;
    }

    @action
    initAddFormData() {
        this.nodeData = JSON.parse(JSON.stringify(this.origin));
    }

    @action
    setScheduleData(data) {
        this.data = data;
    }

    @action
    setJobInfo(data) {
        const map = {};
        this.jobInfoList = data ? data.map((item) => {
            map[item.id] = item.jobName;
            return {'id': item.id.toString(), 'text': item.jobName};
        }) : [];
        this.jobInfoMap = map;
    }

    getScheduleData() {
        return toJS(this.data);
    }

    getJobInfoList() {
        return toJS(this.jobInfoList);
    }

    getLinkFormNodes() {
        return toJS(this.linkFormNodes);
    }

    getLinkFormData() {
        return toJS(this.linkFormData);
    }
}

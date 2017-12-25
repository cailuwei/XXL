import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import UUID from 'r-cmui/components/utils/UUID';
import API from '../configs/api';
import {Map} from 'immutable';

useStrict(true); // 使用严格模式

export default class Schedule {
    @observable data;
    @observable nodeData;
    @observable linkFormNodes;
    @observable linkFormData = {
        prefix: '',
        suffix: ''
    }
    @observable saveFetching = false;

    async fetchScheduleData (taskId) {
        const ret = await fetch(API.SCHEDULE.GETSCHEDULE, {taskId});
        this.setScheduleData(ret);
    }

    async putNode (node, callback) {
        const ret = await fetch(API.SCHEDULE.ADDNODE, node, 'post');
        if (callback) {
            callback(ret);
        }
    }

    async updateNode (node, callback) {
        const ret = await fetch(API.SCHEDULE.EDITNODE, node, 'post');
        if (callback) {
            callback(ret);
        }
    }

    async deleteNode (id) {
        const ret = await fetch(API.SCHEDULE.DELETENODE, id, 'post');
        return ret;
    }

    async fetchScheduleInfo (id) {
        const info = await fetch(API.SCHEDULE.GETNODEINFO, {id});
        this.setNodeInfo(info);
    }

    async saveAllLinks (params) {
        this.saveBegin();
        const ret = await fetch(API.SCHEDULE.SAVE, params);
        this.saveDone();
        return ret;
    }

    @action
    saveBegin () {
        this.saveFetching = true;
    }

    @action
    saveDone () {
        this.saveFetching = false;
    }

    @action
    updateLinkFormData (nodes, prefix, suffix) {
        this.linkFormNodes = nodes;
        this.linkFormData.prefix = prefix;
        this.linkFormData.suffix = suffix;
    }

    @action
    updateLinkFormPrefix (prefix) {
        this.linkFormData = {
            prefix,
            suffix: this.linkFormData.suffix
        };
    }

    @action
    updateLinkFormSuffix (suffix) {
        this.linkFormData = {
            suffix,
            prefix: this.linkFormData.prefix
        };
    }

    @action
    setNodeInfo (info) {
        this.nodeData = info;
    }

    @action
    addNode (node) {
        node.id = UUID.v4();
        this.data[0].push(node);
    }

    @action
    setScheduleData (data) {
        this.data = data;
    }

    getScheduleData () {
        return toJS(this.data);
    }

    getLinkFormNodes () {
        return toJS(this.linkFormNodes);
    }

    getLinkFormData () {
        return toJS(this.linkFormData);
    }
}

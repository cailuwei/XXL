import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import UUID from 'r-cmui/components/utils/UUID';
import API from '../configs/api';
// import {Map} from 'immutable';

useStrict(true); // 使用严格模式

export default class Schedule {
    @observable data;
    @observable nodeData;
    @observable linkFormNodes;
    @observable linkFormData = {
        prefixId: '',
        nextId: ''
    }
    @observable saveFetching = false;

    walkList(data) {
        return data.map((item) => {
            item['items'] = item.nextId.split(',');
            return item;
        });
    }

    async fetchScheduleData(taskId) {
        const ret = await fetch(API.SCHEDULE.GET_SCHEDULE, {taskId}, 'post');
        // if (ret && ret.success) {
        this.setScheduleData(this.walkList(ret));
        // }
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
        const ret = await fetch(API.SCHEDULE.DELETE_NODE, id, 'post');
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
    addNode(node) {
        node.id = UUID.v4();
        this.data[0].push(node);
    }

    @action
    setScheduleData(data) {
        this.data = data;
    }

    getScheduleData() {
        return toJS(this.data);
    }

    getLinkFormNodes() {
        return toJS(this.linkFormNodes);
    }

    getLinkFormData() {
        return toJS(this.linkFormData);
    }
}

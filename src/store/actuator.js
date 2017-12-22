import {useStrict, observable, action, toJS} from 'mobx';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../configs/api';
import {Map} from 'immutable';

useStrict(true); // 使用严格模式

export default class Actuator {
    orign = {
        id: '',
        AppName: '',
        name: '',
        ordering: '',
        registerType: '0',
        ips: ''
    }

    @observable
    initFormData = {};

    registerType = {
        '0': '自动注册',
        '1': '手动注册'
    };

    async deleteActuator (id, callback) {
        const ret = await fetch(API.ACTUATOR.DELETE, {id});
        if (callback) {
            callback(ret);
        }
    }

    async saveActuator (params, callback) {
        const ret = await fetch(API.ACTUATOR.SAVE, params, 'post');
        if (callback) {
            callback(ret);
        }
    }

    async editActuator (params, callback) {
        const ret = await fetch(API.ACTUATOR.EDIT, params, 'post');
        if (callback) {
            callback(ret);
        }
    }

    async getActuatorInfo (id) {
        const ret = await fetch(API.ACTUATOR.GETACTUATOR, {id});
        this.setActuatorInfo(ret);
    }

    @action
    changeInitFormData () {
        this.initFormData = Map(this.orign).toJS();
    }

    @action
    setActuatorInfo (info) {
        this.initFormData = info;
    }

    getInitFormData () {
        return toJS(this.initFormData);
    }
}

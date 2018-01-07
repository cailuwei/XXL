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
        addressType: '0',
        addressList: '',
        ips: ''
    };

    addressType = {
        '0': '自动注册',
        '1': '手动注册'
    };

    @observable
    initFormData = {};

    async deleteActuator(id, callback) {
        const ret = await fetch(API.ACTUATOR.DELETE_ACTUATOR, {id}, 'post');
        if (callback) {
            callback(ret);
        }
    }

    async saveActuator(params, callback) {
        const ret = await fetch(API.ACTUATOR.SAVE_ACTUATOR, params, 'post', {}, API.HEADER);
        if (callback) {
            callback(ret);
        }
    }

    async editActuator(params, callback) {
        const ret = await fetch(API.ACTUATOR.EDIT_ACTUATOR, params, 'post', {}, API.HEADER);
        if (callback) {
            callback(ret);
        }
    }

    async getActuatorInfo(id) {
        const ret = await fetch(API.ACTUATOR.GET_ACTUATOR_INFO, {id}, 'post');
        this.setActuatorInfo(ret);
    }

    @action
    changeInitFormData() {
        this.initFormData = Map(this.orign).toJS();
    }

    @action
    setActuatorInfo(info) {
        info.addressList = info.registryList;
        this.initFormData = info;
    }

    getInitFormData() {
        return toJS(this.initFormData);
    }
}

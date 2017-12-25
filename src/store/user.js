import {useStrict, observable, action} from 'mobx';

useStrict(true);

export default class UserList {
    @observable list = [];

    @action
    addUser (user) {
        this.list.push(user);
    }

    @action
    modifyUser (user, name) {
        user.name = name;
    }

    async initList () {
        let ret = await fetch('http://172.18.34.66:8415/mock/test/user/list');
        ret = await ret.json();
        this.init(ret);
    }

    @action
    init (list) {
        this.list = list;
    }

    toJS () {
        return this.list.toJS();
    }
}

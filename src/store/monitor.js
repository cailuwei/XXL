import {useStrict, observable, action} from 'mobx';
import Profile from './monitor/profile';

useStrict(true);

export default class Monitor {
    @observable profile = new Profile();
}

import {useStrict, observable} from 'mobx';
import Analysis from './dashboard/analysis';
import Monitor from './dashboard/monitor';
import Workbench from './dashboard/workbench';

useStrict(true);

export default class Dashboard {
    @observable analysis = new Analysis();
    @observable monitor = new Monitor();
    @observable workbench = new Workbench();
}

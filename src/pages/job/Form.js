import React from 'react';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import Spin from 'r-cmui/components/Spin';

import API from '../../configs/api';
import 'r-cmui/components/Input';
import 'r-cmui/components/Select';
import 'r-cmui/components/DateRange';
import 'r-cmui/components/TextArea';
import 'r-cmui/components/RadioGroup';

const {SVGSpin} = Spin;

class Comp extends React.Component {
    displayName = 'Comp';

    isValid() {
        return this.form.isValid();
    }

    getParams() {
        return this.form.getFormParams();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != this.props.data) {
            this.form.setData(nextProps.data);
        }
    }

    render() {
        return (
            <SVGSpin spinning={this.props.spinning}>
                <div style={{width: 500}}>
                    <Form ref={(f) => this.form = f}
                          labelWidth={85}
                          layout='stack-inline'
                          data={this.props.data}>
                        <FormControl name='id' type='hidden'/>
                        <FormControl name='jobGroup' label='执行器:' textField='name' type='select' placeholder='执行器'
                                     url={API.ACTUATOR.SELECT_LIST} required/>
                        <FormControl name='jobDesc' label='job描述:' type='textarea' required height={100}/>
                        <FormControl name='author' type='text' label='负责人:' required/>
                        <FormControl name='ExecutorRouteStrategyEnum' label='路由策略:' type='select' placeholder='路由策略'
                                     url={API.JOB.STRATEGY_LIST} required/>
                        <FormControl name='runMode' label='运行模式:' type='select' placeholder='运行模式'
                                     url={API.JOB.RUN_MODE_LIST} required/>
                    </Form>
                </div>
            </SVGSpin>
        );
    }
}

export default Comp;

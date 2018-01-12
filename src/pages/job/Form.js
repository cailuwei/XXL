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
                        <FormControl ref={(f) => this.jobGroup = f} name='jobGroup' label='执行器:' type='select'
                                     placeholder='请输入执行器'
                                     data={this.props.jobGroupList} required/>
                        <FormControl name='jobName' label='job名称:' type='text' required height={100}
                                     rules={{maxLength: 50}}
                                     placeholder='请输入job名称'/>
                        <FormControl name='jobDesc' label='job描述:' type='textarea' required height={100}
                                     rules={{maxLength: 255}}
                                     placeholder='请输入job描述'/>
                        <FormControl name='author' label='负责人:' type='text' required rules={{maxLength: 64}}
                                     placeholder='请输入负责人'/>
                        <FormControl name='executorRouteStrategy' label='路由策略:' type='select'
                                     placeholder='请选择路由策略'
                                     data={this.props.strategyList} required/>
                    </Form>
                </div>
            </SVGSpin>
        );
    }
}

export default Comp;

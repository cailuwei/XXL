import React from 'react';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import API from '../../configs/api';

import 'r-cmui/components/Input';
import 'r-cmui/components/Select';
import 'r-cmui/components/TextArea';

window.Validation.addMethod('englishOnly', (value) => {
    const params = value.split(',');
    let valid = true;
    params.forEach((param) => {
        if (!param) {
            valid = false;
        }
        if (!/^[A-Za-z*]+$/.test(param)) {
            valid = false;
        }
    });

    return valid;
}, '参数只能是英文，逗号分隔');
class Comp extends React.Component {
    displayName = 'Comp';

    isValid () {
        return this.form.isValid();
    }

    getParams () {
        return this.form.getFormParams();
    }

    changeJob = (value, item) => {
        this.name.setValue(item.name);
    }

    render () {
        return (
            <div style={{width: 400, height: 300}}>
                <Form ref={(f) => this.form = f} labelWidth={80} layout='stack-inline' data={this.props.data}>
                    <FormControl name='name' type='hidden' ref={(f) => this.name = f}/>
                    <FormControl onChange={this.changeJob} name='jobId' textField='name' label='选择Job' type='select' filter url={API.SCHEDULE.JOBLIST} required/>
                    <FormControl name='desc' label='描述' type='textarea' required height={80}/>
                    <FormControl name='parameters' label='参数' placeholder='只能输入英文逗号做间隔' type='textarea' height={80} rules={{englishOnly: true}}/>
                </Form>
            </div>
        );
    }
}
export default Comp;

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

    isValid() {
        return this.form.isValid();
    }

    getParams() {
        return this.form.getFormParams();
    }

    changeJob = (value, item) => {
        this.name.setValue(item.name);
    }

    render() {
        return (
            <div style={{width: 400}}>
                <Form ref={(f) => this.form = f} labelWidth={80} layout='stack-inline' data={this.props.data}>
                    <FormControl name='id' type='hidden' ref={(f) => this.name = f}/>
                    <FormControl name='taskId' type='hidden'/>
                    <FormControl onChange={this.changeJob} name='jobId' textField='name' label='选择Job' type='select'
                                 data={API.SCHEDULE.JOB_LIST} required />
                    <FormControl name='jobDesc' label='描述' type='textarea' required height={80} rules={{maxLength: 250}}/>
                    <FormControl name='params' label='执行参数' placeholder='只能输入英文逗号做间隔' type='textarea' height={80}
                                 rules={{englishOnly: true, maxLength: 250}}/>
                </Form>
            </div>
        );
    }
}

export default Comp;

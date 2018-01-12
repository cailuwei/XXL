import React from 'react';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != this.props.data) {
            this.form.setData(nextProps.data);
        }
    }

    render() {
        return (
            <div style={{width: 500}}>
                <Form ref={(f) => this.form = f} labelWidth={85} layout='stack-inline' data={this.props.data}>
                    <FormControl name='id' type='hidden'/>
                    <FormControl name='taskId' type='hidden'/>
                    <FormControl name='jobId' label='选择Job' type='select' data={this.props.jobInfoList} required
                                 placeholder='请选择job'/>
                    <FormControl name='jobDesc' label='描述' type='textarea' required height={80}
                                 rules={{maxLength: 250}}
                                 placeholder='请输入描述'/>
                    <FormControl name='params' label='执行参数' type='textarea' height={80}
                                 rules={{maxLength: 250}}
                                 placeholder='请输入执行参数'/>
                </Form>
            </div>
        );
    }
}

export default Comp;

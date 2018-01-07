import React from 'react';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';

import 'r-cmui/components/Input';


class Comp extends React.Component {
    displayName = 'Comp';

    isValid() {
        return this.form.isValid();
    }

    getParams() {
        return this.form.getFormParams();
    }

    render() {
        return (
            <div style={{width: 500}}>
                <Form ref={(f) => this.form = f}
                      labelWidth={85}
                      layout='stack-inline'
                      data={this.props.data}>
                    <FormControl name='glueRemark' label='脚本备注' type='type' placeholder='请输入脚本备注！' required
                                 rules={{maxLength: 128}}/>
                </Form>
            </div>
        );
    }
}

export default Comp;

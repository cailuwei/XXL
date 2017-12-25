import React from 'react';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';

import 'r-cmui/components/CheckBoxGroup';

class Comp extends React.Component {
    displayName = 'Comp';

    isValid () {
        return this.form.isValid();
    }

    getParams () {
        return this.form.getFormParams();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.data != this.props.data) {
            this.form.setData(nextProps.data);
        }
    }

    checkPreValid = (value) => {
        if (this.props.checkPreValid) {
            this.props.checkPreValid(value, this.suffix.getValue());
        }
    }

    checkSufValid = (value) => {
        if (this.props.checkSufValid) {
            this.props.checkSufValid(this.prefix.getValue(), value);
        }
    }

    render () {
        return (
            <div style={{width: 400, height: 300}} className='link-form'>
                <Form ref={(f) => this.form = f} labelWidth={80} layout='stack-inline' data={this.props.data}>
                    <FormControl ref={(f) => this.prefix = f} name='prefix' label='前置关系' type='checkbox' data={this.props.nodes} onChange={this.checkPreValid}/>
                    <FormControl ref={(f) => this.suffix = f} name='suffix' label='后置关系' type='checkbox' data={this.props.nodes} onChange={this.checkSufValid}/>
                </Form>
            </div>
        );
    }
}
export default Comp;

import React from 'react';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';

import 'r-cmui/components/Input';
import 'r-cmui/components/RadioGroup';

const REG = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

window.Validation.addMethod('ips', (value) => {
    const ips = value.split(',');
    let valid = true;
    ips.forEach((ip) => {
        if (!REG.test(ip)) {
            valid = false;
        }
    });

    return valid;
}, '请输入正确的IP地址');

class Comp extends React.Component {
    displayName = 'Comp';

    registerType = [
        { id: '0', text: '自动注册'},
        { id: '1', text: '手动注册'}
    ];

    state = {
        registerType: this.props.data ? `${this.props.data.registerType}` : '0'
    }

    switchRegisterType = (value) => {
        this.setState({
            registerType: value
        });
    }

    isValid () {
        return this.form.isValid();
    }

    getParams () {
        return this.form.getFormParams();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.data != this.props.data) {
            this.form.setData(nextProps.data);
            this.setState({
                registerType: `${nextProps.data.registerType}`
            });
        }
    }

    render () {
        const display = `${this.state.registerType}` === '0' ? 'none' : 'block';
        return (
            <div style={{width: 500}}>
                <Form ref={(f) => this.form = f} layout='stack-inline' labelWidth={100} data={this.props.data}>
                    <FormControl name='id' type='hidden'/>
                    <FormControl name='AppName' type='text' label='AppName' placeholder='请输入AppName' maxLength={64} required rules={{required: true}}/>
                    <FormControl name='name' type='text' label='名称' placeholder='请输入名称' maxLength={64} required rules={{required: true}}/>
                    <FormControl name='ordering' type='integer' label='排序' placeholder='请输入排序' required rules={{required: true}}/>
                    <FormControl name='registerType' type='radio' label='注册方式' required rules={{required: true}} data={this.registerType} value='0'
                        onChange={this.switchRegisterType}/>
                    <FormControl style={{display}}
                        name='ips' type='text' label='机器地址' placeholder='请输入执行机器地址列表，多地址逗号分隔' required rules={{required: true, ips: true}}/>
                </Form>
            </div>
        );
    }
}
export default Comp;

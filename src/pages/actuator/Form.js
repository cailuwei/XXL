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

    addressType = [
        {id: '0', text: '自动注册'},
        {id: '1', text: '手动注册'}
    ];

    state = {
        addressType: this.props.data ? `${this.props.data.addressType}` : '0'
    }

    switchAddressType = (value) => {
        this.setState({
            addressType: value
        });
    }

    isValid() {
        return this.form.isValid();
    }

    getParams() {
        return this.form.getFormParams();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != this.props.data) {
            this.form.setData(nextProps.data);
            this.setState({
                addressType: `${nextProps.data.addressType}`
            });
        }
    }

    render() {
        const display = `${this.state.addressType}` === '0' ? 'none' : 'block';
        return (
            <div style={{width: 500}}>
                <Form ref={(f) => this.form = f} layout='stack-inline' labelWidth={100} data={this.props.data}>
                    <FormControl name='id' type='hidden'/>
                    <FormControl name='appName' type='text' label='AppName' placeholder='请输入AppName'
                                 required rules={{maxLength: 64}}/>
                    <FormControl name='title' type='text' label='名称' placeholder='请输入名称' required
                                 rules={{maxLength: 12}}/>
                    <FormControl name='order' type='integer' label='排序' placeholder='请输入排序' required/>
                    <FormControl name='addressType' type='radio' label='注册方式' required value='0'
                                 data={this.addressType}
                                 onChange={this.switchAddressType}/>
                    <FormControl style={{display}}
                                 name='addressList' type='text' label='机器地址' placeholder='请输入执行机器地址列表，多地址用英文逗号分隔'
                                 required
                                 rules={{ips: true, maxLength: 200}}/>
                </Form>
            </div>
        );
    }
}

export default Comp;

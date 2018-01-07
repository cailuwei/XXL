import React from 'react';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import Spin from 'r-cmui/components/Spin';

const {SVGSpin} = Spin;

import 'r-cmui/components/Input';
import 'r-cmui/components/Select';
import 'r-cmui/components/DateRange';

const TIME_TYPE_MAP = [
    {'id': '1', 'text': '月'},
    {'id': '2', 'text': '周'},
    {'id': '3', 'text': '日'},
    {'id': '4', 'text': '小时'},
    {'id': '5', 'text': '分钟'}
];

const TAST_TYPE_MAP = [
    {'id': '0', 'text': 'cron'},
    {'id': '1', 'text': '单次任务'}
];

class Edit extends React.Component {
    displayName = 'Edit';

    state = {
        type: 0
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != this.props.data) {
            this.form.setData(nextProps.data);
            this.setState({
                type: `${nextProps.data.taskType}`
            });
        }
    }

    isValid() {
        return this.form.isValid();
    }

    getParams() {
        return this.form.getFormParams();
    }

    handleTaskType(value) {
        this.setState({type: value});
    }

    render() {
        // const {index} = this.props.task;
        return (
            <SVGSpin spinning={this.props.spinning}>
                <div style={{width: 500}}>
                    <Form ref={(ref) => this.form = ref}
                          labelWidth={85}
                          layout='stack-inline'
                          data={this.props.data}>
                        <FormControl name='taskName' label='任务名称:' type='text' placeholder='请输入任务名称' required
                                     rules={{maxLength: 20}}/>
                        <FormControl name='taskDesc' label='任务描述:' type='textarea' placeholder='请输入任务描述' required
                                     rules={{maxLength: 250}} height={100}/>
                        <FormControl type='select'
                                     name='taskType'
                                     label='任务类型'
                                     placeholder='任务类型'
                                     data={TAST_TYPE_MAP}
                                     onChange={this.handleTaskType.bind(this)}
                                     required/>
                        <FormControl name='author' label='负责人:' type='text' placeholder='请输入负责人' required
                                     rules={{maxLength: 64}}/>
                        <FormControl name='alarmEmails' label='告警邮箱:' type='text' placeholder='请输入告警邮箱' required
                                     rules={{maxLength: 100}}/>
                        {this.state.type === '0' ?
                            <FormControl name='taskCron' label='cron:' type='text' placeholder='请输入cron' required/> :
                            <FormControl name='timeRange' label='起止时间:' type='daterange' placeholder='请输入起止时间' showTime
                                         format='YYYY-MM-DD HH:mm:ss' required/>}
                        <FormControl name='timeType' label='时间类型:' type='select' placeholder='请选择时间类型'
                                     data={TIME_TYPE_MAP}
                                     required/>
                    </Form>
                </div>
            </SVGSpin>
        );
    }
}

export default Edit;

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

    constructor(props) {
        super(props);

        this.state = {
            type: this.props.data['taskType']
        };
    }

    isValid () {
        return this.form.isValid();
    }

    getParams () {
        return this.form.getFormParams();
    }

    handleTaskType(value) {
        this.setState({
            type: value
        });
    }

    renderCronControl() {
        return (<div>
            <FormControl name='taskCron' label='cron:' type='text' placeholder='请输入cron' required/>
            <FormControl name='timeType' label='时间类型:' type='select' placeholder='请选择时间类型'
                         data={TIME_TYPE_MAP}
                         required/>
        </div>);
    }

    renderSingelControl() {
        return (<div>
            <FormControl name='startTime' label='起止时间:' type='daterange' placeholder='请输入起止时间'
                         required/>
            <FormControl name='timeType' label='时间类型:' type='select' placeholder='请选择时间类型'
                         data={TIME_TYPE_MAP}
                         required/>
        </div>);
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
                        <FormControl name='taskName' label='任务名称:' type='text' placeholder='请输入任务名称' required/>
                        <FormControl name='taskDesc' label='任务描述:' type='textarea' placeholder='请输入任务描述' required
                                     height={100}/>
                        <FormControl type='select'
                                     name='taskType'
                                     label='任务类型'
                                     placeholder='任务类型'
                                     data={TAST_TYPE_MAP}
                                     onChange={this.handleTaskType.bind(this)}
                                     required/>
                        <FormControl name='author' label='负责人:' type='text' placeholder='请输入负责人' required/>
                        <FormControl name='email' label='告警邮箱:' type='text' placeholder='请输入告警邮箱' required/>
                        {this.state.type === '0' ? this.renderCronControl() : this.renderSingelControl()}
                    </Form>
                </div>
            </SVGSpin>
        );
    }
}

export default Edit;

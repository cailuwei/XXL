import React from 'react';
import Form from 'r-cmui/components/Form';
import Spin from 'r-cmui/components/Spin';
import FormControl from 'r-cmui/components/FormControl';

const {SVGSpin} = Spin;

import 'r-cmui/components/Input';
import 'r-cmui/components/Select';
import 'r-cmui/components/DateRange';

class Edit extends React.Component {
    displayName = 'Edit';

    constructor (props) {
        super(props);

        this.state = {
            type: this.props.data['taskType']
        };
    }

    handleTaskType (value) {
        this.setState({
            type: value
        });
    }

    renderCronControl () {
        return (<div><FormControl name='cron' label='cron:' type='text' placeholder='cron' required/></div>);
    }

    renderSingelControl () {
        return (<div>
            <FormControl name='startTime' label='时间:' type='daterange' placeholder='起始时间'
                required/>
            <FormControl name='timeType' label='时间类型:' type='text' placeholder='时间类型'
                required/>
        </div>);
    }

    render () {
        // const {index} = this.props.task;
        return (
            <SVGSpin spinning={this.props.spinning}>
                <div style={{width: 500}}>
                    <Form ref={(ref) => this.form = ref}
                        labelWidth={85} layout='stack-inline' data={this.props.data}>
                        <FormControl name='taskName' label='任务名称:' type='text' placeholder='任务名称' required/>
                        <FormControl name='taskDescription' label='任务描述:' type='textarea' required
                            height={100}/>
                        <FormControl type='select'
                            name='taskType'
                            label='任务类型'
                            placeholder='任务类型'
                            data={[{id: '0', text: 'cron'}, {id: '1', text: '单次任务'}]}
                            onChange={this.handleTaskType.bind(this)}
                            required/>
                        <FormControl name='manager' label='负责人:' type='text' required/>
                        {this.state.type === '0' ? this.renderCronControl() : this.renderSingelControl()}
                    </Form>
                </div>
            </SVGSpin>
        );
    }
}

export default Edit;

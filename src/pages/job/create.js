import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Button from 'r-cmui/components/Button';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import 'r-cmui/components/Input';
import 'r-cmui/components/Select';
import 'r-cmui/components/DateRange';
import 'r-cmui/components/TextArea';
import 'r-cmui/components/RadioGroup';

import Spin from 'r-cmui/components/Spin';
const {SVGSpin} = Spin;

import 'r-cmui/components/Input';
import 'r-cmui/components/Select';
import 'r-cmui/components/DateRange';

class BaseForm extends React.Component {
    displayName = 'BaseForm';

    constructor (props) {
        super(props);

        this.state = {
            type: this.props.data['taskType']
        };
    }

    save = () => {
        if (this.form.isValid()) {
            const params = this.form.getFormParams();
            console.log(params);
            this.form.submit();
        }
    };

    handleProvinceChange (value) {
        this.setState({
            type: value
        });
    }

    render () {
        return (
        <SVGSpin spinning={this.props.spinning}>
            <div style={{width: 500}}>
                <Form ref={this.saveFormRef} ajax action='xxx' method='post' data={this.props.data} labelWidth={120} tiled useDefaultSubmitBtn={false}>
                    <Row>
                        <Col grid={{width: 0.5 , offset: 0.2}}>
                            <FormControl name='jobId' label='执行号:' type='select' placeholder='执行号' data={[{id: "0", text: "cron"},{id: "1", text: "单次任务"}]} required/>
                            <FormControl name='description' label='job描述:' type='textarea' required height={100}/>
                            <FormControl name='leader' type='text' label='负责人:'/>
                            <FormControl name='route' label='路由策略:' type='select' placeholder='路由策略' data={[{id: "0", text: "cron"},{id: "1", text: "单次任务"}]} required/>
                            <FormControl name='run' label='运行模式:' type='select' placeholder='运行模式' data={[{id: "0", text: "cron"},{id: "1", text: "单次任务"}]} required/>
                        </Col>
                    </Row>
                </Form>
            </div>
        </SVGSpin>
        );
    }
}
export default BaseForm;
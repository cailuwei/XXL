import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Button from 'r-cmui/components/Button';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import moment from 'moment';
import 'r-cmui/components/Input';
import 'r-cmui/components/Select';
import 'r-cmui/components/DateRange';
import 'r-cmui/components/TextArea';
import 'r-cmui/components/RadioGroup';

class BaseForm extends React.Component {
    displayName = 'BaseForm';

    state = {
        select : null
    };


    save = () => {
        if (this.form.isValid()) {
            const params = this.form.getFormParams();
            console.log(params);
            this.form.submit();
        }
    };

    handleProvinceChange = ( value ) => {
        this.setState({ select : value });
    };

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>组件管理</Breadcrumb.Item>
                    <Breadcrumb.Item>新增组件</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <Row>
                        <Col grid={{width: 0.6, offset: 0.2}}>
                            <Form ref={this.saveFormRef} ajax action='xxx' method='post' labelWidth={120} tiled useDefaultSubmitBtn={false}>
                                <Row>
                                    <Col grid={{width: 0.5}}>
                                        <FormControl name='title' label='任务名称:' type='text' placeholder='任务名称' required/>
                                        <FormControl name='startEndDate' label='任务描述:' type='textarea' required height={100}/>
                                        <FormControl onChange={this.handleProvinceChange} name='type' type='select' label='任务类型' data={[{id: "0", text: "cron"},{id: "1", text: "单次任务"}]}/>
                                        <FormControl name='invited' label='负责人:' type='text' />
                                    </Col>
                                    <Col grid={{width: 0.5}}>
                                        <div style={{'display':this.state.select === "0" ? 'block' : 'none'}}>
                                            <FormControl name='title' label='cron:' type='text' placeholder='cron'/>
                                        </div>
                                        <div style={{'display':this.state.select === "1" ? 'block' : 'none'}}>
                                            <FormControl name='title' label='起始时间:' type='text' placeholder='起始时间'/>
                                            <FormControl name='title' label='终止时间:' type='text' placeholder='终止时间'/>
                                            <FormControl name='title' label='时间类型:' type='text' placeholder='时间类型'/>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>

                            <div className='text-center mt-40'>
                                <Button theme='primary' className='mr-25' onClick={this.save}>保 存</Button>
                                <Button theme='default' className='ml-25'>取 消</Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        );
    }
}
export default BaseForm;
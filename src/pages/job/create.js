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
                    <Breadcrumb.Item>job管理</Breadcrumb.Item>
                    <Breadcrumb.Item>新增job</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <Row>
                        <Col grid={{width: 0.6, offset: 0.2}}>
                            <Form ref={this.saveFormRef} ajax action='xxx' method='post' labelWidth={120} tiled useDefaultSubmitBtn={false}>
                                <Row>
                                    <Col grid={{width: 0.5 , offset: 0.2}}>
                                        <FormControl name='title' label='执行号:' type='select' placeholder='执行号' data={[{id: "0", text: "cron"},{id: "1", text: "单次任务"}]} required/>
                                        <FormControl name='startEndDate' label='job描述:' type='textarea' required height={100}/>
                                        <FormControl name='type' type='text' label='负责人:'/>
                                        <FormControl name='title' label='路由策略:' type='select' placeholder='路由策略' data={[{id: "0", text: "cron"},{id: "1", text: "单次任务"}]} required/>
                                        <FormControl name='title' label='运行模式:' type='select' placeholder='运行模式' data={[{id: "0", text: "cron"},{id: "1", text: "单次任务"}]} required/>
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
import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Button from 'r-cmui/components/Button';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import 'r-cmui/components/Input';
import 'r-cmui/components/TextArea';
import 'r-cmui/components/Select';
import 'r-cmui/components/Switch';
import 'r-cmui/components/Upload';
import 'r-cmui/components/DateTime';
import 'r-cmui/components/DateRange';

import './styles.less';

class Advanced extends React.Component {
    displayName = 'Advanced';

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>表单页</Breadcrumb.Item>
                    <Breadcrumb.Item>高级表单</Breadcrumb.Item>
                </Breadcrumb>

                <Form action='xxx' ajax labelWidth={80} layout='stack' tiled useDefaultSubmitBtn={false}>
                    <Card className='mt-30' title='仓库管理'>
                        <Row>
                            <Col grid={{width: 0.23333, offset: 0.05}}>
                                <FormControl label='仓库名' name='name' type='text' />
                            </Col>
                            <Col grid={{width: 0.23333, offset: 0.1}}>
                                <FormControl label='仓库域名' name='domain' type='text'  placeholder='asdasdas'/>
                            </Col>
                            <Col grid={{width: 0.23333, offset: 0.1}}>
                                <FormControl label='仓库管理员' name='manager' type='select'  data={['爱仕达','了空间']}/>
                            </Col>
                            <Col grid={{width: 0.23333, offset: 0.05}}>
                                <FormControl label='审批人' name='checker' type='select' data={['爱仕达','了空间']}/>
                            </Col>
                            <Col grid={{width: 0.23333, offset: 0.1}}>
                                <FormControl label='生效日期' name='daterange' type='daterange' />
                            </Col>
                            <Col grid={{width: 0.23333, offset: 0.1}}>
                                <FormControl label='仓库类型' name='type' type='select'  data={['公开','私密']}/>
                            </Col>
                        </Row>
                    </Card>

                    <Card title='任务管理' className='mt-30'>
                        <Row>
                            <Col grid={{width: 0.23333, offset: 0.05}}>
                                <FormControl label='任务名' name='taskName' type='text' />
                            </Col>
                            <Col grid={{width: 0.23333, offset: 0.1}}>
                                <FormControl label='任务描述' name='taskDesc' type='text' />
                            </Col>
                            <Col grid={{width: 0.23333, offset: 0.1}}>
                                <FormControl label='执行人' name='taskPeople' type='select' data={['爱仕达','了空间']}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col grid={{width: 0.23333, offset: 0.05}}>
                                <FormControl label='责任人' name='taskMain' type='select' data={['爱仕达','了空间']} />
                            </Col>
                            <Col grid={{width: 0.23333, offset: 0.1}}>
                                <FormControl label='生效日期' name='taskStartDate' type='datetime' dateOnly/>
                            </Col>
                            <Col grid={{width: 0.23333, offset: 0.1}}>
                                <FormControl label='任务类型' name='taskType' type='select' data={['公开','私密']}/>
                            </Col>
                        </Row>
                    </Card>
                </Form>

                <div className='text-center mt-40'>
                    <Button className='mr-15' theme='primary'>提 交</Button>
                    <Button className='ml-15'>取 消</Button>
                </div>
            </div>
        );
    }
}
export default Advanced;

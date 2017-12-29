import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Button from 'r-cmui/components/Button';
import SimpleListPage from 'r-cmui/components/Business/SimpleListPage';
import 'r-cmui/components/DateRange';
import 'r-cmui/components/TextArea';
import 'r-cmui/components/RadioGroup';
import API from '../../configs/api';

class BaseForm extends React.Component {
    displayName = 'BaseForm'

    checkLogInfo(id){
        console.log(id);
    }

    render() {
        const single = [
            {name: 'taskInstId', text: '实例Id'},
            {name: 'id', text: 'job-id'},
            {name: 'handleTime', text: '执行时间'},
            {name: 'handleMsg', text: '调度备注'},
            {
                name: 'handleCode', text: '执行结果', format: (value) => {
                return ['成功', '正在执行', '失败'][value+1];
            }
            },
            {name: 'executorParam', text: '执行参数'},
            {
                name: 'op', text: '操作', style: {width: "150px"}, format: (value, column, row) => {
                return <span>
                <Button theme='primary' className='mr-5'
                        onClick={this.checkLogInfo.bind(this, row.id)} >日志</Button>
            </span>;
            }
            }
        ];

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>job日志</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <SimpleListPage pagination
                                    columns={single}
                                    action={API.LOG['JOB_LIST']}/>
                </Card>
            </div>
        );
    }
}

export default BaseForm;
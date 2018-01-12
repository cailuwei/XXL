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

    checkLogInfo(row) {
        window.open(API.LOG_HTML + `?id=${row.id}`);
    }

    render() {
        const taskInstId = this.props.match.params.taskInstId;
        const single = [
            {name: 'taskInstId', text: '实例ID', style: {width: '120px'}},
            {name: 'id', text: 'jobID', style: {width: '120px'}},
            {name: 'handleTime', text: '执行时间'},
            {
                name: 'triggerMsg', text: '调度备注', format: (value) => {
                return <div className='ellipsis cur-pointer' title={value} style={{width: '200px'}}>{value}</div>;
            }
            },
            {
                name: 'handleCode', text: '执行结果', format: (value) => {
                const map = {
                    200: '成功',
                    500: '失败'
                };
                return map[value];
            }
            },
            {name: 'executorParam', text: '执行参数'},
            {
                name: 'op', text: '操作', style: {width: "150px"}, format: (value, column, row) => {
                return <span>
                <Button theme='primary' className='mr-5'
                        onClick={this.checkLogInfo.bind(this, row)}>日志</Button>
            </span>;
            }
            }
        ];

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>任务管理</Breadcrumb.Item>
                    <Breadcrumb.Item>任务日志</Breadcrumb.Item>
                    <Breadcrumb.Item>job日志</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <SimpleListPage pagination
                                    searchParams={{taskInstId}}
                                    columns={single}
                                    action={API.LOG['JOB_LIST']}/>
                </Card>
            </div>
        );
    }
}

export default BaseForm;
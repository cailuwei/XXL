import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Button from 'r-cmui/components/Button';
import SimpleListPage from 'r-cmui/components/Business/SimpleListPage';
import MessageBox from 'r-cmui/components/MessageBox';
import 'r-cmui/components/DateRange';
import 'r-cmui/components/TextArea';
import 'r-cmui/components/RadioGroup';
import {inject, observer} from 'mobx-react';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../../configs/api';

@inject('routing')
@observer
class BaseForm extends React.Component {
    displayName = 'BaseForm';

    state = {
        disabled: false
    };

    btns = {};
    timeParams = [];

    handlerLog(id) {
        const {push} = this.props.routing;
        push(`/log/job/${id}`);
    }

    handlerSetup(row) {
        this.reConfirm.show('确认重新执行该实例？');
        this.reConfirm.setData(row);
    }

    reJob = async (flag) => {
        if (flag) {
            const row = this.reConfirm.getData();
            const taskInstId = row.id;
            this.btns['btn-' + row.taskInstStatus + '-' + row.timeParam + '-' + row.id].disable();

            const resp = await fetch(API.LOG['RE_IMPL'], {taskInstId}, 'post', () => {
                this.btns['btn-' + row.taskInstStatus + '-' + row.timeParam + '-' + row.id].enable();
            });
            if (resp && resp.success) {
                this.tip.show('执行成功！');
                this.table.refresh();
            } else {
                this.tip.show(resp.message || '删除失败');
            }

            this.btns['btn-' + row.taskInstStatus + '-' + row.timeParam + '-' + row.id].enable();
        }
        return true;
    }

    afterRequest() {
        for (const key in this.btns) {
            const obj = this.btns[key];
            const arr = key.split('-');
            for (var i = 0; i < this.timeParams.length; i++) {
                if (arr[2] === this.timeParams[i]) {
                    obj.disable();
                }
            }
        }
    }

    render() {
        const taskId = this.props.match.params.taskId;
        const single = [
            {name: 'id', text: '实例ID', style: {width: '120px'}},
            {name: 'startTime', text: '执行时间'},
            {name: 'endTime', text: '结束时间'},
            {name: 'doneJobs', text: '已完成job'},
            {name: 'failJobs', text: '失败job'},
            {name: 'timeParam', text: '时间参数'},
            {
                name: 'taskInstStatus', text: '执行状态', format: (value) => {
                return ['待执行', '正在执行', '执行失败', '执行成功并结'][value];
            }
            },
            {
                name: 'op', text: '操作', style: {width: "250px"}, format: (value, column, row) => {
                let btn = null;
                if (row.taskInstStatus === 1) {
                    this.timeParams.push(row.timeParam);
                    btn = <Button theme='primary' className='mr-5' disabled>重新执行</Button>;
                } else {
                    btn = <Button theme='primary' className='mr-5'
                                  ref={(f) => this.btns['btn-' + row.taskInstStatus + '-' + row.timeParam + '-' + row.id] = f}
                                  onClick={this.handlerSetup.bind(this, row)}>重新执行</Button>
                }
                return <span>
                    {btn}
                    <Button theme='primary' className='mr-5'
                            onClick={this.handlerLog.bind(this, row.id)}>job日志</Button>
                </span>;
            }
            }
        ];

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>任务日志</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <SimpleListPage ref={(f) => this.table = f}
                                    searchParams={{taskId}}
                                    pagination
                                    afterRequest={this.afterRequest.bind(this)}
                                    columns={single}
                                    action={API.LOG['TASK_LIST']}/>
                </Card>

                <MessageBox ref={(f) => this.reConfirm = f} title='提示' type='confirm' confirm={this.reJob}/>
                <MessageBox ref={(f) => this.tip = f} title='提示'/>
            </div>
        );
    }
}

export default BaseForm;
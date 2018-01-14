import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import Button from 'r-cmui/components/Button';
import MessageBox from 'r-cmui/components/MessageBox';
import Dialog from 'r-cmui/components/Dialog';
import SimpleListPage from 'r-cmui/components/Business/SimpleListPage';
import {inject, observer} from 'mobx-react';
import API from '../../configs/api';

import 'r-cmui/components/Input';
import 'r-cmui/components/Select';

import EditForm from './Form';

@inject('routing')
@inject('task')    // 链接store，使得stores可以作为组建的props使用
@observer          // 确保任何组件渲染中使用的数据变化时都可以强制刷新组件
class BaseForm extends React.Component {
    displayName = 'BaseForm';

    handlerToggelSTatus(id, op) {
        this.statusConfirm.show('确认' + (op === 'start' ? '启动' : '暂停') + '该任务？');
        this.statusConfirm.setData({
            id,
            op
        });
    }

    handlerStartUp(id) {
        this.statusConfirm.show('确认启动该任务？');
        this.statusConfirm.setData({
            id
        });
    }

    handlerDelete(id) {
        this.delConfirm.show('确认删除该任务？');
        this.delConfirm.setData({
            id
        });
    }

    onDelConfirm = async (flag) => {
        if (flag) {
            const id = this.delConfirm.getData().id;

            const {task} = this.props;
            const ret = await task.deleteTask(id);
            if (ret && ret.success) {
                this.tip.show('删除成功');
                this.table.refresh();
            } else {
                this.tip.show(ret.message || '删除失败');
            }
        }
    }

    onStatusConfirm = async (flag) => {
        if (flag) {
            const id = this.statusConfirm.getData().id;
            const op = this.statusConfirm.getData().op;

            const {task} = this.props;
            const ret = op ? await task.toggelTaskStatus(id, op) : await task.startTask(id);
            if (ret && ret.success) {
                this.tip.show((op ? op === 'start' ? '启动' : '暂停' : '启动') + '成功');
                this.table.refresh();
            } else {
                this.tip.show(ret.message || '状态修改失败');
            }
        }
    }

    handlerLog(id) {
        const {push} = this.props.routing;
        push(`/log/task/${id}`);
    }

    handlerTaskIns(id) {
        const {push} = this.props.routing;
        push(`/schedule/index/${id}`);
    }

    handlerCreate = () => {
        const task = this.props.task;
        task.initAddFormData();
        this.editDialog.open();
    };

    handlerEdit = async (row) => {
        const task = this.props.task;
        // /* 异步请求编辑信息*/
        // task.fecthTaskDetail(id);
        task.setTaskInfo(row);
        /* 打开编辑框*/
        this.editDialog.open();
    }

    updateTask = async () => {
        const {task} = this.props;
        const params = this.editForm.getParams();
        if (params.id) {
            const resp = await task.updateTask(params);
            if (resp && resp.success) {
                this.tip.show('编辑成功');
                this.table.refresh();
                this.editDialog.close();
            } else {
                this.tip.show(resp.message || '编辑失败');
            }
        } else {
            const resp = await task.putTask(params);
            if (resp && resp.success) {
                this.tip.show('保存成功');
                // this.handlerTaskTypeChange(params.taskType);
                this.table.refresh();
                this.editDialog.close();
            } else {
                this.tip.show(resp.message || '保存失败');
            }
        }
    }

    handlerSave = (flag) => {
        if (flag) {
            if (this.editForm.isValid()) {
                this.updateTask();
            }
            return false;
        }
        return true;
    }

    handlerTaskTypeChange(value) {
        const task = this.props.task;
        task.handlerTaskTypeChange(value);
    }

    renderCronButtons(row) {
        const logBtn = <Button theme='primary' className='mr-5'
                               onClick={this.handlerLog.bind(this, row.id)}>日志</Button>;
        const _logBtn = <Button theme='primary' className='mr-5' disabled>日志</Button>;
        const editBtn = <Button theme='primary' className='mr-5' onClick={this.handlerEdit.bind(this, row)}>编辑</Button>;
        const _editBtn = <Button theme='primary' className='mr-5' disabled>编辑</Button>;
        const deleteBtn = <Button theme='danger' className='mr-5'
                                  onClick={this.handlerDelete.bind(this, row.id)}>删除</Button>;
        const _deleteBtn = <Button theme='danger' className='mr-5' disabled>删除</Button>;
        const intBtn = <Button theme='primary' className='mr-5'
                               onClick={this.handlerTaskIns.bind(this, row.id)}>组件管理</Button>;
        const _intBtn = <Button theme='primary' className='mr-5' disabled>组件管理</Button>;
        const goBtn = <Button theme='primary' className='mr-5'
                              onClick={this.handlerToggelSTatus.bind(this, row.id, 'start')}>启动</Button>;
        const noBtn = <Button theme='primary' className='mr-5'
                              onClick={this.handlerToggelSTatus.bind(this, row.id, 'pause')}>暂停</Button>;

        switch (row.taskStatus) {
            case 0:
                return (<span>{goBtn}{editBtn}{deleteBtn}{intBtn}{_logBtn}</span>);
            case 1:
                return (<span>{noBtn}{_editBtn}{_deleteBtn}{_intBtn}{logBtn}</span>);
            case 2:
                return (<span>{goBtn}{editBtn}{deleteBtn}{intBtn}{logBtn}</span>);
            default:
                return '';
        }
    }

    renderSingleButtons(row) {
        const logBtn = <Button theme='primary' className='mr-5'
                               onClick={this.handlerLog.bind(this, row.id)}>日志</Button>;
        const _logBtn = <Button theme='primary' className='mr-5' disabled>日志</Button>;
        const editBtn = <Button theme='primary' className='mr-5' onClick={this.handlerEdit.bind(this, row)}>编辑</Button>;
        const _editBtn = <Button theme='primary' className='mr-5' disabled>编辑</Button>;
        const deleteBtn = <Button theme='danger' className='mr-5'
                                  onClick={this.handlerDelete.bind(this, row.id)}>删除</Button>;
        const _deleteBtn = <Button theme='danger' className='mr-5' disabled>删除</Button>;
        const intBtn = <Button theme='primary' className='mr-5'
                               onClick={this.handlerTaskIns.bind(this, row.id)}>组件管理</Button>;
        const _intBtn = <Button theme='primary' className='mr-5' disabled>组件管理</Button>;

        switch (row.taskStatus) {
            case 0:
                return (
                    <span><Button theme='primary' className='mr-5'
                                  onClick={this.handlerStartUp.bind(this, row.id)}>启动</Button>
                        {editBtn}{deleteBtn}{intBtn}{_logBtn}</span>);
            case 1:
                return (<span><Button theme='primary' className='mr-5'
                                      disabled>重新启动</Button>
                    {_editBtn}{_deleteBtn}{_intBtn}{logBtn}</span>);
            case 2:
                return (
                    <span><Button theme='primary' className='mr-5'
                                  onClick={this.handlerStartUp.bind(this, row.id)}>重新启动</Button>
                        {editBtn}{deleteBtn}{intBtn}{logBtn}</span>);
            default:
                return '';
        }
    }

    renderCronTable() {
        const cron = [
            {name: 'id', text: '任务ID', style: {width: '120px'}},
            {name: 'taskName', text: '任务名称'},
            {name: 'taskDesc', text: '描述'},
            {name: 'taskCron', text: 'cron'},
            {
                name: 'timeType', text: '时间类型', format: (value) => {
                return ['月', '周', '日', '小时', '分钟'][value - 1];
            }
            },
            {name: 'author', text: '负责人'},
            {
                name: 'alarmEmails', text: '告警邮箱', format: (value) => {
                return <div className='ellipsis cur-pointer' title={value} style={{width: '150px'}}>{value}</div>;
            }
            },
            {
                name: 'taskStatus', text: '状态', style: {width: '120px'}, format: (value) => {
                return ['未启动', '运行中', '停止'][value];
            }
            },
            {
                name: 'op', text: '操作', style: {width: '350px'}, format: (value, column, row) => {
                return this.renderCronButtons(row);
            }
            }
        ];
        return <SimpleListPage key='cron'
                               ref={(f) => this.table = f}
                               condition={() => this.condition}
                               pagination
                               columns={cron}
                               action={API.TASK['LIST']}/>;
    }

    renderSingleTable() {
        const single = [
            {name: 'id', text: '任务ID', style: {width: '120px'}},
            {name: 'taskName', text: '任务名称'},
            {name: 'taskDesc', text: '描述'},
            {name: 'startTime', text: '起始时间'},
            {name: 'endTime', text: '终止时间'},
            {
                name: 'timeType', text: '时间类型', format: (value) => {
                return ['月', '周', '日', '小时', '分钟'][value - 1];
            }
            },
            {name: 'author', text: '负责人'},
            {
                name: 'alarmEmails', text: '告警邮箱', format: (value) => {
                return <div className='ellipsis cur-pointer' title={value} style={{width: '150px'}}>{value}</div>;
            }
            },
            {
                name: 'op', text: '操作', style: {width: '400px'}, format: (value, column, row) => {
                return this.renderSingleButtons(row);
            }
            }
        ];
        return <SimpleListPage key='single'
                               ref={(f) => this.table = f}
                               condition={() => this.condition}
                               pagination
                               columns={single}
                               action={API.TASK['LIST']}/>;
    }

    render() {
        // const doday = moment().format('YYYY-MM-DD');
        const task = this.props.task;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>任务管理</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <Form className='search-wrap mb-10' ref={(f) => this.condition = f}>
                        <FormControl label='任务类型' type='select' name='taskType'
                                     value={task.getSelectData()[0].id}
                                     data={[...task.getSelectData()]}
                                     onChange={this.handlerTaskTypeChange.bind(this)}/>
                        <Button theme='primary' style={{'float': 'right'}} icon='plus'
                                onClick={this.handlerCreate}>添加任务</Button>
                    </Form>
                    {task.getTaskType() === '0' ? this.renderCronTable() : this.renderSingleTable()}
                </Card>

                <Dialog key={'edit-${task.editTaskType}'}
                        title={task.taskInfo.id ? '编辑任务' : '添加任务'}
                        ref={(ref) => this.editDialog = ref}
                        content={<EditForm data={task.taskInfo}
                                           ref={(ref) => this.editForm = ref}
                                           spinning={task.isFetching}/>}
                        hasFooter
                        onConfirm={this.handlerSave}/>;

                <MessageBox ref={(f) => this.delConfirm = f} title='提示' type='confirm'
                            confirm={this.onDelConfirm.bind(this)}/>
                <MessageBox ref={(f) => this.statusConfirm = f} title='提示' type='confirm'
                            confirm={this.onStatusConfirm.bind(this)}/>
                <MessageBox ref={(f) => this.tip = f} title='提示'/>
            </div>
        );
    }
}

export default BaseForm;

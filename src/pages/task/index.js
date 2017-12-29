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

    handlerStartUp(id) {
        this.confirm.show('确认切换任务状态？');
        this.confirm.setData({
            id,
            op: 'toggle'
        });
    }

    handlerDelete(id) {
        this.confirm.show('确认删除该任务？');
        this.confirm.setData({
            id,
            op: 'delete'
        });
    }

    onConfirm = async (flag) => {
        if (flag) {
            const id = this.confirm.getData().id;
            const op = this.confirm.getData().op;

            const {task} = this.props;
            const resp = op === 'delete' ? await task.deleteTask(id) : await task.toggelTaskStatus(id);
            if (resp && resp.success) {
                this.tip.show(op === 'delete' ? '删除成功！' : '切换状态成功！');
                this.table.refresh();
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
        this.addDialog.open();
    };

    handlerAdd = async (flag) => {
        if (flag) {
            if (this.addForm.isValid()) {
                const {task} = this.props;
                const resp = await task.putTask(this.addForm.getParams());
                if (resp.success) {
                    this.tip.show('保存成功！');
                    this.table.refresh();
                    this.addDialog.close();
                }
            }
        }
        return true;
    }

    handlerEdit = async (id) => {
        const task = this.props.task;
        /* 异步请求编辑信息*/
        task.getTaskDetailInfo(id);
        /* 打开编辑框*/
        this.editDialog.open();
    }

    handlerSave = async (flag) => {
        if (flag) {
            if (this.editForm.isValid()) {
                const {task} = this.props;
                const resp = await task.updateTask(this.editForm.getParams());
                if (resp.success) {
                    this.tip.show('保存成功！');
                    this.table.refresh();
                    this.editDialog.close();
                }
            }
            return false;
        }
        return true;
    }

    handlerTaskTypeChange(value) {
        const task = this.props.task;
        task.handlerTaskTypeChange(value);
    }

    renderButtons(row) {
        return (<span>
            <Button theme='primary' className='mr-5'
                    onClick={this.handlerLog.bind(this, row.id)}>日志</Button>
            <Button theme='primary' className='mr-5'
                    onClick={this.handlerEdit.bind(this, row.id)}>编辑</Button>
            <Button theme='danger' className='mr-5'
                    onClick={this.handlerDelete.bind(this, row.id)}>删除</Button>
            <Button theme='primary' className='mr-5'
                    onClick={this.handlerTaskIns.bind(this, row.id)}>组件管理</Button>
        </span>);
    }

    renderStatus(row) {
        return (
            <span>
            <a className={'text-blue mr-5'} href='javascript:void(0)'
               onClick={this.handlerStartUp.bind(this, row.id)}>启动</a>|
            <a className={'text-blue ml-5'} href='javascript:void(0)'
               onClick={this.handlerStartUp.bind(this, row.id)}>禁用</a>
        </span>);
    }

    renderCronTable() {
        const cron = [
            {name: 'id', text: '任务ID', type: 'index', style: {width: '70px'}},
            {name: 'taskName', text: '任务名称'},
            {name: 'description', text: '描述'},
            {name: 'cron', text: 'cron'},
            {
                name: 'timeType', text: '时间类型', format: (value) => {
                return ['月', '周', '日', '小时', '分钟'][value];
            }
            },
            {name: 'author', text: '负责人', style: {width: '150px'}},
            {name: 'email', text: '告警邮箱', style: {width: '150px'}},
            {
                name: 'taskStatus', text: '状态', format: (value, column, row) => {
                return this.renderStatus(row);
            }
            },
            {
                name: 'op', text: '操作', style: {width: '300px'}, format: (value, column, row) => {
                return this.renderButtons(row);
            }
            }
        ];
        return <SimpleListPage key='cron'
                               ref={(f) => this.table = f}
                               pagination
                               columns={cron}
                               action={API.TASK['LIST']}/>;
    }

    renderSingleTable() {
        const single = [
            {name: 'id', text: '任务ID', type: 'index', style: {width: '70px'}},
            {name: 'taskName', text: '任务名称'},
            {name: 'description', text: '描述'},
            {name: 'startTime', text: '起始时间'},
            {name: 'endTime', text: '终止时间'},
            {
                name: 'timeType', text: '时间类型', format: (value) => {
                return ['月', '周', '日', '小时', '分钟'][value];
            }
            },
            {name: 'author', text: '负责人'},
            {name: 'email', text: '告警邮箱', style: {width: '150px'}},
            {
                name: 'op', text: '操作', style: {width: '300px'}, format: (value, column, row) => {
                return this.renderButtons(row);
            }
            }
        ];
        return <SimpleListPage key='single'
                               ref={(f) => this.table = f}
                               pagination
                               columns={single}
                               action={API.TASK['LIST']}/>;
    }

    renderEditModal() {
        const task = this.props.task;

        return <Dialog key={'edit-${task.editTaskType}'}
                       title='' ref={(ref) => this.editDialog = ref}
                       content={<EditForm data={task.taskInfo}
                                          ref={(ref) => this.editForm = ref}
                                          spinning={task.isFetching}/>}
                       hasFooter
                       onConfirm={this.handlerSave}/>;
    }

    renderAddModal() {
        const task = this.props.task;

        return <Dialog key={'add-${task.editTaskType}'}
                       title='' ref={(ref) => this.addDialog = ref}
                       content={<EditForm data={task.taskInfo}
                                          ref={(ref) => this.addForm = ref}/>}
                       hasFooter
                       onConfirm={this.handlerAdd}/>;
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
                                     className='searchItem'
                                     value={task.getSelectData()[0].id}
                                     data={[...task.getSelectData()]}
                                     onChange={this.handlerTaskTypeChange.bind(this)}/>
                        <FormControl type='hidden' name='start' className="searchItem"/>
                        <Button theme='primary' style={{'float': 'right'}}
                                onClick={this.handlerCreate}>新增</Button>
                    </Form>
                    {task.getTaskType() === '0' ? this.renderCronTable() : this.renderSingleTable()}
                </Card>

                {this.renderEditModal()}
                {this.renderAddModal()}

                <MessageBox ref={(f) => this.confirm = f} title='提示' type='confirm'
                            confirm={this.onConfirm.bind(this)}/>
                <MessageBox ref={(f) => this.tip = f} title='提示'/>
            </div>
        );
    }
}

export default BaseForm;

import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Select from 'r-cmui/components/Select';
import Button from 'r-cmui/components/Button';
import MessageBox from 'r-cmui/components/MessageBox';
import Dialog from 'r-cmui/components/Dialog';
import SimpleListPage from 'r-cmui/components/Business/SimpleListPage';
import {inject, observer} from 'mobx-react';
import fetch from 'r-cmui/components/utils/fetch';

import Edit from './edit';

@inject('dashboard')
@inject('task')    // 链接store，使得stores可以作为组建的props使用
@observer          // 确保任何组件渲染中使用的数据变化时都可以强制刷新组件
class BaseForm extends React.Component {
    displayName = 'BaseForm';

    urls = {
        'list': 'http://172.18.34.66:8415/mock/xxl/taskManage/list',
        'delete': 'http://172.18.34.66:8415/mock/xxl/taskManage/delete',
        'start': 'http://172.18.34.66:8415/mock/xxl/taskManage/start',
        'save': 'http://172.18.34.66:8415/mock/xxl/taskManage/save'
    };

    handlerEdit = async (taskId) => {
        const task = this.props.task;
        /*异步请求编辑信息*/
        task.getTaskDetailInfo(taskId, () => {
            console.log(33333);
        });
        /*打开编辑框*/
        this.edit.open();
    }

    handlerStartUp = async (taskId) => {
        const resp = await fetch(this.urls['start'], {taskId: taskId});
        if (resp.successSign) {
            this.refs.tip.show('启动成功！');
        }
    }

    handlerDelete = async (taskId) => {
        const resp = await fetch(this.urls['delete'], {taskId: taskId});
        if (resp.successSign) {
            this.refs.tip.show('删除成功！');
        }
    }

    handlerLog = async (taskId) => {
        const task = this.props.task;
        task.getTaskDetailInfo(taskId, () => {
            console.log(33333);
        });
        this.log.open();
    }

    handlerTaskIns = async (taskId) => {
        console.log(taskId);
    }

    handlerSave = async (flag) => {
        if (flag) {
            const form = this.edit.props.children;
            if (form.isValid()) {
                const resp = await fetch(this.urls['save'], form.getFormParams());
                if (resp.successSign) {
                    this.refs.tip.show('保存成功！');
                }
            }
        }
        return true;
    }

    handlerTaskTypeChange (value) {
        const task = this.props.task;
        task.handlerTaskTypeChange(value);
    }

    renderButtons(row) {
        return (<span>
            <Button theme='primary' size='small' className='mr-5' data-id="'+row.id+'"
                    onClick={this.handlerStartUp.bind(this, row.taskId)}>启动</Button>
            <Button theme='primary' size='small' className='mr-5' data-id="'+row.id+'"
                    onClick={this.handlerLog.bind(this, row.taskId)}>日志</Button>
            <Button theme='primary' size='small' className='mr-5' data-id="'+row.id+'"
                    onClick={this.handlerEdit.bind(this, row.taskId)}>编辑</Button>
            <Button theme='danger' size='small' className='mr-5' data-id="'+row.id+'"
                    onClick={this.handlerDelete.bind(this, row.taskId)}>删除</Button>
            <Button theme='primary' size='small' className='mr-5' data-id="'+row.id+'"
                    onClick={this.handlerTaskIns.bind(this, row.taskId)}>组件管理</Button>
        </span>)
    }

    renderCronTable () {
        const cron = [
            {name: 'taskId', text: '任务ID', type: 'index', style: {width: '70px'}},
            {name: 'taskName', text: '任务名称'},
            {name: 'description', text: '描述'},
            {name: 'cron', text: 'cron'},
            {name: 'manager', text: '负责人', style: {width: '150px'}},
            {
                name: 'status', text: '状态', format (value) {
                    return ['禁用', '激活'][value];
                }
            },
            {
                name: 'op', text: '操作', style: {width: '260px'}, format: (value, colunmn, row) => {
                    return this.renderButtons(row);
                }
            }
        ];
        return <SimpleListPage key='cron'
            pagination
            columns={cron}
            action={this.urls['list']} />;
    }

    renderSingleTable () {
        const single = [
            {name: 'taskId', text: '任务ID', type: 'index', style: {width: '70px'}},
            {name: 'taskName', text: '任务名称'},
            {name: 'description', text: '描述'},
            {name: 'endTime', text: '终止时间'},
            {
                name: 'status', text: '时间类型', format (value) {
                    return ['禁用', '激活'][value];
                }
            },
            {name: 'manager', text: '负责人'},
            {
                name: 'op', text: '操作', style: {width: '260px'}, format: (value, colunmn, row) => {
                    return this.renderButtons(row);
                }
            }
        ];
        return <SimpleListPage key='single'
            pagination
            columns={single}
            action={this.urls['list']} />;
    }

    renderEditModal () {
        const task = this.props.task;

        return <Dialog key={'edit-${task.editTaskType}'}
            title='编辑' ref={(ref) => this.edit = ref}
            hasFooter
            onConfirm={this.handlerSave} content={<Edit data={task.taskInfo} spinning={task.isFetching}/>}>
        </Dialog>;
    }

    renderLogModal () {
        return <Dialog key={'log'}
                       title='查看日志'
                       ref={(ref) => this.log = ref} >
            <p>@@@@@@@@@@@@@@@@@@@@日志信息@@@@@@@@@@@@@@@@@</p>
        </Dialog>;
    }

    render () {
        // const doday = moment().format('YYYY-MM-DD');
        const task = this.props.task;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>任务管理</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <div className='search-wrap mb-10'>
                        <label className='cm-button default cm-button-active'>任务类型</label>
                        <Select value='0'
                            name='taskType'
                            data={task.getSelectData()} className='searchItem'
                            onChange={this.handlerTaskTypeChange.bind(this)}/>
                    </div>
                    {task.getTaskType() === '0' ? this.renderCronTable() : this.renderSingleTable()}
                </Card>

                {this.renderLogModal()}
                {this.renderEditModal()}
                <MessageBox title='提示' ref='tip'/>
            </div>
        );
    }
}

export default BaseForm;

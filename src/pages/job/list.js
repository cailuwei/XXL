import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Button from 'r-cmui/components/Button';
import SimpleListPage from 'r-cmui/components/Business/SimpleListPage';
import 'r-cmui/components/DateRange';
import 'r-cmui/components/TextArea';
import 'r-cmui/components/RadioGroup';
import {inject, observer} from 'mobx-react';
import fetch from 'r-cmui/components/utils/fetch';
import Dialog from 'r-cmui/components/Dialog';

import Edit from './create';

@inject('dashboard')
@inject('job')    // 链接store，使得stores可以作为组建的props使用
@observer          // 确保任何组件渲染中使用的数据变化时都可以强制刷新组件
class List extends React.Component {
    displayName = 'List';
    chooseTaskId = 'test';

    urls = {
        'list': 'http://172.18.34.66:8415/mock/xxl/taskManage/list',
        'delete': 'http://172.18.34.66:8415/mock/xxl/taskManage/delete',
        'start': 'http://172.18.34.66:8415/mock/xxl/taskManage/start',
        'save': 'http://172.18.34.66:8415/mock/xxl/taskManage/save'
    };

    choose = async (flag) => {
        if (flag) {
            this.handlerCreate();
        }else {
            this.handlerEdit(this.chooseTaskId)
        }
    }

    openEditTip = (taskId) => {
        this.chooseTaskId = taskId;
        this.editTip.open();
    }

    handlerEdit = async (taskId) => {
        const job = this.props.job;
        /*异步请求编辑信息*/
        job.getJobDetailInfo(taskId, () => {
            console.log(33333);
        });
        /*打开编辑框*/
        this.edit.open();
    }

    handlerCreate = () => {
        const job = this.props.job;
        job.setJobInfo();
        this.edit.open();
    };

    renderButtons(row) {
        return (<span>
                <Button theme='primary'  size='small' className='mr-5' data-id="'+row.id+'" onClick={this.openEditTip.bind(this, row.taskId)}>编辑</Button>
                <Button theme='default'  size='small' className='mr-5' data-id="'+row.id+'">运行模式内容修改</Button>
                <Button theme='danger'  size='small' className='mr-5' data-id="'+row.id+'">删除</Button>
            </span>)
    }

    renderTable () {
        const cron = [
            {name: 'jobId', text: 'job-id', type: 'index', style:{ width:"70px" }},
            {name: 'taskName', text: 'job描述'},
            {name: 'description', text: '执行器'},
            {name: 'cron', text: '路由器'},
            {name: 'createTime', text: '运行模式'},
            {name: 'op', text: '操作', style:{ width:"250px"}, format: ( value, colunmn, row ) => {
                return this.renderButtons(row);
            }}
        ];
        return <SimpleListPage key='cron'
                               pagination
                               columns={cron}
                               action={this.urls['list']} />;
    }

    renderEditModal () {
        const job = this.props.job;

        return <Dialog
            key={'edit-${job.editJobType}'}
            title='编辑'
            ref={(ref) => this.edit = ref}
            hasFooter
            onConfirm={this.handlerSave}
            content={<Edit data={job.jobInfo}
            spinning={job.isFetching}/>}>
        </Dialog>;
    }

    renderEditTipModal () {
        return <Dialog
            key={'edit-tip-${job.editJobType}'}
            title='提示'
            ref={(ref) => this.editTip = ref}
            hasFooter
            onConfirm={this.choose}
            content={"是否新增job"}>
        </Dialog>;
    }

    render () {
        // const doday = moment().format('YYYY-MM-DD');
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>job日志</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    {this.renderTable()}
                    {this.renderEditModal()}
                    {this.renderEditTipModal()}
                </Card>
            </div>
        );
    }
}
export default List;
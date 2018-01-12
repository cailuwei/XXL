import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Button from 'r-cmui/components/Button';
import SimpleListPage from 'r-cmui/components/Business/SimpleListPage';
import {inject, observer} from 'mobx-react';
import Dialog from 'r-cmui/components/Dialog';
import MessageBox from 'r-cmui/components/MessageBox';
import API from '../../configs/api';
import Form from './Form';

@inject('job')    // 链接store，使得stores可以作为组建的props使用
@observer          // 确保任何组件渲染中使用的数据变化时都可以强制刷新组件
class List extends React.Component {
    displayName = 'List';

    cron = [
        {name: 'id', text: 'jobID', style: {width: '120px'}},
        {name: 'jobName', text: 'job名称', style: {width: '120px'}},
        {
            name: 'jobDesc', text: 'job描述', tip: true, format: (value) => {
            return <div className='ellipsis cur-pointer' title={value} style={{width: '300px'}}>{value}</div>;
        }
        },
        {
            name: 'jobGroup', text: '执行器', format: (value) => {
            return this.props.job.jobGroupMaps[value];
        }
        },
        {name: 'executorRouteStrategy', text: '路由策略'},
        // {name: 'glueType', text: '运行模式'},
        {
            name: 'op', text: '操作', style: {width: '250px'}, format: (value, colunmn, row) => {
            return this.renderButtons(row);
        }
        }
    ];

    componentWillMount() {
        const {job} = this.props;
        job.getListInfo();
    }

    openNewTab(id) {
        window.open(API.CODE_HTML + `?jobId=${id}`);
    }

    openDeleteConfirm(id) {
        this.deleteConfirm.show('确认删除该Job？');
        this.deleteConfirm.setData(id);
    }

    deleteJob = async (flag) => {
        if (flag) {
            const id = this.deleteConfirm.getData();
            const {job} = this.props;
            const ret = await job.deleteJob(id);
            if (ret && ret.success) {
                this.tip.show('删除成功');
                this.table.refresh();
            } else {
                this.tip.show(ret.message || '删除失败');
            }
        }
        return true;
    }

    openAddDialog = () => {
        const {job} = this.props;
        job.initAddFormData();
        this.editDialog.open();
    }

    openEditDialog(row) {
        this.editTip.open();
        this.editTip.setData(row);
    }

    chooseIsAdd(flag) {
        if (flag) {
            this.openAddDialog();
        } else {
            const row = this.editTip.getData();
            this.editDialog.open();
            const {job} = this.props;
            // job.fetchJobInfo(id);
            job.setJobInfo(row);
        }
        return true;
    }

    saveEdit = (flag) => {
        if (flag) {
            if (this.editForm.isValid()) {
                this.updateJob();
            }
            return false;
        }
        return true;
    }

    updateJob = async () => {
        const {job} = this.props;
        const params = this.editForm.getParams();
        if (params.id) {
            const ret = await job.updateJob(params);
            if (ret && ret.success) {
                this.tip.show('编辑成功');
                this.table.refresh();
                this.editDialog.close();
            } else {
                this.tip.show(ret.message || '编辑失败');
            }
        } else {
            const ret = await job.putJob(params);
            if (ret && ret.success) {
                this.tip.show('保存成功');
                this.table.refresh();
                this.editDialog.close();
            } else {
                this.tip.show(ret.message || '保存失败');
            }
        }
    }

    renderButtons(row) {
        return (<span>
            <Button theme='primary' size='small' className='mr-5'
                    onClick={this.openEditDialog.bind(this, row)}>编辑</Button>
            <Button theme='primary' size='small' className='mr-5'
                    onClick={this.openNewTab.bind(this, row.id)}>脚本内容修改</Button>
            <Button theme='danger' size='small' className='mr-5'
                    onClick={this.openDeleteConfirm.bind(this, row.id)}>删除</Button>
        </span>);
    }

    render() {
        const {job} = this.props;
        const jobGroupList = job.getJobGroupList();
        const strategyList = job.getStrategyList();
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>job管理</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'
                      tools={[<Button key='btn-add' style={{color: '#fff'}} theme='primary' icon='plus'
                                      onClick={this.openAddDialog}>添加Job</Button>]}>
                    <SimpleListPage
                        ref={(f) => this.table = f}
                        pagination
                        columns={this.cron}
                        action={API.JOB.LIST}/>
                </Card>

                <Dialog
                    title={job.jobInfo.id ? '编辑job' : '添加job'}
                    ref={(ref) => this.editDialog = ref}
                    onConfirm={this.saveEdit}
                    content={(jobGroupList && jobGroupList.length) ? <Form ref={(f) => this.editForm = f}
                                                                           data={job.jobInfo}
                                                                           spinning={job.isFetching}
                                                                           jobGroupList={jobGroupList}
                                                                           strategyList={strategyList}/> : '执行器列表为空'}/>

                <Dialog title='提示' ref={(ref) => this.editTip = ref} hasFooter onConfirm={this.chooseIsAdd.bind(this)}
                        content={"是否新建job来保存修改"}/>

                <MessageBox ref={(f) => this.deleteConfirm = f} title='提示' type='confirm' confirm={this.deleteJob}/>
                <MessageBox ref={(f) => this.tip = f} title='提示'/>
            </div>
        );
    }
}

export default List;


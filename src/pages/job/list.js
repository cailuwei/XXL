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

    openNewTab(id) {
        window.open(`/code.html?id=${id}`);
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
                this.tip.show('删除失败');
            }
        }
        return true;
    }

    openAddDialog = () => {
        this.addDialog.open();
        const {job} = this.props;
        job.initAddFormData();
    }

    saveJob = (flag) => {
        if (flag) {
            if (this.addForm.isValid()) {
                this.putJob();
            }
            return false;
        }
        return true;
    }

    putJob = async () => {
        const {job} = this.props;
        const params = this.addForm.getParams();
        delete params.id;
        const ret = await job.putJob(params);
        if (ret && ret.success) {
            this.tip.show('新增Job成功');
            this.table.refresh();
            this.addDialog.close();
        } else {
            this.tip.show('新增Job失败');
        }
    }

    openEditDialog(id) {
        this.editTip.open();
        this.editTip.setData(id);
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
        const ret = await job.updateJob(params);
        if (ret && ret.success) {
            this.tip.show('编辑Job成功');
            this.table.refresh();
            this.editDialog.close();
        } else {
            this.tip.show('编辑Job失败');
        }
    }

    chooseIsAdd(flag) {
        if (flag) {
            this.openAddDialog();
        } else {
            const id = this.editTip.getData();
            this.editDialog.open();
            const {job} = this.props;
            job.fetchJobInfo(id);
        }

        return true;
    }

    renderEditTipModal() {
        return <Dialog
            title='提示'
            ref={(ref) => this.editTip = ref}
            hasFooter
            onConfirm={this.chooseIsAdd.bind(this)}
            content={"是否新建job来保存修改"}>
        </Dialog>;
    }

    renderButtons(row) {
        return (<span>
            <Button theme='primary' size='small' className='mr-5'
                    onClick={this.openEditDialog.bind(this, row.id)}>编辑</Button>
            <Button theme='primary' size='small' className='mr-5'
                    onClick={this.openNewTab.bind(this, row.id)}>脚本内容修改</Button>
            <Button theme='danger' size='small' className='mr-5'
                    onClick={this.openDeleteConfirm.bind(this, row.id)}>删除</Button>
        </span>);
    }

    renderTable() {
        const cron = [
            {name: 'id', text: 'job-id'},
            {name: 'jobDesc', text: 'job描述', style: {width: 400}},
            {name: 'jobGroup', text: '执行器'},
            {name: 'ExecutorRouteStrategyEnum', text: '路由策略'},
            {name: 'runMode', text: '运行模式'},
            {
                name: 'op', text: '操作', style: {width: '250px'}, format: (value, colunmn, row) => {
                return this.renderButtons(row);
            }
            }
        ];

        return <SimpleListPage
            ref={(f) => this.table = f}
            pagination
            columns={cron}
            action={API.JOB.SEARCH}/>;
    }

    render() {
        const {job} = this.props;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>job列表</Breadcrumb.Item>
                </Breadcrumb>

                <div className='mt-30'>
                    <Button theme='primary' onClick={this.openAddDialog}>新增Job</Button>
                </div>

                <Card className='mt-30'>
                    {this.renderTable()}
                </Card>

                <Dialog title='新增'
                        ref={(ref) => this.addDialog = ref}
                        content={<Form ref={(f) => this.addForm = f} data={job.initFormData}/>}
                        onConfirm={this.saveJob}></Dialog>

                <Dialog
                    title='编辑'
                    ref={(ref) => this.editDialog = ref}
                    onConfirm={this.saveEdit}
                    content={<Form ref={(f) => this.editForm = f} data={job.jobInfo} spinning={job.isFetching}/>}>
                </Dialog>

                {this.renderEditTipModal()}

                <MessageBox ref={(f) => this.deleteConfirm = f} title='提示' type='confirm' confirm={this.deleteJob}/>
                <MessageBox ref={(f) => this.tip = f} title='提示'/>
            </div>
        );
    }
}

export default List;


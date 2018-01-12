import React from 'react';
import FlowChart from './flowChart';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Button from 'r-cmui/components/Button';
import MessageBox from 'r-cmui/components/MessageBox';
import Dialog from 'r-cmui/components/Dialog';
import NodeForm from './NodeForm';
import LinkForm from './LinkForm';

import {inject, observer} from 'mobx-react';

import './style.less';

@inject('schedule')
@observer
class Comp extends React.Component {
    displayName = 'Comp';

    componentWillMount() {
        const {schedule, match} = this.props;
        const taskId = match.params.taskId;
        schedule.setScheduleData();   // 初始化组件数据，清除缓存

        schedule.fetchScheduleData(taskId);
        schedule.fetchJobInfoList();
    }

    openDeleteConfirm = (node) => {
        this.deleteConfirm.show('确认删除该节点？');
        this.deleteConfirm.setData(node);
    }

    onDelete = async (flag) => {
        if (flag) {
            const node = this.deleteConfirm.getData();

            if (node.children && node.children.length || node.parents && node.parents.length) {
                this.tip.show('该节点存在前后置关系， 请先删除前后置关系后删除');
                return true;
            }

            const {schedule} = this.props;
            // 删除节点
            const ret = await schedule.deleteNode(node.id);
            if (ret && ret.success) {
                // schedule.fetchScheduleData();
                this.tip.show('删除成功');
                this.flowChart.removeNode(node);
            } else {
                this.tip.show(ret.message || '删除失败');
            }
        }
        return true;
    }

    openAddDialog = () => {
        const {schedule} = this.props;
        schedule.initAddFormData();
        this.editDialog.open();
    }

    openEditDialog = (node) => {
        const {schedule} = this.props;
        // schedule.fetchScheduleInfo(node.id);
        schedule.setNodeInfo({
            taskId: '',
            id: node.id,
            jobId: node.jobId,
            jobDesc: node.jobDesc,
            params: node.params
        });

        this.editDialog.open();
    }

    openEditLinkDialog = (node) => {
        const nodes = this.flowChart.getOtherNodes(node);
        const {schedule} = this.props;
        let prefix = [];
        let suffix = [];
        if (node.parents) {
            prefix = node.parents.map((parent) => {
                return parent.id;
            });
        }
        if (node.children) {
            suffix = node.children.map((child) => {
                return child.id;
            });
        }
        schedule.updateLinkFormData(nodes, prefix.join(','), suffix.join(','));
        this.linkDialog.open();
        this.linkDialog.setData(node);
    }

    checkPreValid = (preIds, sufIds) => {
        const {schedule} = this.props;
        const node = this.linkDialog.getData();
        const ret = this.flowChart.checkValidParents(node, preIds.split(','), sufIds.split(','));
        if (ret.code === 'CIRCLE') {
            this.tip.show('存在循环， 不能选择该节点作为前置关系');
        }
        schedule.updateLinkFormPrefix(ret.ids);
    }

    checkSufValid = (preIds, sufIds) => {
        const {schedule} = this.props;
        const node = this.linkDialog.getData();
        const ret = this.flowChart.checkValidChildren(node, preIds.split(','), sufIds.split(','));
        if (ret.code === 'CIRCLE') {
            this.tip.show('存在循环， 不能选择该节点作为后置关系');
        }
        schedule.updateLinkFormSuffix(ret.ids);
    }

    updateNode = () => {
        const {schedule, match} = this.props;
        const taskId = match.params.taskId;
        const params = this.editForm.getParams();
        params.taskId = taskId;

        if (params.id) {
            schedule.updateNode(params, (ret) => {
                if (ret && ret.success) {
                    // schedule.fetchScheduleData();
                    this.tip.show('编辑成功');
                    params.jobName = schedule.jobInfoMap[params.jobId];
                    this.flowChart.editNode(params.id, params);
                    this.editDialog.close();
                } else {
                    this.tip.show(ret.message || '编辑失败');
                }
            });
        } else {
            schedule.putNode(params, (ret) => {
                if (ret && ret.success) {
                    // schedule.fetchScheduleData();
                    // schedule.addNode(params);
                    this.tip.show('保存成功');
                    const data = ret.data || {};
                    data.id = data.id ? data.id.toString() : '';
                    data.jobId = data.jobId ? data.jobId.toString() : '';
                    this.flowChart.addNode(data);
                    this.editDialog.close();
                } else {
                    this.tip.show(ret.message || '保存失败');
                }
            });
        }
    }

    editNode = (flag) => {
        if (flag) {
            if (this.editForm.isValid()) {
                this.updateNode();
            }
            return false;
        }
        return true;
    }

    editNodeLinks = (flag) => {
        if (flag) {
            const data = this.linkForm.getParams();
            const node = this.linkDialog.getData();
            this.flowChart.editNodeLinks(node, data.prefixId, data.nextId);
        }
        return true;
    }

    saveAllLinks = async () => {
        const {schedule, match} = this.props;
        if (this.flowChart) {
            const nodes = this.flowChart.getAllNodes().map((item) => {
                return {
                    id: item.id,
                    nextId: item.nextId,
                    prefixId: item.prefixId,
                    taskId: match.params.taskId
                };
            });

            if (nodes.length) {
                const ret = await schedule.saveAllLinks(JSON.parse(JSON.stringify(nodes)));
                if (ret && ret.success) {
                    this.tip.show('保存成功');
                } else {
                    this.tip.show(ret.message || '保存失败');
                }
            } else {
                this.tip.show('请添加节点');
            }
        } else {
            this.tip.show('请添加节点');
        }
    }

    render() {
        const {schedule} = this.props;
        const data = schedule.getScheduleData();
        const jobInfoList = schedule.getJobInfoList();
        return (
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                overflow: 'auto',
                left: 0,
                top: 0,
                padding: 30
            }}>
                <Breadcrumb>
                    <Breadcrumb.Item>任务管理</Breadcrumb.Item>
                    <Breadcrumb.Item>组件管理</Breadcrumb.Item>
                </Breadcrumb>
                <div className='mt-20'>
                    <Button onClick={this.openAddDialog} theme='primary' icon='plus'>添加节点</Button>
                    <Button className='ml-5' theme='primary' onClick={this.saveAllLinks}
                            loadding={schedule.saveFetching} icon='save' >保 存</Button>
                </div>
                {data ? <FlowChart
                    ref={(f) => this.flowChart = f}
                    data={data}
                    onEdit={this.openEditDialog}
                    onEditLink={this.openEditLinkDialog}
                    onDelete={this.openDeleteConfirm}
                /> : null}

                <Dialog ref={(f) => this.editDialog = f} title={schedule.nodeData.id ? '编辑节点' : '添加节点'}
                        content={(jobInfoList && jobInfoList.length) ?
                            <NodeForm ref={(f) => this.editForm = f} data={schedule.nodeData}
                                      jobInfoList={jobInfoList}/> : 'job列表为空'}
                        onConfirm={this.editNode}/>

                <Dialog ref={(f) => this.linkDialog = f} title='编辑关联关系'
                        content={<LinkForm ref={(f) => this.linkForm = f}
                                           nodes={schedule.getLinkFormNodes()}
                                           checkPreValid={this.checkPreValid}
                                           checkSufValid={this.checkSufValid}
                                           data={schedule.getLinkFormData()}/>}
                        onConfirm={this.editNodeLinks}/>

                <MessageBox title='提示' ref={(f) => this.tip = f}/>
                <MessageBox title='提示' type='confirm' ref={(f) => this.deleteConfirm = f} confirm={this.onDelete}/>
            </div>
        );
    }
}

export default Comp;

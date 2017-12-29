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

    handlerLog(id) {
        const {push} = this.props.routing;
        push(`/log/job/${id}`);
    }

    handlerSetup(id) {
        this.deleteConfirm.show('确认删除该实例？');
        this.deleteConfirm.setData(id);
    }

    deleteJob = async (flag) => {
        if (flag) {
            const id = this.deleteConfirm.getData();
            const resp = await fetch(API.LOG['RE_IMPL'], {id: id});
            if (resp && resp.success) {
                this.tip.show('删除成功');
                this.table.refresh();
            } else {
                this.tip.show('删除失败');
            }
        }
        return true;
    }

    render() {
        const single = [
            {name: 'id', text: '实例ID', style: {width: '70px'}},
            {name: 'handleTime', text: '执行时间'},
            {name: 'endTime', text: '结束时间'},
            {name: 'doneJobs', text: '已完成job'},
            {name: 'failJobs', text: '失败job'},
            {name: 'timeParam', text: '时间参数'},
            {
                name: 'taskInstStatus', text: '执行状态', format: (value) => {
                return ['禁用', '激活'][value];
            }
            },
            {
                name: 'op', text: '操作', style: {width: "250px"}, format: (value, column, row) => {
                return <span>
                    <Button theme='primary' className='mr-5' disabled
                            onClick={this.handlerSetup.bind(this, row.id)}>重新执行</Button>
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
                                    pagination
                                    columns={single}
                                    action={API.LOG['TASK_LIST']}/>
                </Card>

                <MessageBox ref={(f) => this.deleteConfirm = f} title='提示' type='confirm' confirm={this.deleteJob}/>
                <MessageBox ref={(f) => this.tip = f} title='提示'/>
            </div>
        );
    }
}

export default BaseForm;
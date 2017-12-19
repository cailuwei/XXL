import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Button from 'r-cmui/components/Button';
import SimpleListPage from 'r-cmui/components/Business/SimpleListPage';
import 'r-cmui/components/DateRange';
import 'r-cmui/components/TextArea';
import 'r-cmui/components/RadioGroup';

class BaseForm extends React.Component {
    displayName = 'BaseForm';

    state = {
        select : true
    };

    single = [
        {name: 'taskId', text: '任务ID', type: 'index', style:{ width:"70px" }},
        {name: 'taskName', text: '执行时间'},
        {name: 'description', text: '已完成job'},
        {name: 'cron', text: '失败job'},
        {name: 'createTime', text: '时间参数'},
        {name: 'status', text: '执行状态', format: function ( value ) {
            return ['禁用','激活'][value];
        }},
        {name: 'op', text: '操作', style:{ width:"150px"}, format: function ( ) {
            return <span>
                <Button theme='primary'  size='small' className='mr-5' data-id="'+row.id+'">重新执行</Button>
                <Button theme='default'  size='small' className='mr-5' data-id="'+row.id+'">job日志</Button>
            </span>;
        }}
    ];

    render () {
        // const doday = moment().format('YYYY-MM-DD');
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>任务日志</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <SimpleListPage pagination columns={this.single} action='http://192.168.105.202:8415/mock/cdn/getOperatorList.html'></SimpleListPage>
                </Card>
            </div>
        );
    }
}
export default BaseForm;
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
        {name: 'taskId', text: 'job-id', type: 'index', style:{ width:"70px" }},
        {name: 'taskName', text: 'job描述'},
        {name: 'description', text: '执行器'},
        {name: 'cron', text: '路由器'},
        {name: 'createTime', text: '运行模式'},
        {name: 'op', text: '操作', style:{ width:"250px"}, format: function ( ) {
            return <span>
                <Button theme='primary'  size='small' className='mr-5' data-id="'+row.id+'">编辑</Button>
                <Button theme='default'  size='small' className='mr-5' data-id="'+row.id+'">运行模式内容修改</Button>
                <Button theme='danger'  size='small' className='mr-5' data-id="'+row.id+'">删除</Button>
            </span>;
        }}
    ];

    render () {
        // const doday = moment().format('YYYY-MM-DD');
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>job日志</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <SimpleListPage pagination columns={this.single} action='http://192.168.105.202:8415/mock/cdn/getOperatorList.html'></SimpleListPage>
                </Card>
            </div>
        );
    }
}
export default BaseForm;
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
        {name: 'taskName', text: '执行时间'},
        {name: 'description', text: '调度备注'},
        {name: 'cron', text: '执行结果'},
        {name: 'createTime', text: '执行参数'},
        {name: 'op', text: '操作', style:{ width:"150px"}, format: function ( ) {
            return <span>
                <Button theme='default'  size='small' className='mr-5' data-id="'+row.id+'">日志</Button>
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
                    <SimpleListPage pagination columns={this.single} action='http://172.18.34.66:8415/mock/cdn/getOperatorList.html'></SimpleListPage>
                </Card>
            </div>
        );
    }
}
export default BaseForm;
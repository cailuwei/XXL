import React from 'react';
import Layout from 'r-cmui/components/Layout';
import Button from 'r-cmui/components/Button';
import MessageBox from 'r-cmui/components/MessageBox';
import fetch from 'r-cmui/components/utils/fetch';

const {Header, Content} = Layout;

import API from '../../configs/api';
import 'r-cmui/styles/theme.less';
import '../../index.less';
import './Log.less';

/**
 * development use
 * @type {string}
 */
// const EXECUTOR_ADDRESS = '';
// const TRIGGER_TIME = '';
// const LOG_ID = '';

class Comp extends React.Component {
    displayName = 'Comp';

    state = {
        logInfo: []
    };

    timer = {};

    constructor(props) {
        super(props);

        this.params = {
            executorAddress: EXECUTOR_ADDRESS,
            triggerTime: parseInt(TRIGGER_TIME, 10),
            logId: parseInt(LOG_ID, 10),
            fromLineNum: 0
        };
    }

    componentDidMount() {
        this.getLogInfo();
    }

    getLogInfo = async () => {
        clearTimeout(this.timer);

        const ret = await fetch(API.LOG.GET_LOG_INFO, this.params, 'post');

        if (ret && ret.success) {
            const data = ret.data || {};
            const logs = this.state.logInfo;
            data.logContent ? logs.push(data.logContent) : null;
            this.setState({'logInfo': logs});

            if (!data.end) {
                this.params.fromLineNum = data.toLineNum;
                this.timer = setTimeout(() => {
                    this.getLogInfo();
                }, 3000);
            }

        } else {
            this.tip.show(ret.message || '获取日志信息失败！');
        }
    }

    refresh = () => {
        this.params.fromLineNum = 0;
        this.setState({'logInfo': []});
        this.getLogInfo();
    }

    renderLog() {
        const data = this.state.logInfo;

        return data.map((log) => {
            return (<p style={{marginBottom: '5px'}}>{log}</p>);
        });
    }

    render() {
        return (
            <Layout className='app'>
                <Header>
                    <div style={{width: 1200, margin: '0 auto'}} className='job-code-header'>
                        <span className='jobName'>GLUE模式(shell) 日志</span>

                        <Button onClick={this.refresh}
                                theme='primary'
                                className='ml-15'
                                style={{float: 'right', marginTop: '20px'}}
                                icon='refresh'>刷 新</Button>
                    </div>
                </Header>
                <Content>{this.renderLog()}</Content>

                <MessageBox ref={(f) => this.tip = f} title='提示'/>
            </Layout>
        );
    }
}

export default Comp;

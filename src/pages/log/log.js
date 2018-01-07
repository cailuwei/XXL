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
const EXECUTOR_ADDRESS = '';
const TRIGGER_TIME = '';
const LOG_ID = '';

class Comp extends React.Component {
    displayName = 'Comp';

    state = {
        logInfo: ''
    };

    constructor(props) {
        super(props);

        this.params = {
            executorAddress: EXECUTOR_ADDRESS ,
            triggerTime: TRIGGER_TIME,
            logId: LOG_ID
        };
    }

    componentDidMount() {
        this.getLogInfo();
    }

    componentDidUpdate() {
        let timer = setTimeout(() => {
            clearTimeout(timer);
            this.getLogInfo();
        }, 3000);
    }

    getLogInfo = async () => {
        const resp = await fetch(API.LOG.GTE_LOG_INFO, this.params, 'post');

        if (resp && resp.success) {
            this.setState({
                'logInfo': resp.LogResult
            });
        } else {
            this.tip.show(resp.message || '获取日志信息失败！');
        }
    }

    refresh = () => {
        this.getLogInfo();
    }

    render() {
        return (
            <Layout className='app'>
                <Header>
                    <div style={{width: 1200, margin: '0 auto'}} className='job-code-header'>
                        {/*<span className='jobName'>GLUE模式(Java) 日志：<span>asd</span></span>*/}

                        <Button onClick={this.refresh}
                                theme='primary'
                                className='ml-15'
                                style={{float: 'right', marginTop: '20px'}}
                                icon='refresh'>刷 新</Button>
                    </div>
                </Header>
                <Content>{this.state.logInfo}</Content>

                <MessageBox ref={(f) => this.tip = f} title='提示'/>
            </Layout>
        );
    }
}

export default Comp;

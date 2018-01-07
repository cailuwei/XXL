import React from 'react';
import Layout from 'r-cmui/components/Layout';
import Dropdown from 'r-cmui/components/Dropdown';
import Menu from 'r-cmui/components/Menu';
import Button from 'r-cmui/components/Button';
import MessageBox from 'r-cmui/components/MessageBox';
import Dialog from 'r-cmui/components/Dialog';
import Uploadify from 'r-cmui/components/Uploadify';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../../configs/api';
import CodeMirror from 'codemirror';
import Form from './Form';

const {Header, Content} = Layout;

import 'r-cmui/styles/theme.less';
import 'r-cmui/styles/font-awesome.min.css';
import '../../index.less';
import 'codemirror/lib/codemirror.css';
import './App.less';

/**
 * development use
 * @type {string}
 */
const JOB_CONTENT = '';
const JOB_LOG_LIST = [
    {'id': 'jobId1', 'glueRemark': 'glueRemark1'},
    {'id': 'jobId2', 'glueRemark': 'glueRemark2'},
    {'id': 'jobId3', 'glueRemark': 'glueRemark3'},
    {'id': 'jobId4', 'glueRemark': 'glueRemark4'}
];

class Comp extends React.Component {
    displayName = 'Comp';

    state = {
        disabled: true
    };

    params = {
        jobContent: JOB_CONTENT,
        jobLogGlues: JOB_LOG_LIST
    };

    componentWillMount() {
        let search = window.location.search;
        search = search.split('?')[1];
        const params = {};
        if (search) {
            const parts = search.split('&');
            parts.forEach((part) => {
                const cond = part.split('=');
                params[cond[0]] = cond[1];
            });
        }

        this.jobId = params['jobId'];
    }

    componentDidMount() {

        this.upload.setParams({jobId: this.jobId});
        this.editor = CodeMirror(this.codeWrap, {
            mode: 'shell',
            lineNumbers: true,
            matchBrackets: true,
            value: this.params.jobContent || '--'
        });
        this.editor.on('changes', () => {
            this.setState({
                disabled: false
            });
        });
    }

    getMenu() {
        return <Menu>{
            this.params.jobLogGlues.map((item) => {
                return (<Menu.Item key={item.id} >{'运行模式（shell）:' + item.glueRemark}</Menu.Item>);
            })
        }
        </Menu>;
    }

    save = (flag) => {
        if (flag) {
            if (this.form.isValid()) {
                this.submit();
            }
            return false;
        }
        return true;
    }

    submit = async () => {
        const params = {
            id: this.jobId,
            content: this.editor.getValue(),
            glueRemark: this.form.getParams()['glueRemark']
        };

        const ret = await fetch(API.CODE.SAVE_CODE, params, 'post');
        if (ret && ret.success) {
            this.dialog.close();
            this.tip.show('保存成功');
        } else {
            this.tip.show('保存失败');
        }
    }

    openDialog = () => {
        this.dialog.open();
    }

    onFileUploaded = (up, file, ret) => {
        if (ret.response) {
            const data = JSON.parse(ret.response);
            if (data && data.success) {
                this.tip.show('上传成功');
                this.editor.setValue(data.data);
            } else {
                this.tip.show('上传失败');
            }
        }
    }

    render() {
        return (
            <Layout className='app'>
                <Header>
                    <div style={{width: 1200, margin: '0 auto'}} className='job-code-header'>
                        <span className='jobName'>GLUE模式(Java) 任务：<span>{this.jobId}</span></span>

                        <Button ref={(f) => this.saveBtn = f}
                                onClick={this.openDialog}
                                theme='primary'
                                className='ml-15' icon='save' disabled={this.state.disabled}>保 存</Button>
                        <Dropdown overlay={this.getMenu()} action='click' align='bottomRight'>
                            <span className='job-versions'>版本回溯 <i className='cmui cmui-angle-down'></i></span>
                        </Dropdown>
                    </div>
                </Header>
                <Content>
                    <div className='code-wrap' ref={(f) => this.codeWrap = f}></div>

                    <div className='mt-20 upload-wrap'>
                        <Uploadify buttonText='选择上传脚本' multi={false} url={API.CODE.UPLOAD}
                                   silent
                                   ref={(f) => this.upload = f}
                                   onFileUploaded={this.onFileUploaded}
                                   mimeTypes={[{title: 'Shell脚本', extensions: 'sh'}]}
                        />
                    </div>
                </Content>

                <MessageBox ref={(f) => this.tip = f} title='提示'/>

                <Dialog
                    title='保存'
                    ref={(ref) => this.dialog = ref}
                    onConfirm={this.save}
                    content={<Form ref={(f) => this.form = f}/>}>
                </Dialog>
            </Layout>
        );
    }
}

export default Comp;

import React from 'react';
import Layout from 'r-cmui/components/Layout';
import Dropdown from 'r-cmui/components/Dropdown';
import Menu from 'r-cmui/components/Menu';
import Button from 'r-cmui/components/Button';
import MessageBox from 'r-cmui/components/MessageBox';
import Uploadify from 'r-cmui/components/Uploadify';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../../configs/api';
import CodeMirror from 'codemirror';
const {Header, Content} = Layout;

import 'r-cmui/styles/theme.less';
import 'r-cmui/styles/font-awesome.min.css';
import '../../index.less';
import 'codemirror/lib/codemirror.css';
import './App.less';

class Comp extends React.Component {
    displayName = 'Comp';

    state = {
        disabled: true
    }

    getMenu () {
        return <Menu>
            <Menu.Item>GLUE模式(Java) ：1</Menu.Item>
            <Menu.Item>GLUE模式(Java) ：2</Menu.Item>
            <Menu.Item>GLUE模式(Java) ：3</Menu.Item>
        </Menu>;
    }

    save = async () => {
        const params = {
            jobId: this.jobId,
            code: this.editor.getValue()
        };

        const ret = await fetch(API.CODE.SAVE_CODE, params, 'post');
        if (ret && ret.success) {
            this.tip.show('保存成功');
        } else {
            this.tip.show('保存失败');
        }
    }

    componentDidMount () {
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

        this.jobId = params['id'];
        this.upload.setParams({jobId: this.jobId});

        this.editor = CodeMirror(this.codeWrap, {
            mode:  'shell',
            lineNumbers : true,
            matchBrackets : true,
            value: 'asdsadasdsa'
        });
        this.editor.on('changes', () => {
            this.setState({
                disabled: false
            });
        });

        this.getCode(params['id']);
    }

    async getCode (id) {
        const ret = await fetch(API.CODE.GET_CODE, {id});
        this.editor.setValue(ret.data);
        this.setState({
            disabled: true
        });
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

    render () {
        return (
            <Layout className='app'>
                <Header>
                    <div style={{width: 1200, margin: '0 auto'}} className='job-code-header'>
                        <span className='jobName'>GLUE模式(Java) 任务：<span>asd</span></span>

                        <Button ref={(f) => this.saveBtn = f} 
                            onClick={this.save}
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
                            mimeTypes={[{title : 'Shell脚本', extensions : 'sh'}]}
                        />
                    </div>
                </Content>
                <MessageBox ref={(f) => this.tip = f} title='提示'/>
            </Layout>
        );
    }
}
export default Comp;

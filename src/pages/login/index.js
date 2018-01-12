import React from 'react';
import Layout from 'r-cmui/components/Layout';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import Button from 'r-cmui/components/Button';
import MessageBox from 'r-cmui/components/MessageBox';
import Spin from 'r-cmui/components/Spin';
import fetch from 'r-cmui/components/utils/fetch';
import API from '../../configs/api';

const {Header, Content} = Layout;
const {SVGSpin} = Spin;

import 'r-cmui/styles/theme.less';
import 'r-cmui/components/Input';
import 'r-cmui/components/CheckBoxGroup';

import '../../index.less';
import './login.less';

class Comp extends React.Component {
    displayName = 'Comp';

    state = {
        spinning: false
    };

    handlerSubmit = async () => {
        this.setState({spinning: true});
        const resp = await fetch(API.LOGIN, this.form.getFormParams(), 'post');

        if (resp && resp.success) {
            this.tip.show('登录成功！');
            this.tip.setData(true);
        } else {
            this.tip.show(resp.message || '登录失败！');
        }
        this.setState({spinning: false});
    }

    handlerComfirm() {
        if (this.tip.getData()) {
            window.location.href = API.INDEX_HTML;
        }
    }

    render() {
        return (
            <Layout className='app' style={{background: '#f0f2f5'}}>
                <Header>OAS-ETL</Header>
                <Content>
                    <SVGSpin spinning={this.state.spinning}>
                        <Form ref={(ref) => this.form = ref}
                              labelWidth={85}
                              layout='stack-inline'>
                            <h1>任务调度中心</h1>
                            <FormControl name='userName' label='' type='text' placeholder='请输入用户名' required/>
                            <FormControl name='password' label='' type='password' placeholder='请输入密码' required/>
                            {/*<FormControl name='ifRemember' label='' type='checkbox'*/}
                                         {/*data={[{id: 'on', text: 'Remember Me'}]} />*/}
                            <div style={{textAlign: 'center'}}>
                                <Button theme='primary' onClick={this.handlerSubmit.bind(this)}>登录</Button>
                            </div>
                        </Form>
                    </SVGSpin>
                </Content>

                <MessageBox ref={(f) => this.tip = f} title='提示' confirm={this.handlerComfirm.bind(this)}/>
            </Layout>
        );
    }
}

export default Comp;

// import React, { Component } from 'react';
// import { inject, observer } from 'mobx-react';
// import logo from './logo.svg';
// import './App.css';

// @inject('routing')
// @observer
// class App extends Component {
//   displayName = 'App';

//   goto = () => {
//       const { push } = this.props.routing;
//       push('/list');
//   }

//   render () {
//       return (
//           <div className='App'>
//               <header className='App-header'>
//                   <img src={logo} className='App-logo' alt='logo' />
//                   <h1 className='App-title'>Welcome to React</h1>
//               </header>
//               <p className='App-intro'>
//                 To get started, edit <code>src/App.js</code> and save to reload.
//               </p>
//               <a onClick={this.goto}>asdasdasdasdas</a><br />
//               <a href='#/charts'>charts</a>
//           </div>
//       );
//   }
// }

// export default App;

import React from 'react';
import Layout from 'r-cmui/components/Layout';
import Sider from 'r-cmui/components/Layout/Sider';
import FontIcon from 'r-cmui/components/FontIcon';
import Badge from 'r-cmui/components/Badge';
import Dropdown from 'r-cmui/components/Dropdown';
import Menu from 'r-cmui/components/Menu';
import MessageBox from 'r-cmui/components/MessageBox';
import Nav from './Nav';
import routers from './routers';
import fetch from 'r-cmui/components/utils/fetch';
import API from './configs/api';

const {Header, Content} = Layout;
const {Item, Divider} = Menu;

class App extends React.Component {
    displayName = 'App';

    state = {
        collapse: false
    };

    collapse = () => {
        this.setState({collapse: !this.state.collapse}, () => {
            this.refs.nav.setCollapse(this.state.collapse);
            this.refs.sider.setCollapsed(this.state.collapse);
        });
    }

    setCollapse(collapse) {
        this.setState({collapse}, () => {
            this.refs.nav.setCollapse(collapse);
            this.refs.sider.setCollapsed(collapse);
        });
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            if (document.documentElement.clientWidth <= 992) {
                this.setCollapse(true);
            } else {
                this.setCollapse(false);
            }
        }, false);
    }

    handlerComfirm() {
        if (this.tip.getData()) {
            window.location.href = API.LOG_HTML;
        }
    }

    logout = async () => {
        const resp = await fetch(API.LOGOUT, {}, 'post');

        if (resp && resp.success) {
            this.tip.show('注销成功！');
            this.tip.setData(true);
        } else {
            this.tip.show(resp.message || '注销失败！');
        }

    }

    clickMenuItem() {
        this.logout();
    }

    renderUserMenu() {
        return <Menu onSelect={this.clickMenuItem.bind(this)}>
            {/*<Item><FontIcon icon='user' className='mr-10'/>个人中心</Item>*/}
            {/*<Item><FontIcon icon='cog' className='mr-10'/>设置</Item>*/}
            {/*<Divider/>*/}
            <Item><FontIcon icon='sign-out' className='mr-10'/>注销</Item>
        </Menu>;
    }

    render() {
        return (
            <Layout className='app'>
                <Sider ref='sider'>
                    <div className='text-center logo'
                         style={{overflow: this.state.collapse ? 'hidden' : 'auto'}}>{'OAS-ETL'}</div>
                    <Nav ref='nav'/>
                </Sider>
                <Layout style={{background: '#f0f2f5'}}>
                    <Header>
                        <FontIcon icon={this.state.collapse ? 'indent' : 'dedent'} className='menu-collapse'
                                  onClick={this.collapse}/>
                        <div className='pull-right'>
                            {/*<Badge count={13}><FontIcon icon='bell-o' style={{fontSize: 17}}></FontIcon></Badge>*/}
                            <Dropdown overlay={this.renderUserMenu()} align='bottomRight'>
                                <span id='username'>{'admin' + ', 您好！'}</span>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content>
                        <div className='main-container'>
                            {routers}
                            {/* <div className='mt-50 mb-30'>
                                <div className='text-center'>Copyright <i className='fa fa-copyright'></i> 2017 cqb</div>
                            </div> */}
                        </div>
                    </Content>
                </Layout>

                <MessageBox ref={(f) => this.tip = f} title='提示' confirm={this.handlerComfirm.bind(this)}/>
            </Layout>
        );
    }
}

export default App;

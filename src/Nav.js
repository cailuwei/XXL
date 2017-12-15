import React, {PureComponent} from 'react';
import FontIcon from 'r-cmui/components/FontIcon';
import Menu from 'r-cmui/components/Menu';
import data from './menu';
import store from 'store';
const {SubMenu, MenuItemGroup} = Menu;

class Nav extends PureComponent {
    displayName = 'Nav';
    
    constructor (props) {
        super(props);

        this.menuIndex = 0;
    }

    state = {
        collapse: false
    }

    setCollapse (collapse) {
        this.setState({
            collapse
        }, () => {
            this.refs.menu.setLayout(collapse ? 'vertical' : 'inline');
        });
    }

    gotoPage (item) {
        window.location.hash = item.props.href;
        store.set('cmui-lastSelectKey', item.getKey());
    }

    componentDidMount () {
        const key = store.get('cmui-lastSelectKey');
        if (key) {
            window.setTimeout(() => {
                this.refs.menu.selectItem(key);
            }, 10);
        } else {
            this.refs.menu.selectItem('dashboard');
        }
    }

    renderMenu () {
        return data.map((menuItem) => {
            this.menuIndex ++;
            if (menuItem.link) {
                const icon = menuItem.icon ? <FontIcon icon={menuItem.icon} style={{marginRight: '8px'}}></FontIcon> : null;
                return <Menu.Item key={this.menuIndex} identify={menuItem.identify} href={menuItem.link}>
                    {icon}{this.state.collapse ? '' : menuItem.text}
                </Menu.Item>;
            } else {
                return <SubMenu key={this.menuIndex} title={menuItem.icon ? <span><FontIcon icon={menuItem.icon}></FontIcon>{this.state.collapse ? '' : menuItem.text}</span>
                    : menuItem.text
                }>
                    {this.renderSubMenu(menuItem.children)}
                </SubMenu>;
            }
        });
    }

    renderSubMenu (subMenus) {
        return subMenus.map((menuItem) => {
            this.menuIndex ++;
            if (menuItem.link) {
                const icon = menuItem.icon ? <FontIcon icon={menuItem.icon} style={{marginRight: '8px'}}></FontIcon> : null;
                return <Menu.Item key={this.menuIndex} identify={menuItem.identify} href={menuItem.link}>
                    {icon}{menuItem.text}
                </Menu.Item>;
            } else {
                return <MenuItemGroup key={this.menuIndex} title={menuItem.text}>
                    {this.renderMenuItemGroup(menuItem.children)}
                </MenuItemGroup>;
            }
        });
    }

    renderMenuItemGroup (subMenus) {
        return subMenus.map((menuItem) => {
            this.menuIndex ++;
            if (menuItem.link) {
                const icon = menuItem.icon ? <FontIcon icon={menuItem.icon} style={{marginRight: '8px'}}></FontIcon> : null;
                return <Menu.Item key={this.menuIndex} identify={menuItem.identify} href={menuItem.link}>
                    {icon}{menuItem.text}
                </Menu.Item>;
            } else {
                return null;
            }
        });
    }

    render () {
        return (
            <Menu ref='menu' 
                style={{width: this.state.collapse ? 64 : 200}} theme='dark' onSelect={this.gotoPage.bind(this)}>
                {this.renderMenu()}
            </Menu>
        );
    }
}

export default Nav;

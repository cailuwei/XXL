import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('user')
@observer
class Page extends React.Component {
    displayName = 'Page';

    add = () => {
        const user = this.props.user;
        user.addUser({
            name: 'ccc'
        });
    }

    modify = () => {
        const user = this.props.user;
        if (user.list.length) {
            const item = user.list[0];
            user.modifyUser(item, Math.random());
        }
    }

    componentDidMount () {
        const user = this.props.user;
        user.initList();
    }

    render () {
        const list = this.props.user.list;
        const lis = list.map((item, index) => {
            return <li key={index}>{item.name}</li>;
        });
        return (
            <div>
                <a onClick={this.add}>添加</a>
                <a onClick={this.modify}>修改</a>
                <ul>
                    {lis}
                </ul>
            </div>
        );
    }
}

export default Page;

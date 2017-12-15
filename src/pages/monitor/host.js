import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Tab from 'r-cmui/components/Tab';
import Profile from './profile';

class MonitorHost extends React.Component {
    displayName = 'MonitorHost';

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>系统监控</Breadcrumb.Item>
                    <Breadcrumb.Item>主机监控</Breadcrumb.Item>
                </Breadcrumb>

                <Tab className='mt-30'>
                    <Tab.Item title='主机监控概况'>
                        <Profile />
                    </Tab.Item>
                    <Tab.Item title='主机监控'>主机监控</Tab.Item>
                    <Tab.Item title='CPU监控'>CPU监控</Tab.Item>
                </Tab>
            </div>
        );
    }
}

export default MonitorHost;

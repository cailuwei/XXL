import React from 'react';
import Card from 'r-cmui/components/Card';
import Tooltip from 'r-cmui/components/Tooltip';
import './style.less';

class NumberInfo extends React.PureComponent {
    displayName = 'ChartCard';

    static defaultProps = {
        tip: false
    };

    render () {
        return (
            <Card border={false} className={this.props.className} bodyStyle={{padding: 10}}>
                <div>
                    <span className='text-silver'>{this.props.title}</span>
                    {
                        this.props.tip ? <span className='ml-5'>
                            <Tooltip title={this.props.tip} align='top'>
                                <i className='fa fa-question-circle-o' style={{fontSize: 14}}></i>
                            </Tooltip>
                        </span> : null
                    }
                </div>
                <div className='font30 mt-5'>{this.props.total}</div>
                <div className='chart-card-content'>
                    <div className='chart-card-content-fixed'>
                        {this.props.children}
                    </div>
                </div>
            </Card>
        );
    }
}

export default NumberInfo;

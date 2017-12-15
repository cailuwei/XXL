import React from 'react';
import Card from 'r-cmui/components/Card';
import Tooltip from 'r-cmui/components/Tooltip';
import './style.less';

class ChartCard extends React.PureComponent {
    displayName = 'ChartCard';

    static defaultProps = {
        tip: '指标说明'
    };

    render () {
        return (
            <Card border={false} className={this.props.className}>
                <div>
                    <span className='text-silver'>{this.props.title}</span>
                    <span className='pull-right'>
                        <Tooltip title={this.props.tip} align='top'>
                            <i className='fa fa-lightbulb-o' style={{fontSize: 16}}></i>
                        </Tooltip>
                    </span>
                </div>
                <div className='font30 mt-5'>{this.props.total}</div>
                <div className='chart-card-content'>
                    <div className='chart-card-content-fixed'>
                        {this.props.children}
                    </div>
                </div>
                <div className='card-footer'>
                    {this.props.footer}
                </div>
            </Card>
        );
    }
}

export default ChartCard;

import React from 'react';
import DateRange from 'r-cmui/components/DateRange';
import moment from 'moment';
import classNames from 'classnames';
import './style.less';


class DateRangeTool extends React.PureComponent {
    displayName = 'DateRangeTool';

    state = {
        active: 0
    };

    updateRange (range, index) {
        const now = moment().format('YYYY-MM-DD');
        const start = moment().add(-range, 'days').format('YYYY-MM-DD');
        const value = `${start}~${now}`;

        this.refs.dateRange.setValue(value);

        this.setState({active: index});
    }

    renderBtns () {
        const arrs = [{
            text: '今日',
            range: 0
        },{
            text: '本周',
            range: 7
        },{
            text: '本月',
            range: 30
        },{
            text: '本年',
            range: 365
        }];

        return arrs.map((item, index) => {
            const className = classNames('date-range-btn mr-15', {
                active: this.state.active === index
            });
            
            return <a key={index} className={className} href='javascript:void(0)' onClick={this.updateRange.bind(this, item.range, index)}>{item.text}</a>;
        });
    }

    render () {
        const now = moment().format('YYYY-MM-DD');
        return (
            <div style={{display: 'inline-block'}}>
                {this.renderBtns()}

                <DateRange ref='dateRange' className='alignRight' value={`${now}~${now}`}/>
            </div>
        );
    }
}

export default DateRangeTool;

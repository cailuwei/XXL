import React from 'react';
import classNames from 'classnames';
import './style.less';

class Trend extends React.PureComponent {
    displayName = 'Trend';

    static defaultProps = {
        flag: 'up'
    };

    render () {
        let {className} = this.props;
        className = classNames('fa', 'ml-5', {
            [`fa-caret-${this.props.flag}`]: this.props.flag,
            'text-danger' : this.props.flag === 'up',
            'text-success' : this.props.flag === 'down'
        });
        return (
            <span className='cm-trend' style={this.props.style}>
                {this.props.children}
                {<i className={className}></i>}
            </span>
        );
    }
}

export default Trend;

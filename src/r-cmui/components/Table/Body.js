import React from 'react';
import BaseComponent from '../core/BaseComponent';
import Row from './Row';

/**
 * Body 类
 * @class Body
 * @extend BaseComponent
 */
class Body extends BaseComponent {
    static displayName = 'Body';

    static defaultProps = {
        data: []
    };

    constructor(props) {
        super(props);

        this.addState({
            data: props.data
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data && nextProps.data !== this.state.data) {
            this.setState({
                data: nextProps.data
            });
        }
    }

    renderData() {
        let data = this.state.data;

        /**
         * cailuwei add
         * 2018-01-05
         */

        if (data && typeof data === 'string') {
            return <tr data-row={0}>
                <td style={{textAlign: 'center'}} data-row={0} data-col={0} key={0} colSpan={this.props.columns.length}>
                    data
                </td>
            </tr>;
        } else if (data && data instanceof Array) {
            if (data.length > 0) {
                return data.map((row, index) => {
                    return <Row row={index} data={row.data} key={row.key} identify={row.key}
                                columns={this.props.columns} table={this.props.table}/>;
                });
            } else {
                return <tr data-row={0}>
                    <td style={{textAlign: 'center'}} data-row={0} data-col={0} key={0}
                        colSpan={this.props.columns.length}>
                        暂无数据
                    </td>
                </tr>;
            }
        } else {
            return <tr data-row={0}>
                <td style={{textAlign: 'center'}} data-row={0} data-col={0} key={0} colSpan={this.props.columns.length}>
                    数据加载失败
                </td>
            </tr>;
        }
    }

    render() {
        return (
            <tbody>
            {this.renderData()}
            </tbody>
        );
    }
}

export default Body;

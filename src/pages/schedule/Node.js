import React, {Component} from 'react';
import classNames from 'classnames';

const ITEMWIDTH = 175;
const ITEMHEIGHT = 56;
const ITEMGAP = 35;
const LEVELGAP = 140;

class Item extends Component {
    displayName = 'Item';

    timer = null;

    constructor (props) {
        super(props);
        this.state = {
            hover: false,
            showTools: false
        };
    }

    isRoot () {
        return !this.props.data.level;
    }

    position () {
        return {
            x: this.props.data.position.x,
            y: this.props.data.position.y
        };
    }

    renderItem () {
        const data = this.props.data;
        if (this.props.renderItem) {
            return this.props.renderItem;
        }
        return <div>
            <div className='flow-item-name'>{data.jobName}</div>
        </div>;
    }

    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.data, this);
        }
    }

    onEdit = () => {
        if (this.props.onEdit) {
            this.props.onEdit(this.props.data, this);
        }
    }

    onEditLink = () => {
        if (this.props.onEditLink) {
            this.props.onEditLink(this.props.data, this);
        }
    }

    onDelete = () => {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.data, this);
        }
    }

    hideTools () {
        if (this._isMounted) {
            this.setState({
                showTools: false
            });
        }
    }

    onMouseEnter = () => {
        const {root} = this.props;
        if (root.lastActive) {
            root.lastActive.hideTools();
        }
        root.lastActive = this;

        if (this._isMounted) {
            this.setState({
                active: true,
                showTools: true
            });
        }

        this.timer = window.setTimeout(() => {
            this.highlightConnections();
        }, 300);
    }

    onMouseLeave = () => {
        window.clearTimeout(this.timer);
        if (this._isMounted) {
            this.setState({
                active: false
            });
        }

        this.unHighlightConnections();
    }

    highlight (highlight) {
        if (this._isMounted) {
            this.setState({
                active: highlight
            });
        }
    }

    highlightConnections () {
        const {root} = this.props;
        root.clearHighlight();
        root.addHighlight(this.props.data.id);
        this.highlightChildrenConnection(true);
        this.highlightParentConnection(true);

        // root.highlight();
    }
    
    unHighlightConnections () {
        const {root} = this.props;
        this.highlightChildrenConnection(false);
        this.highlightParentConnection(false);
        root.clearHighlight();
    }

    highlightChildrenConnection (highlight) {
        const {data, root} = this.props;
        if (data.children) {
            data.children.forEach((child) => {
                if (child) {
                    const childNode = root.getItem(child.id);
                    if (childNode && childNode.highlightChildrenConnection) {
                        if (highlight) {
                            root.addHighlight(`${data.id}~${childNode.props.data.id}`);
                            root.highlight(`${data.id}~${childNode.props.data.id}`);
                        }
                        childNode.highlight(highlight);
                        childNode.highlightChildrenConnection(highlight);
                    }
                }
            });
        }
    }

    highlightParentConnection (highlight) {
        const {data, root} = this.props;
        if (data.parents) {
            data.parents.forEach((parent) => {
                const node = root.getItem(parent.id);
                if (node && node.highlightParentConnection) {
                    if (highlight) {
                        root.addHighlight(`${parent.id}~${data.id}`);
                        root.highlight(`${parent.id}~${data.id}`);
                    }
                    node.highlight(highlight);
                    node.highlightParentConnection(highlight);
                }
            });
        }
    }

    calculatePosition () {
        const {root, data} = this.props;
        const {level, total, index} = data;
        const x = root.startX + (ITEMWIDTH + LEVELGAP) * level;
        let y = 0;
        const allH = root.getViewSize().height;
        const middleY = allH / 2;

        y = middleY - (total / 2 - index) * ITEMHEIGHT - ((total / 2 - index - 1) + 0.5) * ITEMGAP;
        data.position = {
            x,
            y
        };

        return {
            x, y
        };
    }

    componentDidMount () {
        this._isMounted = true;
    }
    
    componentWillUnmount () {
        this._isMounted = false;
        this.props.root.unBind(this.props.data.id);
    }

    componentWillReceiveProps () {
        if (this._isMounted) {
            this.setState({
                active: false
            });
        }
    }

    render () {
        const pos = this.calculatePosition();
        const style = {
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            width: ITEMWIDTH,
            height: ITEMHEIGHT
        };

        const clazzName = classNames('flow-item', {
            'flow-item-active': this.state.active,
            'flow-item-showTools': this.state.showTools
        });
        return (
            <div className={clazzName} style={style}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                {this.renderItem()}
                <div className='flow-item-tools'>
                    <i className='fa fa-edit' title='编辑' onClick={this.onEdit}></i>
                    <i className='fa fa-share-alt' title='编辑关系' onClick={this.onEditLink}></i>
                    <i className='fa fa-trash' title='删除' onClick={this.onDelete}></i>
                </div>
            </div>
        );
    }
}

export default Item;

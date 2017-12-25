import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Raphael from 'raphael';
import Node from './Node';
import DataProcessing from './DataProcessing';

import './style.less';

const ITEMWIDTH = 175;
const ITEMHEIGHT = 56;
const ITEMGAP = 35;
const LEVELGAP = 140;
const BOXSIZE = 20;
const HIGHLIGHT_COLOR = 'rgba(152,220,7,.7)';
const COLOR = '#daecff';

class Page extends Component {
    displayName = 'Page';

    constructor (props) {
        super(props);
        this.startX = 45;
        this.startY = 30;

        this.items = {};
        this.lines = {};
        this.pBoxs = {};
        this.ptBoxs = {};
        this.tBoxs = {};

        this.width = 0;
        this.height = 0;

        if (props.data) {
            this.rebuildData(props.data);
        }
        this.state = {
            data: this.dp.data
        };

        this.highlights = [];
    }

    /**
     * [rebuildData description]
     * @param  {[type]} data    [description]
     * @param  {[type]} newData [description]
     * @param  {[type]} level   [description]
     * @param  {[type]} index   [description]
     * @return {[type]}         [description]
     */
    rebuildData (data) {
        this.dp = new DataProcessing(data);
        this.nodeMap = this.dp.nodeMap;
        const max = this.dp.getMax();
        const levels = this.dp.getLevels();

        this.width = this.startX + (ITEMWIDTH + LEVELGAP) * levels;
        this.height = this.startY * 2 + (ITEMHEIGHT + ITEMGAP) * max - ITEMGAP;
    }

    componentDidMount () {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        this.paper = Raphael(canvas, canvas.offsetWidth, canvas.offsetHeight - 10);

        this.updateCanvasSize();

        this.renderLinks();
        this.renderBoxes();
        this._isMounted = true;
    }

    componentWillUnmount () {
        this._isMounted = false;
    }

    addNode (node) {
        this.dp.addNode(node);
        const max = this.dp.getMax();
        const levels = this.dp.getLevels();

        this.width = this.startX + (ITEMWIDTH + LEVELGAP) * levels;
        this.height = this.startY * 2 + (ITEMHEIGHT + ITEMGAP) * max - ITEMGAP;

        this.updateCanvasSize();

        this.setState({
            data: this.dp.data
        }, () => {
            this.reRenderBoxsAndLines();
        });
    }

    editNode (id, params) {
        const item = this.nodeMap[id];
        if (item) {
            // item = Object.assign(item, params);
            item.jobId = params.jobId;
            item.desc = params.desc;
            item.name = params.name;
            item.parameters = params.parameters;
            const data = this.state.data;
            this.setState({data});
        }
    }

    removeNode (node) {
        this.dp.removeNode(node);

        const max = this.dp.getMax();
        const levels = this.dp.getLevels();

        this.width = this.startX + (ITEMWIDTH + LEVELGAP) * levels;
        this.height = this.startY * 2 + (ITEMHEIGHT + ITEMGAP) * max - ITEMGAP;

        this.updateCanvasSize();

        this.setState({
            data: this.dp.data
        }, () => {
            this.reRenderBoxsAndLines();
        });
    }

    checkValidParents (node, ids, sufIds) {
        return this.dp.checkValidParents(node, ids, sufIds);
    }

    checkValidChildren (node, preIds, ids) {
        return this.dp.checkValidChildren(node, preIds, ids);
    }

    editNodeLinks (node, parentIds, childIds) {
        this.dp.updateNodeLinks(node, parentIds, childIds);

        const max = this.dp.getMax();
        const levels = this.dp.getLevels();

        this.width = this.startX + (ITEMWIDTH + LEVELGAP) * levels;
        this.height = this.startY * 2 + (ITEMHEIGHT + ITEMGAP) * max - ITEMGAP;

        this.updateCanvasSize();

        this.setState({
            data: this.dp.data
        }, () => {
            this.reRenderBoxsAndLines();
        });
    }

    reRenderBoxsAndLines () {
        this.paper.clear();
        this.lines = {};
        this.renderLinks();

        this.pBoxs = {};
        this.ptBoxs = {};
        this.tBoxs = {};

        this.renderBoxes();
    }

    componentWillReceiveProps (nextProps) {
        // if (nextProps.data !== this.props.data) {
        //     const newData = [];
        //     if (nextProps.data) {
        //         this.rebuildData(nextProps.data, newData);
        //     }

        //     if (this._isMounted) {
        //         this.setState({
        //             data: newData
        //         }, () => {
        //             this.updateCanvasSize();
        //             this.paper.clear();

        //             this.lines = {};
        //             this.renderLinks();

        //             this.pBoxs = {};
        //             this.ptBoxs = {};
        //             this.tBoxs = {};

        //             this.renderBoxes();
        //         });
        //     }
        // }
    }

    /**
     * 可视区域的宽高
     */
    getViewSize () {
        return {
            width: this.width,
            height: this.height
        };
    }

    getCanvasSize () {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        return {
            w: canvas.offsetWidth,
            h: canvas.offsetHeight
        };
    }

    getItem (id) {
        return this.items[id];
    }

    clearHighlight () {
        this.highlights.forEach((id) => {
            const line = this.lines[id];
            if (line) {
                line.stop().attr({'fill': COLOR});
            }
        });
        this.highlights = [];
    }

    addHighlight (item) {
        this.highlights.push(item);
    }

    highlight (id) {
        const line = this.lines[id];
        if (line) {
            line.animate({'fill': HIGHLIGHT_COLOR}, 300);
        }
    }

    unBind (id) {
        delete this.items[id];
    }

    renderItems () {
        if (this.state.data && this.state.data.length) {
            const eles = this.state.data.map((item) => {
                return <Node 
                    ref={(ref) => { this.items[item.id] = ref; }}
                    data={item}
                    key={item.id}
                    root={this}
                    onEdit={this.props.onEdit}
                    onEditLink={this.props.onEditLink}
                    onDelete={this.props.onDelete}
                />;
            });

            return eles;
        }
        return null;
    }

    renderLinks () {
        const data = this.state.data;
        if (data && data.length) {
            data.forEach((item) => {
                if (item.level > 0 && item.parents) {
                    const id = item.id;
                    let pos = item.position;

                    item.parents.forEach((parent) => {
                        let parentPos = parent.position;
                        if (parent.hasLevelParent) {
                            parentPos = {
                                x: parent.position.x,
                                y: parent.position.y + ITEMHEIGHT / 2 - BOXSIZE / 2
                            };
                        }

                        if (item.level === parent.level) {
                            pos = {};
                            pos.x = item.position.x + ITEMWIDTH + 6;
                            pos.y = item.position.y - ITEMHEIGHT / 2 + BOXSIZE / 2;
    
                            this.renderCircleLink(id, pos, parentPos, item, parent);
                        } else {
                            pos = item.position;
                            this.renderLink(id, pos, parentPos, item.ratio, item, parent);
                        }
                    });
                }
            });
        }
    }

    renderBoxes () {
        const data = this.state.data;
        if (data && data.length) {
            data.forEach((item) => {
                this.renderBox(item);
            });
        }
    }

    renderLink (id, pos, parentPos, ratio, item, parent) {
        const x = parentPos.x + ITEMWIDTH;
        const y = parentPos.y + ITEMHEIGHT / 2;
        const itemx = pos.x;
        const itemy = pos.y + ITEMHEIGHT / 2;

        let H = 21;
        if (ratio) {
            H = Math.max(H * ratio / 100, 15) - 4;
        }

        const line = this.polyline(x, y, x + 100, y, itemx - 50, itemy, itemx, itemy, H);
        line.attr('fill', COLOR);
        
        const key = `${parent.id}~${item.id}`;
        this.lines[key] = line;
    }

    renderCircleLink (id, pos, parentPos, item, parent) {
        const x = parentPos.x + ITEMWIDTH;
        const y = parentPos.y + ITEMHEIGHT / 2;
        const itemx = pos.x;
        const itemy = pos.y + ITEMHEIGHT / 2;

        const H = 21;

        const line = this.polyline2(x, y, x + LEVELGAP, (y + itemy) / 2, itemx, itemy, itemx, itemy, H);
        line.attr('fill', '#daecff');

        const key = `${parent.id}~${item.id}`;
        this.lines[key] = line;
    }


    renderBox (item) {
        if (item.level && item.parents && item.hasGapParent && !this.pBoxs[item.id]) {
            let boxH = BOXSIZE;
            if (item.ratio) {
                boxH = Math.max(boxH * item.ratio / 100, 15);
            }
            const x = item.position.x;
            const y = item.position.y + ITEMHEIGHT / 2;

            const box = this.paper.rect(x - 6, y - boxH / 2, 6, boxH).attr({'fill': 'rgb(137, 183, 232)', 'stroke-width': 0});
            this.pBoxs[item.id] = box;
        }

        if (item.children && item.children.length && !this.tBoxs[item.id]) {
            const x = item.position.x + ITEMWIDTH;
            let y = item.position.y + ITEMHEIGHT / 2;
            if (item.hasLevelParent) {
                y = item.position.y + ITEMHEIGHT - BOXSIZE / 2;
            }

            const box = this.paper.rect(x, y - BOXSIZE / 2, 6, BOXSIZE).attr({'fill': 'rgb(152,220,7)', 'stroke-width': 0});
            this.tBoxs[item.id] = box;
        }

        // 同一个level的话前置box放在后上方
        if (item.hasLevelParent && !this.ptBoxs[item.id]) {
            const x = item.position.x + ITEMWIDTH + 6;
            const y = item.position.y + BOXSIZE / 2;

            const box = this.paper.rect(x - 6, y - BOXSIZE / 2, 6, BOXSIZE).attr({'fill': 'rgb(137, 183, 232)', 'stroke-width': 0});
            this.ptBoxs[item.id] = box;
        }
    }

    polyline (x, y, ax, ay, bx, by, zx, zy, H) {
        const h = H / 2;
        // zx = zx - 6;
        const lineWidth = 2;
        const path = [['M', x, y - lineWidth / 2], ['C', ax, ay, bx, by - h, zx, zy - h],
            ['L', zx, zy + h], ['C', bx, by, ax, ay + lineWidth / 2, x, y + lineWidth / 2, 'Z']];
        return this.paper.path(path).attr({stroke: '#daecff', 'stroke-width': 1, 'stroke-linecap': 'round', 'arrow-end': 'classic-wide-long'});
    }

    polyline2 (x, y, ax, ay, bx, by, zx, zy, H) {
        const h = H / 2;
        const lineWidth = 2;
        const path = [['M', x, y + lineWidth / 2], ['C', ax, ay, bx, by - h, zx, zy - h],
            ['L', zx, zy + h], ['C', bx, by, ax + H, ay - h, x, y, 'Z']];
        return this.paper.path(path).attr({stroke: '#daecff', 'stroke-width': 1, 'stroke-linecap': 'round', 'arrow-end': 'classic-wide-long'});
    }

    updateCanvasSize () {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);

        // let width = Math.max(this.width, canvas.clientWidth);
        // const height = Math.max(this.height, canvas.clientHeight);
        // width = width > canvas.clientWidth ? width + 50 : width;
        this.paper.setSize(this.width, this.height);
        const placeHelper = ReactDOM.findDOMNode(this.refs.placeHelper);
        placeHelper.style.width = `${this.width}px`;
        placeHelper.style.height = `${this.height}px`;
        this.wrap.style.height = `${this.height + 30}px`;
    }

    clearAllNextLevel (level) {
        const data = this.state.data;
        for (let i = data.length - 1; i >= 0; i--) {
            const item = data[i];
            if (item.level > level) {
                data.splice(i, 1);
                const line = this.lines[item.id];
                if (line) {
                    line.remove();
                    delete this.lines[item.id];
                }

                const box = this.pBoxs[item.id];
                if (box) {
                    box.remove();
                    delete this.pBoxs[item.id];
                }
                const pbox = this.tBoxs[item.parent.id];
                if (pbox) {
                    pbox.remove();
                    delete this.tBoxs[item.parent.id];
                }
            }
        }
    }

    getAllNodes () {
        return this.state.data;
    }

    getOtherNodes (node) {
        const nodes = [];
        this.state.data.forEach((item) => {
            if (item != node) {
                nodes.push({
                    id: item.id,
                    text: item.name
                });
            }
        });

        return nodes;
    }

    render () {
        return (
            <div ref={(f) => this.wrap = f} style={{width: '100%', height: '100%', position: 'relative', overflow: 'auto'}}>
                <div ref='canvas' style={{width: '100%', height: '100%'}}></div>
                <div ref='placeHelper' style={{position: 'absolute', top: '0', left: 0, width: '100%', height: '100%'}}>
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

export default Page;

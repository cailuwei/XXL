import React from 'react';
import Tree from 'r-cmui/components/Tree';
import UUID from 'r-cmui/components/utils/UUID';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Button from 'r-cmui/components/Button';
import Config from './config';
import omit from 'omit.js';
import MessageBox from 'r-cmui/components/MessageBox';
import fetch from 'r-cmui/components/utils/fetch';


class Profile extends React.Component {
    displayName = 'Profile';

    onSelect = (node) => {
        this.refs.config.setItem(node);
    }

    state = {
        data: []
    };

    saveConfigURL = '';

    addParameter = (node) => {
        const tree = this.refs.tree;

        const paramMeta = omit(node.children[0], ['_node', '_parent', '_subNodes', '_checked']);
        paramMeta.id = UUID.v4();
        // paramMeta.text = 'default Key';
        if (paramMeta.meta.type === 'NONE') {
            paramMeta.text = `none_string_${this.getRandomStr()}`;
        }
        if (paramMeta.meta.type === 'ANY') {
            paramMeta.text = `any_string_${this.getRandomStr()}`;
        }

        if (paramMeta.children) {
            paramMeta.children = this.clearValue(paramMeta.children);
        }

        tree.addItem(node, paramMeta);
    }

    getRandomStr () {
        return this.getRandomChart() + this.getRandomChart() + this.getRandomChart();
    }

    getRandomChart () {
        const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const index = Math.random() * 26;
        return str.substr(index, 1);
    }

    clearValue (objs) {
        const children = objs.map((obj) => {
            const newObj = omit(obj, ['_node', '_parent', '_subNodes', '_checked']);
            if (newObj.value !== undefined) {
                delete newObj.value;
            }
            newObj.id = UUID.v4();
            if (newObj.children) {
                newObj.children = this.clearValue(newObj.children);
            }
            return Object.assign({}, newObj);
        });

        return children;
    }

    save = async () => {
        const tree = this.refs.tree;
        const data = tree.props.data;
        
        if (this.valid(data)) {
            const newData = this.removeOtherProps(data);
            const ret = await fetch(this.saveConfigURL, {
                data: JSON.stringify(newData)
            }, 'POST', () => {
                this.refs.tip.show('保存失败');
            });

            if (ret && ret.success) {
                this.refs.tip.show('保存成功');
            }
        }
    }

    valid () {
        const tree = this.refs.tree;
        const leafs = tree.getAllLeafs();
        for (let i = 0; i < leafs.length; i++) {
            const leaf = leafs[i];
            if (leaf.meta.type === 'ANY') {
                if (leaf.text.indexof('any_string')) {
                    tree.selectItem(leaf);
                    this.refs.tip.show('请填写一个自定义节点名称');
                    return false;
                }
            }
            if (leaf.childrenMeta.required && leaf.childrenMeta.type !== 'ARRAY' && leaf.childrenMeta.type !== 'HASH') {
                if (leaf.value === undefined || leaf.value === '') {
                    tree.selectItem(leaf);
                    this.refs.tip.show('配置信息填写不完整， 请完善配置信息');
                    return false;
                }
            }
        }

        const branches = tree.getAllBranches();
        for (let i = 0; i < branches.length; i++) {
            const branch = branches[i];
            const meta = branch.childrenMeta;
            if (meta.size < meta.minSize) {
                tree.selectItem(branch);
                this.refs.tip.show(`改配置下必须存在${meta.minSize}个配置项， 请完善配置信息`);
                return false;
            }
        }

        return true;
    }

    removeOtherProps (items) {
        return items.map((item) => {
            // delete item._node;
            // delete item._parent;
            // delete item._subNodes;
            // delete item._checked;
            // delete item._selected;

            const newItem = {
                id: item.id,
                text: item.text,
                'open': item.open,
                'meta': item.meta,
                childrenMeta: item.childrenMeta
            };

            if (item.children) {
                newItem.children = this.removeOtherProps(item.children);
            }

            return newItem;
        });
    }

    componentWillMount () {
        this.getConfigData();
    }

    async getConfigData () {
        const data = await fetch('./data.json', {}, 'GET', (error) => {
            console.log(error);
        });
        this.setState({data});
    }

    render () {
        return (
            <div>
                <Row>
                    <Col grid={0.5}>
                        <Tree ref='tree' data={this.state.data} onSelect={this.onSelect}></Tree>
                    </Col>
                    <Col grid={0.5}>
                        <Config ref='config' addParameter={this.addParameter}/>
                    </Col>
                </Row>

                <div className='mt-30'>
                    <Button theme='primary' raised onClick={this.save}>保 存</Button>
                </div>

                <MessageBox title='提示' ref='tip' />
            </div>
        );
    }
}

export default Profile;

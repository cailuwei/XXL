import UUID from 'r-cmui/components/utils/UUID';

class DataProcessing {
    constructor (data) {
        this.orign = data;
        this.data = JSON.parse(JSON.stringify(data));
        if (this.data) {
            this.excecute();
        }
    }

    excecute () {
        this.nodeMap = {};
        this.initNodeMap();
        this.linkData();
        this.checkInValidLink();
        const roots = this.getRoots();
        this.levelIndex = [];
        this.initLevelAndOrdering(roots);
        this.initTotal();
        this.checkSameLevel(roots);
        let max = 0;
        this.levelIndex.forEach((num) => {
            max = Math.max(max, num + 1);
        });
        this.max = max;
        this.levels = this.levelIndex.length;
    }

    addNode (node) {
        if (node.id === undefined) {
            node.id = UUID.v4();
        }
        this.orign.push(node);
        this.data = JSON.parse(JSON.stringify(this.orign));
        this.excecute();
    }

    removeNode (node) {
        this.orign = this.orign.filter((item) => {
            return item.id !== node.id;
        });
        
        this.data = JSON.parse(JSON.stringify(this.orign));
        this.excecute();
    }

    updateNodeLinks (node, parentIds, childIds) {
        this.orign.forEach((item) => {
            if (item.id === node.id) {
                item.items = childIds ? childIds.split(',') : undefined;
            }
        });
        const pIds = parentIds.split(',');
        if (node.parents) {
            node.parents.forEach((parent) => {
                const index = pIds.indexOf(parent.id);
                if (index > -1) {
                    pIds.splice(index, 1);
                } else {
                    // 已经取消该父节点
                    const index = parent.items.indexOf(node.id);
                    if (index > -1) {
                        parent.items.splice(index, 1);
                    }
                }
            });
        }
        this.orign.forEach((item) => {
            pIds.forEach((pId) => {
                if (item.id === pId) {
                    if (item.items) {
                        item.items.push(node.id);
                    } else {
                        item.items = [node.id];
                    }
                }
            });
        });

        this.data = JSON.parse(JSON.stringify(this.orign));
        this.excecute();
    }

    getMax () {
        return this.max;
    }

    getLevels () {
        return this.levels;
    }

    checkValidChildren (node, preIds, ids) {
        // 是否存在循环
        let hasConflic = false;
        const parents = preIds.map((pId) => {
            return this.nodeMap[pId];
        });
        ids = ids.filter((id) => {
            const params = {
                found: false
            };
            this.parentsContainsCircle(parents, id, params);
            if (params.found) {
                hasConflic = params.found;
            }
            return !params.found;
        });

        if (hasConflic) {
            return {
                code: 'CIRCLE',
                ids: ids.join(',')
            };
        }

        return {code: 'OK', ids: ids.join(',')};
    }

    checkValidParents (node, preIds, sufIds) {
        // 是否存在循环
        let hasConflic = false;
        const children = sufIds.map((sufId) => {
            return this.nodeMap[sufId];
        });
        preIds = preIds.filter((id) => {
            const params = {
                found: false
            };
            this.childrenContainsCircle(children, id, params);
            if (params.found) {
                hasConflic = params.found;
            }
            return !params.found;
        });

        if (hasConflic) {
            return {
                code: 'CIRCLE',
                ids: preIds.join(',')
            };
        }

        return {code: 'OK', ids: preIds.join(',')};
    }

    parentsContainsCircle (parents, id, params) {
        parents && parents.forEach((p) => {
            if (p && p.id === id) {
                params.found = true;
            }
            if (p && p.parents) {
                this.parentsContainsCircle(p.parents, id, params);
            }
        });
    }

    childrenContainsCircle (children, id, params) {
        children && children.forEach((child) => {
            if (child && child.id === id) {
                params.found = true;
            }
            if (child && child.hildren) {
                this.parentsContainsCircle(child.hildren, id, params);
            }
        });
    }

    checkInValidLink () {
        const leafs = this.getLeafs();
        this.checkParentsValidLink(leafs);
    }

    checkParentsValidLink (leafs) {
        leafs.forEach((leaf) => {
            const parents = leaf.parents;
            this.checkNodeValidLink(leaf, parents);
            if (parents) {
                this.checkParentsValidLink(parents);
            }
        });
    }

    checkNodeValidLink (node, parents) {
        const nodeParents = node.parents;
        if (!parents) {
            return false;
        }
        parents.forEach((parent) => {
            if (parent.parents) {
                parent.parents.forEach((pp) => {
                    const index = nodeParents.indexOf(pp);
                    if (index > -1) {
                        nodeParents.splice(index, 1);
                        const aIndex = pp.children.indexOf(node);
                        pp.children.splice(aIndex, 1);
                        const idIndex = pp.items.indexOf(node.id);
                        pp.items.splice(idIndex, 1);
                    }
                });

                this.checkNodeValidLink(node, parent.parents);
            }
        });
    }

    /**
     * 获取叶子节点
     */
    getLeafs () {
        return this.data.filter((item) => {
            return item.parents && !item.children;
        });
    }

    /**
     * 判断当前节点和父节点是否为同级节点
     * 或者是跨级节点
     * @param {*} roots 
     */
    checkSameLevel (roots) {
        roots.forEach((root) => {
            root.children && root.children.forEach((child) => {
                if (root.level === child.level) {
                    child.hasLevelParent = true;
                }
                if (root.level !== child.level) {
                    child.hasGapParent = true;
                }
            });

            if (root.children) {
                this.checkSameLevel(root.children);
            }
        });
    }

    /**
     * 初始化节点当前层级的总数
     */
    initTotal () {
        this.data.forEach((iter) => {
            iter.total = this.levelIndex[iter.level] + 1;
        });
    }

    /**
     * 所有节点初始化level和index
     * @param {*} roots 
     */
    initLevelAndOrdering (roots) {
        roots.forEach((iter) => {
            iter.level = 0;
            if (this.levelIndex[iter.level] === undefined) {
                this.levelIndex[iter.level] = 0;
            } else {
                this.levelIndex[iter.level] ++;
            }
            iter.index = this.levelIndex[iter.level];
        });
        let children = [];
        roots.forEach((iter) => {
            if (iter.children) {
                children = children.concat(iter.children);
            }
        });
        this.initLevels(children, 0);
    }

    initLevels (children, parentLevel) {
        let nodes = [];
        children && children.forEach((child) => {
            if (child.level === undefined) {
                child.level = parentLevel + 1;
                if (this.levelIndex[child.level] === undefined) {
                    this.levelIndex[child.level] = 0;
                } else {
                    this.levelIndex[child.level] ++;
                }
                child.index = this.levelIndex[child.level];
            }
            if (child.children) {
                nodes = nodes.concat(child.children);
            }
        });
        if (nodes && nodes.length) {
            this.initLevels(nodes, parentLevel + 1);
        }
    }

    /**
     * 获取第一级节点
     */
    getRoots () {
        const roots = [];
        this.data.forEach((iter) => {
            if (!iter.parents) {
                roots.push(iter);
            }
        });

        return roots;
    }

    initNodeMap () {
        this.data.forEach((item) => {
            delete item['parents'];
            delete item['children'];
            delete item['hasLevelParent'];
            delete item['hasGapParent'];
            this.nodeMap[item.id] = item;
        });
    }

    /**
     * 设置节点的前后关系
     * 设置parents和children
     */
    linkData () {
        this.data.forEach((iter) => {
            if (iter.items) {
                iter.children = [];
            }
            iter.items && iter.items.forEach((id) => {
                const node = this.nodeMap[id];
                if (node) {
                    if (node.parents) {
                        node.parents.push(iter);
                    } else {
                        node.parents = [iter];
                    }
                    iter.children.push(node);
                }
            });
        });
    }
}
export default DataProcessing;

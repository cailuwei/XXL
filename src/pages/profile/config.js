import React from 'react';
import FormControl from 'r-cmui/components/FormControl';
import Button from 'r-cmui/components/Button';
import 'r-cmui/components/Input';
import 'r-cmui/components/RadioGroup';
import 'r-cmui/components/Switch';
import UUID from 'r-cmui/components/utils/UUID';

class Config extends React.Component {
    displayName = 'Config';

    state = {
        item: null
    };

    setItem (item) {
        this.setState({item});
    }

    renderNodeInfo () {
        const item = this.state.item;
        if (!item) {
            return null;
        }

        let key = null;
        if (item.meta.type === 'ANY') {
            const rules = {};
            if (item.meta.required) {
                rules.required = true;
            }
            if (item.meta.maxLength) {
                rules.maxLength = item.meta.maxLength;
            }
            key = <FormControl type='text' label='节点名称: ' required={item.meta.required} rules={rules} value={'default Key'} onChange={this.onKeyChange} ref='keyField'></FormControl>;
        } else {
            const text = item.text;
            key = <div className='cm-form-group'>
                <label className='cm-form-label'>节点名称: </label>
                <span>{text}</span>
            </div>;
        }

        return <div>
            {key}
        </div>;
    }

    renderValueInfo () {
        const item = this.state.item;
        if (!item) {
            return null;
        }

        let value = null;
        const type = item.childrenMeta.type;
        if (type === 'ARRAY' || type === 'HASH') {
            let hasPlus = true;
            let hasRemove = true;
            if (item.childrenMeta.size === item.childrenMeta.maxSize || !item.childrenMeta.maxSize) {
                hasPlus = false;
            }
            if (item.childrenMeta.size === item.childrenMeta.minSize || !item.childrenMeta.minSize) {
                hasRemove = false;
            }

            value = <div>
                {hasPlus ? <Button icon='plus' theme='primary' rasied onClick={this.addParameter}>添加参数</Button> : null}
                {hasRemove ? <Button icon='trash' className='ml-10' theme='primary' rasied>删除参数</Button> : null}
            </div>;
        } else {
            const rules = {};
            if (item.childrenMeta.required) {
                rules.required = true;
            }
            if (item.childrenMeta.maxLength) {
                rules.maxLength = item.childrenMeta.maxLength;
            }
            let controlType = 'text';
            if (type === 'INT') {
                controlType = 'integer';
            }
            if (type === 'FLOAT') {
                controlType = 'number';
            }
            let initValue = '';
            if (item.meta.defaultValue != undefined) {
                initValue = item.meta.defaultValue;
            }
            if (item.value != undefined) {
                initValue = item.value;
            }
            value = <FormControl onChange={this.valueChange} value={`${initValue}`} required={item.childrenMeta.required} key={UUID.v4()} type={controlType} label='节点值: ' rules={rules}></FormControl>;

            if (type === 'OPTIONS') {
                value = this.renderOptions(item.childrenMeta.options, `${initValue}`, rules);
            }
            if (type === 'BOOL') {
                value = <FormControl onChange={this.valueChange} checked={initValue} size='small' required={item.childrenMeta.required} key={UUID.v4()} type='switch' label='节点值: ' rules={rules}></FormControl>;
            }
        }

        return <div>
            {value}
        </div>;
    }

    addParameter = () => {
        if (this.props.addParameter) {
            const item = this.state.item;
            this.props.addParameter(item);
        }
    }

    renderOptions (options, value, rules) {
        const data = options.map((item) => {
            return {id: `${item}`, text: `${item}`};
        });
        return <FormControl onChange={this.valueChange} value={value} required={rules.required} key={UUID.v4()} type='radio' stick label='节点值: ' rules={rules} data={data}></FormControl>;
    }

    valueChange = (value) => {
        const item = this.state.item;
        item.value = value;
    }

    onKeyChange = (value) => {
        window.setTimeout(() => {
            if (this.refs.keyField.isValid()) {
                const item = this.state.item;
                item._node.setText(value);
            }
        }, 0);
    }
    
    render () {
        const item = this.state.item;
        if (!item) {
            return null;
        }

        const nodeInfo = this.renderNodeInfo();
        const valueInfo = this.renderValueInfo();
        return (
            <div>
                {nodeInfo}
                {valueInfo}
            </div>
        );
    }
}

export default Config;

import React from 'react';
import './style.less';

class Page extends React.Component {
    displayName = 'Page';

    componentDidMount () {
        const width = this.refs.path.getTotalLength();
        this.refs.path.style.strokeDasharray = width;
        this.refs.path.style.strokeDashoffset = width;

        // window.setTimeout(()=>{

        // }, 30);
    }

    render () {
        return (
            <div style={{background: '#555', height: 800}}>
                <svg width='584' height='400' xmlns='http://www.w3.org/2000/svg' style={{vectorEffect: 'non-scaling-stroke'}} stroke='null'>
                    <text fontFamily='microsoft yahei' fontSize='15' x='0' y='0' fill='#cd0000'>*
                        <animateMotion path='m2,216.27906l2,170.69748l366.51143,0.93023l62.79066,-63.7209l65.58136,63.25578l84.65112,0c0.23274,0.00012 0.69786,-171.62771 0.69786,-171.62771' begin='0s' dur='5s' rotate='auto' repeatCount='indefinite'/>
                    </text>
                    <g stroke='null'>
                        <path ref='path' id='svg_3' d='m2,216.27906l2,170.69748l366.51143,0.93023l62.79066,-63.7209l65.58136,63.25578l84.65112,0c0.23274,0.00012 0.69786,-171.62771 0.69786,-171.62771' strokeWidth='2' stroke='#fff' fill='transparent'
                        />
                    </g>
                </svg>
            </div>
        );
    }
}

export default Page;

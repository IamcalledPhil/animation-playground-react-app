import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


function CircleIcon (){
    return (
        <svg viewBox="0 0 30, 30" className="button-icon">
            <circle stroke='#3D6CFF' cx="50%" cy="50%" r="14" fill="none" strokeWidth="3"/>
            <circle stroke='#3890E8' cx="50%" cy="50%" r="10" fill="none" strokeWidth="3"/>
            <circle stroke='#4AD5FF' cx="50%" cy="50%" r="6" fill="none" strokeWidth="3"/>
        </svg>
    )
}

function AntsIcon (){
    return (
        <svg viewBox="0 0 30, 30" className="button-icon">
            <path className="ants-icon" stroke='#38E8E2' d="M2 2 V20 H14 V10 H22 V30" />
        </svg>
    )
}

function ButterfliesIcon (){
    return (
        <svg id="Layer_1" className="button-icon" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59.03 28.03"><title>butterfly-icon</title><ellipse cx="1066.1" cy="640.81" rx="10" ry="5" transform="translate(-1202.66 92.54) rotate(-34.54)" fill="#ffcd17"/><g opacity="0.4"><ellipse cx="1068.85" cy="638.84" rx="20" ry="10" transform="translate(-1201.05 93.75) rotate(-34.54)" fill="#ffcd17"/></g><ellipse cx="1047.43" cy="640.81" rx="5" ry="10" transform="translate(-1101.53 515.5) rotate(-55.46)" fill="#ffcd17"/><g opacity="0.4"><ellipse cx="1044.68" cy="638.84" rx="10" ry="20" transform="translate(-1101.09 512.38) rotate(-55.46)" fill="#ffcd17"/></g></svg>    
    )
}

function ClearIcon (){
    return (
        <FontAwesomeIcon icon={faTrash} className="button-icon" color="#FF5B17"/>
    )
}


export {CircleIcon, AntsIcon, ButterfliesIcon, ClearIcon};
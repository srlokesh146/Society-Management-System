import React from 'react';
import logo from '../assets/images/BrightWeb.png';

export default function Logo({ src = logo, logocss }) {
    return (
        <div>
            <img src={src} alt="Logo" className={logocss? "w-[253px] h-[35px] ps-[60px]" : ""} />
        </div>
    );
}
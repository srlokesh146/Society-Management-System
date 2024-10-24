import React from 'react';
import logo from '../assest/images/BrightWeb.png';

export default function Logo({ src = logo, logocss }) {
    return (
        <div>
            <img src={src} alt="Logo" className={logocss? "w-[253px] h-[35px] ps-[60px]" : ""} />
        </div>
    );
}

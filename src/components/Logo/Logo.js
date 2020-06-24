import React from "react";
import Tilt from 'react-tilt'
import './Logo.css';
import face from './face.png';

const Logo = () => {
    return (
        <div className={'ma4 mt0 pt5'}>
            <Tilt className="Tilt center br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '20px'}} alt='logo' src={face}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;
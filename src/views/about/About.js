import React from 'react';
import {Link} from 'react-router-dom';

import './About.scss';

const About = () => (
    <div className='about-info'>
        <h1>SunDial</h1>
        <br/>
        <p>
            Welcome to SunDial!
            <br/>
            To get started, visit the <Link to='/data'>Data</Link> page to view all the sunshine list data. Afterwards, you can visit the <Link to='/visualize'>Visualize</Link> page to dive deep into the data!
        </p>
    </div>
);

export default About;

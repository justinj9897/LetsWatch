import React from 'react';

import Form from './Form';
import Modal from './Modal';
import useModal from '../hooks/useModal';

const Home = () => {
    
    const { isVisible, toggle } = useModal();

    return (
        <div className='container d-flex flex-column justify-content-center h-100'>
            <div id='home-title' className='row justify-content-center mb-5' style={{fontSize: '5.5em'}}> 
                <span style={{color: 'white'}}>Lets</span>
                <span style={{color: '#E53A3A'}}>Watch</span>
            </div>
            
            <div className='row justify-content-center mt-3'>
                <button id='home-button' className='main-button' onClick={ toggle } style={{backgroundColor: '#E53A3A', borderColor: '#E53A3A', color: 'white'}}> GET STARTED </button>
            </div>
            
            <Modal isVisible={ isVisible } hide={ toggle } content={{ header: 'Group Form', body: <Form /> }}/>
        </div>
    );
}

export default Home;
import React from 'react';
import Header from './Header.jsx';
import { MdAccountCircle, MdKeyboardBackspace } from "react-icons/md";
import "../src/css/callog.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Calldetail = () => {
    const location = useLocation();
    const from = location.state.from;
    const to = location.state.to;

    return(
        <div>
            {/* <Header/> */}
            <div>
                <Link to="/">
                    <MdKeyboardBackspace size="30px" color='grey' /> 
                </Link>
            </div>
            <div className='avatar'>
                <MdAccountCircle size="170px" color='grey' /> 
            </div>
            <hr></hr>
            <div className='detailbox'>
                <label className='labeldetail'>From</label><label className='laberightldetail'>{from}</label>
                
            </div>   
            <hr></hr>
            <div className='detailbox'>
                <label className='labeldetail'>To</label><label className='laberightldetail'>{to}</label>
            </div>

            <hr></hr>
            <div className='detailbox'>
                <label className='labeldetail'>Direction</label><label className='laberightldetail'>Outbound</label>
            </div>

            <hr></hr>
            <div className='detailbox'>
                <label className='labeldetail'>Call Type</label><label className='laberightldetail'>Missed</label>
            </div>
        </div>
    );
};

export default Calldetail;
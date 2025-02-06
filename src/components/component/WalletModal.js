import { useState,useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import {AiFillCloseCircle} from "react-icons/ai";
function WalletModal(props) {

    useEffect(()=>{
        
    },[])

    return (

        <Row className="fixed top-0 left-0 w-screen h-screen modal black-alpha-back flex justify-center items-center">
            <Col xs={{span:22}} md={{span:10}} className="bg-white rounded-lg shadow-2xl p-4">
               <Row>
                <Col span={20} className="text-xl myColor1">{props.title}</Col>
                <Col span={4} className="text-right"><a onClick={()=>props.close()}><AiFillCloseCircle size={30} className="inline"/></a></Col>
               </Row>
               <Row >
                <Col span={24} className="text-center">
                    {props.children}
                </Col>
               </Row>
            </Col >
        </Row>

    );
}

export default WalletModal;

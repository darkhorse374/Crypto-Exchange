import { useState,useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import ReactLoading from 'react-loading';
function WalletLoadingModal(props) {
    const [show, setShow] = useState("block");
    useEffect(()=>{
        props.show?setShow("block"):setShow("hidden");
    },[props.show])

    return (

        <Row className={`${show} fixed top-0 left-0 w-screen h-screen modal black-alpha-back flex justify-center items-center`}>
            <ReactLoading type='spinningBubbles' color="#000" height={100} width={100} />
        </Row>

    );
}

export default WalletLoadingModal;
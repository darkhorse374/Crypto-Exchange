import { useState,useEffect } from 'react';
import { Button, Row, Col ,Typography} from 'antd';
import WalletModal from ".//WalletModal";
import axios from 'axios';
function WalletAlert(props) {

    const { Paragraph } = Typography;
    return (
        <WalletModal title={props.title} close={()=>props.setModalShow(false)}>
            
            <Paragraph copyable className="mt-4 border-gray-200 border-2 p-4 myColor1  text-lg text-center">{props.content}</Paragraph>
        </WalletModal>            
    );
}

export default WalletAlert;

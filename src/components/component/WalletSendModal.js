import { useState,useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import WalletModal from ".//WalletModal";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function WalletSendModal(props) {
    const [t,i18n] = useTranslation();
    const [price,setPrice] = useState(30)
    const [limit,setLimit] = useState(21000)
    useEffect(()=>{
        setLimit(props.estimatedGasLimit);
    },[props.estimatedGasLimit])
    const onConfirm=()=>{
        props.confirm(price,limit);
        props.setModalShow(false);
    }
    return (
        <WalletModal title={t("Confirm Send Token")} close={()=>props.setModalShow(false)}>
            <p className="myColor1 text-lg my-8">{`${t("Amount")} : ${props.amount}`}</p>
            <Row className="items-center justify-center">
                <Col span={6} className="myColor1 text-md ">{t("Gas Price(GWEI)")} : </Col>
                <Col span={18}><input className="myColor1 text-lg text-center w-full  border-gray-200 border-2 p-2"placeholder={t("gas price")} value={price} onChange={(e)=>setPrice(e.target.value)} /> </Col>
            </Row>
             <Row className="mt-8 items-center justify-center">
                <Col span={6}className="myColor1 text-md">{t("Gas Limit")} : </Col>
                <Col span={18}><input className="myColor1 text-lg text-center w-full  border-gray-200 border-2 p-2"placeholder={t("gas limit")} value={limit} onChange={(e)=>setLimit(e.target.value)} /> </Col>
            </Row>
            <Button size="large"className="access-button  mt-8 mb-4" onClick={onConfirm}>{t("Confirm")}</Button>
        </WalletModal>            
    );
}

export default WalletSendModal;

import { useState,useEffect } from 'react';
import { Button, Row, Col, Input } from 'antd';
import WalletModal from ".//WalletModal";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
function WalletInputModal(props) {
    const [t,i18n] = useTranslation();
    const [val,setVal] = useState("")
    
    return (
        <WalletModal title={t("Verify Password")} close={()=>props.setModalShow(false)}>
            <div className="walletPassword">
                <Input.Password placeholder={t("enter password here")}  className=" myColor1 text-lg text-center w-full mt-8 border-gray-200 border-2 p-2"onChange={(e)=>setVal(e.target.value)} /> 
            </div>
            <Button size="large"className="access-button  mt-8 mb-4" onClick={()=>props.confirm(val)}>{t("Confirm")}</Button>
        </WalletModal>            
    );
}

export default WalletInputModal;

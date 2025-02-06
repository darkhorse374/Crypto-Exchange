import { useState,useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import {AiFillCloseCircle} from "react-icons/ai";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import WalletModal from "../component/WalletModal";
function WalletVerifyModal(props) {
    const [t,i18n] = useTranslation();
    const [showWarn,setShowWarn]=useState(false);

    useEffect(()=>{
        
    },[])
   
    const arrayEquals=(a, b)=>{
      return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
    }
    const onChangePhrase=(e,idx)=>{
        
        let typedMnemo=[...props.typedMnemonic];
        typedMnemo[idx]=e.target.value;
        props.setTypedMnemonic(typedMnemo);
        
    }


    const verify=()=>{
        
        if(arrayEquals(props.typedMnemonic,props.mnemonic.split(" "))){
            props.setModalShow(false)
            props.setVerify(true);
        }
        else
            setShowWarn(true);
        
    }
    return (
        <WalletModal title={t("Verify Mnemonic")} close={()=>props.setModalShow(false)}>
            <p className="text-lg font-bold myColor1 mt-8">{t("Fill in Mnemonic Phrase Below")}</p>
            <Row>
            {
                props.typedMnemonic.map((item,idx)=>(
                    props.missPhrase.includes(idx)?
                    <div className="p-2 mt-2 myColor1 font-bold  text-lg w-1/3" key={idx}>
                    <div className="border-b-2 border-gray-500 flex"> <span className="flex-none"> {`${idx+1}. `}</span><input type="text" value={item} onChange={(e)=>onChangePhrase(e,idx)} className="no-outline  "/></div>
                    </div>
                    :
                    <div span={8} className="p-2 mt-2 text-gray-400  text-lg w-1/3" key={idx}>
                     <div className="border-b-2 border-gray-500 flex"><span className="flex-none"> {`${idx+1}. `}</span> <span >{item}</span></div>
                    </div>
                ))
            }
           
            </Row>
            {
                showWarn?
                <p className="text-red-500 text-lg mb-2">{t("Please check mnemonic phrases.")}</p>
                :null
            }
            
            <Button size="large"className="access-button  my-8" onClick={verify}>{t("Verify")}</Button>  
        </WalletModal>            
    );
}

export default WalletVerifyModal;

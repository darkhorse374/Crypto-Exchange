import { useState,useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import WalletModal from "../component/WalletModal";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import setAuthToken from "../../utils/setAuthToken"
import Wallet from "../../utils/wallet"
import tokenList from "../../utils/polygon.json"
import {SERVER_URL} from "../../constants/env";
import {getTokenBaseInfo} from "../../utils/tokenUtils";
function WalletTokenModal(props) {
    const wallet = new Wallet()
    const serverUrl = SERVER_URL
    const publicKey = localStorage.publicKey
    const [t,i18n] = useTranslation();

    const [showWarn,setShowWarn]=useState(false);
    const [tokenAddress,setTokenAddress]= useState("0x");
    const [tokenName,setTokenName]= useState("_");
    const [tokenSymbol,setTokenSymbol]= useState("_");
    const [tokenDecimal,setTokenDecimal]= useState(0);

    useEffect(()=>{
        
    },[])

  

    const addToken= async ()=>{
        setAuthToken(localStorage.jwtToken)
        const response = await axios.post(serverUrl + "wallets/addtoken", {
            publicKey: publicKey,
            network: props.network,
            token_address: tokenAddress,
            token_symbol:tokenSymbol,
        });
        if (response.data.response) {
            props.tokenAddSuccess();
        } 
    }
    const onAddress = async (e)=>{
        let typedAddress = e.target.value;
        setTokenAddress(typedAddress);
        if (typedAddress.length == 42) {
            let result = await getTokenBaseInfo(typedAddress, props.network);
            setTokenName(result.name);
            setTokenSymbol(result.symbol);
            setTokenDecimal(result.decimal);
        }
    }
    return (
        <WalletModal title={t("Add Token")} close={()=>props.setModalShow(false)}>
            <p className="myColor1 text-xl mt-8">{t("Token Contract Address")}</p>
            <div className="flex flex-col myColor1 text-xl  " >
                <input type="text" placeholder="0x" className="flex-grow text-center mt-2 border-2 border-gray-200" onChange={onAddress}/>
                <p className="text-lg text-gray-300 mt-2">{t("Token Name")}</p>
                <p>{tokenName}</p>
                <p className="text-lg text-gray-300 mt-2">{t("Token Symbol")}</p>
                <p>{tokenSymbol}</p>
                <p className="text-lg text-gray-300 mt-2">{t("Decimals of Precision")}</p>
                <p>{tokenDecimal}</p>

            </div>
            {
                showWarn?
                    <p className="text-lg text-red-500">{t("Invalid contract address.")}</p>
                :   null
            }   
            
            <Button size="large"className="access-button  my-8" onClick={addToken}>{t("Add Token")}</Button>  
        </WalletModal>            
    );
}

export default WalletTokenModal;

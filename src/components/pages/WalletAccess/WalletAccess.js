import { useState,useEffect } from 'react';
import { Button, Row, Col, Input } from 'antd';
import { Link ,useParams} from "react-router-dom";
import Icon from "react-crypto-icons";
import { motion, useViewportScroll } from "framer-motion"
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Nav from "../../component/Nav"
import Footer from "../../component/Footer";
import Wallet from "../../../utils/wallet"
import setAuthToken from "../../../utils/setAuthToken"
import './WalletAccess.css'
import openNotification from "../../helpers/notification";
import {SERVER_URL} from "../../../constants/env";
const { TextArea } = Input;




function Launch(props) {
    const [t,i18n] = useTranslation();

    const routeParams=useParams();
    const [accessMode, setAccessMode] = useState(0)
    const [mnemonic, setMnemonic] = useState("")
    const [privateKey, setPrivateKey] = useState("")
    const [phraseArr, setPhraseArr] = useState([])
    const wallet = new Wallet()
    const serverUrl =SERVER_URL;

    
    useEffect(()=>{
        let initPhrase = []
        for (let i = 0; i < 12; i++) {
            initPhrase.push("")
        }
        setPhraseArr(initPhrase);
    },[])
    

    function onInputPhrase(val) {
        setMnemonic(val)
        let phrases = val.split(' ');
        if (phrases.length <= 12) {
            for (let i = phrases.length; i < 12; i++) {
                phrases.push("")
            }
            setPhraseArr(phrases)
        }
    }


    useEffect(()=>{
        setAccessMode(parseInt(routeParams.id));
        if(!localStorage.getItem("userInfo")){
            openNotification(t("Access failed."),t("Please log in."),false,()=>window.location.href="/")
        }
    },[])

    function onInputPrivateKey(val) {
        setPrivateKey(val)
    }

    async function accessWalletWithPrivateKey() {
        setAuthToken(localStorage.jwtToken)
        const response = await axios.post(serverUrl + "wallets/access/privatekey", {
            privateKey: wallet.encrypt(privateKey)
        }).then((response)=>{
            if(response.data.response){
                openNotification(t("Access success."),"",true,()=>window.location.href="/wallet/0");
                localStorage.setItem("publicKey", response.data.data.publicKey);
            }
            else
                openNotification(t("Access failed."),response.data.message,false);
        })
        .catch((errorInfo) => {openNotification(t("Access failed."),t("error"),false)});
    }
    
    async function accessWalletWithKeyphrase() {
        setAuthToken(localStorage.jwtToken)
        const response = await axios.post(serverUrl + "wallets/access/keyphrase", {
            keyphrase: wallet.encrypt(mnemonic)
        })
        .then((response)=>{

            if(response.data.response){
                openNotification(t("Access success."),"",true,()=>window.location.href="/wallet/0");
                localStorage.setItem("publicKey", response.data.data.publicKey);
            }
            else
                openNotification(t("Access failed."),response.data.message,false);
        })
        .catch((errorInfo) => {openNotification(t("Access failed."),"error",false)});

    }


    return (
        <div className="relative">
            <img src="/assets/img/background_main.png" />
            <div className="absolute top-0 w-full h-full flex flex-col ">
                <Nav className="w-11/12 xl:w-5/6 m-auto " />
                {(accessMode === 0) ? <div className="w-5/6 lg:w-4/5 m-auto my-12 flex-grow">
                    <Row>
                        <Col xs={{offset: 1, span: 22}} md={{offset: 6, span: 12}}>
                            <Row className="walletSelect div-wrap">
                                <Col className="div-relative" span={24}>
                                    <Row className="wallet-detail header">
                                        <Col span={24} className="text-center">
                                            {t("Private Key")}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col  xs={{offset: 1, span: 22}} md={{offset: 7, span: 10}}>
                                            <Input placeholder={t("Private Key")} value={privateKey}onChange={e => {onInputPrivateKey(e.target.value)}}/>
                                        </Col>
                                    </Row>
                                    <Row  gutter={[16, 8]} className="wallet-button text-center">
                                        <Col  xs={{offset: 1, span: 22}} md={{offset: 7, span: 10}} className="text-center">
                                            <Button className="access-button" onClick={accessWalletWithPrivateKey}>{t("ACCESS WALLET")}</Button>
                                        </Col>
                                        <Col span={24} className="text-center red-link">
                                           <Link to="/walletMain"> {t("Cancel")}</Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div> : <div className="w-5/6 lg:w-4/5 m-auto my-12 flex-grow ">
                    <Row>
                        <Col xs={{offset: 1, span: 22}} md={{offset: 1, span: 22}} >
                            <Row gutter={[6,6]} className="wallet-detail">
                                <Col xs={{span: 24}} lg={{span: 12}}>
                                    <Row gutter={[6,6]} className="walletSelect div-wrap">
                                        <Col span={24} className="text-grey">
                                            {t("Preview")}
                                        </Col>
                                        {
                                            phraseArr.map(function(item, i){
                                                return <Col span={6} key={i+1}><div className="keyphrase">{i+1}.{item}</div></Col>
                                              })
                                        }
                                    </Row>
                                </Col>
                                <Col xs={{span: 24}} lg={{span: 12}}>
                                    <Row gutter={[6,6]} className="walletSelect div-wrap">
                                        <Col span={24}>
                                            <div className="header">
                                                {t("Enter your MNEMONIC phrase")}
                                            </div>
                                            <div className="text-grey">
                                                {t("Hit ‘SPACE’ after every successful word entry.")}
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <TextArea rows={6} onChange={e => {onInputPhrase(e.target.value)}}/>
                                        </Col>
                                        <Col>
                                            <Button className="access-button" style={{marginTop: 10}} onClick={accessWalletWithKeyphrase}>{t("ACCESS WALLET")}</Button>
                                        </Col>
                                        <Col span={24} className="red-link">
                                            <Link to="/walletMain">{t("Cancel")}</Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>}
                <Footer />
            </div>
        </div>
    );
}

export default Launch;

import { useState,useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import Icon from "react-crypto-icons";
import { motion, useViewportScroll } from "framer-motion"
import {AiFillCloseCircle} from "react-icons/ai";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import openNotification from "../../helpers/notification";
import Nav from "../../component/Nav"
import Footer from "../../component/Footer";
import Wallet from "../../../utils/wallet"
import setAuthToken from "../../../utils/setAuthToken"
import WalletVerifyModal from "../../views/WalletVerifyModal";
import {SERVER_URL} from "../../../constants/env";
import './WalletLanding.css'
function Launch() {
    const [t,i18n] = useTranslation();

    const [accessMode, setAccessMode] = useState(false)
    const [createMode, setCreateMode] = useState(false)
    const [phraseMode, setPhraseMode] = useState(false)

    const [missPhrase,setMissPhrase] = useState([]);
    const [modalShow,setModalShow] = useState(false);
    const [verify,setVerify] = useState(false);

    const [mnemonic, setMnemonic] = useState("")
    const [typedMnemonic, setTypedMnemonic] = useState([])
    const wallet = new Wallet()
    const serverUrl =SERVER_URL;
    const missPhrase_num=3;
    useEffect(()=>{
        let initTypedMnemonic=[...mnemonic.split(" ")];
        missPhrase.map((item,idx)=>initTypedMnemonic[item]="");
        setTypedMnemonic(initTypedMnemonic);
    },[mnemonic])
    
    useEffect(()=>{
        if(!localStorage.getItem("userInfo")){
            openNotification("Access failed.","Please log in.",false,()=>window.location.href="/")
        }
    },[])

     const randomPhrase=()=>{
        let result=[];
        let phraseNum=[0,1,2,3,4,5,6,7,8,9,10,11];
        var min = 0;
        var max = 11;
        for(var i=0;i<missPhrase_num;i++){
            var rand = Math.round( min + (Math.random() * (max-min)));
            result.push(phraseNum[rand]);
            max--;
            phraseNum.splice(rand,1);
        }
        return result;
        
    }


    function accessWallet() {
        setCreateMode(false)
        setAccessMode(true)
    }

    function createWallet() {
        setAccessMode(false)
        setCreateMode(true)
    }

    function cancelWallet() {
        setAccessMode(false)
        setCreateMode(false)
    }

   function generatePhrase() {
        setAccessMode(false)
        setCreateMode(true)
        setPhraseMode(true)
        setMnemonic( wallet.createMnemonic())
        setMissPhrase(randomPhrase());
        
        
    }
    
    function regeneratePhrase() {
        setMnemonic(wallet.createMnemonic())
    }

    async function completeCreation() {
        setAuthToken(localStorage.jwtToken)
        const response = await axios.post(serverUrl + "wallets/create", {
            keyphrase: wallet.encrypt(mnemonic),
            locale: localStorage.getItem('locale') || "Mn"
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
    function verifyModal() {
        console.log(typedMnemonic);
        setModalShow(true)
    }
    return (
        <>
        <div className="relative">
            <img src="/assets/img/background_main.png" />
            <div className="absolute top-0 w-full h-full flex flex-col ">
                <Nav className="w-11/12 xl:w-5/6 m-auto " />
                {(!accessMode && !createMode) ? <div className="w-5/6 lg:w-4/5 m-auto my-12 flex-grow">
                    <Row>
                        <Col xs={{offset: 1, span: 22}} md={{offset: 5, span: 14}} lg={{offset: 4, span: 16}} className="text-center header text-bold">
                            {t("MGL Wallet is a simple, secure, non-custodial wallet for storing token assets.")}
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={{offset: 1, span: 22}} md={{offset: 5, span: 7}} lg={{offset: 4, span: 8}}>
                            <Row className="walletSelect div-wrap">
                                <Col className="div-relative">
                                    <Row className="wallet-detail">
                                        <Col span={24}>
                                            <img src="./assets/img/mark2.png"  style={{width: 135, height: 135}} />
                                        </Col>
                                    </Row>
                                    <Row className="text-grey wallet-detail ">
                                        <Col span={24}>
                                             {t('WELCOME BACK!')}
                                        </Col>
                                    </Row>
                                    <Row className="wallet-detail header">
                                        {t("Access your existing MGL wallet here")}
                                    </Row>
                                    <Row className="wallet-detail wallet-button">
                                        <Col span={24}>
                                            <Button className="access-button" onClick={accessWallet}>{t("ACCESS WALLET")}</Button>
                                        </Col>
                                       
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{span: 22}} md={{offset: 0, span: 7}} lg={{offset: 0, span: 8}}>
                            <Row className="walletSelect div-wrap">
                                <Col className="div-relative">
                                    <Row className="wallet-detail">
                                        <Col span={24}>
                                            <img src="./assets/img/mark2.png"  style={{width: 135, height: 135}} />
                                        </Col>
                                    </Row>
                                    <Row className="text-grey wallet-detail ">
                                        <Col span={24}>
                                        {t("NEW TO MGL WALLET?")}
                                        </Col>
                                    </Row>
                                    <Row className="wallet-detail header">
                                        {t("Create a new wallet to trade assets.")}
                                    </Row>
                                    <Row className="wallet-detail wallet-button">
                                        <Col span={24}>
                                            <Button className="create-button" onClick={createWallet}>{t("CREATE NEW WALLET")}</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div> : (accessMode) ? <div className="w-5/6 lg:w-4/5 m-auto my-12 flex-grow">
                    <Row>
                        <Col xs={{offset: 1, span: 22}} md={{offset: 5, span: 14}} lg={{offset: 8, span: 8}} className="text-center header">
                            {t("How do you want to access your wallet?")}
                        </Col>
                        <Col xs={{offset: 1, span: 22}} md={{offset: 5, span: 14}} lg={{offset: 8, span: 8}} className="text-center red-link">
                            <a onClick={createWallet}>{t("Don't have a wallet?")}</a>
                        </Col>
                        <Col xs={{offset: 1, span: 22}} md={{offset: 5, span: 14}} lg={{offset: 8, span: 8}}>
                            <Row gutter={[0, 16]}>
                                <Col span={24} >
                                    <Link  to="/walletphrase/0" >
                                    <div className="access-mode">
                                        <div className="">{t("Private Key")}</div>
                                        

                                        
                                        <div>
                                            <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.43823 9H4.93821V9.64285V11.5714V13.4999V14.4642V16.0713V17.357L4.18822 17.9999L3.43823 17.357V16.0713L4.18822 14.4642L3.43823 13.4999L4.18822 11.5714L3.43823 9.64285V9Z" fill="#43294C" stroke="#43294C" stroke-width="0.794702"/>
                                                <path d="M10.3468 7.55001L14.7181 14.6549L14.4308 15.6L13.4529 15.4607L12.7623 14.3763L12.5315 12.6178L11.3809 12.2074L10.9775 10.1779L8.96235 8.54969L10.3468 7.55001Z" fill="#43294C" stroke="#43294C" stroke-width="0.794702"/>
                                                <circle cx="4.18744" cy="5.99994" r="3.35259" stroke="#43294C" stroke-width="0.794702"/>
                                                <circle cx="7.86365" cy="5.17772" r="3.35259" transform="rotate(-32.4933 7.86365 5.17772)" stroke="#43294C" stroke-width="0.794702"/>
                                            </svg>
                                        </div>
                                    </div>
                                    </Link>
                                </Col>
                                <Col span={24} >
                                    <Link  to="/walletphrase/1">
                                        <div className="access-mode">
                                            <div>{t("Mnemonic Key Phrase")}</div>
                                            <div>
                                                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.5 0.397351C2.10898 0.397351 2.60265 0.891024 2.60265 1.5C2.60265 2.10898 2.10898 2.60265 1.5 2.60265C0.891024 2.60265 0.397351 2.10898 0.397351 1.5C0.397351 0.891024 0.891024 0.397351 1.5 0.397351Z" fill="#43294C" stroke="#43294C" stroke-width="0.794702"/>
                                                    <path d="M1.5 5.39735C2.10898 5.39735 2.60265 5.89102 2.60265 6.5C2.60265 7.10898 2.10898 7.60265 1.5 7.60265C0.891024 7.60265 0.397351 7.10898 0.397351 6.5C0.397351 5.89102 0.891024 5.39735 1.5 5.39735Z" fill="#43294C" stroke="#43294C" stroke-width="0.794702"/>
                                                    <path d="M1.5 10.3974C2.10898 10.3974 2.60265 10.891 2.60265 11.5C2.60265 12.109 2.10898 12.6026 1.5 12.6026C0.891024 12.6026 0.397351 12.109 0.397351 11.5C0.397351 10.891 0.891024 10.3974 1.5 10.3974Z" fill="#43294C" stroke="#43294C" stroke-width="0.794702"/>
                                                    <rect x="4" y="1" width="11" height="1" rx="0.5" fill="#43294C"/>
                                                    <rect x="4" y="6" width="11" height="1" rx="0.5" fill="#43294C"/>
                                                    <rect x="4" y="11" width="11" height="1" rx="0.5" fill="#43294C"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{offset: 1, span: 22}} md={{offset: 5, span: 14}} lg={{offset: 8, span: 8}} className="text-center red-link">
                            <a onClick={cancelWallet}>{t("Cancel")}</a>
                        </Col>
                    </Row>
                </div> : (!phraseMode && createMode) ? <div className="w-5/6 lg:w-4/5 m-auto my-12 flex-grow">
                    <Row>
                        <Col xs={{offset: 1, span: 22}} md={{offset: 3, span: 18}} lg={{offset: 7, span: 10}} className="walletSelect">
                            <Row>
                                <Col span={24} className="text-center">
                                    <div className="image-warp">
                                        <img src="./assets/img/mark2.png"  style={{width: 95, height: 95}} className="centered-image"/>  
                                    </div>
                                </Col>
                                <Col span={24} className="text-center semi-header">
                                    {t("Generate a new key phrase to setup your MGL Wallet.")}
                                </Col>
                                <Col span={24} className="text-center red-link">
                                    <a onClick={accessWallet}>{t("Already have a wallet?")}</a>
                                </Col>
                                <Col span={24} className="text-center">
                                    <Button className="genkey-button" onClick={generatePhrase}>{t("GENERATE KEY PHRASE")}</Button>
                                </Col>
                                <Col span={24} className="text-center red-link">
                                    <a onClick={cancelWallet}>{t("Cancel")}</a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div> : <div className="w-5/6 lg:w-4/5 m-auto my-12 flex-grow">
                    <Row gutter={[16, 8]}>
                        <Col xs={{offset: 1, span: 22}} md={{offset: 5, span: 7}} lg={{offset: 2, span: 10}}>
                            <Row className="div-wrap">
                                <Col span={24}>
                                    <Row gutter={[6,6]} className="wallet-detail">
                                        <Col span={24}>
                                            <Row gutter={[6,6]} className="walletSelect">
                                                {
                                                    mnemonic.split(" ").map((item,idx)=>(
                                                        <Col span={8} key={idx}><div className="keyphrase">{`${idx+1}. ${item}`}</div></Col>
                                                    ))
                                                }
                                               
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="text-grey wallet-detail" style={{fontSize: 18}}>
                                        <div className="walletSelect">
                                            {mnemonic}
                                        </div>
                                    </Row>
                                    <Row className="wallet-detail wallet-button">
                                        <Col span={24}>
                                             <Button className="access-button" onClick={regeneratePhrase}>{t("REGENERATE")}</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{span: 22}} md={{offset: 0, span: 7}} lg={{offset: 0, span: 10}}>
                            <Row className="walletSelect div-wrap">
                                <Col className="div-relative">
                                    <Row className="wallet-detail">
                                        <Col span={24}>
                                            <img src="./assets/img/mark2.png"  style={{width: 135, height: 135}} />
                                        </Col>
                                    </Row>
                                    <Row className="wallet-detail header">
                                        {t("This is your key phrase.")}
                                    </Row>
                                    <Row className="text-grey wallet-detail" style={{fontSize: 18}}>
                                        {t("Use these 12 words in sequential order to recover your MGL Wallet")}
                                    </Row>
                                    <Row className="wallet-detail" style={{color: "rgb(134, 126, 137)", fontWeight: "700"}}>
                                        
                                    {
                                       !verify?
                                        <>
                                            <div style={{color: "red"}}>
                                                 {t("ATTENTION!")}
                                             </div>
                                             {t("STORE THIS KEY PHRASE IN A SECURE LOCATION. ANYONE WITH THIS KEY PHRASE CAN ACCESS YOUR MGL WALLET. THERE IS NO WAY TO RECOVER LOST KEY PHRASES.")}
                                        </>
                                        :
                                        <>
                                             <p className="text-green-400 text-xl">{t("CONGRATULATION!")}</p>
                                             {t("It's time to access your MGL Wallet.")}
                                        </>
                                    }
                                        
                                    </Row>
                                    <Row className="wallet-detail wallet-button">
                                    <Col span={24}>
                                    {
                                        verify?
                                            <Button className="access-button  mt-2" onClick={completeCreation}>{t("ACCESS WALLET")}</Button>
                                        :
                                            <Button className="use-button" onClick={()=>verifyModal()}>{t("ACCESS WALLET")}</Button>
                                    }
                                        
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

        {
            modalShow?
            <WalletVerifyModal setTypedMnemonic={setTypedMnemonic}typedMnemonic={typedMnemonic} mnemonic={mnemonic} setVerify={setVerify} setModalShow={setModalShow} missPhrase={missPhrase}/>
            :null
        }

        
        </>
    );
}

export default Launch;

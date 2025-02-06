import { Layout, Table, Row, Col, Space, Button, Select, Modal, Input, Form, Tabs } from 'antd';
import { DownOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {BsPlusLg} from "react-icons/bs";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import setAuthToken from "../../../utils/setAuthToken";
import WalletUtil from "../../../utils/wallet";
import { SERVER_URL } from "../../../constants/env";
import openNotification from "../../helpers/notification";
import AdminSellTokenRow from "../../component/AdminSellTokenRow";
import {getTokenPriceInUsd} from "../../../utils/tokenUtils";
const { Content } = Layout;
const { Option } = Select;

const networks=[
    {
      name:"Mainnet (Polygon)",
      url:"polygon-mainnet",
      explorer:"https://polygonscan.com/", 
      routerAddr:"0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
      baseTokenAddr:"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      usdAddr:"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      usdDecimal:6
    },
    {name:"Tesnet (Polygon)",url:"polygon-testnet",explorer:"https://mumbai.polygonscan.com/"},
    {
      name:"Mainnet (BSC)",
      url:"bsc-mainnet",
      explorer:"https://bscscan.com/",
      routerAddr:"0x10ED43C718714eb63d5aA57B78B54704E256024E",
      baseTokenAddr:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      usdAddr:"0xe9e7cea3dedca5984780bafc599bd69add087d56",
      usdDecimal:18
    },
    {name:"Tesnet (BSC)",url:"bsc-testnet",explorer:"https://testnet.bscscan.com/"},
  ]


function SellToken() {
    const [index,setIndex] = useState(0)
    const [network, setNetwork] = useState(networks[2]);
    const [transaction, setTransaction] = useState([]);
    const [price, setPrice] = useState(0);
    const [loading,setLoading] = useState(false);
    const [connection,setConnection] = useState(true);
    const [publicKey,setPublicKey]=useState(localStorage.getItem("publicKey"));
    const [canDo, setCanDo] = useState(false);
    const [buttonName, setButtonName] = useState("Send Token");
    const wallet = new WalletUtil();
    const serverUrl =SERVER_URL;
    const [t,i18n] = useTranslation();
    
    useEffect(()=>{
        if(!publicKey)
            openNotification("Wallet Access failed.","You are not allowed!",false,()=>window.location.href="/walletMain")
        getAdminTransaction();
        getMGLPrice();
    },[]);

    useEffect(() => {
        setIndex(transaction.length)
    }, [transaction])

    useEffect(() => {
        console.log(price)
    }, [price])

    useEffect(() => {
        if (canDo) setButtonName("Stop Sending")
        else setButtonName("Send Token")
    }, [canDo])
    
    const getAdminTransaction = async () => {
        setAuthToken(localStorage.jwtToken)
        axios.post(`${serverUrl}wallets/getadmintransaction`, {
            network:network.url
        })
        .then((response)=>{
            if (response.data.response) {
                setTransaction(response.data.data)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const getMGLPrice = async () => {
        getTokenPriceInUsd(network, "0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb")
        .then((response) => {
            setPrice(response)
        });
    }

    const SendAllTokens = async () => {
        setCanDo(!canDo)
    }

    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background full-height" style={{ padding: 24, minHeight: 360 }}>
                <Col className="p-4" span={24}>  
                    <Row className="text-gray-500">
                        <Col span={2}></Col>
                        <Col span={10}>{t("Address")}</Col>
                        <Col span={3}>{t("Token")}</Col>
                        <Col span={5}>{t("Amount")}</Col>
                        <Col span={4}>{t("Status")}</Col>
                    </Row>
                    <Row className="mt-2 text-lg myColor1">
                        {
                            Array.from(Array(index), (e, i ) => {
                                return (<AdminSellTokenRow transaction={transaction[i]} price={price} network={network} canDo={canDo} />)
                            })
                        }
                    </Row>
                    <Row >
                        <Col span={24} className="text-center mt-8">
                            <button className="mx-3 myButton  myBule text-white px-5 text-sm" onClick={SendAllTokens}>{buttonName}</button>
                        </Col>
                    </Row>
                </Col>
            </div>
        </Content>
    )
}

export default SellToken;
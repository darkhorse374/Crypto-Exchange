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
import AdminSendTokenRow from "../../component/AdminSendTokenRow";
import {getTokenBaseInfo,getTokenType,getEstimatedGasLimit} from "../../../utils/tokenUtils";
const { Content } = Layout;
const { Option } = Select;

const networks=[
    {name:"Mainnet (Polygon)",url:"polygon-mainnet",explorer:"https://polygonscan.com/"},
    {name:"Tesnet (Polygon)",url:"polygon-testnet",explorer:"https://mumbai.polygonscan.com/"},
    {name:"Mainnet (BSC)",url:"bsc-mainnet",explorer:"https://bscscan.com/"},
    {name:"Tesnet (BSC)",url:"bsc-testnet",explorer:"https://testnet.bscscan.com/"},
];


function SendToken() {
    const [index,setIndex] = useState(1)
    const [tokens,setTokens]=useState([]);
    const [network, setNetwork] = useState(networks[2]);
    const [tokenNames, setTokenNames] = useState([]);
    const [loading,setLoading] = useState(false);
    const [connection,setConnection] = useState(true);
    const [publicKey,setPublicKey]=useState(localStorage.getItem("publicKey"));
    const [canDo, setCanDo] = useState(false)
    const wallet = new WalletUtil();
    const serverUrl =SERVER_URL;
    const [t,i18n] = useTranslation();
    
    useEffect(()=>{
        getAssets();
        if(!publicKey)
            openNotification("Wallet Access failed.","You are not allowed!",false,()=>window.location.href="/walletMain")
    },[]);

    useEffect(() => {
        if(tokens.length>0)
            getTokenInfo();
    },[tokens])

    const getAssets = async ()=>{
        setConnection(true);
        setLoading(true);
        setAuthToken(localStorage.jwtToken)
        axios.post(serverUrl + "wallets/getassets", {
            network:network.url,
            publicKey: publicKey
        })
        .then((response)=>{
            if (response.data.response) {
                setTokens(response.data.data);
            }
        })
        .catch(err=>{
            setConnection(false);
        })
    }
    
    const getTokenInfo = async()=>{
        let oldTokensInfo=[];
        for(var i = 0; i < tokens.length; i++ ) {
            let init="";
            if (network.url === "bsc-mainnet" && tokens[i] === "0x0000000000000000000000000000000000001010") {
                init = "BNB";
            } else {
                let {symbol} = await getTokenBaseInfo(tokens[i],network.url);
                init = symbol;
            }
            oldTokensInfo.push(init);
        }
        setTokenNames(oldTokensInfo);
    }

    const addCount = () => {
        setIndex(index + 1);
    }

    const SendAllTokens = async () => {
        setCanDo(true)
    }

    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background full-height" style={{ padding: 24, minHeight: 360 }}>
                <Col className="p-4" span={24}>  
                    <Row className="text-gray-500">
                        <Col span={6}>{t("Email")}</Col>
                        <Col span={8}>{t("Address")}</Col>
                        <Col span={2}>{t("Token")}</Col>
                        <Col span={4}>{t("Amount")}</Col>
                        <Col span={2}>{t("Status")}</Col>
                        <Col span={2}>{t("Action")}</Col>
                    </Row>
                    <Row className="mt-2 text-lg myColor1">
                        {
                            Array.from(Array(index), (e, i ) => {
                                return (<AdminSendTokenRow tokenNames={tokenNames} network={network} canDo={canDo} tokens={tokens} />)
                            })
                        }
                        <Col span={2}>
                            <Space size="middle">
                                <Button className="mt-2" onClick={addCount}><BsPlusLg></BsPlusLg></Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24} className="text-center mt-8">
                            <button className="mx-3 myButton  myBule text-white px-5 text-sm" onClick={SendAllTokens}>{t("Send Token")}</button>
                        </Col>
                    </Row>
                </Col>
            </div>
        </Content>
    )
}

export default SendToken;
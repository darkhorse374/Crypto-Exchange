import React, { useState, useEffect } from 'react';
import { Button,Row,Col,Tabs,Input } from 'antd';
import {TiArrowSync} from "react-icons/ti";
import { SearchOutlined ,CloseOutlined} from '@ant-design/icons';
import {MdOutlineLightMode} from "react-icons/md";
import Icon from "react-crypto-icons";
import openNotification from "../helpers/notification";
import WalletTokenModal from "./WalletTokenModal";

import axios from 'axios';
import { useTranslation } from 'react-i18next';
import setAuthToken from "../../utils/setAuthToken"
import WalletUtil from "../../utils/wallet"
import tokenList from "../../utils/polygon.json"
import {SERVER_URL} from "../../constants/env";
const { TabPane } = Tabs;

function WalletPortfolio(props) {

  const [t,i18n] = useTranslation();
  const [modalShow,setModalShow] = useState(false);

  var Tokens=[
    {name:"MGL",price:100,balance:100},
  ]
  
  // const [balance,setBalance]=useState(props.balance);
  const [price,setPrice]=useState([]);
  const [network, setNetwork] = useState("polygon")
  const publicKey = localStorage.publicKey
  const wallet = new WalletUtil()
  const serverUrl = SERVER_URL


  const OperationsSlot = {
    left: <p className="text-3xl myColor1 mx-8">{t("Assets")}</p>,
    right: <Input size="small" placeholder={t('Search')} prefix={<SearchOutlined />} className="rounded-lg py-1 px-5 search"/>,
  };

  const tokenAddSuccess=()=>{
    setModalShow(false);
    openNotification(t('Success'),t("Successfully add Token!"),true,props.getAssets);
  }

  useEffect(()=>{
  }, []);

  return (
    <>
        
          <Col className="p-4" span={24}>  
            <Tabs tabBarExtraContent={OperationsSlot} className="w-full h-full">
              <TabPane tab={t("Tokens")} key="1">
                <Row className="text-gray-500">
                  <Col span={6}>{t("Name")}</Col>
                  <Col span={6} className="text-left">{t("Balance")}</Col>
                  <Col span={6} className="text-left">{t("Price")}</Col>
                  <Col span={6} className="text-right">{t("Total")}</Col>
                </Row>
                {
                  props.tokensInfo.map((item,idx)=>(
                    <Row className="mt-2 text-lg myColor1" key={idx}>
                      <Col span={6}>
                      {
                        item.name.toLowerCase()==="mgl"?
                          <img src="/assets/img/mark2.png" className="w-7 inline mr-4"/>
                        :
                          <Icon className="inline mr-4" name={item.name.toLowerCase()} size={30} />
                      }
                      {item.name}
                      </Col>
                      <Col span={6} className="text-left">{item.balance}</Col>
                      <Col span={6} className="text-left">{`$ ${parseFloat(item.price).toFixed(5)}`}</Col>
                      <Col span={6} className="text-right">{`$ ${parseFloat(item.price*item.balance).toFixed(5)}`}</Col>
                    </Row>
                  ))
                }
                <Row >
                  <Col span={24} className="text-center mt-8">
                  <button className="mx-3 myButton  myBule text-white px-5 text-sm" onClick={()=>setModalShow(true)}>{t("Add Token")}</button>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab={t("Collectibles")} key="2" disabled >
                {t("No Collectibles")}
              </TabPane>
            </Tabs>
          </Col>
          {
            modalShow?
            <WalletTokenModal setModalShow={setModalShow} network={props.network} tokenAddSuccess={tokenAddSuccess}/>
            :null
          }
          

    </>
  
     
  );
}

export default WalletPortfolio;

import { Button, Col,Row,Typography } from 'antd';
import {useState} from 'react';
import { Link ,useParams} from "react-router-dom";
import axios from 'axios';
import {CgFileDocument} from "react-icons/cg"
import {MdInsertLink} from "react-icons/md"
import { useTranslation } from 'react-i18next'
const { Paragraph } = Typography;
function WalletBuy(props) {
  const [publicKey,setPublicKey]=useState(localStorage.getItem("publicKey"));
  const [t,i18n] = useTranslation();

  return (
    <>
    <Col  span={24} className="p-4 myColor1  text-lg">  
      <p className="text-2xl font-bold  text-center">{t("Buy with MoonPay")}</p>
      <p className="mt-8 font-bold"><CgFileDocument size={30} className="inline"/> {t("Instructions")} </p>
      <Row className="py-4 border-b-2 border-gray-200 ">
        <Col span={12}>
          <p>{t("1. Open Moonpay here.")}</p>
        </Col>
        <Col span={12} className="font-bold text-center">
          <a target="_blank" href="https://www.moonpay.com/"><MdInsertLink size={30} className="inline"/> www.moonpay.com</a>
        </Col>
      </Row >

      <Row className="py-4 border-b-2 border-gray-200">
        <Col span={12}>
          <p>{t("2. Select currency BUSD (Bep20).")}</p>
        </Col>
        <Col span={12}>
         <img src="/assets/img/moonhere.jpg" className="shadow border-2 border-white "/>
        </Col>
      </Row >

      <Row className="py-4 border-b-2 border-gray-200">
        <Col span={12}>
          <p>{t("3. Copy your wallet address above and paste here.")}</p>
        </Col>
        <Col span={12}>
          <img src="/assets/img/moonaddress.jpg" className="shadow border-2 border-white "/>
        </Col>
      </Row >

      <Row className="py-4 border-b-2 border-gray-200">
        <Col span={12}>
          <p>{t("4. Follow rest of Moonpay instructions.")}</p>
        </Col>
        <Col span={12}>
          <img src="/assets/img/moonemail.jpg" className="shadow border-2 border-white "/>
        </Col>
      </Row >

      <Row className="py-4 border-b-2 border-gray-200">
        <Col span={24}>
          <p>{t("5. Your purchase will take up to 30 mins to arrive in your wallet.")}</p>
        </Col>
        
      </Row >

      <Row className="py-4 border-b-2 border-gray-200">
        <Col span={24}>
          <p>{t("6. Done!")}</p>
        </Col>
        
      </Row >
      
      

    </Col>
    </>
  );
}

export default WalletBuy;

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button,Row,Col } from 'antd';
import {AiOutlineLayout,AiOutlineFieldTime,AiOutlineQrcode} from "react-icons/ai"
import {RiArrowLeftRightFill} from "react-icons/ri"
import {ImProfile} from "react-icons/im";
import {BsFillCreditCard2FrontFill} from "react-icons/bs";


function WalletNav(props) {
  const [t,i18n] = useTranslation();
  const NavButtons=[
    {name:t("Portfolio"),icon:<AiOutlineLayout size={30}className="inline" />},
    {name:t("Send"),icon:<RiArrowLeftRightFill size={30}className="inline"/>},
    {name:t("Buy"),icon:<BsFillCreditCard2FrontFill size={30}className="inline"/>},
    {name:t("Activity"),icon:<AiOutlineFieldTime size={30}className="inline"/>},
    {name:t("Wallet"),icon:<AiOutlineQrcode size={30}className="inline"/>},
    {name:t("Profile"),icon:<ImProfile size={30}className="inline"/>},
  ];
  const [sel, setSel]=useState(0);

  useEffect(()=>{
    setSel(props.idx)
  },[props.idx])
  return (
      <>
          <Row className=" ">
            <Col className="text-center p-8  w-full">
               {/*<p className="text-4xl myColor1 font-bold">LOGO</p>*/}
               <Link to="/"><img src="/assets/img/mark2.png" className="w-3/5 inline" /></Link>
            </Col>
           
          </Row>
          {
            NavButtons.map((item,idx)=>(
              <Row key={idx} >
                  <button className={`text-overflow text-xl m-4 ${idx==sel? 'myColor1':''}`} onClick={()=>{setSel(idx);props.setIdx(idx)}}>{item.icon} {item.name}</button>
              </Row>
            ))
          }
          
      </>
  );
}

export default WalletNav;

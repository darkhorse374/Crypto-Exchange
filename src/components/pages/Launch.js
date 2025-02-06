import { Button,Row,Col } from 'antd';
import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Icon from "react-crypto-icons";
import { motion,useViewportScroll } from "framer-motion"

import Nav from "../component/Nav"
import Footer from "../component/Footer";
import PresaleCard from "../component/PresaleCard";
import {getTokenBaseInfo, getTokenBalance, getTokenPriceInUsd} from "../../utils/tokenUtils";
import {SERVER_URL, networks} from "../../constants/env";

function Launch() {

const [presaleData, setPresaleData] = useState([])

useEffect(async()=>{
  let result = await getPresaleData();
  setPresaleData(result);
},[])
const getPresaleData = async()=>{

  let bnbprice = await getTokenPriceInUsd(networks[2], '0x0000000000000000000000000000000000001010');
  return [ 
  {
    logo:"./assets/img/presaleLogo.png",
    state:0,
    tokenName:"MGL",
    flokinomix:(bnbprice/0.018).toFixed(3),
    hardcap:[150000,300000],
    progress:'10%',
    time:100,
    link:"https://ieo.mglcoin.io/"
  },]
}
  
  
  return (

    <div className="relative">
      <img src="/assets/img/background_main.png"/>
      <div className="absolute top-0 w-full h-full flex flex-col ">
        <Nav className="w-11/12 xl:w-5/6 m-auto "/> 
        <div className="w-5/6 lg:w-4/5 m-auto my-12 flex-grow">
          <Row>
            <Col span={8}>
              <p className="text-3xl font-bold">Presale LaunchPad</p>
            </Col>

            <Col span={8}>

            </Col>

            <Col span={8} className="text-right">
              <a href="" className="font-bold"><img src="./assets/img/bsc.png" className="inline mr-4 w-8"  />BSC MAINNET</a>
            </Col>
          </Row>
          <Row className="justify-center">
          {
            presaleData.map(item=>(
                <PresaleCard 
                    logo = {item.logo} 
                    state = {item.state}
                    tokenName = {item.tokenName} 
                    flokinomix = {item.flokinomix}  
                    hardcap = {item.hardcap} 
                    progress = {item.progress} 
                    time = {item.time}
                    link = {item.link}/>
              ))
            
          }
          </Row>
        </div>
        <Footer />
      </div>  
    </div>
  );
}

export default Launch;

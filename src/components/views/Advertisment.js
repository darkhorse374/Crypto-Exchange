import { Button,Row,Col } from 'antd';
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'

function Advertisment() {

  const {t,i18n} = useTranslation();

  const advertismentData = [
    {picUrl:"/assets/img/tradingcard.png",title:t("Easy to Trade"),subtitle:t("Own cryptocurrency with as little as USD $10")},
    {picUrl:"/assets/img/paymentmethod.png",title:t("Many Payment Methods"),subtitle:t("Pay via online banking, credit card or P2P")},
    {picUrl:"/assets/img/securitycard.png",title:t("100% Secure"),subtitle:t("Your tokens are stored in your private wallet on the blockchain, not on our server for maximum security and privacy.")},
  ]
  return (


      <Row className="items-center mt-16">
        <Col xs={{span:20,offset:2}} md={{span:0}} className="mb-8">
          <img src="/assets/img/phone_large.png" className="w-full"/>
        </Col>
        <Col xs={{span:20,offset:2}} md={{span:9,offset:3}} >
        {
          advertismentData.map((item,idx)=>(
            <Row className=" justify-center items-center my-2" key={idx}>
              <Col span={5}>
                <img src={item.picUrl} className="w-full"/>
              </Col>
              <Col span={18} offset={1}>
                <p className="text-2xl font-bold">{item.title}</p>
                <p className="text-md">{item.subtitle}</p>
              </Col>
            </Row>
          ))
        }
          <Row className="mt-8 ">
            <Col xs={{span:12}} xl={{span:8,offset:2}} className="">
           
              <a className="text-white hover:text-green-500 ">
                <div className="relative w-32 lg:w-40 m-auto">
                  <img src="/assets/img/googleplaybutton.png" />
                  <span className="absolute bottom-1 right-2 text-lg">Google Play</span>
                </div>
              </a>
  
            </Col>
            <Col xs={{span:12}} xl={{span:8}} className="">
              <a className="text-white hover:text-green-500 ">
                <div className="relative w-28 lg:w-36 m-auto">
                  <img src="/assets/img/appstorebutton.png" />
                  <span className="absolute bottom-1 right-2 text-lg">App Store</span>
                </div>
              </a>
            </Col>
          </Row>
          
        </Col>
        <Col xs={{span:0}} md={{span:10, offset:0}} className="">
          <img src="/assets/img/phone_large.png" className="w-full"/>
        </Col>


      </Row>
        
    
  );
}

export default Advertisment;

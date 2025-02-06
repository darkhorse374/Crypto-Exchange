import { useState } from 'react';
import { Button,Row,Col } from 'antd';
import { motion } from "framer-motion"
import { Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import openNotification from "../helpers/notification";

function Roadmap() {

  const {t,i18n} = useTranslation();
  const [regPage, SetRegPage] = useState(false)

  function goToRegister() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo && userInfo.email) {
      openNotification(t('Alert'),t("Already registered"),true);
    } else {
      SetRegPage(true)
    }
  }
  
  return (
    <>
      {regPage ? <Navigate to="/register" /> :
      <Row className="mt-16">
          <Col xs={{span:18,offset:3}} md={{span:16,offset:4}} className="text-center ">
              <p className="text-3xl font-bold mb-8">{t('Get Started with 3 Steps')}</p>

              <Row  className="hidden md:flex">
                <Col span={2} offset={1}>
                    <img src="/assets/img/check.png" className="w-full"/>
                </Col>
                <Col span={8} >
                  <div className="h-1/2  border-b-2 border-dashed border-gray-200" >
                  </div>
                </Col>
                <Col span={2} >
                     <img src="/assets/img/check.png" className="w-full"/>
                </Col>
                <Col span={8}>
                  <div className="h-1/2  border-b-2 border-dashed border-gray-200" >
                  </div>
                </Col>
                <Col span={2} >
                     <img src="/assets/img/check.png" className="w-full"/>
                </Col>

                <Col span={4}>
                    <span className="text-lg font-bold">{t('Create an account')}</span>
                </Col>
                <Col span={4} offset={6}>
                     <span className="text-lg font-bold">{t('Verify your account')}</span>
                </Col>
                <Col span={4} offset={6}>
                     <span className="text-lg font-bold">{t('Start buying and selling')}</span>
                </Col>
              </Row>



              <Row className="mt-8 md:hidden">
                  <Col span={6} offset={9}>
                      <img src="/assets/img/check.png" className="w-1/2 m-auto"/>
                      <span className="text-lg font-bold">{t('Create an account')}</span>
                      <div className="w-1/2 h-20 border-r-2 border-dashed border-gray-200" >
                      </div>

                      <img src="/assets/img/check.png" className="w-1/2 m-auto"/>
                      <span className="text-lg font-bold">{t('Verify your account')}</span>
                      <div className="w-1/2 h-20 border-r-2 border-dashed border-gray-200" >
                      </div>

                      <img src="/assets/img/check.png" className="w-1/2 m-auto"/>
                      <span className="text-lg font-bold">{t('Start buying and selling')}</span>
                      
                  </Col>
                
              </Row>
              {/* <Link to="/register"><button className="myButton myBule  mt-8 px-6 text-white w-2/3">{t('Get Started')}</button></Link> */}
              <button className="myButton myBule  mt-8 px-6 text-white w-2/3" onClick={goToRegister}>{t('Get Started')}</button>
          </Col>
      </Row>}
    </>
  );
}

export default Roadmap;

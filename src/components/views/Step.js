import { Button,Row,Col } from 'antd';
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import {useState} from 'react'

function Step() {

  const {t,i18n} = useTranslation();
  const [index, setIndex] = useState(0);
  const stepData = [
    {picUrl:"/assets/img/step1.png",step:t("Step 1"),subtitle:t("Get Started")},
    {picUrl:"/assets/img/step2.png",step:t("Step 2"),subtitle:t("Confirmation")},
    {picUrl:"/assets/img/step3.png",step:t("Step 3"),subtitle:t("Identify Verification")},
    {picUrl:"/assets/img/step4.png",step:t("Step 4"),subtitle:t("Buy Cryptocurrency")},
    {picUrl:"/assets/img/step5.png",step:t("Step 5"),subtitle:t("Sell Cryptocurrency")},
    {picUrl:"/assets/img/step6.png",step:t("Step 6"),subtitle:t("Send and Receive")},
  ]
  return (

    
      <div className="justify-center mt-32 overflow-hidden ">
        <p className="text-center text-3xl font-bold">{t('Help & Support')}</p>
        <div className="m-12 block md:flex flex-wrap  whitespace-nowrap md:whitespace-normal slide  " style={{ transform: `translate3d(${-1*index* 100}%, 0, 0)` }}>
        {
          stepData.map((item,idx)=>(
            <div key={idx} className="w-full md:w-1/3 mb-8 text-center inline-block p-4">
              <div className="shadow  h-full w-full p-4">
              <img src={item.picUrl} className="w-1/2 inline-block"/><br />
              <span className="text-lg ">{item.step}</span><br />
              <span className="text-xl font-bold">{item.subtitle}</span><br />
             </div>
            </div>

          ))
         
        }
         
      </div>


        <div className="slideshowDots md:hidden">
        {
          stepData.map((item,idx)=>(
            <div 
              key={idx} 
              className={`slideshowDot ${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}></div>
          ))
        }
        </div>
      </div>



      
  );
}

export default Step;

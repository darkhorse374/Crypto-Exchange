import { Button,Row,Col} from 'antd';
import { motion,useViewportScroll } from "framer-motion"
import { Link, Navigate } from "react-router-dom";
import {useState} from "react"
import {AiFillCloseCircle,AiOutlineArrowUp,AiOutlineArrowDown} from "react-icons/ai"
import {BsCreditCard2Front,BsCash,BsPeople} from "react-icons/bs"
import { useTranslation } from 'react-i18next'
import PairCardButton from "../component/PairCardButton";
import Nav from "../component/Nav"
import openNotification from "../helpers/notification";

function Main(props) {
  const {t,i18n} = useTranslation();
  const pair=[
    {title:"BNB/BUSD",percent:1.58,amount1:553.9,amount2:553.46},
    {title:"BNB/BUSD",percent:1.58,amount1:553.9,amount2:553.46},
    {title:"BNB/BUSD",percent:1.58,amount1:553.9,amount2:553.46},
    {title:"BNB/BUSD",percent:1.58,amount1:553.9,amount2:553.46},
    {title:"BNB/BUSD",percent:1.58,amount1:553.9,amount2:553.46},
    {title:"BNB/BUSD",percent:1.58,amount1:553.9,amount2:553.46},
  ];
  
  const [regPage, setRegPage] = useState(false)

  function goToRegister() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo && userInfo.email) {
      openNotification(t('Alert'),t("Already registered"),true);
    } else {
      setRegPage(true)
    }
  }
  
  return (
    <>
     {!regPage ? 
       <div className="relative mb-0">
       <img src="/assets/img/background2.png" className="w-screen absolute top-0 back"/>
       {/*<img src="./assets/img/earth2.png" className="absolute w-2/3 bottom-0 right-0" />*/}
       
         <div className="w-11/12 xl:w-5/6 m-auto ">
           <Nav />
           <motion.div
             className="mt-12 mb-12 text-gray-700 text-left"
             animate={{
                 scale: [1,1],
                 opacity:[0,1],
                 x:[-100,20,0]
               }}
               transition={{ duration: 2 }}
             >
             <p className="text-2xl md:text-5xl 2xl:text-8xl font-bold mb-1 md:mb-2">{t('Buy & Sell Crypto with')}</p>
             <p className="text-2xl md:text-5xl 2xl:text-8xl font-bold mb-2">{t('MGL Exchange')}</p>
             {/* <p className="text-md md:hidden">{t("Join the world's largest crypto exchange")}</p> */}
             
             <button className="myButton myBule text-white px-12 mt-8 2xl:text-lg" onClick={goToRegister}>{t('Register Now')}</button>
           </motion.div>
           <motion.div
             className="justify-between hidden md:flex"
                 animate={{
                   scale: [1,1],
                   opacity:[0,1],
                 }}
                 transition={{ duration: 4 }}
               >
             {
               props.coinData.map((item,index)=>(

                 <PairCardButton key={index} title={item.name} percent={item.percent} amount1={item.price}/>
               ))
             }
           </motion.div>
           <motion.div
             className="block md:hidden"
                 animate={{
                   scale: [1,1],
                   opacity:[0,1],
                 }}
                 transition={{ duration: 4 }}
               >
               <div className="flex justify-between mb-4">
                 <PairCardButton title={props.coinData[0].name} percent={props.coinData[0].percent} amount1={props.coinData[0].price} />
                 <PairCardButton title={props.coinData[1].name} percent={props.coinData[1].percent} amount1={props.coinData[1].price} />
               </div>
               <div className="flex justify-between">
                 <PairCardButton title={props.coinData[2].name} percent={props.coinData[2].percent} amount1={props.coinData[2].price} />
                 <PairCardButton title={props.coinData[3].name} percent={props.coinData[3].percent} amount1={props.coinData[3].price}/>
               </div>
                 
           </motion.div>

         </div>
         
       
     </div> : <Navigate to="/register" />}
    </>
  );
}

export default Main;

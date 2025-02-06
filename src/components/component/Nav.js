import { Menu, Dropdown,Button,Row,Col ,Badge} from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import {IoApps,IoNotificationsOutline} from "react-icons/io5";
import {BiUserCircle} from "react-icons/bi";
import {GiHamburgerMenu} from "react-icons/gi";
import {BsCurrencyExchange,BsCreditCard2Front,BsCash,BsPeople} from "react-icons/bs";
import { AiFillCaretDown,AiOutlineSwap } from "react-icons/ai";
import {GrLaunch} from "react-icons/gr"
import {MdHomeRepairService} from "react-icons/md";
import {HiAcademicCap} from "react-icons/hi";
import {FaHandHoldingHeart} from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import LangSelect from './LangSelect';
import openNotification from "../helpers/notification";
import NavCollapse from "./NavCollapse";

function Nav(props) {
  const [t,i18n] = useTranslation();
  const [userData,setUserData] = useState(localStorage.getItem("userInfo"));
  const [regPage, SetRegPage] = useState(false);
  const [submenu,setSubmenu] = useState(false);

  const logout = ()=>{
    setUserData('');
    localStorage.removeItem("userInfo");
    localStorage.removeItem("privateKey");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("jwtToken");
  }

  function goToRegister() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo && userInfo.email) {
      openNotification(t('Alert'),t("Already registered"),true);
    } else {
      SetRegPage(true)
    }
  }

  const buySubmenuData=[
    {icon:<BsCreditCard2Front size={30} className="inline mx-4"/>,title:t('Credit/Debit Card'),subtitle:t('Buy crypto via card')},
    {icon:<BsPeople size={30} className="inline mx-4"/>,title:t('P2P Trading'),subtitle:t('Bank transfer and 100+ options'), url: '/p2p'},
    // {icon:<BsCash size={30} className="inline mx-4"/>,title:t('Crash Balance'),subtitle:t('Buy crypto with your EUR balance')},
]
  const menu = (
    <div className="mt-4 rounded-xl py-4 pl-2 pr-8 flex bg-white flex-wrap shadow">
      <div className="flex flex-col flex-wrap">
        
          <Link  to="/"  className="text-md grayButton pl-2 pr-8 py-2  rounded-md">
            <BsCurrencyExchange size={20} className="inline mr-2"/>{t('Exchange')}
          </Link>
          <br/>
          <Link  to="/"  className="text-md grayButton pl-2 pr-8 py-2  rounded-md">
            <MdHomeRepairService size={20} className="inline mr-2"/>{t('Institutional Services')}
          </Link>
          <br/>
          <Link  to="/"  className="text-md grayButton pl-2 pr-8 py-2 rounded-md">
            <AiOutlineSwap size={20} className="inline mr-2"/>{t('Swap')}
          </Link>
        
      </div>
      <div className="flex flex-col flex-wrap">
     
          <Link  to="/"  className="text-md grayButton pl-2 pr-8 py-2 rounded-md">
            <HiAcademicCap size={20} className="inline mr-2"/>{t('Academy')}
          </Link>
       <br/>
          <Link  to="/"  className="text-md grayButton pl-2 pr-8 py-2 rounded-md">
            <FaHandHoldingHeart size={20} className="inline mr-2"/>{t('Charity')}
          </Link>
       <br/>
          <Link  to="/launchpad"  className="text-md grayButton pl-2 pr-8 py-2 rounded-md">
            <GrLaunch size={20} className="inline mr-2"/>{t('LaunchPad')}
          </Link>
        
      </div>
      
    </div>
  );

  const buySubmenu = (
    <div className="mt-4 rounded-xl pl-4 pr-8 pt-2 pb-4  bg-white  shadow">
      <p className="text-md font-bold">{t('Pay with')}</p>
      <div className="mt-2">
      {
        buySubmenuData.map((item,idx) => (
          <a key={idx} href={item.url} className="flex items-center  grayButton w-full rounded-lg p-2">
            {item.icon}
            <div>
              <p className="text-md font-bold">{item.title}</p>
              <p className="text-xs">{item.subtitle}</p>
            </div>
          </a>
        ))
      }
      </div>
    </div>
  );
  const profile = (
    <div className="rounded-xl p-4  flex flex-col bg-white flex-wrap shadow">
        <Link to="/wallet/4">{t('Profile')}</Link>
        <Link to="/" onClick={logout}>{t('Log out')}</Link>

      
    </div>
  );

  return (
    <>
    {!regPage ? 
      <div className={`flex  h-20  text-black ${ props.className} mt-3 text-xs xl:text-sm` }>
      <div className="flex items-center   flex-grow ">
        <Link to="/" className="h-4/5"><img src="/assets/img/mark2.png"className="h-full" /></Link>
        <Dropdown overlay={menu} placement="bottomLeft" >
          <a className="hidden md:flex flex m-4 text-gray-700"><IoApps size={30}/><AiFillCaretDown className="text-gray-400" size={30}/></a>
        </Dropdown>
      </div>
      <div className="hidden md:block py-5">
        <div className="flex  items-center rightBorder h-10 " >
          <Dropdown overlay={buySubmenu} placement="bottomLeft" >
          <a  className="mr-4 xl:mr-8 ">{t('Buy Crypto')}<AiFillCaretDown className=" inline" size={20}/></a>
          </Dropdown>
          <a className="mr-4 xl:mr-8 ">{t('Markets')}</a>
          <a className="mr-4 xl:mr-8">{t('Trade')}</a>
        </div>
      </div>
      <div className="hidden md:block py-5">
        <div className="flex  items-center rightBorder h-4 h-10 ">
        {
          (userData==undefined||userData=='')?
          <>
            <Link to="/login"><button className="mx-4 xl:mx-8">{t('Log In')}</button></Link>
            <button className="mr-4 xl:mr-8 myButton text-white myBule px-3 xl:px-6 " onClick={goToRegister}>{t('Register')} </button>
          </>
          :
          <>
            <a className="mx-4 xl:mx-8"> 
              <Badge  offset={[0, 20]} style={{ backgroundColor: 'lightblue' }}> 
                <IoNotificationsOutline className="text-black " size={30}/>
              </Badge>
            </a>
            <a className="mr-4 xl:mr-8" >
              <Dropdown overlay={profile} placement="bottomLeft" >
                <BiUserCircle size={30}/>
              </Dropdown>
            </a>
          </>
        }
          
        </div>
      </div>
      <div className="hidden md:block py-5">
        <div className="flex  items-center  h-10">
        {
          localStorage.getItem("publicKey")?
            <Link to="/wallet/0"><button className="mx-4  myButton  myBule text-white px-3 xl:px-6  "> {t('Wallet')} </button></Link>
          :
            <Link to="/walletMain"><button className="mx-4  myButton  myBule text-white px-3 xl:px-6 "> {t('Wallet')} </button></Link>
        }
          
          <LangSelect className="mr-2  myButton  bg-blue-100 w-20 " />
          <button className=" myButton  bg-blue-100 w-20 "> {t('USD')} </button>
          
        </div>
      </div>
      <div className="md:hidden py-5 flex ">
      {
          !localStorage.getItem("userInfo")?
            <button className="mr-4  myButton text-white myBule px-12 text-sm" onClick={goToRegister}>{t('Register')}</button>
          :  localStorage.getItem("publicKey")?
            <Link to="/wallet/0"><button className="mr-4  myButton  myBule text-white  px-12 text-sm "> {t('Wallet')} </button></Link>
          :
            <Link to="/walletMain"><button className="mr-4 myButton  myBule text-white  px-12 text-sm "> {t('Wallet')} </button></Link>
      }
        
        <a onClick={()=>setSubmenu(true)}> <GiHamburgerMenu size={40} /></a>
      </div>
    </div>: <Navigate to="/register" />}

    {
       submenu?
         <NavCollapse setSubmenu={setSubmenu}/>
       :null
     }
    </>
  );
}

export default Nav;

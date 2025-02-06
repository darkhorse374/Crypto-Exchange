import { Button ,Card,Input,Row, Col,Checkbox,Form } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import { 
  MailOutlined ,
  SafetyOutlined,
  LockOutlined,
  TeamOutlined ,
  EyeTwoTone,
  EyeInvisibleOutlined} from '@ant-design/icons';
import { useTranslation } from 'react-i18next'
import RegCard from '../component/RegCard';
import setAuthToken from "../../utils/setAuthToken";
import openNotification from "../helpers/notification";
import {SERVER_URL} from "../../constants/env";
import Wallet from "../../utils/wallet";
const wallet = new Wallet();
function ForgotPassword(props) {
  const [t,i18n] = useTranslation();
  const [form] = Form.useForm();
  const [email,setEmail] = useState("");
  const serverUrl=SERVER_URL;
 


  const confirm=()=>{

         
   
      axios.post(serverUrl+"users/forgotpassword",
      {
        email:email,
        locale: localStorage.getItem('locale') || "Mn"
      }).then(response=>{
        if(response.data.response){
          
          openNotification(t('Successful'),response.data.message, true,null);
        }
        else{
          openNotification(t('Login Failed'),response.data.message,false,null);
        }
        
      })

            
  }
 
  const goReset=()=>{
      window.location.href="/resetpassword";
  }
  
  return (
     <motion.div
          className="text-center relative"
          animate={{
            scale: [1,1],
            opacity:[1,1]
          }}
          transition={{ duration: 2}}
        >
      
      <img src="/assets/img/mark2.png" className="w-16 absolute top-0 mt-8 ml-24"/>
      <RegCard className="absolute top-0 w-screen h-screen login-back" cardClassName='w-full h-full rounded-none flex flex-col flex-wrap justify-center items-center'>
         
          <div className="text-2xl font-bold mt-8 mb-12 text-gray-900 text-center">
            {t("Forgot Password?")}
          </div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            autoComplete="off"
            form={form}
            validateTrigger = "onBlur"
          >
            <Form.Item
              validateTrigger = "onBlur"
              name={[ 'email']}
              rules={[{type: 'email',message:t('Invalid Email Address')},{ required: true, message: t('Please input your E-mail!') },{max:50,message:t('Please input less than 50 characters')}]}
            >
              <Input  
              
              placeholder={t("E-mail address")} 
              prefix={<MailOutlined className="m-2"/> } 
              className=" rounded-lg  bg-gray-200 text-black "
              onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Item>
            
            
      

          
            {/*<span className={`${message.style} text-lg`}>{message.val==1?<FcOk className="inline mr-2"/>:message.val==0?<FcCancel className="inline mr-2"/>:null}{message.data}</span>*/}
            <Form.Item className="mt-2">
              <button  onClick={confirm} type="submit" className="w-full bg-gray-800 text-md font-bold text-white  rounded-lg py-2">
                {t("Confirm")}
              </button>
            </Form.Item>
          </Form>

          <div className="text-center flex justify-between">
            
          </div>

      </RegCard>
    </motion.div>
   
      
      
  );
}

export default ForgotPassword;

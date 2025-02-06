import { Button ,Card,Input,Row, Col,Checkbox,Form } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link,useParams } from "react-router-dom";
import axios from "axios";
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import { motion } from "framer-motion";
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
function ResetPassword(props) {
  const [t,i18n] = useTranslation();
  const routeParams = useParams();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("password");
  const [token,setToken] = useState("");
  const [form] = Form.useForm();
  const serverUrl=SERVER_URL;
  useEffect(()=>{

    let url = routeParams.jxt;
    localStorage.setItem("jwtToken", JSON.stringify(url));
    setToken(url)
  },[])
  const reset=()=>{
    return form.validateFields()
            .then((values) => {
              setAuthToken(localStorage.jwtToken);
              axios.patch(serverUrl+"users/resetpassword",{
                email:email,
                password:password,
                confirm_password:password,
                locale: localStorage.getItem('locale') || "Mn"
              }).then(response=>{
                if(response.data.response){
                  
                  openNotification(t('Successful'),t('Welcome to our site.'), true,goLogin);
                }
                else{
                  openNotification(t('Login Failed'),response.data.message,false);
                  // setMessage({style:'text-red-500',val:false,data:"Login failed! "})
                }
                
              })


            })
            .catch((errorInfo) => {});
   


            
  }
  

  const goLogin=()=>{
      window.location.href="/login";
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
      {
        token?
           <RegCard className="absolute top-0 w-screen h-screen login-back" cardClassName='w-full h-full rounded-none flex flex-col flex-wrap justify-center items-center'>
             
              <div className="text-2xl font-bold mt-8 mb-12 text-gray-900 text-center">
                {t("Reset Password")}
              </div>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                form={form}
                validateTrigger = "onBlur"
              >
                <Form.Item

                  name={[ 'email']}
                  rules={[{type: 'email',message:t('Please enter a correct email address')},{ required: true, message: t('Please input your E-mail!') },{max:50,message:t('Please input less than 50 characters')}]}
                >
                  <Input 
                  size="large" 
                  placeholder={t("E-mail address")} 
                  prefix={<MailOutlined className="m-2"/> } 
                  className=" rounded-lg p-3 bg-gray-200 text-black "
                  onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Item>
                
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: t('Please input your password!') },
                    {min:8,message:t('Please input more than 8 characters')}]}
                >
                  <Input.Password 
                  size="large" 
                  placeholder={t("enter password here")} 
                  prefix={<LockOutlined className="m-2"/> }
                  className="rounded-lg p-3 bg-gray-200"
                  onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Item>

                <Form.Item
                  validateTrigger = "onChange"
                  name="confirm"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: t('incorrect password!') },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(t('The passwords that you entered do not match!')));
                      },
                    }),
                  ]}
                >
                  <Input.Password 
                  placeholder={t("confirm password")} 
                  prefix={<LockOutlined className="m-2"/>} 
                  className="rounded-lg  bg-gray-200"/>
                </Form.Item>
                {/*<span className={`${message.style} text-lg`}>{message.val==1?<FcOk className="inline mr-2"/>:message.val==0?<FcCancel className="inline mr-2"/>:null}{message.data}</span>*/}
                <Form.Item className="mt-2">
                  <button  onClick={reset} type="submit" className="w-full bg-gray-800 text-md font-bold text-white  rounded-lg py-2">
                   {t("Reset")}
                  </button>
                </Form.Item>
              </Form>

              <div className="text-center flex justify-between">
                {/*<Link href="#" className="myAnchor text-md ml-2">Forgot password?</Link>
                <Link to="/register" className="myAnchor text-md ml-2">Register now</Link>*/}
              </div>

          </RegCard>
          :
            null
       }
    </motion.div>
   
     
  );
}

export default ResetPassword;

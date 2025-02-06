import { Button ,Card,Input,Row, Col,Checkbox,Form } from 'antd';
import React, { useState, useEffect,useContext } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import { 
  MailOutlined ,
  SafetyOutlined,
  LockOutlined,
  TeamOutlined ,
  EyeTwoTone,
  EyeInvisibleOutlined} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../providers/UserProvider';
import RegCard from '../component/RegCard';
import setAuthToken from "../../utils/setAuthToken";
import openNotification from "../helpers/notification";
import {SERVER_URL} from "../../constants/env";
import Wallet from "../../utils/wallet";
const wallet = new Wallet();
function Register(props) {
  const userData = useContext(UserContext);

  const [t,i18n] = useTranslation();
  const [form] = Form.useForm();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("password");
  const serverUrl=SERVER_URL;
  const onChange=(e)=>{
    console.log(`checked = ${e.target.checked}`);
  };
  useEffect(() => {
  }, []);

  const login=()=>{
    
    return form.validateFields()
            .then((values) => {
              console.log(userData)
              userData.login({
                email:email,
                password:password
              });
              // axios.post(serverUrl+"users/login",{
              //   email:email,
              //   password:password
              // }).then(response=>{
              //   if(response.data.response){
                  
              //     // setMessage({style:'text-green-500',val:true,data:"Successful! Welcome to our site."});
              //     localStorage.setItem("userInfo", JSON.stringify(response.data.data.userInfo));
              //     localStorage.setItem("jwtToken", JSON.stringify(response.data.data.token));
              //     console.log(response.data.data)
              //     if(response.data.data.keyPair){
              //       localStorage.setItem("privateKey",wallet.decrypt(response.data.data.keyPair[0].privateKey));
              //       localStorage.setItem("publicKey",response.data.data.keyPair[0].publicKey);
              //     }
              //     openNotification(t('Successful'),t('Welcome to our site.'), true,goMain);
              //     setAuthToken(response.data.data.token);
              //   }
              //   else{
              //     openNotification(t('Login Failed'),response.data.message,false);
              //     // setMessage({style:'text-red-500',val:false,data:"Login failed! "})
              //   }
                
              // })


            })
            .catch((errorInfo) => {});           
  }
  const logout=()=>{
    localStorage.removeItem("user");
  }
  const goMain=()=>{
      window.location.href="/";
  }
  
  return (
   
      <RegCard className={props.className} cardClassName='w-full h-full rounded-none flex flex-col flex-wrap justify-center items-center'>
         
          <div className="text-2xl font-bold mt-8 mb-12 text-gray-900 text-center">
            {t("Log In")}
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
              placeholder={t('E-mail address')} 
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
              placeholder={t('enter password here')} 
              prefix={<LockOutlined className="m-2"/> }
              className="rounded-lg p-3 bg-gray-200"
              onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Item>

          
            {/*<span className={`${message.style} text-lg`}>{message.val==1?<FcOk className="inline mr-2"/>:message.val==0?<FcCancel className="inline mr-2"/>:null}{message.data}</span>*/}
            <Form.Item className="mt-2">
              <button  onClick={login} type="submit" className="w-full bg-gray-800 text-md font-bold text-white  rounded-lg py-2">
               {t("Log In")}
              </button>
            </Form.Item>
          </Form>

          <div className="text-center flex justify-between">
            <Link to="/forgotpassword" className="myAnchor text-md ml-2">{t("Forgot password?")}</Link>
            <Link to="/register" className="myAnchor text-md ml-2">{t("Register now")}</Link>
          </div>

      </RegCard>
      
  );
}

export default Register;

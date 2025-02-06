import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Input, Form } from 'antd';
import { 
    MailOutlined,
    LockOutlined
} from '@ant-design/icons';
import adminLoginImage from '../../assets/image/adminlogin.svg';
import openNotification from "../helpers/notification";
import setAuthToken from "../../utils/setAuthToken";
import Wallet from "../../utils/wallet";
import { SERVER_URL } from "../../constants/env";
import { motion } from "framer-motion";

const { Password,  } = Input;
const wallet = new Wallet();

function LogIn() {
    const [form] = Form.useForm();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("password");

    const login = () => {
        return form.validateFields()
                .then((values) => {
                  console.log("validateFile")
                  axios.post(SERVER_URL + "users/login",{
                    email:email,
                    password:password
                  }).then(response=>{
                    if(response.data.response){
                      
                      // setMessage({style:'text-green-500',val:true,data:"Successful! Welcome to our site."});
                      localStorage.setItem("userInfo", JSON.stringify(response.data.data.userInfo));
                      localStorage.setItem("jwtToken", JSON.stringify(response.data.data.token));
                      console.log(response.data.data)
                      if(response.data.data.keyPair){
                        localStorage.setItem("privateKey",wallet.decrypt(response.data.data.keyPair[0].privateKey));
                        localStorage.setItem("publicKey",response.data.data.keyPair[0].publicKey);
                      }
                      openNotification('Successful','Welcome to our site.', true,goMain);
                      setAuthToken(response.data.data.token);
                    }
                    else{
                      openNotification('Login Failed',response.data.message,false);
                      // setMessage({style:'text-red-500',val:false,data:"Login failed! "})
                    }
                  })
                })
                .catch((errorInfo) => {});
    }

    const goMain=()=>{
        window.location.href="/admin";
    }

    return (
        <div className="w-full h-screen flex">
            <div className="hidden lg:flex w-8/12 items-center justify-center p-20 bg-gray-100">
                <div className="w-full px-20">
                    <img className="max-w-full" src={adminLoginImage} />
                </div>
            </div>
            <div className="w-full flex lg:w-4/12 item-center justify-center">
                <div className="w-8/12 m-auto">
                    <h2 className="text-3xl mb-6">Welcome to MGL!</h2>
                    <p className="text-lg mb-6 text-gray-400">Please sign-in to your account and start the adventure</p>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        form={form}
                        validateTrigger="onBlur"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { type: 'email', message: 'Please enter a correct email address' },
                                { required: true, message: 'Please input your E-mail!' },
                                { max:50, message: 'Please input less than 50 characters' }
                            ]}
                        >
                            <Input 
                                size="large" 
                                placeholder={'E-mail address'} 
                                prefix={<MailOutlined className="m-2"/> } 
                                className=" rounded-lg p-3 text-black "
                                onChange={(e)=>setEmail(e.target.value)}/>
                        </Form.Item>
                        
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min:8, message: 'Please input more than 8 characters' }
                            ]}
                        >
                            <Input.Password 
                                size="large" 
                                placeholder={'enter password here'} 
                                prefix={<LockOutlined className="m-2"/> }
                                className="rounded-lg p-3"
                                onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Item>

                    
                        {/*<span className={`${message.style} text-lg`}>{message.val==1?<FcOk className="inline mr-2"/>:message.val==0?<FcCancel className="inline mr-2"/>:null}{message.data}</span>*/}
                        <Form.Item className="mt-2">
                            <button  onClick={login} type="submit" className="w-full bg-gray-800 text-md font-bold text-white  rounded-lg py-2">
                                Sign In
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;

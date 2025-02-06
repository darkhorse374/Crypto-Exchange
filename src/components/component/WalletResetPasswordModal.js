import { useState,useEffect } from 'react';
import { Button, Row, Col, Input, Form } from 'antd';
import WalletModal from ".//WalletModal";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {SERVER_URL} from "../../constants/env";
import openNotification from "../helpers/notification";
import setAuthToken from "../../utils/setAuthToken";
function WalletResetPasswordModal(props) {
    const [t,i18n] = useTranslation();
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("")
    const [form] = Form.useForm();
    const [use,setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
    const serverUrl=SERVER_URL;
    const reset=()=>{
    
        form.validateFields()
        .then((values) => {
            setAuthToken(localStorage.jwtToken);
              axios.patch(serverUrl+"users/resetpassword",{
                email:use.email,
                currentPassword:oldPassword,
                password:newPassword,
                confirm_password:newPassword,
                locale: (localStorage.getItem('locale') || "Mn")
              }).then((response)=>{
                if(response.data.response){
                    openNotification(t('Success'),t("Successfully password reset."),true,()=>props.setModalShow(false))
                }
                else
                    openNotification(t('Failed'),t(response.data.message),false,null)
              })
        })
    }
    return (
        <WalletModal title={t(props.title)} close={()=>props.setModalShow(false)}>
            <div className="walletPassword">
                 <Form form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    validateTrigger = "onSubmit">

                    <Form.Item
                      validateTrigger = "onBlur"
                      name="oldpassword"
                      rules={[
                        { required: true, message: t('Please input your password!') },
                        {min:8,message:t('Please input more than 8 characters')}]}
                    >
                      <Input.Password 
                        placeholder={t("enter your password")} 
                        className=" myColor1 text-lg text-center w-full mt-8 border-gray-200 border-2 p-2"
                      onChange={(e)=>setOldPassword(e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                      validateTrigger = "onBlur"
                      name="password"
                      rules={[
                        { required: true, message: t('Please input your new password!') },
                        {min:8,message:t('Please input more than 8 characters')}]}
                    >
                      <Input.Password 
                      placeholder={t("enter new password")} 
                      className=" myColor1 text-lg text-center w-full mt-8 border-gray-200 border-2 p-2"
                      onChange={(e)=>setNewPassword(e.target.value)}/>
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
                            return Promise.reject(new Error(t("The passwords that you entered do not match!")));
                          },
                        }),
                      ]}
                    >
                      <Input.Password 
                      placeholder={t("confirm new password")} 
                      className=" myColor1 text-lg text-center w-full mt-8 border-gray-200 border-2 p-2"/>
                    </Form.Item>
                    <Button size="large"className="access-button  mt-8 mb-4" onClick={reset}>{t("Reset")}</Button>
                </Form>
            </div>
        </WalletModal> 

    );
}

export default WalletResetPasswordModal;

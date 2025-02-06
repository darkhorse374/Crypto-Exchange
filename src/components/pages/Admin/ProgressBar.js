import { Layout, Table, Row, Col, Button, Select, Modal, notification, Form, Input, Upload, message } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import setAuthToken from "../../../utils/setAuthToken";
import { SERVER_URL } from "../../../constants/env";
import openNotification from "../../helpers/notification";

const { Content } = Layout;
const { Column } = Table;

const ieoID=1;
function P2PTableView() {

    const [IEOData, setIEOData] = useState({});
    const [t,i18n] = useTranslation();
    const checkNumber = value => {
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
          return true;
        }
        return false;
      }
    const onChangeCurrentSold = e=>{
        const {value} = e.target;
        if(checkNumber(value))
            setIEOData((prevData)=>({...prevData,raised_amount:value}));
    }
    const onChangeTotalSupply = e=>{
        const {value} = e.target;
        if(checkNumber(value))
            setIEOData((prevData)=>({...prevData,total_supply:value}));
    }

    const update = ()=>{
        setAuthToken(localStorage.jwtToken)
          axios.patch(SERVER_URL +`ieo/id/${ieoID}`, {
            token_address :"0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb",
            token_name : "MGL",
            token_symbol : "MGL",
            token_description : "MGL",
            token_website : "https://exchange.mglcoin.io/",
            token_fb : "MGL",
            token_pic : "MGL",
            token_decimals : 18, 
            total_supply : Number(IEOData.total_supply),
            presale_supply : Number(IEOData.total_supply),
            presale_price : 0.018,
            list_price : 0.018,
            min_buy : 0.018, 
            max_buy : 0.018, 
            start_time : "00/00/00/00",
            end_time : "00/00/00/00",
            status : "incoming",
            raised_amount :Number(IEOData.raised_amount)
          })
            .then((response)=>{
                 if (response.data.response) {
                    openNotification("Success", "", true, get);
                 }else
                    openNotification("Failed", response.data.message, false, null);
              })
              .catch(err=>{
                openNotification("Failed", "No connection", false, null);
              })
    }

    const get = ()=>{
         setAuthToken(localStorage.jwtToken)
          axios.get(SERVER_URL + "ieo/", {
            id:ieoID
          })
            .then((response)=>{
                 if (response.data.response) {
                  setIEOData(response.data.data[0]);
                 }
              })
              .catch(err=>{

              })
    }
    useEffect(()=>{
        get();
    },[])
    const percentSold = useCallback(()=>{
        console.log(IEOData.raised_amount);
        if(IEOData.id)
            return `${(IEOData.raised_amount/IEOData.total_supply*100).toFixed(5)} %`;
        return '0 %';
    },[IEOData])
    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <div className="text-lg text-right  site-layout-background full-height" style={{ padding: 24, minHeight: 360 }}>
                <p className="text-left font-bold my-4">MGL</p>
                <Row>
                    <Col span={8}>
                        Current Sold : 
                    </Col>
                    <Col span={7} offset={1}>
                        <input 
                        placeholder={t("Input Current Sold")} 
                        className=" w-full myColor1 text-lg text-center  border-gray-200 border-b-2 focus:outline-none"
                        onChange={onChangeCurrentSold}
                        value={IEOData.raised_amount}/>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col span={8} >
                        Total Supply : 
                    </Col>
                    <Col span={7} offset={1}>
                        <input 
                        placeholder={t("Input Total Supply")} 
                        className=" w-full myColor1 text-lg text-center  border-gray-200 border-b-2 focus:outline-none"
                        onChange={onChangeTotalSupply}
                        value={IEOData.total_supply}/>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col span={8}>
                        % Sold : 
                    </Col>
                    <Col span={7} offset={1}>
                        <input 
                        placeholder={t("% Sold")} 
                        className=" w-full myColor1 text-lg text-center  border-gray-200 border-b-2 focus:outline-none"
                        value = {percentSold()}/>
                    </Col>
                </Row>
                <Row className="mt-8">
                    <Col span={8} offset={8}>
                        <button className="mx-3 myButton  myBule text-white w-full text-sm" onClick={update}>{t("Update")}</button>
                    </Col>
                </Row>
            </div>
        </Content>
    )
}

export default P2PTableView;
import { useState,useEffect, useCallback, useContext } from 'react';
import { Button, Row, Col, Input, Select } from 'antd';
import Icon from "react-crypto-icons";
import WalletModal from "../WalletModal";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {getTokenBaseInfo, getTokenPriceInUsd} from "../../../utils/tokenUtils";
import {PresaleContext} from '../../providers/PresaleProvider';
const { Option } = Select;

function WalletPresaleModal(props) {
    const publicKey = localStorage.publicKey
    const [t,i18n] = useTranslation();
    const getTokenInfoBuyFrom = useCallback(()=>{},[]);
    const presaleData = useContext(PresaleContext);
    const [mode, setMode] = useState(0);

    const checkNumber = value => {
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
          return true;
        }
        return false;
      }
    const onChangePresaleAmount = e=>{
        const {value} = e.target;
        if(checkNumber(value))
            presaleData.setPresaleData(prevState => {
                return { ...prevState, toAmount: value,fromAmount:Number(value)*prevState.price }
              });
    }
    const onChangeFromTokenAmount = e=>{
        const {value} = e.target;
        if(checkNumber(value))
             presaleData.setPresaleData(prevState => {
                return { ...prevState, fromAmount: value, toAmount:Number(value)/prevState.price }
              });
    }
    // const onChangeFromToken = e=>{
    //     let result = props.tokensInfo.filter(item=>item.name===e.target.value);
    //     console.log(result);
    //     props.setPresaleData(prevState => {
    //         return {...prevState,fromToken:result.address,fromTokenName:result.name}
    //     })
    // }
    return (
        <WalletModal title={t("Buy Token")} close={props.cancel}>
        <Row className="text-left my-8">
            <Col span={24} >
            <Row className="">
                <Col span={8}>
                    <span>{t('Buy to')}</span>
                </Col>
                <Col span={16}>
                    <p className=" bg-gray-200 w-full text-center p-1.5">
                        
                        {
                            presaleData.presaleData.symbol?
                            <>
                               {presaleData.presaleData.symbol.toLowerCase()==="mgl"?
                                  <img src="/assets/img/mark2.png" className="w-7 inline mr-4"/>
                                :
                                  <Icon className="inline mr-4" name={presaleData.presaleData.symbol.toLowerCase()} size={30} />
                              }
                            </>
                            : null
                        }
                        {presaleData.presaleData.symbol}
                    </p>
                    <div className="mt-4">
                    <span>{t("Amount : ")}</span>
                    <input 
                        placeholder={t("Input Amount")} 
                        className="w-2/3 myColor1 text-lg text-center  border-gray-200 border-b-2 focus:outline-none"
                        value = {presaleData.presaleData.toAmount}
                        onChange = {onChangePresaleAmount}/>
                    </div>
                </Col>
            </Row>

            <Row className="mt-8">
                <Col span={8}>
                    <span>{t('Buy from')}</span>
                </Col>
                <Col span={16}>
                    {/*<Select size="large" defaultValue={"BUSD"} dropdownClassName="bg-gray-200 " className=" bg-gray-200 w-full" onChange={onChangeFromToken}>
                      {
                        props.tokensInfo.map((item,idx)=>(
                          <Option key={idx} value={item.name}><Icon className="inline mr-4" name={item.name.toLowerCase()} size={30} />{item.name}</Option>
                        ))
                      }
                    </Select>*/}
                    <p className=" bg-gray-200 w-full text-center p-1.5">       
                        <Icon className="inline mr-4" name='busd' size={30} />BUSD
                    </p>
                    <div className="mt-4">
                    <span>Amount : </span>
                     <input 
                        placeholder={t("Input Amount")} 
                        className=" w-2/3 myColor1 text-lg text-center  border-gray-200 border-b-2 focus:outline-none"
                        onChange={onChangeFromTokenAmount}
                        value={presaleData.presaleData.fromAmount}/>
                    </div>
                </Col>

            </Row>

            </Col>
            </Row>
            <p>{`1${presaleData.presaleData.symbol} = ${presaleData.presaleData.price} ${"USD"}`}</p>
            {
                mode==0?
                <>
                    <p className="text-sm  mt-4">Do you have BNB to complete this transaction?</p>
                    <Row gutter={16} className="text-center">
                        <Col span={12}>
                            <Button size="large"className="access-button  mb-8 mt-4 w-full text-sm" onClick={()=>setMode(1)}>{t("Yes, continue purchase")}</Button>
                        </Col>
                    
                        <Col span={12}>
                            <Button size="large"className="  mb-8 mt-4 w-full text-sm" onClick={props.sendMe}>{t("No, send me BNB")}</Button>
                        </Col>
                    </Row>
                </>
                :
                    <Row gutter={16}>
                        <Col span={10} offset={2}>
                            <Button size="large"className="access-button  mb-8 mt-4 w-full" onClick={props.addToken}>{t("Buy")}</Button>
                        </Col>
                    
                        <Col span={10}>
                            <Button size="large"className="  mb-8 mt-4 w-full" onClick={props.cancel}>{t("Cancel")}</Button>
                        </Col>
                    </Row>
            }
              
        </WalletModal>            
    );
}

export default WalletPresaleModal;

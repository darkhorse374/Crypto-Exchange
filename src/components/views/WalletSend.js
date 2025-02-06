import {useState,useEffect,useCallback, useContext} from 'react'
import { Button,Row,Col,Input,Select } from 'antd';
import {AiFillCamera} from "react-icons/ai";
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import setAuthToken from "../../utils/setAuthToken"
import Wallet from "../../utils/wallet"
import {SERVER_URL} from "../../constants/env";
import openNotification from "../helpers/notification";
import WalletSendModal from "../component/WalletSendModal";
import WalletPresaleModal from "../component/WalletComponents/WalletPresaleModal";
import {getTokenBaseInfo,getTokenType,getEstimatedGasLimit} from "../../utils/tokenUtils";
import {PresaleContext} from '../providers/PresaleProvider';
const { TextArea } = Input;
const { Option } = Select;

function WalletSend(props) {
  const wallet = new Wallet()
  const [t,i18n] = useTranslation();
  const serverUrl = SERVER_URL
  const publicKey = localStorage.publicKey
  const privateKey = localStorage.privateKey
  const [amount, setAmount] = useState(0)
  const [balance,setBalance] = useState(0)
  const [sel, setSel] = useState(0)
  const [destination, setDestination] = useState("");
  const [estimatedGasLimit,setEstimatedGasLimit] = useState(21000);
  const [sendModalShow,setSendModalShow] = useState(false);
  const [presaleModal, setPresaleModal] = useState(false);
  const presaleData = useContext(PresaleContext);
  const [presaleMode, setPresaleMode] = useState(false);
  const [navigate, setNavigate] = useState(false);
  useEffect(()=>{
    if(presaleData.presaleData.toToken){
      setPresaleMode(true)
      setPresaleModal(true);
    }
  },[presaleData.presaleData])
  function selectToken(val) {
    setSel(val);
    setBalance(props.tokensInfo[val].balance);
  }

  function setAmountToMax() {
    setAmount(balance); 
  }
  const sendToken = (price,limit)=>{
    if(!checkConfirm(
          props.tokensInfo[sel].address,
          amount,
          limit,
          price,
          props.network))
      return false;
    setAuthToken(localStorage.jwtToken)
    sendTransaction({
      publicKey: publicKey,
      network: props.network.url,
      destination: destination,
      token:props.tokensInfo[sel].address,
      amount: amount,
      gasLimit:limit,
      gasPrice:price,
      locale: localStorage.getItem('locale') || "Mn"
      });
  }
  const sendPresaleToken = (price,limit)=>{
    // if(!checkConfirm(
    //       presaleData.presaleData.network.usdAddr,
    //       presaleData.presaleData.fromAmount,
    //       limit,
    //       price,
    //       presaleData.presaleData.network))
    //   return false;

      setAuthToken(localStorage.jwtToken);
      sendTransaction({
        publicKey: publicKey,
        network: presaleData.presaleData.network.url,
        destination: "0x0000000000000000000000000000000000000000",
        token:presaleData.presaleData.network.usdAddr,
        amount: presaleData.presaleData.fromAmount,
        gasLimit:limit,
        gasPrice:price,
        locale: localStorage.getItem('locale') || "Mn"
        });

    
  }
  const checkConfirm = (token, amount, gasLimit, gasPrice, network)=>{
    let selToken = props.tokensInfo.filter(item=>item.address===token);
    console.log(selToken)
    if(selToken[0].balance<amount){
      openNotification(t("Failed"),t("Insufficient funds."),false,null)
      return false;
    }
    let feeToken = props.tokensInfo.filter(item=>item.address==="0x0000000000000000000000000000000000001010");
    if(feeToken[0].balance<(gasLimit*gasPrice/Math.pow(10,18))){
      openNotification(t("Failed"),t("Lack Fee."),false,null)
      return false;
    }
    return true;
  }
  const sendTransaction = (requestData)=>{
    setAuthToken(localStorage.jwtToken)
    axios.post(serverUrl + "wallets/sendtoken", requestData)
                .then(response=>{
                    if (response.data.response) {
                      openNotification(t("Success"),"",true,()=>props.getAssets());
                    } 
                    else{
                      openNotification(t("Failed"),"",false,null);
                    }
                })
  }
  const cancelPresale = ()=>{
    setPresaleModal(false);
    // setNavigate(true);
    // props.setIdx(0);
    window.location.href = "/wallet/0"
  }
  const sendMe = ()=>{
    props.setStopMode(true);

    setAuthToken(localStorage.jwtToken)
    // setTimeout(()=>axios.post(serverUrl + "wallets/getcoinfortransaction", {
    //   publicKey: publicKey,
    //   network: props.network.url,
    // })
    //   .then(response=>{
    //       if (response.data.response) {
    //         openNotification(t("Success"),"",true,()=>{props.getAssets();props.setStopMode(false);});
    //       } 
    //       else
    //         openNotification(t("Failed"),"",false,()=>{props.setStopMode(false);});
    //   })
    //   .catch(err=>{
    //     props.setStopMode(false);
    //   }), 10000);
    axios.post(serverUrl + "wallets/getcoinfortransaction", {
      publicKey: publicKey,
      network: props.network.url,
    })
      .then(response=>{
          if (response.data.response) {
            openNotification(t("Success"),"",true,()=>{props.getAssets();props.setStopMode(false);});
          } 
          else
            openNotification(t("Failed"),"",false,()=>{props.setStopMode(false);});
      })
      .catch(err=>{
        props.setStopMode(false);
      })
  }
  const presaleAddToken = ()=>{
    showSendModalForPresale();
    

    
  }
  const showSendModal = async()=>{
    if(amount === 0 || destination == "")
    {
      openNotification("Warn","check destination or amount!",false,null);
      return false;
    }
    let estimated = await getEstimatedGasLimit(
      props.tokensInfo[sel].address,
      props.network.url,
      destination,
      publicKey,
      amount);
    setEstimatedGasLimit(estimated);
    setSendModalShow(true)
  }
  const showSendModalForPresale = async()=>{
    if(presaleData.presaleData.fromAmount === 0 || !presaleData.presaleData.fromAmount || presaleData.presaleData.fromAmount === '0')
    {
      openNotification("Warn","check amount!",false,null);
      return false;
    }
    let estimated = await getEstimatedGasLimit(
      presaleData.presaleData.network.usdAddr,
      presaleData.presaleData.network.url,
      "0x07b255d138a42e0df6bb30f4daf238029e472a38",
      publicKey,
      presaleData.presaleData.fromAmount);
    setEstimatedGasLimit(estimated);
    setPresaleModal(false);
    setSendModalShow(true)
  }
  const tokenType=useCallback(()=>{
    return getTokenType(props.network.url);
  },[props.network.url])

  return (
    <>
    {
      !navigate?
      <Col className="p-4" span={24}>  
        <Row>
          <Col span={16}>
            <Row>
              <Col span={16}>
                <p>{t("Amount")}</p>
                <Input 
                  type="number"
                  placeholder="0.00"  
                  prefix={<a className="px-2" onClick={setAmountToMax}>{t("MAX")}</a>}
                  className="w-full bg-gray-200 pl-0 mt-2 input-right"
                  onChange={e=>setAmount(e.target.value)}/>
                  <Row >
                    <Col span={24} className=" mt-2">
                    <p>{t("Balance")} : {balance}</p>
                    <p>{t("Type")} : {tokenType()}</p>
                    </Col>
                  </Row>
                
              </Col>
              <Col span={8} className="pl-2">
                <p>{t("Token")}</p>
                  <Select  defaultValue={0} dropdownClassName="bg-gray-200 " className="mt-2 bg-gray-200 w-1/2" onChange={e=>selectToken(e)}>
                    {
                      props.tokensInfo.map((item,idx)=>(
                        <Option key={idx} value={idx}>{item.name}</Option>
                      ))
                    }
                  </Select>
                
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <p className="myColor1 text-lg">{t("To Address")}</p>
            <Input 
                placeholder={t("To Address")}  
                
                className="w-full bg-gray-200 pl-0 mt-2"
                onChange={e=>setDestination(e.target.value)}
                />
            <p className="myColor1 text-lg mt-8">{t("Memo(Optional)")}</p>
            <TextArea
              placeholder={t("Memo")}
              autoSize={{ minRows: 3, maxRows: 5 }}
              className="mt-2"
            />
           
            <Row>
              <Col span={24}>
              {
                balance<amount?
                  <p className="text-red"> {t("Insufficient funds.")}</p>
                :
                  null
              }
                
                <button  className=" mt-4 myButton  myBule text-white  text-sm w-full" onClick={showSendModal}>{t("Send")}</button>
              </Col>
            </Row>
           
          </Col>
        </Row>
        
      </Col>
      :<Navigate to="/wallet/0"></Navigate>
    
    }
    
    {
      presaleModal?
        <WalletPresaleModal 
          setModalShow={showSendModalForPresale}
          tokensInfo = {props.tokensInfo}
          addToken = {presaleAddToken}
          cancel = {cancelPresale}
          sendMe = {sendMe}/>
      : null
    }
    {
      sendModalShow?
        <WalletSendModal 
          amount={presaleMode?`${presaleData.presaleData.fromAmount} BUSD`:`${amount} ${props.tokensInfo[sel].name}`} 
          estimatedGasLimit={estimatedGasLimit} 
          confirm={presaleMode?sendPresaleToken:sendToken} 
          setModalShow={setSendModalShow}/>
      : null
    }
    </>
  );
}

export default WalletSend;
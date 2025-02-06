import React from 'react';
import { useEffect, useState } from 'react';
import { Col, Input, Select} from 'antd';
import axios from "axios";
import { SERVER_URL } from "../../constants/env";
import setAuthToken from "../../utils/setAuthToken";
import {getTokenBaseInfo,getTokenType,getEstimatedGasLimit} from "../../utils/tokenUtils";

const { Option } = Select;


function AdminSendTokenRow(props) {

    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [token, setToken] = useState(0);
    const [tokenAddress, setTokenAddress] = useState(0);
    const [publicKey,setPublicKey] = useState(localStorage.getItem("publicKey"));
    const [status, setStatus] = useState()

    const serverUrl = SERVER_URL;

    const changeEmail = (val) => {
        if (val.includes("@") && val.includes(".") && (val.length - val.lastIndexOf(".") > 2) && (val.length - val.lastIndexOf(".") < 5)) {
            setEmail(val);
        }
    }

    useEffect(()=>{
        if(email.length > 0) {
            setAuthToken(localStorage.jwtToken)
            axios.get(`${serverUrl}wallets/getwalletbyemail/${email}`, {
            })
            .then((response)=>{
                if (response.data.response) {
                    setAddress(response.data.data);
                }
            })
            .catch(err=>{
                console.log(err);
                setAddress("");
            })
        }
    },[email])

    useEffect(() => {
        setTokenAddress(props.tokens[token])
    }, [token])

    useEffect(() => {
        (async() => {
            if(props.canDo === true) {
                setStatus("Pending...")
                let gasLimit = await getEstimatedGasLimit(
                    tokenAddress,
                    props.network.url,
                    address,
                    publicKey,
                    amount);

                setAuthToken(localStorage.jwtToken)
                axios.post(serverUrl + "wallets/sendtoken", {
                    publicKey: publicKey,
                    destination: address,
                    token: tokenAddress,
                    amount: amount,
                    gasPrice: 30,
                    gasLimit: gasLimit * 2,
                    network: props.network.url,
                    locale: localStorage.getItem('locale') || "Mn"
                })
                .then((response) => {
                    response.data.response ? setStatus("Success") : setStatus("Failed");
                })
                .catch(error => {
                    setStatus("Failed")
                })
            } else setStatus("")
        })()
    }, [props.canDo])

    return (
        <React.Fragment>
            <Col span={6} className="pr-4">
                <Input 
                    type="text"
                    placeholder="Email address"
                    className="w-full bg-gray-200 pl-0 mt-2 input-right"
                    onChange={e=>changeEmail(e.target.value)}
                />
            </Col>
            <Col span={8} className="pr-4">
                <Input 
                    type="text"
                    placeholder="address"
                    className="w-full bg-gray-200 pl-0 mt-2 input-right"
                    value={address}
                />
            </Col>
            <Col span={2}>
                <Select  defaultValue={0} dropdownClassName="bg-gray-200 " className="mt-2 bg-gray-200 w-2/2" onChange={e=>setToken(e)}>
                    {
                        props.tokenNames.map((item,idx)=>(
                            <Option key={idx} value={idx}>{item}</Option>
                        ))
                    }
                </Select>
            </Col>
            <Col span={4} className="pr-4">
                <Input 
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-gray-200 pl-0 mt-2 input-right"
                    onChange={e=>setAmount(e.target.value)}
                />
            </Col>
            <Col span={2}>
                <div className="mt-2">{status}</div>
            </Col>
        </React.Fragment>
    )
}

export default AdminSendTokenRow;
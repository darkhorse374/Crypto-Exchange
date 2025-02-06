import React from 'react';
import { useEffect, useState } from 'react';
import { Col, Input, Select} from 'antd';
import axios from "axios";
import { SERVER_URL } from "../../constants/env";
import setAuthToken from "../../utils/setAuthToken";
import {getTokenPriceInUsd,getEstimatedGasLimit} from "../../utils/tokenUtils";

const { Option } = Select;


function AdminSendTokenRow(props) {

    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [selected, setSelected] = useState(false);
    const [tokenAddress, setTokenAddress] = useState(0);
    const [publicKey,setPublicKey] = useState(localStorage.getItem("publicKey"));
    const [status, setStatus] = useState();

    const serverUrl = SERVER_URL;

    useEffect(() => {
        setTokenAddress("0xcbAe2a4625c5CB99391D8F1a0F5121B3E5A176bb")
        getTokenPrice();
    }, [])

    useEffect(() => {
        setAmount(props.transaction.amount * price / (0.008 * 1e18))
    }, [price])

    useEffect(() => {
        setAddress(props.transaction.from_id);
    }, [props.transaction])

    useEffect(() => {
        console.log(amount)
    }, [amount])

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
        (async() => {
            if(props.canDo === true) {
                if (selected) {
                    try {
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
                    } catch(error) {
                        console.log(error)
                        setStatus("Failed")
                    }
                }
            } else setStatus("")
        })()
    }, [props.canDo])

    const getTokenPrice = async () => {
        let price = await getTokenPriceInUsd(props.network, props.transaction.token);
        setPrice(price)
    }

    return (
        <React.Fragment>
            <Col span={2} className="pl-8">
                <input 
                    type="checkbox" 
                    className="mt-4"
                    onChange={e=>setSelected(e.target.checked)}
                />
            </Col>
            <Col span={10} className="pr-4">
                <Input 
                    type="text"
                    placeholder="address"
                    className="w-full bg-gray-200 pl-0 mt-2 input-right"
                    value={address}
                />
            </Col>
            <Col span={3}>
                <Select  defaultValue={0} dropdownClassName="bg-gray-200 " className="mt-2 bg-gray-200 w-2/2">
                    <Option value={0}>MGL</Option>
                </Select>
            </Col>
            <Col span={5} className="pr-4">
                <Input 
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-gray-200 pl-0 mt-2 input-right"
                    value={amount}
                />
            </Col>
            <Col span={4}>
                <div className="mt-2">{status}</div>
            </Col>
        </React.Fragment>
    )
}

export default AdminSendTokenRow;
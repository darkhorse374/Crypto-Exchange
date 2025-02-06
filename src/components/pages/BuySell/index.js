import { ReloadOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { notification, Pagination } from 'antd';
import NavCollapse from "../../component/NavCollapse";
import SelectComponent from "../../component/Select";
import Nav from "../../component/Nav"
import BuySellTable from '../../component/BuySellTable';
import BuySellList from '../../component/BuySellList';
// import Pagination from '../../component/Pagination';
import { SERVER_URL } from '../../../constants/env';

function Swap() {
    const [t,i18n] = useTranslation();
    const [submenu,setSubmenu]=useState(false);
    const [buysellStatus, setBuysellStatus] = useState(false);
    const [amountStatus, setAmountStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [orderList, setOrderList] = useState(null);
    const [totalOrder, setTotalOrder] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [pageNum, setPageNum] = useState(1);
    const [showCurrency, setShowCurrency] = useState("MNT");

    const fiatList = [
        {value: "MNT", name: "MNT", image: ""},
        {value: "USD", name: "USD", image: ""},
    ]

    const paymentList = [
        {value: "first", name: "All Payment"},
        {value: "second", name: "Second"},
        {value: "third", name: "Third"},
    ]

    const changePageHandler = (page, pageSize) => {
        setPageNum(page);
        setPerPage(pageSize);
        getOrderData(page, pageSize);
    }

    const getOrderData = async (pageNum, perPage) => {
        setIsLoading(true);
        console.log(SERVER_URL)
        const url = `${SERVER_URL}p2p?page_num=${pageNum}&per_page=${perPage}`;

        try {
            const res = await axios.get(url);
            setIsLoading(false);
            console.log(res);
            const newOrderList = res.data.data;
            if (newOrderList) {
                setNoData(false);
                setOrderList(newOrderList);
                setTotalOrder(res.data.totalData);
            } else {
                setNoData(true);
            }
        } catch (err) {
            console.log(err);
            setNoData(true);
            setIsLoading(false);
            notification.error({
                message: 'Error',
                description: 'Api failed because of unknown error.',
                duration: 3,
            })
        }
    }

    useEffect(async () => {
        getOrderData(pageNum, perPage);
    }, [])

    return (
        <div className="relative mb-0 bg-gray-50 h-full flex flex-col">
            <img src="/assets/img/background2.png" className="w-screen absolute top-0 back"/>
            {/*<img src="./assets/img/earth2.png" className="absolute w-2/3 bottom-0 right-0" />*/}
            <div className="w-full bg-white">
                <Nav className="w-11/12 xl:w-5/6 m-auto" setSubmenu={setSubmenu}/>
            </div>
            <div className="w-11/12 xl:w-5/6 m-auto flex-1">
                <div className="w-8/12 xl:w-4/6 m-auto text-center mt-12 ">
                    <div className="text-2xl lg:text-4xl font-bold">
                        {t("P2P: Buy/Sell Your Crypto Locally")}
                    </div>
                    <div className="hidden lg:block w-8/12 xl:w-4/6 m-auto text-xs lg:text-lg mt-6 font-bold">
                        {t("Peer-to-peer exchange is a marketplace where people can trade crypto directly with each other.")}
                    </div>
                </div>
                <div className="w-full lg:w-8/12 flex flex-col lg:flex-row text-center my-12">
                    <div className="w-full lg:w-5/12 p-2 bg-gray-100 flex rounded-lg">
                        <button className={`w-6/12 px-2 py-1 font-bold ${!buysellStatus ? "bg-green-400 text-white" : "hover:bg-green-100"} rounded-lg cursor-pointer`} onClick={() => setBuysellStatus(false)}>{t("Buy")}</button>
                        <button className={`w-6/12 px-2 py-1 font-bold rounded-lg cursor-pointer text-gray-400`} disabled>{t("Sell")}</button>
                    </div>
                    <div className="h-4 lg:w-2/12 lg:h-0"></div>
                    {/* <div className="w-full lg:w-5/12 flex">
                        <div className="w-5/12 font-bold rounded-lg bg-white lg:h-full shadow-2xl flex items-center justify-center h-12">MGL</div>
                        <div className="w-2/12"></div>
                        <div className="w-5/12 font-bold rounded-lg bg-white lg:h-full flex items-center justify-center h-12">USDT</div>
                    </div> */}
                </div>
                <div className="w-full my-12 flex flex-col lg:flex-row">
                    <div className="w-full lg:w-4/12 font-bold">
                        {/* <div className="m-2">Amount</div>
                        <div className="w-full bg-gray-100 rounded-lg text-center h-12 flex">
                            <div className={`w-4/12 rounded-l-lg flex items-center justify-center cursor-pointer ${amountStatus == 0 ? "bg-black text-white" : "hover:bg-gray-300"}`} onClick={() => setAmountStatus(0)}>Enter Amount</div>
                            <div className={`w-4/12 flex items-center justify-center cursor-pointer ${amountStatus == 1 ? "bg-black text-white" : "hover:bg-gray-300"}`} onClick={() => setAmountStatus(1)}>MNT</div>
                            <div className={`w-4/12 rounded-r-lg flex items-center justify-center cursor-pointer ${amountStatus == 2 ? "bg-black text-white" : "hover:bg-gray-300"}`} onClick={() => setAmountStatus(2)}>Search</div>
                        </div> */}
                    </div>
                    <div className="h-4 lg:w-1/12 lg:h-0"></div>
                    <div className="w-full lg:w-4/12 flex">
                        <div className="w-4/12 font-bold">
                            <div className="m-2">{t("Fiat")}</div>
                            <div className="bg-gray-100 text-center h-12 rounded-lg">
                                <SelectComponent optionList={fiatList} onChange={setShowCurrency} />
                            </div>
                        </div>
                        <div className="w-2/12"></div>
                        <div className="w-6/12 font-bold">
                            {/* <div className="m-2">Payment</div>
                            <div className="bg-gray-100 text-center h-12 rounded-lg">
                                <SelectComponent optionList={paymentList} />
                            </div> */}
                        </div>
                    </div>
                    <div className="hidden lg:flex lg:w-3/12 items-end">
                        <div className="w-6/12"></div>
                        {/* <div className="w-6/12 text-center h-10 bg-gray-100 rounded-lg font-bold flex items-center justify-center cursor-pointer hover:bg-gray-300">
                            <ReloadOutlined /> &nbsp;Refresh
                        </div> */}
                    </div>
                </div>
                <div className="w-full">
                    <div className="hidden lg:block"><BuySellTable orderList={orderList} isLoading={isLoading} noData={noData} showCurrency={showCurrency} /></div>
                    <div className="block lg:hidden"><BuySellList orderList={orderList} isLoading={isLoading} noData={noData} showCurrency={showCurrency} /></div>
                    <Pagination total={totalOrder} current={pageNum} pageSize={perPage} onChange={changePageHandler} />
                </div>
            </div>
            <div className="w-full text-center m-auto my-8 bg-gray-50">{t("Copyright © 2021 All rights reserved.")}</div>
            {
                submenu?
                
                <NavCollapse setSubmenu={setSubmenu}/>
                
                :null
            }
        </div>
    );
}

export default Swap;
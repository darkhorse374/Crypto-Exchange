import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Spin } from "antd";
import DetailItem from '../BuySellTable/DetailItem';
import noDataImage from '../../../assets/image/nodata.svg';

function BuySellList(props) {
    const [t,i18n] = useTranslation();
    const { isLoading, orderList, noData, showCurrency } = props;
    const [showDetailIndex, setShowDetailIndex] = useState(-1);

    return (
        <div className="w-full">
            <Spin spinning={isLoading}>
                {
                    noData
                        ? <div className="w-full flex justify-center"><div className="text-sm flex flex-col items-center"><img src={noDataImage} />No Ads</div></div>
                        : orderList && orderList.map((order, index) => 
                            showDetailIndex === index 
                                ? <DetailItem item={order} showCurrency={showCurrency} />
                                : <div key={index} className="rounded-lg bg-gray-200 p-4 my-2">
                                    <div className="flex justify-between">
                                        <a href="/userinfo" className="font-bold flex items-center cursor-pointer">
                                            <img className="h-5 w-5 rounded-full mr-2" src={order.profile_pic} />
                                            {order.seller_name}
                                        </a>
                                        {/* <div className="text-sm">{order.completed_orders}</div> */}
                                    </div>
                                    <div className="w-full bg-white rounded-lg mt-2 flex p-1">
                                        <div className="w-4/12 flex items-start flex flex-col">
                                            <div className="font-bold">{t("Price")}</div>
                                            <div>
                                                <span className="text-lg font-bold">
                                                {showCurrency === 'USD' 
                                                    ? order.price_usdt.toFixed(3) 
                                                    : showCurrency === "MNT" 
                                                        ? order.price_mgl.toFixed(3) 
                                                        : order.price_busd.toFixed(3)}</span> 
                                                <span className="text-sm">{showCurrency === "USD" ? "USD" : "MNT"}</span></div>
                                        </div>
                                        <div className="w-8/12 flex items-start text-sm">
                                            <div className="w-4/12 flex flex-col"><span>{t("Available")}</span></div>
                                            <div className="w-8/12 flex flex-col font-bold"><span>{order.amount_mgl} MGL</span></div>
                                        </div>
                                    </div>
                                    <div className="text-center text-sm bg-green-200 mt-2 p-1 rounded-lg">{order.payment_method.replace(',', '/')}</div>
                                    <div className="mt-2 bg-green-500 text-white rounded-lg font-bold text-center py-4" onClick={() => setShowDetailIndex(index)}>{t("BUY USD")}</div>
                                </div>
                        )
                }
            </Spin>
        </div>
    );
}

export default BuySellList;
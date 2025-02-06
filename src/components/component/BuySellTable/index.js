import {useEffect,useState,useRef} from "react";
import { useTranslation } from 'react-i18next';
import { Spin } from "antd";
import DetailItem from './DetailItem';
import noDataImage from '../../../assets/image/nodata.svg';

function BuySellTable(props) {
    const [t,i18n] = useTranslation();
    const { orderList, isLoading, noData, showCurrency } = props;
    const [showDetailIndex, setShowDetailIndex] = useState(-1);

    return (
        <Spin spinning={isLoading}>
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider font-bold">
                        {t("Seller")}
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider font-bold">
                        {t("Price")}
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider font-bold">
                        {t("Available")}
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider font-bold">
                        {t("Payment")}
                    </th>
                    <th scope="col" class="relative text-left px-6 py-3">
                        {t("Trade")}
                    </th>
                </tr>
            </thead>
                <tbody class="divide-y divide-gray-200">
                    {
                        !noData
                            ? orderList  && orderList.map((data, index) => 
                                <tr key={index}>
                                    {
                                        showDetailIndex === index
                                            ? <td colSpan={5} >
                                                <DetailItem item={data} showCurrency={showCurrency} />
                                            </td>
                                            : <>
                                                <td class="pr-6 py-4 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                        <div class="ml-4">
                                                            <div class="text-sm font-medium text-gray-900 flex cursor-pointer items-center">
                                                                <img class="h-8 w-8 rounded-full mr-2" src={data.profile_pic} alt="" />
                                                                {data.seller_name}
                                                            </div>
                                                            {/* <div class="text-sm">
                                                                {data.completed_orders}
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap flex items-end">
                                                    <div className="font-bold text-lg">
                                                        {showCurrency === 'USD' 
                                                            ? data.price_usdt.toFixed(3) 
                                                            : showCurrency === "MNT" 
                                                                ? data.price_mgl.toFixed(3) 
                                                                : data.price_busd.toFixed(3)}</div>&nbsp;
                                                        <div className="">{showCurrency === "USD" ? "USD" : "MNT"}</div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900 flex justify-start">
                                                        <div className="font-bold">
                                                            {
                                                                data.currency === "USDT" 
                                                                    ? `${data.amount_usdt} USDT`
                                                                    : data.currency === "MGL"
                                                                        ? `${data.amount_mgl} MGL`
                                                                        : `${data.amount_busd} BUSD`
                                                            } 
                                                        </div>
                                                    </div>
                                                    {/* <div class="text-sm text-gray-900 flex justify-between">Limit <div className="font-bold">$50.00 - $5000.00</div></div> */}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span class="p-4 inline-flex leading-5 font-semibold rounded-lg bg-green-100 text-green-800">
                                                        {t(data.payment_method.replaceAll(',', '/'))}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <a 
                                                        class="w-full text-white font-bold p-4 bg-green-500 rounded-lg" 
                                                        onClick={() => showDetailIndex !== index && setShowDetailIndex(index)}>{t("Buy MGL")}</a>
                                                </td>
                                            </>
                                    }
                                </tr>
                            )
                            : <tr><td colSpan={5}><div className="w-full flex justify-center my-4"><div className="text-sm flex flex-col items-center"><img src={noDataImage} />No Ads</div></div></td></tr>
                    }
                </tbody>
            </table>
        </Spin>
    );
}

export default BuySellTable;
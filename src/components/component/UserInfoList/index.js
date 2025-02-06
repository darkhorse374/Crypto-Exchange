import {useEffect,useState,useRef} from "react";
import avatarImage from '../../../assets/image/avatar.png';
import noDataImage from '../../../assets/image/nodata.svg';

function BuySellList(props) {
    const { items } = props;
    return (
        <div className="w-full">
            {
                !items
                    ? <div className="w-full flex justify-center"><div className="text-sm flex flex-col items-center"><img src={noDataImage} />No Ads</div></div>
                    : <div className="">
                        <div className="bg-gray-200 p-2 rounded-lg flex flex-col items-start">
                            <div className="w-full  rounded-lg mt-2 flex p-1">
                                <div className="w-4/12 flex items-start flex flex-col">
                                    <div className="font-bold">Price</div>
                                    <div><span className="text-lg font-bold">0.87</span> <span className="text-sm">EUR</span></div>
                                </div>
                                <div className="w-8/12 flex items-start text-sm">
                                    <div className="w-4/12 flex flex-col"><span>Avalialbe</span><span>Limit</span></div>
                                    <div className="w-8/12 flex flex-col font-bold"><span>3,000.00 USDT</span><span>€2,406.00 - €2,407.00</span></div>
                                </div>
                            </div>
                            <div className="rounded-full bg-green-100 py-2 px-6">Transferwise</div>
                        </div>
                        <div className="w-full bg-red-400 text-white font-bold py-4 text-center rounded-lg mt-4">SELL USDT</div>
                    </div>
            }
        </div>
    );
}

export default BuySellList;

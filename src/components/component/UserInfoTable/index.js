import { useState } from "react";
import NoDataImage from "../../../assets/image/nodata.svg";
import MGLImage from '../../../assets/image/mgl.svg';

function UserInfoTable(props) {
    const { items } = props;
    return (
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider font-bold">
                        Advertises
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider font-bold">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider font-bold">
                        Limit/Available
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider font-bold">
                        Payment
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                        Trade
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                {
                    !items
                        ? <tr><td colSpan={5}><div className="w-full flex justify-center my-4"><div className="text-sm flex flex-col items-center"><img src={NoDataImage} />No Ads</div></div></td></tr>
                        : <tr className="bg-white rounded-lg">
                            <td class="pr-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="ml-4 flex items-center">
                                        <img className="w-10 h-10 mr-2" src={MGLImage} />
                                        <div href="/userinfo" class="text-sm font-medium text-gray-900 flex cursor-pointer">
                                            MGL
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap flex items-end">
                                <div className="font-bold text-lg">0.87</div>&nbsp;<div className="">EUR</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div className="flex">
                                    <div className="mr-2 flex flex-col"><span>Available</span><span>Limit</span></div>
                                    <div className="flex flex-col font-bold"><span>10,000,000.00 MGL</span><span>$50.00 - $5000.00</span></div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span class="p-4 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Transferwise
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" 
                                    class="w-10/12 text-white font-bold p-4 bg-red-400 rounded-lg" 
                                    >SELL USDT</a>
                            </td>
                        </tr>
                }
            </tbody>
        </table>
    );
}

export default UserInfoTable;

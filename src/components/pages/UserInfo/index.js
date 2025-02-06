import {useState} from "react"
import NavCollapse from "../../component/NavCollapse";
import Nav from "../../component/Nav";
import UserInfoTable from "../../component/UserInfoTable";
import UserInfoList from '../../component/UserInfoList';
import avatarImage from '../../../assets/image/avatar.png';

function UserInfo() {
    const [submenu,setSubmenu]=useState(false);

    return (
        <div className="relative mb-0 bg-gray-100 h-full flex flex-col">
            <img src="/assets/img/background2.png" className="w-screen absolute top-0 back"/>
            {/*<img src="./assets/img/earth2.png" className="absolute w-2/3 bottom-0 right-0" />*/}
            <div className="w-full bg-white">
                <Nav className="w-11/12 xl:w-5/6 m-auto" setSubmenu={setSubmenu}/>
            </div>
            <div className="w-11/12 xl:w-5/6 m-auto flex-1">
                <div className="my-6 lg:my-12 lg:px-8 w-full flex justify-between flex-col lg:flex-row">
                    <div className="w-full lg:w-4/12 flex justify-between lg:justify-start">
                        <div className="flex">
                            <img className="w-5 h-5 lg:w-10 lg:h-10 rounded-full" src={avatarImage} />
                            <span className="font-bold lg:hidden">Nabiluux</span>
                        </div>
                        <div className="lg:flex lg:flex-col">
                            <span className="hidden lg:block text-lg font-bold">Nabiluux</span>
                            <span className="text-sm">Verified User</span>
                        </div>
                    </div>
                    <div className="full my-2 lg:w-4/12 flex justify-between">
                        <div className="">Email</div>
                        <div className="">SMS ID</div>
                        <div className="">Verification</div>
                    </div>
                </div>
                <div className="hidden bg-white shadow w-full lg:flex flex-wrap justify-start rounded-lg px-8">
                    <div className="w-2/12 flex flex-col my-8 text-gray-400">
                        <div className="">30d Trades</div>
                        <div className=""><span className="font-bold text-black text-xl">247</span> <span>Time(s)</span></div>
                    </div>
                    <div className="w-2/12 flex flex-col my-8 text-gray-400">
                        <div className="">30d Completion Rate</div>
                        <div className=""><span className="font-bold text-black text-xl">84.59</span> <span>%</span></div>
                    </div>
                    <div className="w-2/12 flex flex-col my-8 text-gray-400">
                        <div className="">Avg. Release Time</div>
                        <div className=""><span className="font-bold text-black text-xl">42.86</span> <span>Minute(s)</span></div>
                    </div>
                    <div className="w-2/12 flex flex-col my-8 text-gray-400">
                        <div className="">Avg. Pay Time</div>
                        <div className=""><span className="font-bold text-black text-xl">4.03</span> <span>Minutes(s)</span></div>
                    </div>
                    <div className="w-2/12 flex flex-col my-8 text-gray-400">
                        <div className="">Positive Feedback</div>
                        <div className=""><span className="font-bold text-black text-xl">99.00</span> <span>%(146)</span></div>
                    </div>
                    <div className="w-2/12 flex flex-col my-8 text-gray-400">
                        <div className="">Positive</div>
                        <div className=""><span className="font-bold text-black text-xl">144</span></div>
                    </div>
                    <div className="w-2/12 flex flex-col my-8 text-gray-400">
                        <div className="">Negative</div>
                        <div className=""><span className="font-bold text-black text-xl">2</span></div>
                    </div>
                    <div className="w-2/12 flex flex-col my-8 text-gray-400">
                        <div className="">Registerd</div>
                        <div className=""><span className="font-bold text-black text-xl">211</span> <span>Day(s)</span></div>
                    </div>
                    <div className="w-2/12 flex flex-col my-8 text-gray-400">
                        <div className="">First Trade</div>
                        <div className=""><span className="font-bold text-black text-xl">185</span> <span>Day(s)</span></div>
                    </div>
                    <div className="w-2/12 flex flex-col my-8 text-gray-400">
                        <div className="">All Trades</div>
                        <div className=""><span className="font-bold text-black text-xl">555</span> <span>Time(s)</span></div>
                    </div>
                    
                </div>
                <div className="flex lg:hidden border-t-2 border-b-2">
                    <div className="w-4/12 flex flex-col my-4">
                        <div className="text-2xl font-bold">383</div>
                        <div className="text-gray-400">30d Trades</div>
                    </div>
                    <div className="w-4/12 flex flex-col my-4">
                        <div className="text-2xl font-bold">100%</div>
                        <div className="text-gray-400">30d Completion Rate</div>
                    </div>
                </div>
                <div className="lg:bg-gray-200 mt-8 p-4 lg:p-8 rounded-lg">
                    <div className="font-bold mb-4">Buy from the user</div>
                    <div className="hidden lg:block"><UserInfoTable /></div>
                    <div className="block lg:hidden"><UserInfoList /></div>
                </div>
                <div className="lg:bg-gray-200 mt-8 p-4 lg:p-8 rounded-lg">
                    <div className="font-bold mb-4">Sell from the user</div>
                    <div className="hidden lg:block"><UserInfoTable items /></div>
                    <div className="block lg:hidden"><UserInfoList items /></div>
                </div>
            </div>
            <div className="w-full text-center m-auto my-8 bg-gray-100">Copyright © 2021 All rights reserved.</div>
            {
                submenu?
                
                <NavCollapse setSubmenu={setSubmenu}/>
                
                :null
            }
        </div>
    );
}

export default UserInfo;

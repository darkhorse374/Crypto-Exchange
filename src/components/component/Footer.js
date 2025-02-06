import { Button,Row,Col } from 'antd';
import LangSelect from './LangSelect';
function Footer() {
  return (
      <div className="flex justify-between mt-32 items-center pb-4">
          <div className="w-full flex flex-col md:block items-center ">
             <img src="/assets/img/mark2.png"className="w-8 inline mx-4" />
             <a className="mt-2">Copyright © 2021 All rights reserved.</a>
          </div>
          <div className="md:flex hidden ">
            <LangSelect className="mr-3 myButton  bg-blue-100 w-20 text-sm" />
            <button className=" myButton  bg-blue-100 w-20 text-sm"> USD </button>
          </div>
      </div>
  );
}
export default Footer;
        


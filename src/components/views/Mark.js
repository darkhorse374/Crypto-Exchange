import { Button,Row,Col } from 'antd';
import {useEffect,useState,useRef} from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ShoppingCard from "../component/ShoppingCard";
const delay = 5000;
const card=[
  {url:'/assets/img/launchpad.png',link:'http://ieo.mglcoin.io/'},
  {url:'/assets/img/tokeninfo.png',link:'http://info.mglcoin.io/'},
  {url:'/assets/img/defi.png',link:'http://defi.mglcoin.io/'},
  {url:'/assets/img/shopping.png',link:'http://exchange.mglcoin.io/'},
]
function Mark() {
const [index, setIndex] = useState(0);
const timeoutRef = useRef(null);


  return (
    <div className="w-11/12 xl:w-5/6 m-auto mt-8 overflow-hidden">
       <div className="whitespace-nowrap slide " style={{ transform: `translate3d(${-1*index* 100}%, 0, 0)` }}>
       {
        card.map((item,idx)=>(
          <Col key={idx} sm={24} md={6} className="p-2 inline-block w-full">
            
            <ShoppingCard url={item.url}link={item.link} key={idx} real={idx==1}/>
            
          </Col>
        ))
       }
          
        </div> 


        <div className="slideshowDots md:hidden">
        {
          card.map((item,idx)=>(
            <div 
              key={idx} 
              className={`slideshowDot ${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}></div>
          ))
        }
        </div> 
      </div> 
  );
}

export default Mark;

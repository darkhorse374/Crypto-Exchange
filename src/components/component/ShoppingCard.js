import { Button,Row,Col } from 'antd';
import {useEffect,useState,useRef} from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ShoppingCard(props) {
  return (
    <>
    {
      props.real?
        <a target="_blank" href={props.link}>
            <img src={props.url} className="w-full" />
        </a>
        :
        <Link  to="/">
           <img src={props.url} className="w-full" />
        </Link> 
    }
    </>
  );
}

export default ShoppingCard;

import { Button ,Card,Row} from 'antd';
import {useState,useEffect} from "react"
import { motion } from "framer-motion"
function RegCard(props) {

  return (
      
      <motion.div
        className={`${props.className} flex flex-col flex-wrap justify-center items-center `}
        
      >
        <Card className={`${props.cardClassName} md:block  md:static  md:h-auto md:w-1/2 xl:w-1/3  text-left text-gray-700 px-2 xl:px-8 md:rounded-lg shadow`} >
          {props.children}
        </Card>
      </motion.div>
  );
}

export default RegCard;

import { Button ,Card} from 'antd';
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Register from '../views/Register';
function LogIn() {
  return (
    <motion.div
          className="text-center relative"
          animate={{
            scale: [1,1],
            opacity:[0,1]
          }}
          transition={{ duration: 2}}
        >
      
      <img src="/assets/img/mark2.png" className="w-16 absolute top-0 mt-8 ml-24"/>
      <Register className="absolute top-0 w-screen h-screen login-back"/>
    </motion.div>
  );
}

export default LogIn;

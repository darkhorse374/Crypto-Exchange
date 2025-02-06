import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next'

const PresaleContextTemplate = {
    presaleData: String,
    setPresaleData: (requestData) => {},
    
}
const PresaleContext = React.createContext(PresaleContextTemplate);


function PresaleProvider(props) {
  const [presaleData, setPresaleData] = useState("");
  useEffect(()=>{
    console.log("presaleData",presaleData)
  },[presaleData])
  return(
          <PresaleContext.Provider value={{
            presaleData,
            setPresaleData
          }}>
            {props.children}
          </PresaleContext.Provider>

    )
}

export {PresaleContext};
export default PresaleProvider;

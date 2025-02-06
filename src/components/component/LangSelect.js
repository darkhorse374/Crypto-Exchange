import { Button,Dropdown } from 'antd';
import {useState} from "react";
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next'
import '../../utils/translate.js';
const data = [
  {lang:"En",code:"GB"},
  {lang:"Mn",code:"MN"},
]
function LangSelect(props) {
  const [langData,setData] = useState(data);
  const [show,setShow] = useState(false);
  const [sel,setSel] = useState(localStorage.getItem('locale') === "En" ? 0 : 1);
  const [t,i18n] = useTranslation();
  
  const onSelectLanguage = (idx)=>{
    setSel(idx);
    i18n.changeLanguage(langData[idx].lang);
    localStorage.setItem("locale", langData[idx].lang);
  }
  const menu=(
    <div className="bg-white shadow px-2 py-2 rounded-lg">
      {
        langData.map((item,idx) => (
          <button className="flex justify-between items-center w-full mt-2 grayButton rounded-md p-2" key={idx} onClick={()=>onSelectLanguage(idx)}>
            <span>{item.lang}</span>
            <ReactCountryFlag
               className="rounded-full "
                style={{
                  width: '1.5em',
                  height: '1.5em',
                }}
                countryCode={item.code}
                svg
                cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                cdnSuffix="svg"
                title="US"
            />
            
          </button>
        ))
      }
    </div>
  );
  return (
    <Dropdown overlay={menu} placement="bottomLeft" className={`${props.className} `}>
       
      <button className="flex justify-center items-center ">
        <span>{langData[sel].lang}</span>
        <ReactCountryFlag
           className="rounded-full ml-2"
            style={{
                width: '1.5em',
                height: '1.5em',
            }}
            countryCode={langData[sel].code}
            svg
            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
            cdnSuffix="svg"
            title="US"
        />
        
      </button>
    </Dropdown>
  );
}
export default LangSelect;
        


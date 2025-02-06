import { Button,Row,Col,Collapse  } from 'antd';
import { motion,useViewportScroll } from "framer-motion"
import { Link } from "react-router-dom";
import {useState} from "react"
import {AiFillCloseCircle,AiOutlineArrowUp,AiOutlineArrowDown} from "react-icons/ai"
import {BsCreditCard2Front,BsCash,BsPeople} from "react-icons/bs"
import LangSelect from './LangSelect';
import { useTranslation } from 'react-i18next'
const { Panel } = Collapse;
const CollapseData=[
	    {title:'Products',data:[{icon:"",subtitle:""}]},
	    {title:'Buy Crypto',data:[
	                        {icon:<BsCreditCard2Front size={20} className="inline mx-2"/>,subtitle:"Credit/Debit Card"},
	                        {icon:<BsPeople size={20} className="inline mx-2"/>,subtitle:"P2P Trading", url: '/p2p'},
	                        // {icon:<BsCash size={20} className="inline mx-2"/>,subtitle:"Crash Balance"},
	                      ]},
	    {title:'Markets',data:[{icon:"",subtitle:""}]},
	    {title:'Trade',data:[{icon:"",subtitle:""}]},
	  ]

function NavCollapse (props){
	const [drop,setDrop]=useState(false);
	const [CollapseIdx,setCollapse]=useState(-1);
  const [t,i18n] = useTranslation();
  
  const logout = ()=>{
    localStorage.removeItem("userInfo");
    localStorage.removeItem("privateKey");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("jwtToken");
    props.setSubmenu(false);
  }

  const handleChange = (url) => {
    window.location.href = url;
  }

	return(
		    <motion.div
              className="fixed submenu w-screen h-screen px-4 py-2 flex flex-col md:hidden "
                  animate={{
                    y: [1000,0],
                    opacity:[1,1],
                    
                  }}
                  transition={{ duration: 0.3 }}
                >
              <div className="flex flex-row-reverse"><a onClick={()=>props.setSubmenu(false)}><AiFillCloseCircle size={30}/></a> </div>
              <div className="text-center border-b-2 border-gray-200 mt-4 pb-4">
              {
                localStorage.getItem("userInfo")?
                  <Link to="/" onClick={logout}><p className="text-lg font-bold">{t('Log out')}</p></Link>
                :<Link to="/login"><p className="text-lg font-bold">Log In</p></Link>
              }
                
                <Link to="/register"><button className="w-full myButton myBule text-white px-12 mt-4">{t('Register Now')}</button></Link>
              </div>
                <Collapse 
                  efaultActiveKey={['1']} 
                  ghost
                  onChange={(e)=>{setCollapse(e[0])}}
                  className="mt-4">
                {
                  CollapseData.map((item,idx)=>(
                    <Panel 
                      className="bg-gray-100 my-1 "
                      header={t(item.title)} 
                      key={idx}
                      showArrow={false}
                      extra={CollapseIdx==idx?<AiOutlineArrowUp size={20}/>
                          :<AiOutlineArrowDown size={20}/>}>
                      <div className="" >
                        {
                          item.data.map((item,idx)=>(
                            <div><button onClick={() => {handleChange(item.url)}} className="grayButton w-full text-left px-2 py-2 rounded-lg">{item.icon} {t(item.subtitle)}</button></div>
                          ))
                        }
                      </div>
                    </Panel>
                  ))
                 
                }
                </Collapse>
                <div className="flex">
                  <LangSelect className="flex-grow myButton  bg-blue-100 text-sm m-2" />
	     
	                <button className="flex-grow myButton  bg-blue-100  text-sm m-2"> USD </button>
                </div>

            </motion.div>
	);
}

export default NavCollapse;
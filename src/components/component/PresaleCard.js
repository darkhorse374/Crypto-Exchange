import { Button, Col } from 'antd';
import {useRef,useEffect,useState} from "react";
import Progress from "./Progress";
import { Link } from "react-router-dom";
import {BsDot} from "react-icons/bs";
import {RiLockPasswordLine} from "react-icons/ri"
function PresaleCard(props) {
  const ref=useRef();
  const [ran,setRan]=useState(2);
  const [remainTime, setRemainTime] = useState([0, 0, 0, 0]);
  const [remainTimeInSecond, setRemainTimeInSecond] = useState(0);
  let currentLocalTime = new Date();
  const timeoffset = (currentLocalTime.getTimezoneOffset()+60*11)*60*1000
  
  useEffect(() => {
    var min = 1;
    var max = 10;
    var rand =  min + (Math.random() * (max-min));
    console.log(Math.round(rand));
    setRan(Math.round(rand));
    //////////////////////////
    let launchTime = new Date("December 30, 2021 00:00:00");
    let currentTime = new Date();
    let remainTime = Math.floor((launchTime.getTime()-timeoffset-currentTime.getTime())/(1000));
    setRemainTimeInSecond(remainTime);
    setRemainTime(formatTime(remainTime));
  }, [])
  
  useEffect(() => {
    let timerID = setInterval( () => {
      setRemainTime(formatTime(remainTimeInSecond - 1));
      setRemainTimeInSecond(remainTimeInSecond - 1);
    }, 1000 );
    return () => clearInterval(timerID) 
  });
  
  const formatTime = (timestamp) => {
    console.log(timestamp)
    let days = Math.floor(timestamp/(3600*24));
    let hours = Math.floor((timestamp - days*24*3600)/3600);
    let mins = Math.floor((timestamp-days*3600*24 - hours*3600)/60);
    let seconds = Math.floor(timestamp-days*3600*24 - hours*3600 - mins * 60);

    console.log([days, hours, mins, seconds])
    return [days, hours, mins, seconds];
  }
  
  return (
    <Col xs={{span:22,offset:1}} lg={{span:7}}
        className=" bg-gray-200 rounded-xl p-6 mt-12 ">
      
      
    
      <div className="flex justify-between flex-wrap items-center ">
        <img src={props.logo} className="w-12"/>
        <div>
        {
          props.state===0?
          <button className="myButton2 bg-yellow-200 px-4 py-0  rounded-lg ">
            <BsDot size={30} className="inline"/>In Progress
          </button>
          :props.state===1?
          <button className="myButton2 myGreen px-4 py-0  rounded-lg text-white">
            <BsDot size={30} className="inline"/>Sales Live
          </button>
          :<button className="myButton2 bg-gray-300 px-4 py-0  rounded-lg ">
            <RiLockPasswordLine size={30} className="inline"/>Canceled
          </button>
        }
        </div>
      </div>

      <p className="text-xl mt-4 font-bold">{props.tokenName}</p>
      <p>{`1BNB =  ${props.flokinomix}`}</p>
      <p className="text-lg mt-4 font-bold">Soft/Hard Cap</p>
      <p className="text-blue-500">{`${props.hardcap[0]} USDT - ${props.hardcap[1]} USDT`}</p>
      <p className="text-lg mt-4 font-bold">{`Progress (${props.progress})`}</p>
      <Progress val={props.progress} className="mt-2"/>
      <div className="flex justify-between mt-8">
        <div>
          <p>Sales start in</p>
          <p className="font-bold text-md">{`${remainTime[0]}:${remainTime[1]}:${remainTime[2]}:${remainTime[3]}`}</p>
        </div>
        <a target="_blank" href={props.link} className="myButton text-white rounded-lg px-6  myBule font-bold text-sm xl:text-lg">View IEO</a>
      </div>
    </Col>
  );
}
export default PresaleCard;
        


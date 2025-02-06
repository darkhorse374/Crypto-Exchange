import { Button } from 'antd';
import {useRef,useEffect} from "react";


function Progress(props) {
  const ref=useRef();
  useEffect(()=>{
  },[])
  return (
    <div className={props.className}>
      <div className="progress bg-white w-full">
        <div ref={ref} className="progress myGreen  top-0 left-0 h-full w-full" style={{width:props.val}}>
        </div>
      </div>
    </div>
  );
}
export default Progress;
        


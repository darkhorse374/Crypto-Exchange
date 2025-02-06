import { LineChart, Line } from "recharts";
import { TinyLine  } from '@ant-design/charts';
import { Table, Tag, Space,Row,Col } from 'antd';
import React, { useState, useEffect,useRef } from 'react';
import Icon from "react-crypto-icons";
import { useTranslation } from 'react-i18next'
const { Column, ColumnGroup } = Table;

const tableData = [
 {
    key: '0',
    name:'BNB',
    network:'BNB',
    price:'17603.78',
    change:'4.13',

  },
  {
    key: '1',
    name:'BTC',
    network:'Bitcoin',
    price:'11911.48',
    change:'2.54',

  },
  {
    key: '2',
    name:'ETH',
    network:'Ethereum',
    price:'459.24',
    change:'2.54',
  },
  {
    key: '3',
    name:'SAND',
    network:'The Sandbox',
    price:'70.14',
    change:'11.46',
  },
  {
    key: '4',
    name:'MANA',
    network:'Decentraland',
    price:'80.17',
    change:'16.96',
  },
  {
    key: '5',
    name:'SHIB',
    network:'SHIBA INU',
    price:'0.001517',
    change:'10.14',
  },
  {
    key: '6',
    name:'DOGE',
    network:'Dogecoin',
    price:'7.37',
    change:'3.03',
  },
  
];
const datachart = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];
// var datachart2 = [
//     264, 417, 438, 543, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 211, 340, 539,
//     243, 226, 192,
//   ];
  // var config = {

  //   width: 200,
  //   height: 100,
  //   autoFit: false,
  //   data: datachart2,
  //   smooth: true,
  // };
function MarketTrend() {
  const [data, setData] = useState([]);
  const chart = useRef(null);
  useEffect(() => {
    
  }, []);
  const asyncFetch = () => {
    setData([{value:0,date:1},{value:15,date:2},{value:9,date:3},{value:2,date:4},{value:11,date:5},{value:3,date:6},{value:2,date:7},{value:10,date:8},{value:6,date:9},{value:4,date:10}])
  };
  
  return (
  
    // {<TinyLine {...config}  />}
      <>
        <Row className="my-8 text-gray-400 text-md md:text-lg ">
          <Col xs={8} sm={8} md={6}>Name</Col>
          <Col xs={8} sm={8} md={6} className="text-center">Last Price</Col>
          <Col xs={8} sm={8} md={6} className="text-center">24h Change</Col>
          <Col span={6} className="text-right hidden md:block">Markets</Col>
        </Row>  
        {tableData.map((item,index)=>(
          <Row className="text-sm md:text-xl my-4" key={index}>
          <Col xs={8} sm={8} md={6}> <Icon className="inline mr-4"name={item.name.toLowerCase()} size={25} />{item.name}<span className="text-gray-400 hidden md:inline">{`  ${item.network}`}</span></Col>
          <Col xs={8} sm={8} md={6} className="text-center">{`NTN$${item.price}`}</Col>
          <Col xs={8} sm={8} md={6} className="text-center mytextGreen">{`${item.change}%`}</Col>
          <Col span={6} className="hidden md:block">
            <LineChart width={100} height={50} data={datachart} className="float-right">
              <Line type="monotone" dataKey="pv" stroke="#04a368" strokeWidth={2} dot={false}/>
            </LineChart>
          </Col>
        </Row>  
        ))}
             
     </> 
  )
}

export default MarketTrend;

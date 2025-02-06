import { Button ,Card,Input,Row, Col} from 'antd';
import React, { useState, useEffect } from 'react';
import { List, message, Avatar, Skeleton, Divider } from 'antd';
import { SearchOutlined ,CloseOutlined} from '@ant-design/icons';
import { motion } from "framer-motion"
import countrylist from "country-list";
import countrydata from 'country-data';
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next'
import RegCard from '../component/RegCard';
function RegionSelectCard(props) {
  const [t,i18n] = useTranslation();

  const [data, setData] = useState([]);
  const [search,setSearch]=useState("");
  const loadMoreData = () => {
    countrylist.overwrite([{
    code: 'TW',
    name: 'Taiwan'
  }])
    let names=countrylist.getNames();
    let rawData=[];

   // console.log(countrylist.getNames())
    for(var i=0;i<names.length;i++)
    {
      if(names[i].toLowerCase().includes(search.toLowerCase()))
        rawData.push({id:i+1,code:countrylist.getCode(names[i]),title:names[i]});
    }
    // let countries=countrydata.countries.all;
    // for(var i=0;i<countries.length;i++)
    // {
    //   if(countries[i].name.toLowerCase().includes(search.toLowerCase()) && countrylist.)
    //     rawData.push({id:i+1,code:countries[i].alpha2,title:countries[i].name})
    // }
    console.log(rawData);
    setData(rawData);
  };
  useEffect(() => {
    loadMoreData();
  }, [search]);
  const getRegion=(code)=>{
      props.setRegion({code:code,title:countrylist.getName(code)});
      props.stepDecrement();
    
  }
  return (
    <RegCard className={props.className}cardClassName='w-full fixed h-1/2 bottom-0 rounded-t-lg'>
          <Row className="text-lg font-bold py-4 text-gray-600">
            <Col span={23}>
              {t("Country/Area of Residence")}
            </Col>
            <Col span={1}>
              <button onClick={props.stepDecrement}><CloseOutlined /></button>
            </Col>
          </Row>
          <Input size="large"onChange={(e)=>{setSearch(e.target.value)}} placeholder={`${t("Search")}..`} prefix={<SearchOutlined />} className="rounded-lg p-3 search"/>
          <div className="overflow-y-scroll h-80 m-2">
            <List
              dataSource={data}
              renderItem={item => (
                <List.Item key={item.id}  >
                  <button  onClick={()=>getRegion(item.code)} className="grayButton w-full text-lg font-bold text-gray-700 text-left ">
                   <ReactCountryFlag
                     className="rounded-full my-2 mx-8 "
                      style={{
                          width: '2em',
                          height: '2em',
                      }}
                      countryCode={item.code}
                      svg
                      cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                      cdnSuffix="svg"
                      title="US"
                  />{item.title.length>15?item.title.substring(0,15)+"...":item.title}
                  </button>
                </List.Item>
              )}
            />
          </div>
        </RegCard>
  );
}

export default RegionSelectCard;

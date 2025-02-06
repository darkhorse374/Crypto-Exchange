import { Button ,Card,Row} from 'antd';
import { motion } from "framer-motion"
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from 'react-i18next'
import RegCard from '../component/RegCard';

function RegionCard(props) {
  const {t,i18n} = useTranslation();
  const title=t("Where do you live?");
  const comment1=t("Before we start, please enter your current location of residence.");
  const subTitle=t("Country/Area of Residence");
  const comment2=t("The registration process is subject to change based on the information you provide.");
  return (
      
        <RegCard className={props.className} cardClassName='w-full fixed h-1/2 bottom-0 rounded-t-lg'>
          
            <p className="text-md lg:text-xl xl:text-2xl font-bold py-2 lg:py-4"> {title} </p>
            <p className="text-sm lg:text-md xl:text-lg  py-2 lg:py-4">{comment1}</p>
            <p className="text-sm lg:text-md xl:text-lg font-bold py-2 lg:py-4 text-gray-600">{subTitle}</p>
            <button   onClick={props.stepIncrement} className="w-full bg-gray-300 text-md xl:text-lg font-bold text-gray-700 text-left rounded-lg">
              <ReactCountryFlag
                 className="rounded-full my-2 mx-4 xl:mx-8 "
                  style={{
                      width: '2em',
                      height: '2em',
                  }}
                  countryCode={props.country.code}
                  svg
                  cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                  cdnSuffix="svg"
                  title="US"
              />{props.country.title.length>20?props.country.title.substring(0,20)+"...":props.country.title}
            </button>
            <p className="text-sm lg:text-md xl:text-lg  py-2 lg:py-4 text-gray-600">{comment2}</p>
            <button  onClick={props.accountStep} className="w-full bg-gray-800 text-sm lg:text-md xl:text-lg font-bold text-white  rounded-lg py-2 lg:py-4">{t("Confirm")}</button>
         
        </RegCard>
      
  );
}

export default RegionCard;

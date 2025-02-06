import { useTranslation } from 'react-i18next';
import SelectComponent from '../../Select';
import InputElement from '../InputComponent';

function DetailIitem (props) {
    const [t,i18n] = useTranslation();
    const { item, showCurrency } = props;
    const contactList = [
        {value: "facebook", name: "Facebook", url: item.facebook_link},
        {value: "telegram", name: "Phone", url: item.telegram_link},
    ]
    return (
        <div className="w-full bg-white shadow rounded-lg my-4 p-8 flex lg:flex-row flex-col">
            <div className="w-full lg:w-7/12 flex flex-col mr-0 lg:mr-8">
                <div className="w-full flex justify-between flex-col lg:flex-row">
                    <div className="flex items-center">
                        <div className="font-bold flex cursor-pointer text-2xl items-center"><img className="h-14 w-14 rounded-full" src={item.profile_pic} />&nbsp;{item.seller_name}</div>
                        <div className="my-1 bg-green-200 rounded-lg font-bold flex items-center justify-center py-1 px-4 ml-4 text-xs">{t("MGL Verified")}</div>
                    </div>
                    <div className="w-8/12 lg:w-3/12 my-1"><SelectComponent optionList={contactList} groupName="Ways to connect" defaultValue="Contact Agent" link /></div>
                </div>
                <div className="w-full lg:w-8/12 flex justify-between my-3 flex-wrap">
                    <div className="flex items-center">{t("Price")}&nbsp;
                        <div className="font-bold text-lg">{
                            showCurrency === 'USD' 
                                ? item.price_usdt.toFixed(3) 
                                : showCurrency === "MNT" 
                                    ? item.price_mgl.toFixed(3) 
                                    : item.price_busd.toFixed(3)}</div>
                        <div className="text-sm">{showCurrency === "USD" ? "USD" : "MNT"}</div>
                    </div>
                    {/* <div className="flex">Available&nbsp;
                        <div className="font-bold">{item.amount_mgl} MGL</div>
                    </div> */}
                    <div className="flex items-center my-1"></div>
                </div>
                <div className="w-full flex justify-between items-start lg:items-center flex-col lg:flex-row my-1">
                    {/* <div className="flex items-center my-1">
                        Payment Time&nbsp;<div className="text-lg font-bold">Limit 30 Minutes</div>
                    </div> */}
                    <div className="my-1 flex">
                        {t("Available")}&nbsp;
                        <div className="font-bold">
                            {
                                item.currency === "USDT" 
                                    ? `${item.amount_usdt} USDT`
                                    : item.currency === "MGL"
                                        ? `${item.amount_mgl} MGL`
                                        : `${item.amount_busd} BUSD`
                            } 
                        </div>
                    </div>
                    <div className="text-xs p-2 bg-green-100 rounded-lg my-1">{t(item.payment_method.replaceAll(',', '/'))}</div>
                    <div ></div>
                </div>
                <div className="w-full flex flex-col">
                    <div className="font-bold">{t("Terms and conditions")}</div>
                    <div dangerouslySetInnerHTML={{__html: item.terms_conditions}}></div>
                </div>
            </div>
            {/* <div className="w-full lg:w-5/12 bg-gray-100 rounded-lg p-5 flex flex-col justify-between">
                <InputElement className="my-1 lg:my-0" label="I want to pay" tokenName="MNT" isBtn />
                <InputElement className="my-1 lg:my-0" label="I will receive" tokenName="USDT" />
                <div className="w-full flex justify-between text-center font-bold mt-2 lg:mt-0">
                    <div className="w-5/12 bg-gray-300 rounded-lg py-1 cursor-pointer">Cancel</div>
                    <div className="w-5/12 bg-green-500 text-white rounded-lg py-1 cursor-pointer">BUY USDT</div>
                </div>
            </div> */}
        </div>
    );
}

export default DetailIitem;
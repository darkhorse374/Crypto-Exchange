import { Button } from 'antd';

function PairCardButton(props) {
  return (
            <div className="flex-grow text-black">
              <div className="w-11/12 pairCard flex justify-center py-4">  
                <div className="flex flex-col text-center lg:block lg:text-left">
                  <span className="text-xs font-bold xl:text-base 2xl:text-lg mr-2">{props.title}</span>
                  <span  size="small" className="rounded-base font-bold text-red-500 ">{parseFloat(props.percent).toFixed(2)}%</span>
                  <p className="text-base font-bold xl:text-xl 2xl:text-3xl">$ {parseFloat(props.amount1).toFixed(2)}</p>
                  {/*<p className="text-xs  xl:text-base 2xl:text-lg">$ {props.amount2}</p>*/}
                </div>
              </div>
            </div>
  );
}

export default PairCardButton;

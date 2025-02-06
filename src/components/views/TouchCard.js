import { Button } from 'antd';
import { motion,useViewportScroll } from "framer-motion"
import { useTranslation } from 'react-i18next'

function TouchCard() {
  const {t,i18n} = useTranslation();
  const inf=[
    {url:"/assets/img/support.png",title:t("Support"),content:t("Got a problem? Just get in touch. Our support team is avaiable 24/7.")},
    {url:"/assets/img/blog2.png",title:t("Blog"),content:t("News and updates from the world's leading cryptocurrency exchange.")},
    {url:"/assets/img/community2.png",title:t("Community"),content:t("MGL is global. Join the discussion in our worldwide communities.")},
  ]
  const { scrollYProgress } = useViewportScroll();
  return (
    <div className="flex justify-between flex-col md:flex-row">
     {
      inf.map((item,index)=>(
        <motion.div
          key={index}
          className="touchCard w-full md:w-1/4 p-4 text-center "
        >
        
          <img src={item.url} className="w-1/3 inline"/>
          <p className="m-4 font-bold text-lg">{item.title}</p>
          <p className="text-md">{item.content}</p>
        </motion.div>
      ))
      }
    </div>
  );
}

export default TouchCard;

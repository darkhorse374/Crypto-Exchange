import { notification} from 'antd';
import { FcOk,FcCancel } from "react-icons/fc";
const openNotification = (title,message,ok,go) => {
    const args = {
      message: title,
      description:message,
      duration: 1.5,
        icon: ok?<FcOk />:<FcCancel />,
      onClose:go
    };
    notification.open(args);
  }

  export default openNotification;
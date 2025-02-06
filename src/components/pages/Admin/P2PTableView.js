import { Layout, Table, Row, Col, Button, Select, Modal, notification, Form, Input, Upload, message } from 'antd';
import { 
    UserOutlined,
    WalletOutlined,
    DollarCircleOutlined,
    EditOutlined,
    FacebookOutlined,
    SkypeOutlined,
    PhoneOutlined,
    LoadingOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";
import { SERVER_URL } from "../../../constants/env";

const { Content } = Layout;
const { Column } = Table;


function P2PTableView() {
    const defaultData = {
        profile_pic: null,
        seller_name: '',
        currency: 'USDT',
        amount: 0,
        payment_method: 'Cash',
        price_mgl: 0,
        price_usdt: 0,
        terms_conditions: '',
        facebook_link: '',
        skype_link: '',
        telegram_link: '',
    }
    const [form] = Form.useForm();
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({ total: 0 })
    const [alertVisible, setAlertVisible] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [currPageNum, setCurrPageNum] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [orderList, setOrderList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [addUpdateStatus, setAddUpdateStatus] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [uploadImageUrl, setUploadImageUrl] = useState();
    const [imageChanged, setImageChanged] = useState(false);

    const getP2PData = async (currPageNum, itemPerPage) => {
        setIsLoading(true);
        console.log(SERVER_URL)
        const url = `${SERVER_URL}p2p`;

        try {
            const res = await axios.get(url);
            setIsLoading(false);
            console.log(res);
            const newOrderList = res.data.data;
            if (newOrderList) {
                setOrderList(newOrderList);
                setTotalCount(newOrderList.length);
                setPagination({ total: newOrderList.length});
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            notification.error({
                message: 'Error',
                description: 'Api failed because of unknown error.',
                duration: 3,
            })
        }
    }

    const addItem = () => {
        form.validateFields()
                .then((values) => {
                    const tradeData = {
                        seller_name: values.seller_name,
                        completed_orders: "Completed orders",
                        currency: values.currency ? values.currency : "USDT",
                        amount_usdt: values.currency === "USDT" || !values.currency ? values.amount * 1 : 0,
                        amount_mgl: values.currency === "MGL" ? values.amount * 1 : 0,
                        amount_busd: values.currency === "BUSD" ? values.amount * 1 : 0,
                        payment_method: values.payment_method ? values.payment_method.toString() : "Cash",
                        price_usdt: values.price_usdt,
                        price_mgl: values.price_mgl,
                        price_busd: 0,
                        terms_conditions: values.terms_conditions ? values.terms_conditions.replaceAll(/\n/g, "<br/>") : '',
                        facebook_link: values.facebook_link ? values.facebook_link : '',
                        telegram_link: values.telegram_link ? values.telegram_link : '',
                        skype_link: values.skype_link ? values.skype_link : '',
                    }
                    imageChanged && (tradeData.profile_pic = uploadImageUrl);
                    console.log(tradeData);
                    setAuthToken(localStorage.jwtToken);
                    const url = addUpdateStatus ? `${SERVER_URL}p2p/id/${selectedIndex}` : `${SERVER_URL}p2p/create`;
                    axios.post(url, tradeData)
                        .then((res) => {
                            if (res.data.message === "Success") {
                                getP2PData(currPageNum, itemPerPage);
                                setShowAddModal(false);
                                notification.success({
                                    message: 'Success',
                                    description: `${addUpdateStatus ? 'Update' : 'Add'} is Success.`,
                                    duration: 3,
                                })
                            } else {
                                notification.error({
                                    message: 'Error',
                                    description: res.data.message,
                                    duration: 3,
                                })
                            }
                        })
                })
                .catch((errorInfo) => {});
    }

    const handleTableChange = (pageInfo, filters, sorter) => {
        console.log(pageInfo, 'page info !!!!!!!!!!')
        setCurrPageNum(pageInfo.current)
        setItemPerPage(pageInfo.pageSize)
    };

    const deleteItem = () => {
        axios.delete(`${SERVER_URL}p2p/id/${selectedIndex}`, {
        }).then(response => {
            console.log(response.data)
            if (response.data.response) {
                getP2PData(currPageNum, itemPerPage);
                setAlertVisible(false);
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message,
                    duration: 3,
                })
            }
        })
    }

    const updateDataHandler = async (id) => {
        try {
            setAddUpdateStatus(true);
            setSelectedIndex(id);
            const url = `${SERVER_URL}p2p/id/${id}`;
            const res = (await axios.get(url)).data;
            const selectedData = res.data;
            setImageUrl(selectedData.profile_pic);
            setImageChanged(false);
            form.setFieldsValue({
                profile_pic: selectedData.profile_pic,
                seller_name: selectedData.seller_name,
                currency: selectedData.currency,
                amount: selectedData.currency === 'USDT' ? selectedData.amount_usdt : selectedData.currency === 'MGL' ? selectedData.amount_mgl : selectedData.amount_busd,
                payment_method: selectedData.payment_method.split(','),
                price_mgl: selectedData.price_mgl,
                price_usdt: selectedData.price_usdt,
                terms_conditions: selectedData.terms_conditions,
                facebook_link: selectedData.facebook_link,
                telegram_link: selectedData.telegram_link,
            });
            setShowAddModal(true);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: "API is failed",
                duration: 3,
            })
        }
    }

    const handleImageChange = info => {
        console.log(info)
        if (info.file.status === 'uploading') {
          setImageLoading(true);
          return;
        }
        if (info.file.status === 'error') {
            setImageLoading(false);
            message.error('Upload image is failed!');
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            setImageChanged(true);
            getBase64(info.file.originFileObj, imageUrl => {
                setUploadImageUrl(info.file.response.data);
                setImageUrl(imageUrl);
                setImageLoading(false);    
            });
        }
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
      
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const uploadButton = (
        <div>
          {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    useEffect(() => {
        getP2PData(currPageNum, itemPerPage);
    }, [])

    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background full-height" style={{ padding: 24, minHeight: 360 }}>
                <Row>
                    <Col span={24} className="horizont-space general-padding">
                        <span className="item-display bold-text">Total :&nbsp;&nbsp; {totalCount}</span>
                        <span>
                            <Button onClick={() => {
                                setShowAddModal(true);
                                setAddUpdateStatus(false);
                                setImageUrl(null);
                                form.setFieldsValue(defaultData)}}>Add</Button>
                        </span>
                    </Col>
                </Row>
                <Table dataSource={orderList} pagination={pagination} onChange={handleTableChange} loading={isLoading}>
                    <Column title="Seller" render={(text, record) => <div className="flex items-center"><img className="w-5 h-5 rounded-full mr-2" src={record.profile_pic} />{record.seller_name}</div>} key="seller_name" />
                    <Column title="Currency" dataIndex="currency" key="currency" />
                    <Column title="Amount" render={(text, record) => record.currency === 'USDT' ? record.amount_usdt : record.amount_mgl} key="amount" />
                    <Column title="Payment Method" render={(text, record) => record.payment_method.replaceAll(',', '/')} key="method" />
                    <Column title="Price (MNT)" dataIndex="price_mgl" key="price_mgl" />
                    <Column title="Price (USD)" dataIndex="price_usdt" key="price_usdt" />
                    <Column title="Phone" dataIndex="telegram_link" key="telegram" />
                    <Column title="Facebook" render={(text, record) => <div className="w-40">{record.facebook_link}</div>} key="facebook" />
                    <Column key="btn" 
                        render={(text, record) => 
                            <>
                                <Button 
                                    onClick={() => {
                                        updateDataHandler(record.id)
                                    }
                                }>
                                    Update
                                </Button>
                                <Button 
                                    onClick={() => {
                                        setSelectedIndex(record.id);
                                        setAlertVisible(true);
                                    }
                                }>
                                    Delete
                                </Button>
                            </>
                        }
                    />
                </Table>
            </div>
            <Modal
                title="Alert"
                visible={alertVisible}
                onOk={deleteItem}
                onCancel={() => setAlertVisible(false)}
                okText="Yes"
                cancelText="No"
            >
                <p>Do you want to delete this account really?</p>
            </Modal>
            <Modal
                title="Add Trade"
                visible={showAddModal}
                onOk={() => addItem()}
                onCancel={() => setShowAddModal(false)}
            >
                <Form
                    name="basic"
                    autoComplete="off"
                    form={form}
                    validateTrigger="onBlur"
                >
                    <Form.Item
                        name="profile_pic"
                        rules={[
                            { required: true, message: 'Please input image.' },
                        ]}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={`${SERVER_URL}p2p/upload`}
                            beforeUpload={beforeUpload}
                            onChange={handleImageChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="seller_name"
                        rules={[
                            { required: true, message: 'Please input seller name' },
                        ]}
                    >
                        <Input 
                            size="large" 
                            placeholder={'Seller Name'} 
                            prefix={<UserOutlined /> }/>
                    </Form.Item>
                    
                    <Form.Item
                        name="currency"
                    >
                        <Select>
                            <Select.Option value="USDT" key="usdt">USDT</Select.Option>
                            <Select.Option value="BUSD" key="busd">BUSD</Select.Option>
                            <Select.Option value="MGL" key="mgl">MGL</Select.Option>
                        </Select>
                    </Form.Item>
                    
                    <Form.Item
                        name="amount"
                        rules={[
                            { required: true, message: 'Please input amount' },
                        ]}
                    >
                        <Input 
                            size="large" 
                            placeholder={'Amount'} 
                            prefix={<WalletOutlined /> }/>
                    </Form.Item>

                    <Form.Item
                        name="payment_method"
                    >
                        <Select mode="multiple">
                            <Select.Option value="Bank transfer" key="usdt">Bank transfer</Select.Option>
                            <Select.Option value="Cash" key="mgl">Cash</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="price_mgl"
                        rules={[
                            { required: true, message: 'Please input price' },
                        ]}
                    >
                        <Input
                            size="large" 
                            placeholder={'Price'} 
                            prefix={<DollarCircleOutlined /> }
                            suffix="MNT" />
                    </Form.Item>

                    <Form.Item
                        name="price_usdt"
                        rules={[
                            { required: true, message: 'Please input price' },
                        ]}
                    >
                        <Input
                            size="large" 
                            placeholder={'Price'} 
                            prefix={<DollarCircleOutlined />}
                            suffix="USD" />
                    </Form.Item>
                
                    <Form.Item
                        name="terms_conditions"
                    >
                        <Input.TextArea
                            size="large" 
                            placeholder={'Terms and Condition'} 
                            prefix={<EditOutlined /> }
                            row={4} />
                    </Form.Item>

                    <Form.Item
                        name="facebook_link"
                    >
                        <Input
                            size="large" 
                            placeholder={''} 
                            prefix={<FacebookOutlined /> }/>
                    </Form.Item>

                    <Form.Item
                        name="telegram_link"
                    >
                        <Input
                            size="large" 
                            placeholder={''} 
                            prefix={<PhoneOutlined /> }/>
                    </Form.Item>
                </Form>
            </Modal>
        </Content>
    )
}

export default P2PTableView;
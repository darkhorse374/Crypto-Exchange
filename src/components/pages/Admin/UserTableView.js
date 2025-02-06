import { Layout, Table, Row, Col, Space, Button, Select, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";
import { SERVER_URL } from "../../../constants/env";

const { Content } = Layout;
const { Column } = Table;


function UserTableView() {
    const [totalUser, setTotalUser] = useState(0)
    const [pagination, setPagination] = useState({ total: 0 })
    const [displayData, setDisplayData] = useState([])
    const [alertVisible, setAlertVisible] = useState(false)
    const [userToDel, setUserToDel] = useState(-1)
    const [currPageNum, setCurrPageNum] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)

    const hideModal = () => {
        setAlertVisible(false)
    };

    const confirmDel = (id) => {
        console.log(id, typeof id)
        setAlertVisible(true)
        setUserToDel(id)
    }

    const handleTableChange = (pageInfo, filters, sorter) => {
        console.log(pageInfo, 'page info !!!!!!!!!!')
        setCurrPageNum(pageInfo.current)
        setItemPerPage(pageInfo.pageSize)
        axios.get(`${SERVER_URL}users/id/${pageInfo.current}/${pageInfo.pageSize}`, {
        }).then(response => {
            if (response.data.response) {
                setTotalUser(response.data.data.totalNumber)
                setPagination({ total: response.data.data.totalNumber })
                setDisplayData(response.data.data.users)
            }
        })
    };

    const deleteUser = () => {
        hideModal();
        console.log(userToDel, currPageNum, itemPerPage)

        axios.delete(`${SERVER_URL}users/id/${userToDel}`, {
        }).then(response => {
            console.log(response.data)
            if (response.data.response) {
                axios.get(`${SERVER_URL}users/id/${currPageNum}/${itemPerPage}`, {
                }).then(response => {
                    if (response.data.response) {
                        setTotalUser(response.data.data.totalNumber)
                        setPagination({ total: response.data.data.totalNumber })
                        setDisplayData(response.data.data.users)
                    }
                })
            }
        })
    }

    useEffect(() => {
        setAuthToken(localStorage.jwtToken);
        axios.get(SERVER_URL + "users/id/1/10", {
        }).then(response => {
            if (response.data.response) {
                setTotalUser(response.data.data.totalNumber)
                setPagination({ total: response.data.data.totalNumber })
                setDisplayData(response.data.data.users)
            }
        })
    }, [])

    return (
        <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background full-height" style={{ padding: 24, minHeight: 360 }}>
                <Row>
                    <Col span={24} className="horizont-space general-padding">
                        <span className="item-display bold-text">Total Users :&nbsp;&nbsp; {totalUser}</span>
                        <span>
                            {/* <span className="item-display">Show rows :&nbsp;&nbsp; </span>
                            <Select defaultValue="10" onChange={handleChange}>
                                <Option value="10">10</Option>
                                <Option value="20">20</Option>
                                <Option value="30">30</Option>
                                <Option value="40">40</Option>
                                <Option value="50">50</Option>
                            </Select> */}
                        </span>
                    </Col>
                </Row>
                <Table dataSource={displayData} pagination={pagination} onChange={handleTableChange}>
                    <Column title="User Id" dataIndex="id" key="id" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Wallet Address" dataIndex="wallet_address" key="walletAddress" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <a className="delete" onClick={() => {confirmDel(record.id)}}>Delete</a>
                            </Space>
                        )}
                    />
                </Table>
            </div>
            <Modal
                title="Alert"
                visible={alertVisible}
                onOk={deleteUser}
                onCancel={hideModal}
                okText="Yes"
                cancelText="No"
            >
                <p>Do you want to delete this account really?</p>
            </Modal>
        </Content>
    )
}

export default UserTableView;
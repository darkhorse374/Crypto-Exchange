import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, SwapOutlined, BarChartOutlined } from '@ant-design/icons';
import UserTableView from "./UserTableView";
import P2PTableView from "./P2PTableView";
import {RiArrowLeftRightFill} from "react-icons/ri";
import SendToken from "./SendToken";
import SellToken from "./SellToken";
import ProgressBar from "./ProgressBar";

import './Admin.css'

const { Header, Content, Footer, Sider } = Layout;

function AdminPanel() {
    const [currentIndex, setCurrentIndex] = useState(1)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    return (
        <>
            {(userInfo && userInfo.role === "Super") ? <Layout className="main-div">
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo">
                        Admin
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />} onClick={() => {setCurrentIndex(1)}}>
                            User List
                        </Menu.Item>
                        <Menu.Item key="2" icon={<SwapOutlined />} onClick={() => {setCurrentIndex(2)}}>
                            P2P
                        </Menu.Item>
                        <Menu.Item key="3" icon={<RiArrowLeftRightFill />} onClick={() => {setCurrentIndex(3)}}>
                            Send IEO Tokens
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UploadOutlined />} onClick={() => {setCurrentIndex(4)}}>
                            Sell Tokens
                        </Menu.Item>
                        <Menu.Item key="5" icon={<BarChartOutlined />} onClick={() => {setCurrentIndex(5)}}>
                            Progress Bar
                        </Menu.Item>
                        {/*<Menu.Item key="4" icon={<UserOutlined />}>
                            nav 4
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    {(currentIndex === 1) && <UserTableView />}
                    {(currentIndex === 2) && <P2PTableView />}
                    {(currentIndex === 3) && <SendToken />}
                    {(currentIndex === 4) && <SellToken />}
                    {(currentIndex === 5) && <ProgressBar />}
                    <Footer style={{ textAlign: 'center' }}>MGL ©Copyright 2021</Footer>
                </Layout>
            </Layout> : <Navigate to="/" />}
        </>
    )
};

export default AdminPanel;
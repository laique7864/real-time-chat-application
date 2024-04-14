import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function SideBar() {
console.log(JSON.parse(localStorage.getItem("user") || '{}').firstName);

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#4096ff',
      };
      
      const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: 'white',
      };
      

      
      const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: 'black',
      };
      
      const layoutStyle : React.CSSProperties = {
        overflow: 'hidden',
        width: '100vw',
        height:"100vh"
      };
      const token :any = localStorage.getItem('token');

      return token ? (
    <Layout style={layoutStyle}>
    <Layout>
      <Header style={headerStyle}>Real Time Chatting <span style={{
        textAlign:"end",
        padding:"10rem"
      }}>{JSON.parse(localStorage.getItem("user") || '{}').firstName}</span></Header>
      <Content style={contentStyle}><Outlet /></Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  </Layout>
  ) :<Navigate to={"/login"} />
}

import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const ChatList: React.FC = () =>{
  const [ chats , setChats] = useState([])
  const token = localStorage.getItem('token')
  const onFinish = async () => {
    try {

    const res  = await axios.get("http://localhost:4000/api/v1/user/list" ,{
    headers:{
Authorization:token
    }
    });
// console.log(res.data.data);
setChats(res.data.data)


    } catch (error) {
      // setLoading(false);
      console.log(error);
      
    }
  };

  useEffect(()=>{
    onFinish()
  },[])
  
  return(
  <List
    itemLayout="horizontal"
    dataSource={chats}
    renderItem={(item:any, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<Link to={`details/${item._id}`}>{item.userName}</Link>}
        />
      </List.Item>
    )}
  />
)};

export default ChatList;
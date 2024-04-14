import { Col, Divider, Row } from "antd";
import ChatList from "../../components/chat-list";
import Chat from "../chat";
import { Outlet } from "react-router-dom";

function ChatManagement() {
  return (
    <Row style={{ height: "100%" }}>
      <Col span={5} color="red">
     < ChatList />
      </Col>
     {/* < Col span={1}>
     <Divider />
     </Col>   */}
     <div style={{
      width:"1px",
      background:'lightgray',
      margin:"0.4rem",
      height:"100%"
     }}>

     </div>

      <Col span={18} color="red">
        <Outlet/>
      </Col>
    </Row>
  );
}

export default ChatManagement;

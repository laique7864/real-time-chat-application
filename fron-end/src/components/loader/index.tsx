import { Spin } from 'antd';

function Loader() {
  return (
    <div style={{
      height: '100vh',  // Full view height
      display: 'flex',
      justifyContent: 'center',  // Center horizontally
      alignItems: 'center'  // Center vertically
    }}>
      <Spin size="large" />
    </div>
  );
}

export default Loader;

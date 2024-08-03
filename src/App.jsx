// import { useState } from 'react'
import './App.css'
// import React from 'react'
import { Form, Button, Input } from 'antd';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div style={{
            display: 'block', width: 700, padding: 30
        }}>
            <h4>ReactJS Ant-Design Form Component</h4>
            <Form
                name="basicform"
                onFinishFailed={() => alert('Failed to submit')}
                onFinish={() => alert('Form Submitted')}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="Enter username"
                    name="Username"
                    rules={[{
                        required: true,
                        message: 'Please enter username'
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="success" htmlType="submit">
                        Submit Username
                    </Button>
                </Form.Item>
            </Form>
        </div>  
    </>
  )
}

export default App

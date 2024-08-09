// import { useState } from 'react'
import './App.css';
// import React from 'react'
// import { Button } from 'antd';
import { Layout } from 'antd';
import Header from './components/Header/Header'
import './App.css'

// const { Header, Content, Footer } = Layout;
// import { Api } from '../Api';


function App() {
    // const [count, setCount] = useState(0)
    // Api('terminator');

    return (
        <Layout className="layout__wrapper">
            <Header />
        </Layout>
    );
}

export default App;

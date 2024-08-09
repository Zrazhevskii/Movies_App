// import React from 'react'
import { useState } from 'react';
import './Header.css';
import { Layout, Input, Tabs } from 'antd';
const { Header } = Layout;

export default function MoviesHeader() {
    const [valueSearch, setValueSearch] = useState('');

    const itemSearch = [
        {
            key: '1',
            label: 'Search',
        },
        {
            key: '2',
            label: 'Rated',
        },
    ];

    const handleChangeValue = (evt) => {
        setValueSearch(evt.target.value);
    };

    return (
        <Header className='header'>
            <Tabs
                destroyInactiveTabPane
                defaultActiveKey='1'
                items={itemSearch}
                onChange={() => {}}
            />

            <Input
                placeholder='Type to search...'
                value={valueSearch}
                onChange={(evt) => handleChangeValue(evt)}
            />
        </Header>
    );
}

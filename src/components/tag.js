import React, { Component } from 'react'
import { Tag } from 'antd'
import tabList from '../components/tabList'


function getTag(data) {
    let nowTab = (data.top ? 'top' : data.good ? 'good' : data.tab);
    return tabList.filter((item) => (item.tab === nowTab))[0]
}

export default class TagCom extends Component {

    render() {
        const { data } = this.props
        let currentTag = getTag(data)
        return (
            <Tag color={currentTag.color}>{currentTag.name}</Tag>
        )
    }
}
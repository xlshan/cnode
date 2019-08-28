import React, { Component } from 'react'
import { Layout } from 'antd';
const { Footer } = Layout;

export default class Foot extends Component {

    render() {
        return (
            <Footer className="foot" style={{'textAlign':'center'}}>
                CNode © 2019 All rights reserved 
            </Footer>
        )
    }
}
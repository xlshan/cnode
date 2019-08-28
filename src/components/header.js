import React, { Component } from 'react'
import { Layout, Row, Col, Divider, Icon, Dropdown, Button } from 'antd'
import Nav from '../components/nav'
import { Link } from 'react-router-dom'
const { Header } = Layout

export default class Head extends Component {
    render() {
        return (
            <Header>
                <Row className="wrap">
                    <Col xs={24} md={6}>
                        <h1 id='logo'><Link to={'/index/all'}>CNode</Link></h1>
                    </Col>
                    <Col xs={0} md={18}>
                        <Divider type="vertical" className='headerDivider' />
                        <Nav mode='horizontal' id="nav"></Nav>
                    </Col>
                    <Col md={0} xs={24} className="xsNav">
                        <Dropdown overlay={
                            <Nav mode="vertical" id="xsNav"></Nav>
                        }
                            trigger={['click', 'touchend']}
                            placement='bottomRight'>
                            <Button>
                                <Icon type="bars"></Icon>
                            </Button>
                        </Dropdown>
                    </Col>
                </Row>

            </Header>
        )
    }
}
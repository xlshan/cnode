import React, { Component } from 'react'
import { Menu, Row, Col, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import ListCom from './list'
import IndexMenu from '../../components/indexMenu'



export default class Index extends Component {
    render() {
        let tab = this.props.match.params.id
        return (
            <>
                <Row className="wrap wrap-box">
                    <Col md={6}>
                        <IndexMenu id='indexMenu'></IndexMenu>
                    </Col>
                    <Col md={18} id="indexList">
                        <ListCom tab={tab} />
                        {/* <div style={{ padding: '10px', textAlign: 'center' }}>
                            <Pagination current={1} pageSize={10} total={23} onChange={(current) => {
                                console.log(current)
                            }} />
                        </div> */}

                    </Col>
                </Row>

            </>
        )

    }

}







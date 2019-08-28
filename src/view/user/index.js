import React, { Component } from 'react'
import { Avatar, Row, Col } from 'antd'
import UserList from '../../components/userList'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'

class User extends Component {
    constructor(props) {
        super(props)
        this.getInfo()
    }

    getInfo = () => {
        const id = this.props.match.params.id;
        this.props.dispatch((dispatch) => {
            dispatch({
                type: 'USER_INFO'
            })
            axios.get(`https://cnodejs.org/api/v1/user/${id}`)
                .then(res => {
                    dispatch({
                        type: 'USER_INFO_SUCCESS',
                        data: res.data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: 'USER_INFO_ERROR',
                        data: err
                    })
                })
        })
    }

    render() {
        const { avatar_url, loginname, score, create_at, recent_replies, recent_topics } = this.props.data
        return (
            <>
                <div className="wrap" style={{ border: '1px solid #eee' }}>
                    <Avatar src={avatar_url} className='userAvatar' />
                    <Row className="userInfo">
                        <Col md={8}>
                            <span>用户名：{loginname}</span>
                        </Col>
                        <Col md={8}>
                            <span>积分：{score}</span>
                        </Col>
                        <Col md={8}>
                            <span>注册时间：{create_at.split('T')[0]}</span>
                        </Col>
                    </Row>
                    <UserList loading={false} title='最近创建的话题' data={recent_topics} />
                    <UserList loading={false} title='最近回复的话题' data={recent_replies} />
                </div>
            </>
        )

    }
}

export default connect(state => state.user)(User)






import React, { Component } from 'react';
import { List, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import TagCom from '../../components/tag'
import moment from 'moment';
import axios from 'axios'
import { connect } from 'react-redux'


class IndexList extends Component {

    constructor(props) {
        super(props)
        this.isStart = true;
        this.state = {
            page: 1,
            limit: 3
        }
        this.getList(this.props.tab, this.state.page)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { tab } = this.props
        this.isStart = false;
        if (this.state.page !== nextState.page) {
            this.getList(nextProps.tab, nextState.page);
            return false
        }
        if (nextProps.tab !== tab) {
            this.state.page = 1;
            this.getList(nextProps.tab, 1);
            return false;
        }
        return true;
    }

    getList = (tab, page) => {
        let { limit } = this.state
        this.props.dispatch((dispatch) => {
            dispatch({
                type: 'LIST_UPDATE'
            })
            axios.get(`https://cnodejs.org/api/v1/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=${true}`)
                .then(res => {
                    dispatch({
                        type: 'LIST_UPDATE_SUCCESS',
                        data: res.data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: 'LIST_UPDATE_ERROR',
                        data: err
                    })
                })
        })
    }
    render() {
        let { loading, data } = this.props
        let { page } = this.state
        console.log(data)
        let pagination = {
            current: page,
            pageSize: 3,
            total: 10,
            onChange: ((current) => {
                this.setState({
                    page: current
                })
            })

        }
        return (
            <List pagination={this.isStart?false:pagination} loading={loading} itemLayout="horizontal" dataSource={data} renderItem={item => (
                <List.Item actions={['回复' + item.reply_count, '访问' + item.visit_count]} key={item.id}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.author.avatar_url} style={{ 'border': '1px solid #eee' }} />}
                        title={<div><TagCom data={item} /><Link to={'/details/' + item.id}>{item.title}</Link></div>}
                        description={
                            <p><Link to={'/user/' + item.author.loginname}>{item.author.loginname}</Link>&nbsp;发表于&nbsp;{moment(item.create_at).format('YYYY-MM-DD')}</p>
                        }

                    />
                </List.Item>
            )}>

            </List>
        )
    }
}

export default connect(state => state.list)(IndexList)
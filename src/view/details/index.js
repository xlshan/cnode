import React, { Component } from 'react'
import { Card, List, Comment } from 'antd'
import TagCom from '../../components/tag'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { connect } from 'react-redux'
import axios from 'axios'



class Details extends Component {
    constructor(props) {
        super(props)
        this.getInfo();
    }

    getInfo = () => {
        const id = this.props.match.params.id
        this.props.dispatch(dispatch => {
            dispatch({
                type: 'INFO_DETAIL',
            })
            axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
                .then(res => {
                    console.log(res.data)
                    dispatch({
                        type: 'INFO_DETAIL_SUCCESS',
                        data: res.data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: 'INFO_DETAIL_ERROR',
                        data: err
                    })
                })
        })

    }


    render() {
        const { info, loading } = this.props

        return (
            <div className="wrap">
                <Card loading={loading}>
                    <Card.Meta
                        avatar={<TagCom data={info} />}
                        title={info.title}
                        description={<>
                            <div className="detail-head">
                                <span className="mr10">发布于：{moment(info.create_at).format('YYYY-MM-DD')}</span>
                                <span className="mr10">作者：<Link to={'/user/' + info.author_id} className='c_inherit'>{info.author.loginname}</Link></span>
                                <span className="mr10">{info.visit_count}次浏览</span>
                                <span className="mr10">最后一次编辑是：{moment(info.last_reply_at).format('YYYY-MM-DD')}</span>
                                <span>来自：{info.is_collect ? '收藏' : '分享'}</span>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: info.content }}></div>
                        </>
                        }>

                    </Card.Meta>
                </Card>

                <List className="comment-list"
                    header={`${info.replies.length} 条回复`}
                    bordered
                    itemLayout="horizontal"
                    dataSource={info.replies}
                    renderItem={item =>
                        (
                            <li>
                                <Comment
                                    // actions={[<span key="comment-list-reply-to-0">回复</span>]}
                                    author={item.author.loginname}
                                    avatar={item.author.avatar_url}
                                    content={<span dangerouslySetInnerHTML={{ __html: item.content }}></span>}
                                    datetime={moment(info.create_at).format('YYYY-MM-DD HH:mm:ss')}
                                />
                            </li>
                        )
                    }

                />
            </div>
        )

    }
}


export default connect(state => state.details)(Details)






import React, { Component } from 'react'
import { Card } from 'antd'

export default class CardCom extends Component {
    render() {
        let { data } = this.props
        return (<>{

            data.map((item, index) => (
                <Card key={index} title={item.title} type='inner' loading={false}
                >
                    <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </Card>
            ))

        }</>)
    }
}
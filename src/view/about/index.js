import React, { Component } from 'react'
import data from './data'
import CardCom from '../../components/card'


export default class About extends Component {
    render() {
        return (
            <div className="wrap">
                <CardCom data={data} />
            </div>

        )
    }
}




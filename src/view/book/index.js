import React, { Component } from 'react'
import CardCom from '../../components/card'
import data from './data'


export default class Book extends Component {
    render() {
        return (
            <>
                <div className="wrap">
                    <CardCom data={data} />
                </div>
            </>
        )

    }
}




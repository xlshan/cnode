import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import tabList from '../components/tabList'


class IndexMenu extends Component {
    constructor(props) {
        super(props)
        let current = this.getCurrent(this.props.location)
        this.state = {
            current
        }
    }

    getCurrent = (location) => {
        const current = location.pathname.split('/')
        return current[2]
    }

    shouldComponentUpdate(nextProps) {
        const current = this.getCurrent(nextProps.location)
        if (current !== this.state.current) {
            this.setState({ current })
            return false
        }
        return true
    }

    render() {
        const { id } = this.props;
        const { current } = this.state;
        return (
            <Menu id={id} selectedKeys={[current]}>
                {
                    tabList.map((item) => {
                        if (!item.isIndex) {
                            return false
                        } else {
                            return (
                                <Menu.Item key={item.tab}>
                                    <Link to={`/index/${item.tab}`}>{item.name}</Link>
                                </Menu.Item>
                            )
                        }


                    })
                }
            </Menu>
        )
    }
}


export default withRouter((props) => {
    const { id, location } = props
    return <IndexMenu id={id} location={location} />
})
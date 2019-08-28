import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { log } from 'util';

class Nav extends Component {
    constructor(props) {
        super(props)
        let current = this.getCurrent(this.props.location)
        this.state = {
            current
        }
    }

    getCurrent = (location) => {
        let current = location.pathname.split('/')
        return current[1]
    }

    shouldComponentUpdate(nextProps) {
        const current = this.getCurrent(nextProps.location)
        if (current !== this.state.current) {
            this.setState({ current });
            return false
        }
        return true;
    }

    render() {
        const { mode, id } = this.props
        const { current } = this.state


        return (
            <Menu mode={mode} id={id} theme="light" selectedKeys={[current]}>
                <Menu.Item key="index">
                    <Link to='/index/all'> <Icon type="home" />首页</Link>
                </Menu.Item>
                <Menu.Item key="book">
                    <Link to='/book'> <Icon type="book" />教程</Link>
                </Menu.Item>
                <Menu.Item key="about">
                    <Link to='/about'><Icon type="info-circle" />关于</Link>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter((props) => {
    const { mode, id, location } = props
    return <Nav mode={mode} id={id} location={location} />
})
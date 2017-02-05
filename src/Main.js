import React from 'react'
import ReactDOM from 'react-dom'
import {
    Router,
    Route,
    Link,
    hashHistory,
    IndexRoute,
    Redirect,
    IndexLink
} from 'react-router'
import {
    Card,
    Button,
    Layout,
    Breadcrumb,
    Menu,
    Icon,
    Row,
    Col,
    Dropdown
} from 'antd'
import $ from 'jquery'
import config from 'config.js'
import util from 'util.js'
const {Header, Footer, Sider, Content} = Layout

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.userMenu = (
            <Menu>
                <Menu.Item key="0">
                    <Link to="/changePwd">修改密码</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/"><Icon type="poweroff" />
                        退出</a>
                </Menu.Item>
            </Menu>
        )
        this.state = {
            userInfo: {
                username: '',
                department: ''
            },
            mainMenu: []
        }
        this.style = {
            ly: {
                width: '100%',
                height: '100%',
                minWidth: 1024,
                minHeight: 600
            },
            ly_header: {
                height: 40,
                padding: 0,
                backgroundColor: '#108ee9'
            },
            ly_content: {
                height: '100%',
                backgroundColor: '#fff'
            },
            ly_foot: {
                margin: 0,
                padding: 3,
                textAlign: 'center'
            },
            userMenu: {
                textColor: '#fff',
                lineHeight: '40px',
                float: 'right',
                marginRight: '10px'
            },
            bcbar: {
                height: 35,
                padding: '0px 20px',
                lineHeight: '35px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #eeefef'
            },
            bc: {
                margin: '2px 10px'
            }
        }
    }
    getInitialState() {
        return {
            userInfo: {
                username: '',
                department: ''
            },
            mainMenu: [],
            bcList: [{
                icon: 'home',
                name: '首页'
            }]
        }
    }
    componentDidMount() {
        util.api({ api: '/menu' }, function (data) {
            this.setState(data)
        }.bind(this))
    }
    handleMenuClick(e) {
        window.location.hash = e.key
    }
    handleMenuBuild(menuNode, lastGroup) {
        if (menuNode["child"] == undefined) {
            return <Menu.Item key={menuNode["key"]}>
                <Icon type={menuNode["icon"] == undefined
                    ? "file"
                    : menuNode.icon} />{menuNode.name}
            </Menu.Item>
        } else {
            return <Menu.SubMenu key={menuNode["key"]} title={<span> <Icon type={menuNode["icon"] == undefined
                ? "book"
                : menuNode.icon} /> <span> {
                    menuNode.name
                } </span> </span>}>{menuNode.child.map(function (v, i, a) {
                    return this.handleMenuBuild(v)
                }, this)
                }
            </Menu.SubMenu>
        }
    }
    handleBreadcrumb(v, i) {
        return <Breadcrumb.Item key={i}>{i == 0 ? <Icon type="home" /> : ""}
            <Link to={v.path}>{v.breadcrumbName}</Link>
        </Breadcrumb.Item>
    }
    itemRender(route, params, routes, paths) {
        console.log(this.props.params.id)
        const last = routes.indexOf(route) === routes.length - 1
        return last
            ? <span>{route.breadcrumbName}</span>
            : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    }
    render() {
        return (
            <Layout style={this.style.ly}>
                <Header style={this.style.ly_header}>
                    <Row>
                        <Col span={6}>
                            <div className="logo">{config.systemname}</div>
                        </Col>
                        <Col style={{
                            margin: '0px'
                        }} span={18}>
                            <div style={this.style.userMenu}>
                                <Dropdown overlay={this.userMenu}>
                                    <Button>
                                        <Icon type="user" />[{this.state.userInfo.department}] {this.state.userInfo.username}
                                        <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Sider width={config.mainFrame.sideBarWidth}>
                        <Menu onClick={this.handleMenuClick} style={{
                            width: config.mainFrame.sideBarWidth
                        }} mode="inline">
                            {this.state.mainMenu.map(function (v, i, a) {
                                return this.handleMenuBuild(v)
                            }, this)}
                        </Menu>
                    </Sider>
                    <Content>
                        <Layout style={this.style.ly_content}>
                            <Header style={this.style.bcbar}>
                                <Breadcrumb>
                                    {this.props.routes.map(function (v, i, a) {
                                        return this.handleBreadcrumb(v, i)
                                    }, this)}
                                </Breadcrumb>
                            </Header>
                            <Content style={{
                                height: '100%'
                            }}>
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
                <Footer style={this.style.ly_foot}>{config.copyright}</Footer>
            </Layout>
        )
    }
}
export default Main

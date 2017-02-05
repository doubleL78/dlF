import React from 'react'
import ReactDOM from 'react-dom'
import { Layout } from 'antd'

class TplNormal extends React.Component {
    renderToolbar() {
        return <div>toolbar</div>
    }
    renderHeader() {
        return <div>Header</div>
    }
    renderContent() {
        return <div>Content</div>
    }
    renderFooter() {
        return <div>Footer</div>
    }
    render() {
        return (
            <Layout className="normalLayout">
                <Layout.Header className="toolBar">
                    {this.renderToolbar()}
                </Layout.Header>
                <Layout.Header className="header">
                    {this.renderHeader()}
                </Layout.Header>
                <Layout.Content className="content">
                    {this.renderContent()}
                </Layout.Content>
                <Layout.Footer className="footer">
                    {this.renderFooter()}
                </Layout.Footer>
            </Layout>
        )
    }
}
export default TplNormal

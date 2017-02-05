import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Modal } from 'antd'
const {Header, Content, Footer} = Layout

import util from '../util.js'
import * as Std from './_default.js'

class TplDialog extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            api: '',
            visible: true,
            title: '对话框',
            width: 600
        }

        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleData = this.handleData.bind(this)
        this.render = this.render.bind(this)
    }
    showModal() {
        this.setState({ visible: true })
    }
    handleOk() {
        this.setState({ visible: false })
    }
    handleCancel() {
        this.setState({ visible: false })
    }
    renderContent() {
        let readOnly = this.props.readOnly == undefined ? true : this.props.readOnly
        return <Std.CmpCompForm items={this.formItems} ref="dataForm" readOnly={readOnly} />
    }
    handleData(data) {
        return
    }
    componentDidMount() {
        util.api({ api: this.state.api, data: { id: this.props.id } }, function (data) {
            this.refs.dataForm.setFieldsValue(util.repairDate(data))
            this.handleData(data)
        }.bind(this))
    }
    render() {
        return <Modal key={Math.random()}
            title={this.state.title}
            width={this.state.width}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            maskClosable={false}>
            {this.renderContent()}
        </Modal>
    }
}
export default TplDialog

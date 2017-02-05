import React from 'react'
import ReactDOM from 'react-dom'
// import moment from 'moment'
import { Button, Icon, Form, Input, Select, Row, Col, DatePicker } from 'antd'

// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')

import config from '../config.js'

const CmpCompForm = Form.create()(React.createClass({
    handleSubmit: function (e) {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    },
    handlerBuildComp: function (item) {
        const {getFieldDecorator} = this.props.form
        let span = (item.span == undefined ? 1 : item.span)
        let width = (item.width == undefined
            ? ((span - 1) * (config.normalLayout.colItem.label + config.normalLayout.colItem.wrapper) + config.normalLayout.compWidth)
            : item.width)
        let readOnly = item.readOnly == undefined ? this.props.readOnly : item.readOnly
        //let Ref = item.ref == undefined ? String(item.field) : + item.ref
        let Ref = Math.random()
        switch (item.name) {
            case 'select':
                return getFieldDecorator(item.field)(
                    <Select style={{ width: width }} readOnly={readOnly}>
                        {item.needAll
                            ? <Select.Option size="default" value="0">{config.formControl.selectAllText}</Select.Option>
                            : ""}
                        {item.items.map(function (v, i, a) {
                            return <Select.Option key={i} value={v.value}>{v.name}</Select.Option>
                        })}
                    </Select>
                )
                break
            case 'date':
                return getFieldDecorator(item.field)(
                    <DatePicker size="default" style={{ width: width }} disabled={readOnly} />
                )
                break
            case 'datetime':
                return getFieldDecorator(item.field)(
                    <DatePicker size="default" style={{ width: width }} disabled={readOnly} format="YYYY-MM-DD hh:mm:ss" showTime/>
                )
                break
            case 'textarea':
                return getFieldDecorator(item.field)(
                    <Input size="default" type="textarea" style={{ width: width }} autosize={{ minRows: item.rows, maxRows: item.rows }} readOnly={readOnly} />
                )
                break
            case 'input':
                return getFieldDecorator(item.field)(
                    <Input size="default" style={{ width: width }} readOnly={readOnly} />
                )
                break
            default:
                return ''
        }
    },
    handlerBuildItem: function (item, key) {
        let span = (item.span == undefined ? 1 : item.span)
        let labelwid = config.normalLayout.colItem.label
        let wrapperWid = config.normalLayout.colItem.wrapper + (span - 1) * (config.normalLayout.colItem.label + config.normalLayout.colItem.wrapper)

        return (
            <div key={key} className="form-item">
                <div className="form-item-label" style={{ width: labelwid }}>{item.label}: </div>
                <div className="form-item-control" style={{ width: wrapperWid }}>
                    <Form.Item>
                        {this.handlerBuildComp(item)}
                    </Form.Item>
                </div>
            </div>
        )
    },
    render() {
        return (
            <Form inline className="appForm">
                {this.props.items.map(function (v, i, a) {
                    return this.handlerBuildItem(v, i)
                }.bind(this))}
                <div className="clear"></div>
            </Form>
        )
    }
}))

export default CmpCompForm

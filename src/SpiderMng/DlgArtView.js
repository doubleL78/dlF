import React from 'react'
import ReactDOM from 'react-dom'

import util from '../util.js'
import config from '../config.js'
import * as Std from '../Std/_default.js'

class DlgArtView extends Std.TplDialog {
    constructor(props) {
        super(props)

        this.state.api = '/ccc'
        this.state.apiPost = '/dddd'
        this.state.title = '信息展示'
        this.state.width = 900
        this.state.readOnly = true

        this.state.date = {
            ID: '',
            msName: '',
            mfName: '',
            maURL: '',
            maTitle: '',
            maContent: ''
        }

        this.formItems = [{
            name: 'input',
            label: '网站名称',
            field: 'msName',
            readOnly: true
        }, {
            name: 'input',
            label: '栏目名称',
            field: 'mfName',
            readOnly: true
        }, {
            name: 'input',
            label: '信息标题',
            field: 'maTitle',
            span: 2
        }, {
            name: 'input',
            label: 'URL',
            field: 'maURL',
            span: 2
        }, {
            name: 'textarea',
            label: '信息内容',
            field: 'maContent',
            span: 2,
            rows: 15
        }, {
            name: 'date',
            label: '发布时间',
            field: 'maPostDate'
        }, {
            name: 'datetime',
            label: '采集时间',
            field: 'maSpiderDate'
        }]
    }
    handleOk() {
        let readOnly = this.props.readOnly
        if (!readOnly) {
            // 保存信息
            let d = this.refs.dataForm.getFieldsValue()
            console.log(d)
            let data = util.reloadDate(this.refs.dataForm.getFieldsValue())
            console.log(data)
            util.api({ api: this.state.apiPost, data: data }, function (data) {
                if (data.state == 0)
                    this.super.handleOk()
            }.bind(this))
        } else {
            super.handleOk()
        }
    }
}

export default DlgArtView
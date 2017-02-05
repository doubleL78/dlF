import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Modal } from 'antd'
import util from '../util.js'
import config from '../config.js'
import * as Std from '../Std/_default.js'
import * as SpiderMng from './_default.js'

class FrmDataHandle extends Std.TplNormalQuery {
    constructor(props) {
        super(props)

        this.state.api = '/bbb'
        this.state.grid.pageInfo.pageSize = config.pageOptions.defaultPageSize

        this.handleView = this.handleView.bind(this)
        this.handleEdit = this.handleEdit.bind(this)

        this.gridColumns = [{
            title: '网站名称',
            dataIndex: 'msName',
            key: 'msName',
            width: 200
        }, {
            title: '栏目名称',
            dataIndex: 'mfName',
            key: 'mfName',
            width: 150
        }, {
            title: '信息标题',
            dataIndex: 'maTitle',
            key: 'maTitle',
            width: 800
        }, {
            title: 'URL',
            dataIndex: 'maURL',
            key: 'maURL',
            width: 400
        }, {
            title: '发布时间',
            dataIndex: 'maPostDate',
            key: 'maPostDate',
            width: 150
        }, {
            title: '采集时间',
            dataIndex: 'maSpiderDate',
            key: 'maSpiderDate',
            width: 240
        }, {
            title: '状态',
            dataIndex: 'maStatus',
            key: 'maStatus',
            width: 80
        }]

        this.formItems = [{
            name: 'input',
            label: '网站名称',
            field: 'msName'
        }, {
            name: 'input',
            label: '信息标题',
            field: 'maTitle'
        }]

        this.buttons = {
            left: [{
                label: '新增',
                icon: 'plus-circle-o'
            }, {
                label: '删除',
                icon: 'minus-circle-o'
            }, {
                label: '查看',
                icon: 'exclamation-circle-o',
                onclick: this.handleView
            }, {
                label: '编辑',
                icon: 'edit',
                onclick: this.handleEdit
            }],
            right: [{
                label: '清除',
                icon: 'reload'
            }, {
                label: '查询',
                icon: 'search',
                style: 'primary',
                onclick: this.handleQuery
            }]
        }
    }
    handleView() {
        let index = util.mastSelectedOneRow(this.state.grid.selected)
        if (index >= 0) {
            ReactDOM.render(
                <SpiderMng.DlgArtView key={Math.random()} id={this.state.grid.rows[index].ID} readOnly={trues}/>,
                document.getElementById('dlg'))
        }
    }
    handleEdit() {
        let index = util.mastSelectedOneRow(this.state.grid.selected)
        if (index >= 0) {
            ReactDOM.render(
                <SpiderMng.DlgArtView key={Math.random()} id={this.state.grid.rows[index].ID} readOnly={false}/>,
                document.getElementById('dlg'))
        }
    }
}

export default FrmDataHandle

import React from 'react'
import ReactDOM from 'react-dom'

import util from '../util.js'
import config from '../config.js'
import * as Std from '../Std/_default.js'

class FrmSiteMng extends Std.TplNormalQuery {
    constructor(props) {
        super(props)

        this.state.api = '/aaa'
        this.state.grid.pageInfo.pageSize = config.pageOptions.defaultPageSize

        this.gridColumns = [{
            title: '网站类别',
            dataIndex: 'mscName',
            key: 'mscName'
        }, {
            title: '网站名称',
            dataIndex: 'msName',
            key: 'msName'
        }, {
            title: '网址',
            dataIndex: 'msURL',
            key: 'msURL'
        }, {
            title: '行政区划编码',
            dataIndex: 'msADCode',
            key: 'msADCode'
        }]
        this.formItems = [{
            name: 'select',
            label: '网站类型',
            field: 'mscID',
            items: stdDict.monitorSiteCat,
            needAll: true
        }, {
            name: 'select',
            label: '行政级别',
            field: 'msADCode',
            items: stdDict.monitorSiteLevel,
            needAll: true
        }, {
            name: 'input',
            label: '网站名称',
            field: 'msName'
        }]
        this.buttons = {
            left: [{
                label: '新增',
                icon: 'plus-circle-o'
            }, {
                label: '删除',
                icon: 'minus-circle-o'
            }, {
                label: '编辑',
                icon: 'edit'
            }],
            right: [{
                label: '清除',
                icon: 'reload'
            }, {
                label: '查询',
                icon: 'search',
                style: 'primary',
                onclick: this.handleQuery.bind(this)
            }]
        }
    }
}
export default FrmSiteMng

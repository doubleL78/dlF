import $ from 'jquery'
import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import update from 'react-addons-update'
import { message, notification, Button } from 'antd'
import config from 'config.js'

message.config({ top: 100, duration: 3 })
notification.config({ top: 100, duration: 3 })

var util = {
    api: function (opts, cbSuccess, cbComplete) {
        $.ajax({
            url: config.apiUrl + opts.api,
            dataType: 'json',
            method: 'POST',
            data: opts.data,
            timeout: config.apiTimeout,
            success: function (data, status, jqXHR) {
                if (data.status < 0) {
                    notification['error']({
                        message: <span><h2>系统错误</h2></span>,
                        description: <span><b>[API] {opts.api} 请求出错</b><br />{data.message}</span>
                    })
                } else
                    cbSuccess(data.data)
            }.bind(this),
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                message.error(<span><b>=Request Error=</b><br />[API] {opts.api}<br /> {textStatus}</span>)
            }.bind(this),
            complete: function (event, xhr, options) {
                if (cbComplete != undefined)
                    cbComplete()
            }.bind(this)
        })
    },
    updateState: function (newSate) {
        this.setState(update(this.state, newSate))
    },
    mastSelectedOneRow: function (selecteArr) {
        let index = -1
        for (let i = 0; i < selecteArr.length; i++) {
            if (selecteArr[i]) {
                index = i
                break
            }
        }
        if (index < 0)
            notification.warning({ message: '请先选中需要操作的记录！', description: '在执行数据操作时，需要首先选中一条待操作的数据！' })
        return index
    },
    parseDate: function (v) {
        let f = config.dataFormat
        if (v._isAMomentObject)
            return v.format(f)
        else
            return moment(v, f)
    },
    repairDate: function (obj) {
        let reg = config.dataFormatReg
        for (let k of Object.keys(obj)) {
            if (String(obj[k]).match(reg) != null) {
                obj[k] = util.parseDate(obj[k])
            }
        }
        return obj
    },
    reloadDate: function (obj) {
        for (let k of Object.keys(obj)) {
            if (obj[k]._isAMomentObject) {
                obj[k] = util.parseDate(obj[k])
            }
        }
        return obj
    }
}

export default util

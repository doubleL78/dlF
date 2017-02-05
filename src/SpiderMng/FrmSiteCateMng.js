import React from 'react'
import ReactDOM from 'react-dom'

import util from '../util.js'
import config from '../config.js'
import * as Std from '../Std/_default.js'

class FrmSiteCateMng extends Std.TplNormalQuery {
    constructor(props) {
        super(props)

        this.state.api = '/ccc'
        this.state.grid.pageInfo.pageSize = config.pageOptions.defaultPageSize
    }
}
export default FrmSiteCateMng

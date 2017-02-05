import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink } from 'react-router'

// const authentication = function(next, replace, callback) {
//     const isLoggedIn = true
//     if (!isLoggedIn && next.location.pathname != '/Login') {
//         replace('/Login')
//     }
//     callback()
// }

import Main from './Main.js'
import Login from './Login.js'
import * as Std from './Std/_default.js'
import * as SpiderMng from './SpiderMng/_default.js'

var AppRouter = React.createClass({
    render: function () {
        return (
            <Router history={hashHistory}>
                <Route path="/" breadcrumbName="首页" component={Main}>
                    <Route path="SpiderMng" breadcrumbName="网站采集管理">
                        <IndexRoute component={Std.CmpBlank} />
                        <Route path="SiteCateMng" breadcrumbName="大类管理" component={SpiderMng.FrmSiteCateMng} />
                        <Route path="DataHandle" breadcrumbName="信息处理" component={SpiderMng.FrmDataHandle} />
                        <Route path="SpiderMonitor" breadcrumbName="采集监控" component={SpiderMng.FrmSpiderMonitor} />
                        <Route path="SiteMng" breadcrumbName="网站管理" component={SpiderMng.FrmSiteMng} />
                    </Route>
                </Route>
            </Router>
        )
    }
})

ReactDOM.render(<AppRouter />, document.getElementById('app'))

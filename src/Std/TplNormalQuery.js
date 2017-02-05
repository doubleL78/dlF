import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb, Card, Icon, Button, Form, Input, Select, Row, Col, Table, Pagination } from 'antd'

import util from '../util.js'
import config from '../config.js'
import * as Std from '../Std/_default.js'

class TplNormalQuery extends React.Component {
    constructor(props) {
        super(props)

        this.updateState = util.updateState.bind(this)
        this.handleQuery = this.handleQuery.bind(this)
        this.handleRowClass = this.handleRowClass.bind(this)
        this.handleRowSelect = this.handleRowSelect.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
        this.handlerShowSizeChange = this.handlerShowSizeChange.bind(this)

        this.state = {
            api: '/test',
            grid: {
                key: 'ID',
                loading: false,
                singleSelect: true,
                rows: [],
                selected: [],
                pageInfo: {
                    total: 0,
                    page: 1,
                    pageSize: 1
                }
            }
        }

        this.gridColumns = [{
            title: 'Col1',
            dataIndex: 'Col1',
            key: 'Col1'
        }, {
            title: 'Col2',
            dataIndex: 'Col2',
            key: 'Col2'
        }, {
            title: 'Col3',
            dataIndex: 'Col3',
            key: 'Col3'
        }]

        this.formItems = [{
            name: 'Field1',
            label: 'Field1',
            field: 'Field1'
        }, {
            name: 'Field2',
            label: 'Field2',
            field: 'Field2'
        }, {
            name: 'Field3',
            label: 'Field3',
            field: 'Field3'
        }]

        this.buttons = {
            left: [],
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
    stdQuery(data) {
        this.updateState({
            grid: {
                loading: {
                    $set: true
                }
            }
        })
        util.api({
            api: this.state.api,
            data: data
        }, function (result) {
            this.updateState({
                grid: {
                    rows: {
                        $set: result.rows
                    },
                    selected: { $set: [] },
                    pageInfo: {
                        page: {
                            $set: parseInt(result.page)
                        },
                        pageSize: {
                            $set: parseInt(result.pageSize)
                        },
                        total: {
                            $set: parseInt(result.total)
                        }
                    }
                }
            })
        }.bind(this), function () {
            this.updateState({
                grid: {
                    loading: {
                        $set: false
                    }
                }
            })
        }.bind(this))
    }
    handleQuery(event) {
        this.stdQuery({ page: 1, pageSize: this.state.grid.pageInfo.pageSize })
    }
    handlePageChange(page) {
        this.stdQuery({ page: page, pageSize: this.state.grid.pageInfo.pageSize })
    }
    handlerShowSizeChange(current, size) {
        this.stdQuery({ page: 1, pageSize: size })
    }
    handleRowSelect(record, index) {
        var values = this.state.grid.selected
        var oldValue = values[index]
        if (this.state.grid.singleSelect) {
            values = []
        }
        values[index] = (oldValue == undefined ? true : !oldValue)

        this.updateState({
            grid: {
                selected: {
                    $set: values
                }
            }
        })
    }
    handleRowClass(record, index) {
        if (this.state.grid.selected[index]) {
            return 'selectedRow'
        }
    }
    renderToolbar() {
        return <Std.CmpToolBar items={this.buttons} />
    }
    renderHeader() {
        return <Std.CmpCompForm items={this.formItems} cols={3}/>
    }
    renderContent() {
        return <Table rowKey={this.state.grid.key}
            dataSource={this.state.grid.rows}
            columns={this.gridColumns}
            rowClassName={this.handleRowClass}
            onRowClick={this.handleRowSelect}
            size="small"
            loading={this.state.grid.loading}
            bordered pagination={false} />
    }
    renderFooter() {
        return <Pagination current={this.state.grid.pageInfo.page}
            pageSize={this.state.grid.pageInfo.pageSize}
            total={this.state.grid.pageInfo.total}
            defaultPageSize={config.pageOptions.defaultPageSize}
            onChange={this.handlePageChange}
            onShowSizeChange={this.handlerShowSizeChange}
            pageSizeOptions={config.pageOptions.pageSizeOptions}
            style={{ float: 'right', marginRight: 30 }}
            showQuickJumper
            showSizeChanger />
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
export default TplNormalQuery

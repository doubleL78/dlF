import React from 'react'
import ReactDOM from 'react-dom'

import { Button, Icon } from 'antd'

class CmpToolBar extends React.Component {
    constructor(props) {
        super(props)
    }
    handleBuildButton(item, index) {
        return (
            <Button key={index}
                type={item.style == undefined ? "" : item.style}
                onClick={item.onclick}>
                <Icon type={item.icon == undefined ? "setting" : item.icon} />{item.label}
            </Button>
        )
    }
    render() {
        return (
            <div>
                <div style={{ float: 'left' }}>
                    <Button.Group>
                        {this.props.items.left.map(function (v, i, a) {
                            return this.handleBuildButton(v, i)
                        }.bind(this))}
                    </Button.Group>
                </div>
                <div style={{ float: 'right' }}>
                    <Button.Group>
                        {this.props.items.right.map(function (v, i, a) {
                            return this.handleBuildButton(v, i)
                        }.bind(this))}
                    </Button.Group>
                </div>
            </div>
        )
    }
}

export default CmpToolBar

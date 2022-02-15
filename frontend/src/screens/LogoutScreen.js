import React, { Component } from 'react'

export default class LogoutScreen extends Component {
    
    componentDidMount(){
        this.props.clearSession();
    }

    render() {
        return (
            <div>Logging Out.....</div>
        )
    }
}

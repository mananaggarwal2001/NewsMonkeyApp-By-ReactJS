import React, { Component } from 'react'
import loading from './loading_spinner.gif'

export class spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={loading} alt="loading"  style={{width: '30px'}} />
            </div>
        )
    }
}

export default spinner
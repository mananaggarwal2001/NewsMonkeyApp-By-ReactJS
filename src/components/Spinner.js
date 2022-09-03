import React  from 'react'
import loading from './loading_spinner.gif'

const spinner = () => {

    return (
        <div className='text-center'>
            <img src={loading} alt="loading" style={{ width: '30px' }} />
        </div>
    )

}

export default spinner
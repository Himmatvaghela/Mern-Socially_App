import React from 'react'
import formCss from './form.module.css'
import Form from './Form';
function LoginPage() {
  return (
    <>
        <div className={formCss.heading}>
          <h1>Socially</h1>
        </div>
        <div className='workspace'>
        <div className={formCss.container}>
          <div className={formCss.box}>
            <h1>Welcome to Socially app, Make Strange Friends</h1>
            <Form/>
          </div>

        </div>

        </div>
    </>
  )
}

export default LoginPage;
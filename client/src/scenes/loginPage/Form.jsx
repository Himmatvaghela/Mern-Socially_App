
import React from 'react'
import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import formCss from './form.module.css'

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

function Form() {

  const [pageType,setPageType]=useState('login')
  const dispatch=useDispatch()
  const isLogin=pageType==='login';
  const isRegister=pageType==='register'
  const navigate=useNavigate();

  const register= async (values,onSubmitProps) => {
    
    //this allows us to send form info with image
    const formData=new FormData();
    for (let value in values){
      formData.append(value,values[value])
    }
    formData.append("picturePath",values.picture.name);

    const savedUserResponse= await fetch(
      '/auth/register',
      {
        method:'POST',
        body:formData
      }
    )
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm();

    if(savedUser){
      setPageType('login')
    }
  }

  const login = async(values,onSubmitProps)=>{
    const loggedInResponse= await fetch(
      '/auth/login',
      {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(values)
      }
    );
    const loggedIn= await loggedInResponse.json();
    onSubmitProps.resetForm();
    if(loggedIn){
      dispatch(
        setLogin(
          {
            user:loggedIn.user,
            token:loggedIn.token,
          }
        )
      )
      navigate('/home')
    }
  }

  const handleFormSubmit= async (values,onSubmitProps)=>{
    
    if(isLogin) await login(values,onSubmitProps)
    if(isRegister) await register(values,onSubmitProps)
  }

  return (
    <>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin?initialValuesLogin:initialValuesRegister}
      validationSchema={isLogin?loginSchema:registerSchema}
    >
      {(
        {values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,}
      )=>(
        <form onSubmit={handleSubmit}>
          <div className={formCss.form_box}>
          {isRegister && (
            <>
              <div className={formCss.input_box}>
                  <div className={formCss.error_input}>
                  <input 
                   type='text'
                   onBlur={handleBlur}
                   onChange={handleChange}
                   value={values.firstName}
                   name='firstName'
                   placeholder='First Name'
                   />
                   {touched.firstName && errors.firstName ?
                   <span className={formCss.errors}>{errors.firstName}</span>:null}

                  </div>
                  <div className={formCss.error_input}>
                  <input 
                   type='text'
                   onBlur={handleBlur}
                   onChange={handleChange}
                   value={values.lastName}
                   name='lastName'
                   placeholder='Last Name'
                   />
                   {touched.lastName && errors.lastName ?
                   <span className={formCss.errors}>{errors.lastName}</span>:null}
                  </div>
              </div>
              <input 
              type='text'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.location}
              name='location'
              placeholder='Location'
              />
              {touched.location && errors.location ?
              <span className={formCss.errors}>{errors.location}</span>:null}
              <input 
              type='text'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.occupation}
              name='occupation'
              placeholder='Occupation'
              />
              {touched.occupation && errors.occupation ?
              <span className={formCss.errors}>{errors.occupation}</span>:null}

              <div className={formCss.outer_image_box}>
                <Dropzone
                acceptedFiles="jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles)=>
                  setFieldValue("picture", acceptedFiles[0])
                }
                >
                  {({getRootProps,getInputProps})=>(
                    <div
                     className={formCss.inner_image_box}
                     {...getRootProps()}
                     >
                      <input {...getInputProps()}/>
                      {!values.picture?
                       (<p>Add Picture Here</p>)
                       : (
                        <div className={formCss.flex_picture_edit_icon}>
                        <span>{values.picture.name}</span> 
                        <EditOutlinedIcon/>
                        </div>
                        )}
                    </div>
                  )}
                </Dropzone>
              </div>
              </>
          )}
            <input 
            type='email'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name='email'
            placeholder='Email'
            />
            {touched.email && errors.email ?
            <span className={formCss.errors}>{errors.email}</span>:null}

            <input 
            type='password'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name='password'
            placeholder='Password'
            />
            {touched.password && errors.password ?
            <span className={formCss.errors}>{errors.password}</span>:null}

            <button type='submit' className={formCss.SubmitBtn}>{isLogin?"LOGIN":"REGISTER"}</button>
            <span 
             className={formCss.login_to_register}
             onClick={()=> {
              setPageType(isLogin?"register":'login')
              resetForm()
            }}
            >{isLogin?"Don't have an account? Sign Up here.":"Already have an account? Login here."}</span>
          </div>
        </form>
      )}
    </Formik>
    </>
  )
}

export default Form
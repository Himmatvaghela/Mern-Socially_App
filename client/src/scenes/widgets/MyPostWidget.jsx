
import React, { useState } from 'react'
import mypostwgtcss from './myPostWidget.module.css'
import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
  } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import Userimage from 'components/Userimage';
import Dropzone from 'react-dropzone';
import { setPosts } from 'state';

function MyPostWidget({picturePath}) {
    const [image,setImage]=useState(null);
    const [post,setPost]=useState("")
    const token = useSelector(state=>state.token)
    const { _id }=useSelector(state=>state.user)
    const dispatch= useDispatch()

    const handlePost = async () =>{
      const formData= new FormData();
      formData.append("userId",_id)
      formData.append('description',post)
      if(image){
        formData.append('picture',image)
        formData.append('picturePath',image.name)
      }

      const response= await fetch("/posts",{
        method:'POST',
        headers:{ Authorization : `Bearer ${token}`},
        body:formData
      })

      const posts= await response.json()
      dispatch(setPosts({ posts }))
      setImage(null)
      setPost('')
    }



  return (
    <>
        <div className={mypostwgtcss.container}>
            <div className={mypostwgtcss.row}>
                <Userimage image={picturePath}/>
                <input type='text' placeholder="what's in your mind..."
                  onChange={(e)=> setPost(e.target.value)}
                />
            </div>
            
                <div className={mypostwgtcss.outer_image_box}>
                <Dropzone
                acceptedFiles='image/*,video/*'
                multiple={false}
                onDrop={(acceptedFiles)=>
                  setImage(acceptedFiles[0])
                }
                >
                  {({getRootProps,getInputProps})=>(
                    <div
                     className={mypostwgtcss.inner_image_box}
                     {...getRootProps()}
                     >
                      <input {...getInputProps()}/>
                      {!image?
                       (<p>Add Image/Video Here...</p>)
                       : (
                        <div className={mypostwgtcss.flex_picture_edit_icon}>
                        <span>{image.name}</span> 
                        <EditOutlined style={{fontSize:'2rem'}}/>
                        </div>
                        )}
                        {image && (<DeleteOutlined 
                        onClick={(e)=> {setImage(null); e.stopPropagation()}} 
                        style={{fontSize:'2rem'}}
                        />)}
                    </div>
                  )}
                </Dropzone>
                </div>
            <div className={mypostwgtcss.row3}>
              <div
                className={mypostwgtcss.icon_text}>
              <ImageOutlined style={{color:"white",fontSize:'2rem'}} />
                <span>Image</span>
              </div>

              <div className={mypostwgtcss.icon_text}>
              <GifBoxOutlined style={{color:"white",fontSize:'2rem'}} />
                <span>Clip</span>
              </div>

              {window.innerWidth >=450 && (
                <>
                  <div className={mypostwgtcss.icon_text}>
                  <AttachFileOutlined style={{color:"white",fontSize:'2rem'}} />
                    <span>Attachment</span>
                  </div>

                  <div className={mypostwgtcss.icon_text}>
                  <MicOutlined style={{color:"white",fontSize:'2rem'}} />
                    <span>Audio</span>
                  </div>
                </>
              )}

              <button className={mypostwgtcss.btn}
               disabled={!post}
               onClick={handlePost}
              >Post</button>
            </div>
        </div>
    </>
  )
}

export default MyPostWidget
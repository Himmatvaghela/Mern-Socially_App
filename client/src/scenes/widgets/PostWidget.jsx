
import React, { useState } from 'react'
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
  } from "@mui/icons-material";
import Friends from 'components/Friends';
import postwgtcss from './postwidget.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';

function PostWidget({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) {

  const [isComment,setIsComment]=useState(false)
  const [addComment,setAddComment]=useState('')
  const token=useSelector(state=>state.token);
  const dispatch=useDispatch();
  const loggedInUserId=useSelector(state=> state.user._id);
  const isLiked=Boolean(likes[loggedInUserId]);
  const likeCount=Object.keys(likes).length

  const patchLike=async()=>{
    const response=await fetch(`/posts/${postId}/like`,{
      method:'PATCH',
      headers: {
        Authorization : `Bearer ${token}`,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({userId:loggedInUserId})
    })
    const data=await response.json();
    dispatch(setPost({post:data}))
  }

  const patchComment= async ()=>{
    const response= await fetch(`/posts/${postId}/comment`,{
      method:'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":'application/json'
      },
      body: JSON.stringify({comment:addComment})
    })
    const data = await response.json();
    dispatch(setPost({post:data}))
    setAddComment('')
  }

  const getFileType = (url) => {
    if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif')) {
      return 'image';
    } else if (url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.avi') || url.endsWith('.mkv') || url.endsWith('.mov') || url.endsWith('.wmv') || url.endsWith('.flv') || url.endsWith('.webm') || url.endsWith('.m4a')) {
      return 'video';
    } else {
      return 'unknown';
    }
  };

  return (
    <div className={postwgtcss.container}>
        <Friends 
            friendId={postUserId}
            name={name}
            location={location}
            picturePath={userPicturePath}
        />
        <span className={postwgtcss.discription}>{description}</span>
        <div className={postwgtcss.img_box}>
          {getFileType(picturePath)==='image'?(
          <img src={`/assets/${picturePath}`} alt='No Post'/>
          ):getFileType(picturePath)==='video'?(
            <video src={`/assets/${picturePath}`} controls></video>
          ):null}
        </div>
        <div className={postwgtcss.btn_row}>
          <div className={postwgtcss.btn} onClick={patchLike}>
          {isLiked ? (
                <FavoriteOutlined sx={{ color: 'aqua',fontSize:'2rem' }} />
              ) : (
                <FavoriteBorderOutlined sx={{ color: 'white',fontSize:'2rem' }} />
              )}
              <span>{likeCount}</span>
          </div>

          <div className={postwgtcss.btn}>
            <ChatBubbleOutlineOutlined onClick={()=>setIsComment(!isComment)} style={{ color:isComment?'aqua':'white',fontSize:'2rem'}}/>
            <span>{comments.length}</span>
          </div>
        </div>

        {isComment && (<div className={postwgtcss.comment_input_box}>
          <div className={postwgtcss.input_box}>
            <input type='text'
             placeholder='Add Comment'
              onChange={(e)=>setAddComment(e.target.value)}
              value={addComment}
             />
            <button className={postwgtcss.btn}
              onClick={patchComment}
            >Add</button>
          </div>
          <div className={postwgtcss.comment_box}>
            {comments.map((val,i)=>
              (<li key={i}>{val}</li>)
            )}
          </div>
        </div>)}
    </div>
  )
}

export default PostWidget
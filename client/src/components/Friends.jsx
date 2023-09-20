import React, { useEffect } from 'react'
import friednscss from './friends.module.css'
import Userimage from './Userimage';
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';
import { useNavigate } from 'react-router-dom';

function Friends({friendId,name,location,picturePath}) {
    const token = useSelector(state=> state.token)
    const dispatch= useDispatch()
    const {_id}= useSelector(state=> state.user)
    const navigate=useNavigate()
    const friends =useSelector(state=>state.user.friends)

    const patchFriends=async()=>{
        const response= await fetch(`/users/${_id}/${friendId}`,{
            method:'PATCH',
            headers:{
                Authorization : `Bearer ${token}`,
                "Content-Type":'application/json'
            },
        })
        const data = await response.json();
        dispatch(setFriends({friends:data}))
        console.log(friends)
    }

    const isFriend= friends.find((friend)=>{ return friend._id===friendId})
  return (
    <div className={friednscss.container}>
        <div className={friednscss.img_text}
            onClick={()=>{
                navigate(`/profile/${friendId}`);
                navigate(0);
            }}
        >
            <Userimage image={picturePath} size={"5.5rem"}/>
            <div className={friednscss.name_box}>
                <h1>{name}</h1>
                <span>{location}</span>
            </div>
        </div>
        <div className={friednscss.icon} onClick={()=>patchFriends()}>
            {isFriend ? (
            <PersonRemoveOutlined sx={{ color: "aqua",fontSize:'1.5rem' }} />
            ) : (
            <PersonAddOutlined sx={{ color: "aqua",fontSize:'1.5rem' }} />
            )}

        </div>
    </div>
  )
}

export default Friends;
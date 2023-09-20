import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import homeCss from '../homePage/home.module.css'
import Navbar from 'scenes/navbar';
import UserWidget from 'scenes/widgets/UserWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';

function ProfilePage() {
  const [user,setUser]=useState(null)
  const {userId}=useParams()
  const token = useSelector(state=> state.token);
  // const user= useSelector(state=>state.user);

  const getUser= async()=>{
    const response= await fetch(`/users/${userId}`,{
      method:'GET',
      headers:{Authorization : `Bearer ${token}`}
    })
    const data= await response.json();
    setUser(data)
  }

  const top=useRef()

  const scrollToTop=(elRef)=>{
    if (elRef.current) {
      const scrollOptions = {
        top: 0,
        behavior: 'smooth',
      };

      // For modern browsers
      if ('scrollBehavior' in document.documentElement.style) {
        elRef.current.scrollTo(scrollOptions);
      } else {
        // For browsers that don't support scroll behavior
        elRef.current.scrollTop = 0;
      }
    }
  }

  useEffect(()=>{
    getUser()
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  if(!user) return null;

  return (
    <div>
      <Navbar/>

      <div className="workspace">
        <div className={homeCss.workspace}>
          <div style={window.innerWidth<=800?{display:'none'}:null}  className={`${homeCss.box} ${homeCss.user_data}`}>
            <UserWidget userId={userId} picturePath={user.picturePath}/>
          </div>
          <div ref={top}  className={`${homeCss.box} ${homeCss.post_data}`}>
            {window.innerWidth <=800 && (<UserWidget userId={userId} picturePath={user.picturePath}/>)}
            <MyPostWidget picturePath={user.picturePath}/>
            <PostsWidget userId={userId} isProfile={true}/>
            <div className={homeCss.Icon_box} 
              onClick={()=>scrollToTop(top)}            
            >
              <ArrowUpwardOutlinedIcon style={{color:'aqua',fontSize:'3rem'}}/>
            </div>
          </div>
          <div style={window.innerWidth<=1200?{display:'none'}:null} className={`${homeCss.box} ${homeCss.friends_data}`}>
              <FriendListWidget userId={userId}/>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfilePage;
import React, { useRef } from 'react'
import Navbar from 'scenes/navbar';
import homeCss from './home.module.css'
import UserWidget from 'scenes/widgets/UserWidget';
import { useSelector } from 'react-redux';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';

function HomePage() {
  const {_id,picturePath}=useSelector(state=> state.user)
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

  return (
    <div>
      <Navbar/>
      <div className="workspace">
        <div className={homeCss.workspace}>
          <div style={window.innerWidth<=800?{display:'none'}:null}  className={`${homeCss.box} ${homeCss.user_data}`}>
            <UserWidget userId={_id} picturePath={picturePath}/>
          </div>
          <div ref={top}  className={`${homeCss.box} ${homeCss.post_data}`}>
            {window.innerWidth <=800 && (<UserWidget userId={_id} picturePath={picturePath}/>)}
            <MyPostWidget picturePath={picturePath}/>
            <PostsWidget userId={_id} isProfile={false}/>
            <div className={homeCss.Icon_box} 
              onClick={()=>scrollToTop(top)}            
            >
              <ArrowUpwardOutlinedIcon style={{color:'aqua',fontSize:'3rem'}}/>
            </div>
          </div>
          <div style={window.innerWidth<=1200?{display:'none'}:null} className={`${homeCss.box} ${homeCss.friends_data}`}>
              <FriendListWidget userId={_id}/>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import userWidgetCss from './userWidget.module.css'
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { useSelector } from 'react-redux';
import Userimage from 'components/Userimage';
import { useNavigate } from 'react-router-dom';

function UserWidget({userId,picturePath}) {

  const [user,setUser]=useState(null)
  const token=useSelector((state) => state.token)
  const navigate=useNavigate()

  const getUser = async ()=>{
    const response = await fetch(`/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data=await response.json()
    setUser(data)
  }

  useEffect(()=>{
    getUser()
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  if(!user){
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,}=user;

  return (
    <>
      <div className={userWidgetCss.container}>
        <div className={userWidgetCss.img_row}>
        <div className={userWidgetCss.img_name}>
          <Userimage image={picturePath}/>
          <div className={userWidgetCss.name_box}
          onClick={()=>{
                navigate(`/profile/${userId}`);
                navigate(0);
            }}
          >
            <h1>{firstName} {lastName}</h1>
            <span>{friends.length} Friends</span>
          </div>

        </div>
          <ManageAccountsOutlined style={{color:'white',fontSize:'3rem'}}/>
        </div>
        <div className={userWidgetCss.row}>
          <div className={userWidgetCss.icon_text}>
            <LocationOnOutlined style={{color:'white',fontSize:'3rem'}}/>
            <span>{location}</span>
          </div>
          <div className={userWidgetCss.icon_text}>
            <WorkOutlineOutlined style={{color:'white',fontSize:'3rem'}}/>
            <span>{occupation}</span>
          </div>
        </div>
        <div className={userWidgetCss.row}>
          <div className={userWidgetCss.text_box}>
            <span>Who's viewed your profile</span>
            <p>{viewedProfile}</p>
          </div>
          <div className={userWidgetCss.text_box}>
            <span>Impressions of your post</span>
            <p>{impressions}</p>
          </div>
        </div>
        <div className={userWidgetCss.row}>
          <h1 className={userWidgetCss.heading}>Social Profiles</h1>
          <div className={userWidgetCss.social_links_row}>
          <div className={userWidgetCss.icon_text}>
            <img src="../assets/twitter.png" alt="twitter" />
            <div className={userWidgetCss.text}>
              <h1>Twitter</h1>
              <span>Social Network</span>
            </div>
          </div>
            <EditOutlined style={{color:'white',fontSize:'2rem'}}/>
          </div>

          <div className={userWidgetCss.social_links_row}>
            <div className={userWidgetCss.icon_text}>
            <img src="../assets/linkedin.png" alt="linkedin" />
            <div className={userWidgetCss.text}>
              <h1>Linkdin</h1>
              <span>Social Network</span>
            </div>

            </div>
            <EditOutlined style={{color:'white',fontSize:'2rem'}}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserWidget
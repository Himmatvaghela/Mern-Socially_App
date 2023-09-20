import Friends from 'components/Friends'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFriends } from 'state';

function FriendListWidget({userId}) {
    const dispatch=useDispatch();
    const token = useSelector(state=>state.token);
    const friends=useSelector(state=>state.user.friends);
    

    const getFriends=async()=>{
        const response=await fetch(`/users/${userId}/friends`,{
            method:'GET',
            headers:{Authorization: `Bearer ${token}`},
        })

        const data= await response.json();
        dispatch(setFriends({friends:data}))
    }
    useEffect(()=>{
        getFriends()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{display:'flex',flexDirection:'column',color:'white',padding:'0 1.5rem',gridGap:'1.5rem',background:'#383737',height:'100%',overflowY:'scroll'}}>
        <span style={{position:'sticky',zIndex:'1',top:'0',background:'#383737',padding:'1.5rem 0',borderBottom:'1px solid'}}>{friends.length} Friends</span>
        {friends.map(({_id,firstName,lastName,location,picturePath})=>{
            return(
            <Friends 
                key={_id}
                friendId={_id}
                name={`${firstName} ${lastName}`}
                location={location}
                picturePath={picturePath}
            />
            )
        })}
    </div>
  )
}

export default FriendListWidget
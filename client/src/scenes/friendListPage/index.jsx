import React from 'react'
import { useSelector } from 'react-redux';
import FriendListWidget from 'scenes/widgets/FriendListWidget';

function FriendListPage() {
    const {_id} =useSelector(state=>state.user)
  return (
        <FriendListWidget userId={_id}/>
  )
}

export default FriendListPage;
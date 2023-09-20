
import React from 'react'

function Userimage({image,size="6rem"}) {
  return (
    <div style={{width:size,height:size}}>
        <img src={`/assets/${image}`} alt='No User Img' style={{objectFit:'cover',borderRadius:'50%',width:'100%',height:'100%'}}/>
    </div>
  )
}

export default Userimage;
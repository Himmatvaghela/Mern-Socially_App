import React, { useEffect } from 'react';
import postswgtcss from './postswidget.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostWidget from './PostWidget';

function PostsWidget({userId,isProfile=false}) {

    const posts=useSelector(state=> state.posts);
    const token =useSelector(state=>state.token);
    const dispatch= useDispatch()

    const getPosts=async()=>{
        const response= await fetch("/posts",{
            method:'GET',
            headers: {Authorization : `Bearer ${token}`}
        })
        const data =await response.json()

        const filterUserPost=data.filter((post)=>{
            return post.userId !==userId
        })

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
          }
          shuffleArray(filterUserPost)
        dispatch(setPosts({posts:filterUserPost}))
    }

    const getUserPosts= async() =>{
        const response = await fetch(`/posts/${userId}/posts`,{
            method:'GET',
            headers:{Authorization : `Bearer ${token}`}
        })
        const data = await response.json()
        dispatch(setPosts({posts:data}))
    }   

    useEffect(()=>{
        
        if(isProfile){
            getUserPosts()
        }else{
            getPosts()
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className={postswgtcss.container} style={{padding:'1.5rem 1.5rem 5rem 1.5rem',backgroundColor:'#383737',display:'flex',flexDirection:'column',gridGap:'3rem'}}>
        {posts.map(({
            _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments
        })=> (
            <PostWidget 
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
            />
        ))}
    </div>
  )
}

export default PostsWidget
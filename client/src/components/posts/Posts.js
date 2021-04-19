import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {getPosts } from '../../actions/post';
import Spinner from '../layout/spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';



const Posts = ({ getPosts,posts:{posts,loading} }) => {

    useEffect(() => {
        getPosts()
    },[getPosts])
    
    return loading ? <Spinner /> : <Fragment>
        <h1 class="large text-primary">Posts</h1>
        <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>
        <PostForm />
        <div className="posts" >
            {
                posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))
            }
        </div>
    </Fragment>
    
}

const mapStateToProps = state => ({
    posts:state.posts
})

export default connect(mapStateToProps,{getPosts})(Posts);
import React, { Fragment, useEffect, useState } from 'react';
import post from '../../reducers/post';
import Spinner from '../layout/spinner';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { Link } from 'react-router-dom';

const Post = ({ getPost, post: { post, loading }, match }) => {
    
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost])
    
    return loading || post == null ? <Spinner /> : <Fragment>
        <Link to='/posts' className="btn" >Back to Posts</Link>
        <PostItem post={post} showAction={false} />
        <CommentForm postId={post._id} />
        <div className="comments" >
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>
    </Fragment>

}

const mapStateToProps = state => ({
    post:state.posts
})

export default connect(mapStateToProps,{getPost})(Post);
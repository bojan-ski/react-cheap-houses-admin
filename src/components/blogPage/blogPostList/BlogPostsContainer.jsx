import React from 'react'
// components
import BlogPostsCard from './BlogPostsCard'


const BlogPostsContainer = ({ blogPosts }) => {
  return (
    <div className='blog-posts-list'>
      <div className="row">
        {blogPosts.map(blogPost => <BlogPostsCard key={blogPost.newBlogPostTitle} blogPost={blogPost} />)}
      </div>

    </div>
  )
}

export default BlogPostsContainer
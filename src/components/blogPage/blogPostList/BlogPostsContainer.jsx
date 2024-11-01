import React from 'react'
import { useLoaderData } from 'react-router-dom'
// components
import BlogPostsCard from './BlogPostsCard'


const BlogPostsContainer = () => {
  const allBlogPosts = useLoaderData()

  return (
    <div className='blog-posts-list'>

      <div className="row">
        {allBlogPosts.map(blogPost => <BlogPostsCard key={blogPost.newBlogPostTitle} blogPost={blogPost} />)}
      </div>

    </div>
  )
}

export default BlogPostsContainer
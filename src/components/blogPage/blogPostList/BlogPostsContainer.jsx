import React from 'react'
// components
import BlogPostsCard from './BlogPostsCard'


const BlogPostsContainer = ({ blogPosts }) => {
  return (
    <section className='blog-posts-list'>
      <div className="row">
        {blogPosts.map(blogPost => <BlogPostsCard key={blogPost.blogPostID} blogPost={blogPost} />)}
      </div>
    </section>
  )
}

export default BlogPostsContainer
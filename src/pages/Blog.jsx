import React from 'react'
// context
import { useGlobalContext } from "../context"
// components
import PageHeader from "../components/PageHeader"
import BlogPageSelectOptions from "../components/blogPage/BlogPageSelectOptions"
import BlogPostsList from "../components/blogPage/blogPostList/BlogPostsList"
import NewBlogPost from "../components/blogPage/newBlogPost/NewBlogPost"


const Blog = () => {
  const { selectedContent } = useGlobalContext()

  return (
    <div className="blog-page mt-5">

      <PageHeader title='Blog' />

      <BlogPageSelectOptions />

      <>
        {selectedContent == 'blogs' && <BlogPostsList />}

        {selectedContent == 'new-blog-post' && <NewBlogPost />}
      </>
    </div>
  )
}

export default Blog
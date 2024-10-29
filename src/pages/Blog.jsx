import { useState } from "react"
// components
import PageHeader from "../components/PageHeader"
import BlogPageSelectOptions from "../components/blogPage/BlogPageSelectOptions"
import BlogPostsContainer from "../components/blogPage/BlogPostsContainer"
import PostNewBlogPost from "../components/blogPage/PostNewBlogPost"


const Blog = () => {
  const [selectedContent, setSelectedContent] = useState('blogs')

  return (
    <div className="blog-page mt-5">
      <div className="container">

        <PageHeader title='Blog' />

        <BlogPageSelectOptions selectedContent={selectedContent} setSelectedContent={setSelectedContent} />

        <>
          {selectedContent == 'blogs' && <BlogPostsContainer />}

          {selectedContent == 'new-blog-post' && <PostNewBlogPost />}
        </>
      </div>
    </div>
  )
}

export default Blog
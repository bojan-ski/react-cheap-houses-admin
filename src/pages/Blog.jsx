import { useState } from "react"
// components
import PageHeader from "../components/PageHeader"
import BlogPageSelectOptions from "../components/blogPage/BlogPageSelectOptions"
import BlogPostsContainer from "../components/blogPage/blogPostList/BlogPostsContainer"
import NewBlogPost from "../components/blogPage/newBlogPost/NewBlogPost"


const Blog = () => {
  const [selectedContent, setSelectedContent] = useState('blogs')

  return (
    <div className="blog-page mt-5">

        <PageHeader title='Blog' />

        <BlogPageSelectOptions selectedContent={selectedContent} setSelectedContent={setSelectedContent} />

        <>
          {selectedContent == 'blogs' && <BlogPostsContainer />}

          {selectedContent == 'new-blog-post' && <NewBlogPost />}
        </>
    </div>
  )
}

export default Blog
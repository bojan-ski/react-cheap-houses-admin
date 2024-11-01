import { useState } from "react"
// api
import fetchAllBlogPostsFromFirebase from "../api/fetchAllBlogPostsFromFirebase"
// context
import { useGlobalContext } from "../context"
// components
import PageHeader from "../components/PageHeader"
import BlogPageSelectOptions from "../components/blogPage/BlogPageSelectOptions"
import BlogPostsList from "../components/blogPage/blogPostList/BlogPostsList"
import NewBlogPost from "../components/blogPage/newBlogPost/NewBlogPost"


// LOADER
export const loader = async () => {
  const allBlogPosts = await fetchAllBlogPostsFromFirebase()

  return allBlogPosts
}


const Blog = () => {
  // const [selectedContent, setSelectedContent] = useState('blogs')
  const { selectedContent } = useGlobalContext()

  return (
    <div className="blog-page mt-5">

      <PageHeader title='Blog' />

      <BlogPageSelectOptions />
      {/* <BlogPageSelectOptions selectedContent={selectedContent} setSelectedContent={setSelectedContent} /> */}

      <>
        {selectedContent == 'blogs' && <BlogPostsList />}

        {selectedContent == 'new-blog-post' && <NewBlogPost />}
      </>
    </div>
  )
}

export default Blog
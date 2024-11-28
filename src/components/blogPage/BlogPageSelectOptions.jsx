import React from 'react'
// context
import { useGlobalContext } from "../../context"


const BlogPageSelectOptions = () => {
    const { selectedContent, setSelectedContent } = useGlobalContext()
    
    return (
        <section className="blog-page-options">
            <div className="container border-bottom pb-4 mb-5">
                <button className={`btn px-3 me-3 ${selectedContent == 'blogs' && 'selected-blog-page-options'}`} onClick={() => setSelectedContent('blogs')}>
                    Blog
                </button>

                <button className={`btn px-3 me-3 ${selectedContent == 'new-blog-post' && 'selected-blog-page-options'}`} onClick={() => setSelectedContent('new-blog-post')}>
                    Objavi novi post
                </button>
            </div>
        </section>
    )
}

export default BlogPageSelectOptions
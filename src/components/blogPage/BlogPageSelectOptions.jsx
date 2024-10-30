const BlogPageSelectOptions = ({ selectedContent, setSelectedContent }) => {
    return (
        <div className="container">
            <section className="blog-page-options border-bottom pb-4 mb-4">
                <button className={`btn px-3 me-3 ${selectedContent == 'blogs' && 'selected-blog-page-options'}`} onClick={() => setSelectedContent('blogs')}>
                    Blog
                </button>

                <button className={`btn px-3 me-3 ${selectedContent == 'new-blog-post' && 'selected-blog-page-options'}`} onClick={() => setSelectedContent('new-blog-post')}>
                    Objavi novi post
                </button>
            </section>
        </div>
    )
}

export default BlogPageSelectOptions
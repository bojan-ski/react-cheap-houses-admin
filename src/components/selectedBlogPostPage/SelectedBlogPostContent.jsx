import React from 'react'


const SelectedBlogPostContent = ({ selectedBlogPost }) => {
    return (
        <section className='selected-blog-post-content rounded-4 bg-white p-4'>
            <div className="d-flex align-center justify-content-between mb-3">
                <h2 className='fw-bold'>
                    {selectedBlogPost.newBlogPostTitle}
                </h2>

                <p className="fw-bold mb-0">
                    {selectedBlogPost.newBlogPostCreated}
                </p>
            </div>

            <div className="row mb-3">
                {/* CONTENT ONE */}
                {selectedBlogPost.newBlogPostImgOneUrl ? (
                    <div className="row">
                        {/* blog post - content 1 */}
                        <div className="col-12 col-xl-6">
                            <p className="mb-3">
                                {selectedBlogPost.newBlogPostContentOne}
                            </p>
                        </div>

                        {/* new blog post - img 2 */}
                        <div className="col-12 col-xl-6 text-center">
                            <img src={selectedBlogPost.newBlogPostImgOneUrl} alt="blog-post-img" className='img-fluid rounded-4' style={{ objectFit: 'cover', height: '580px' }} />
                        </div>
                    </div>
                ) : (
                    <>
                        {/* blog post - content 1 */}
                        <div className="col-12">
                            <p className="mb-0">
                                {selectedBlogPost.newBlogPostContentOne}
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* CONTENT TWO */}
            {(selectedBlogPost.newBlogPostImgTwoUrl || selectedBlogPost.newBlogPostContentTwo) && (
                <div className='row'>
                    {(selectedBlogPost.newBlogPostContentTwo && !selectedBlogPost.newBlogPostImgTwoUrl) && (
                        <>
                            {/* blog post - content 2 */}
                            <div className="col-12">
                                <p className="mb-0">
                                    {selectedBlogPost.newBlogPostContentTwo}
                                </p>
                            </div>
                        </>
                    )}

                    {(selectedBlogPost.newBlogPostImgTwoUrl && !selectedBlogPost.newBlogPostContentTwo) && (
                        <>
                            {/* blog post - img 2 */}
                            <div className="col-12 text-center">
                                <img src={selectedBlogPost.newBlogPostImgTwoUrl} alt="blog-post-img" className="img-fluid rounded-4" style={{ objectFit: 'cover', height: '580px' }} />
                            </div>
                        </>
                    )}

                    {(selectedBlogPost.newBlogPostImgTwoUrl && selectedBlogPost.newBlogPostContentTwo) && (
                        <div className='row'>
                            {/* blog post - img 2 */}
                            <div className="col-12 col-xl-6 order-2 order-xl-1 text-center">
                                <img src={selectedBlogPost.newBlogPostImgTwoUrl} alt="blog-post-img" className="img-fluid rounded-4" style={{ objectFit: 'cover', height: '580px' }} />
                            </div>

                            {/* new blog post - content 2 */}
                            <div className="col-12 col-xl-6 order-1 order-xl-2">
                                <p className="">
                                    {selectedBlogPost.newBlogPostContentTwo}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default SelectedBlogPostContent
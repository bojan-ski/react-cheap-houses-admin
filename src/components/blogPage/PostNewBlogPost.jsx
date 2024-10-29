import { useState } from "react"
import NewBlogPostCustomization from "./NewBlogPostCustomization"
import NewBlogPostForm from "./NewBlogPostForm";


const PostNewBlogPost = () => {
    const [customEntry, setCustomEntry] = useState({
        imageOne: false,
        postContentTwo: false,
        imageTwo: false,
        promoOne: false,
        promoTwo: false,
    })

    return (
        <section className="new-blog-post mb-5">
            <NewBlogPostCustomization setCustomEntry={setCustomEntry}/>

            <NewBlogPostForm customEntry={customEntry}/>
        </section>
    )
}

export default PostNewBlogPost
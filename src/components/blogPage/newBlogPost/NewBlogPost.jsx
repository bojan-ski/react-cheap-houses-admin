import React, { useState } from "react"
// components
import NewBlogPostCustomization from "./NewBlogPostCustomization"
import NewBlogPostContainer from "./NewBlogPostContainer"


const NewBlogPost = () => {
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

            <NewBlogPostContainer customEntry={customEntry}/>
        </section>
    )
}

export default NewBlogPost
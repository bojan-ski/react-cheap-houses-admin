import React from 'react'


const NewsletterSubscriberDetails = ({ subscriber }) => {
    return (
        <tr>
            <td>
                {subscriber?.docData?.email}
            </td>
            <td>
                {subscriber?.docData?.userSubscribed}
            </td>
        </tr>
    )
}

export default NewsletterSubscriberDetails
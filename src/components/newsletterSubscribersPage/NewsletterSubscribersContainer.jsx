import React from 'react'
// components
import NewsletterSubscriberDetails from './NewsletterSubscriberDetails';


const NewsletterSubscribersContainer = ({ allNewsletterSubscribers }) => {    
    return (
        <section className='newsletter-subscribers-list mb-3 table-responsive-lg'>
            <table className="table table-bordered table-hover align-middle">
                <thead>
                    <tr>
                        <th scope="col">Elektronska pošta</th>
                        <th scope="col">Dan prijave</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    {allNewsletterSubscribers?.map(subscriber => <NewsletterSubscriberDetails key={subscriber.docId} subscriber={subscriber}/>)}
                </tbody>
            </table>
        </section>
    )
}

export default NewsletterSubscribersContainer
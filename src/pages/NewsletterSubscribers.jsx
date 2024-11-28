import React, { useEffect } from 'react'
// context
import { useGlobalContext } from '../context'
// components
import PageHeader from '../components/PageHeader'
import NoDataAvailableMessage from '../components/NoDataAvailableMessage'
import NewsletterSubscribersContainer from '../components/newsletterSubscribersPage/NewsletterSubscribersContainer'
import Pagination from '../components/Pagination'
import DownloadSubscribersData from '../components/newsletterSubscribersPage/DownloadSubscribersData'


const NewsletterSubscribers = () => {
    const { allNewsletterSubscribers, fetchAllNewsletterSubscribers, curSubscribersPage, isNewsletterSubscribersLoading } = useGlobalContext()

    // Fetch the first page on mount
    useEffect(() => {
        if (allNewsletterSubscribers.length == 0) fetchAllNewsletterSubscribers();
    }, [])

    return (
        <div className="newsletter-subscribers-page mt-5">

            <PageHeader title='Pretplatnici na bliten' />

            <div className="container">

                {!allNewsletterSubscribers || allNewsletterSubscribers == 0 ? (
                    <NoDataAvailableMessage text='pretplatnika' />
                ) : (
                    <>
                        <DownloadSubscribersData />

                        <NewsletterSubscribersContainer allNewsletterSubscribers={allNewsletterSubscribers} />

                        <Pagination fetchData={fetchAllNewsletterSubscribers} page={curSubscribersPage} isLoading={isNewsletterSubscribersLoading} />
                    </>
                )}
            </div>
        </div>
    )
}

export default NewsletterSubscribers
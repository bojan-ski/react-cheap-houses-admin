import React from 'react'
// api
import fetchAllNewsletterSubscribers from '../../api/fetchAllNewsletterSubscribers'


const DownloadSubscribersData = () => {
    const handleDownloadSubscribersData = async () => {
        const allSubscribers = await fetchAllNewsletterSubscribers()

        const csvRows = [];

        csvRows.push("Email,Dan prijave");

        allSubscribers.forEach((subscriber) => {
            const email = subscriber.docData.email;
            const userSubscribed = subscriber.docData.userSubscribed;

            csvRows.push(`"${email}","${userSubscribed}"`);
        });

        const csvContent = csvRows.join("\n");

        // Create a Blob from the CSV content
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        // Create a link element to download the file
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data.csv";
        link.click();

        // Clean up the URL object
        URL.revokeObjectURL(link.href);
    }

    return (
        <button className='btn bg-orange-hover text-white fw-bold px-4 mb-3' onClick={handleDownloadSubscribersData}>
            Preuzmi
        </button>
    )
}

export default DownloadSubscribersData
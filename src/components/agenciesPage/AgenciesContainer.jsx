import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';

const data = [
    {
        agencyID: 1,
        agencyName: "agencija 1",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 2,
        agencyName: "agencija 2",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 3,
        agencyName: "agencija 3",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 4,
        agencyName: "agencija 4",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 5,
        agencyName: "agencija 5",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 6,
        agencyName: "agencija 6",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 7,
        agencyName: "agencija 7",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 8,
        agencyName: "agencija 8",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 9,
        agencyName: "agencija 9",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 10,
        agencyName: "agencija 10",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 11,
        agencyName: "agencija 11",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
    {
        agencyID: 12,
        agencyName: "agencija 12",
        agencyLogo: '',
        agencyDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati voluptate adipisci ipsum sequi perspiciatis reprehenderit cupiditate, quos praesentium, magnam non mollitia delectus, est quis.'
    },
]


const AgenciesContainer = () => {
    const allAgencies = useLoaderData()
    const [selectedAgency, setSelectedAgency] = useState('')
    const [selectedAgencyData, setSelectedAgencyData] = useState({})

    const handleSelectedAgency = (agency) => {
        setSelectedAgency(agency.agencyID)
        setSelectedAgencyData(agency)
    }

    console.log(selectedAgency);
    console.log(selectedAgencyData);

    return (
        <div className='row'>
            {/* row item 1 */}
            <section className="col-12 col-md-6 mb-3">
                <div className='agency-box-data text-center bg-white rounded-5 py-3 px-2'>
                    {/* {allAgencies.map(agency => { */}
                    {data.map(agency => {
                        // console.log(agency);

                        return <button
                            key={agency.agencyID}
                            className='btn btn-primary me-2 my-1'
                            onClick={() => handleSelectedAgency(agency)}
                        >
                            {agency.agencyName}
                        </button>
                    })}
                </div>
            </section>

            {/* row item 2 */}
            <section className="col-12 col-md-6 mb-3">
                <div className='agency-box-data bg-white rounded-5 p-3 row'>
                    <div className="col-12 col-md-6">
                        <img src={selectedAgencyData.agencyLogo} alt="agency-logo" />
                        <h6 className='capitalize'>
                            {selectedAgencyData.agencyName}
                        </h6>
                    </div>
                    <div className="col-12 col-md-6">
                        <p className='mb-0'>
                            {selectedAgencyData.agencyDescription}
                        </p>
                    </div>
                </div>
            </section>

            {/* row item 3 */}
            <section className="col-12">
                <div className='agency-box-data bg-white rounded-5 p-3'>

                </div>
            </section>
        </div>
    )
}

export default AgenciesContainer
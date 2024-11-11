import React from 'react'
// components
import AllUsersContainerCard from './AllUsersContainerCard';


const AllUsersContainer = ({ allUsersList }) => {
    return (
        <section className='users-list mb-3 table-responsive-lg'>
            <table className="table table-bordered table-hover align-middle">
                <thead>
                    <tr>
                        <th scope="col">ID korisnika</th>
                        <th scope="col">Korisničko ime</th>
                        <th scope="col">Elektronska pošta</th>
                        <th scope="col">Tip naloga</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    {allUsersList?.map(appUser => <AllUsersContainerCard key={appUser.userID} appUserData={appUser} />)}
                </tbody>
            </table>
        </section>
    )
}

export default AllUsersContainer
import React, { useEffect } from 'react'
// context
import { useGlobalContext } from '../context';
// components
import PageHeader from '../components/PageHeader';
import NoDataAvailableMessage from '../components/NoDataAvailableMessage';
import AllUsersContainer from '../components/usersPage/AllUsersContainer';
import Pagination from '../components/Pagination';


const Users = () => {
  const { allUsersList, fetchAllUsers, curUsersPage } = useGlobalContext()

  // Fetch the first page on mount
  useEffect(() => {
    console.log('Users - useEffect');

    if (allUsersList.length == 0) {
      fetchAllUsers();
    }
  }, [])

  return (
    <div className="users-page mt-5">

      <PageHeader title='Korisnici' />

      <div className="container">
        {!allUsersList || allUsersList == 0 ? (
          <NoDataAvailableMessage text='korisnika portal-a "JEFTINE KUĆE"' />
        ) : (
          <>
            <AllUsersContainer allUsersList={allUsersList} />

            <Pagination fetchData={fetchAllUsers} page={curUsersPage} />
          </>
        )}
      </div>
    </div>
  )
}

export default Users
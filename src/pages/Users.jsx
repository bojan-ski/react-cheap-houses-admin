import React, { useEffect } from 'react'
// context
import { useGlobalContext } from '../context';
// components
import PageHeader from '../components/PageHeader';
import NoDataAvailableMessage from '../components/NoDataAvailableMessage';
import AllUsersContainer from '../components/usersPage/AllUsersContainer';
import Pagination from '../components/Pagination';
import SearchOption from '../components/SearchOption';


const Users = () => {
  const { userSearchTerm, setUserSearchTerm, userDisableSearch, setUserDisableSearch, allUsersList, fetchAllUsers, curUsersPage, isAllUsersLoading } = useGlobalContext()

  // Fetch the first page on mount
  useEffect(() => {
    if (allUsersList.length == 0 && userSearchTerm == '') fetchAllUsers();
  }, [])

  return (
    <div className="users-page mt-5">

      <PageHeader title='Korisnici' />

      <div className="container">

        <SearchOption
          searchTerm={userSearchTerm}
          setSearchTerm={setUserSearchTerm}
          disableOption={userDisableSearch}
          setDisableOption={setUserDisableSearch}
          fetchSearchResults={fetchAllUsers}
          placeholderText='korisnika'
        />

        {!allUsersList || allUsersList == 0 ? (
          <NoDataAvailableMessage text='korisnika portal-a "JEFTINE KUĆE"' />
        ) : (
          <>
            <AllUsersContainer allUsersList={allUsersList} />

            <Pagination fetchData={fetchAllUsers} page={curUsersPage} queryParam={userSearchTerm} isLoading={isAllUsersLoading} />
          </>
        )}
      </div>
    </div>
  )
}

export default Users
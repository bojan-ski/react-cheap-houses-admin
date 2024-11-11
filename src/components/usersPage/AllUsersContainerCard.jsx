import React from 'react'
import { Link } from 'react-router-dom'


const AllUsersContainerCard = ({ appUserData }) => {
    const { username, email, accountType } = appUserData.userData

    return (
        <tr>
            <td>
                {appUserData.userID}
            </td>
            <td className="capitalize">
                {username}
            </td>
            <td>
                {email}
            </td>
            <td className="capitalize">
                {accountType}
            </td>
            <td className="text-center">
                <Link to={`/korisnici/${appUserData.userID}`} className="btn btn-success">
                    Detalji
                </Link>
            </td>
        </tr>
    )
}

export default AllUsersContainerCard
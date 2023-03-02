import React from 'react'

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <>
            <tr>
                <td>{contact.fullName}</td>
                <td>{contact.address}</td>
                <td>{contact.phoneNumber}</td>
                <td>{contact.email}</td>
                <td>
                    <button
                        type="button"
                        onClick={(event) => handleEditClick(event, contact)}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDeleteClick(contact.id)}
                        type="button"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    )
}

export default ReadOnlyRow

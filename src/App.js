import data from './mock-data.json'
import './App.css'
import { useState } from 'react'
import { nanoid } from 'nanoid'
import ReadOnlyRow from './components/ReadOnlyRow'
import EditTableRow from './components/EditTableRow'

function App() {
    const [contacts, setContacts] = useState(data)
    const [addFormData, setAddFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        email: '',
    })
    const [editFormData, setEditFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        email: '',
    })

    const [editContactID, setEditContactID] = useState(null)

    const handleAddFormChange = (event) => {
        event.preventDefault()

        const fieldName = event.target.getAttribute('name')
        const fieldValue = event.target.value

        const newFormData = { ...addFormData }
        newFormData[fieldName] = fieldValue

        setAddFormData(newFormData)
    }

    const handleEditFormChange = (event) => {
        event.preventDefault()

        const fieldName = event.target.getAttribute('name')
        const fieldValue = event.target.value

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue

        setEditFormData(newFormData)
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault()

        const newContact = {
            id: nanoid(),
            fullName: addFormData.fullName,
            address: addFormData.address,
            phoneNumber: addFormData.phoneNumber,
            email: addFormData.email,
        }

        const newContacts = [...contacts, newContact]
        setContacts(newContacts)
    }

    const handleEditClick = (event, contact) => {
        event.preventDefault()
        setEditContactID(contact.id)

        const formValues = {
            fullName: contact.fullName,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
        }

        setEditFormData(formValues)
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault()

        const editedContact = {
            id: editContactID,
            fullName: editFormData.fullName,
            address: editFormData.address,
            phoneNumber: editFormData.phoneNumber,
            email: editFormData.email,
        }

        const newContacts = [...contacts]

        const index = contacts.findIndex(
            (contact) => contact.id === editContactID
        )

        newContacts[index] = editedContact

        setContacts(newContacts)
        setEditContactID(null)
    }

    const handleCancleClick = () => {
        setEditContactID(null)
    }

    const handleDeleteClick = (editContactID) => {
        const newContacts = [...contacts]

        const index = contacts.findIndex(
            (contact) => contact.id === editContactID
        )

        newContacts.splice(index, 1)

        setContacts(newContacts)
    }

    return (
        <div className="app-container">
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Addres</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <>
                                {editContactID === contact.id ? (
                                    <EditTableRow
                                        editFormData={editFormData}
                                        handleEditFormChange={
                                            handleEditFormChange
                                        }
                                        handleCancleClick={handleCancleClick}
                                    />
                                ) : (
                                    <ReadOnlyRow
                                        contact={contact}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </form>

            <h2>Add a contact </h2>
            <form onSubmit={handleAddFormSubmit}>
                <input
                    type="text"
                    name="fullName"
                    required="required"
                    placeholder="Enter a name..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="address"
                    required="required"
                    placeholder="Enter a address..."
                    onChange={handleAddFormChange}
                />

                <input
                    type="text"
                    name="phoneNumber"
                    required="required"
                    placeholder="Enter a phone number..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="email"
                    name="email"
                    required="required"
                    placeholder="Enter a phone email..."
                    onChange={handleAddFormChange}
                />
                <button>Add</button>
            </form>
        </div>
    )
}

export default App

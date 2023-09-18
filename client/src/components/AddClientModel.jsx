import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { ADD_CLIENT } from './mutaions/clientMutations'
import { GET_CLIENTS } from './queries/clientQueries'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddClientModel() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    // const notify = () => toast("Wow so easy !");

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS })

            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }
            })
        }
    })
    const onsubmit = (e) => {
        e.preventDefault()

        if (name === '' || email === '' || phone === '') {
            return toast('Please fill in all fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                type: 'warning',
                progress: undefined,
                theme: "light",
            });
        }

        addClient(name, email, phone).then((res) => {
            return toast("Client Added SussesFully :)", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                type: 'success',
                progress: undefined,
                theme: "light",
            })
        })

        setEmail('')
        setName('')
        setPhone('')
    }
    return (
        <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModel">
                <div className="d-flex align-item-center">
                    <FaUser className='icon' />
                    <div>Add Client</div>
                </div>
            </button>
            <ToastContainer/>

            <div className="modal fade" id="addClientModel" aria-labelledby="addClientModelLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="addClientModelLabel">Add Client</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={onsubmit}>
                                <div className="mb-3">
                                    <label className='form-label'>Name</label>
                                    <input type="text" className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Email</label>
                                    <input type="email" className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Phone</label>
                                    <input type="text" className='form-control' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <button className="btn btn-secondary" type='submit' data-bs-dismiss="modal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

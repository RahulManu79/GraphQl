import { useMutation } from "@apollo/client"
import {FaTrash} from "react-icons/fa"
import { DELETE_CLIENT } from "./mutaions/clientMutations"
import { GET_CLIENTS } from "./queries/clientQueries"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export default function ClientRow({client}) {
  const [deleteClient] = useMutation(DELETE_CLIENT,{
    variables: {id:client.id},
    update(cache, { data: { deleteClient }}) {
      const {clients} = cache.readQuery({query:GET_CLIENTS});
      cache.writeQuery({
        query : GET_CLIENTS ,
        data:{ clients:[...clients].filter((c)=> c.id !== client.id)}
      })

      toast.success("Client deleted succesfully")
      
    }
  })

  return (
  
    <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
            <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                  <FaTrash/>
            </button>
        </td>
      <ToastContainer/>
    </tr>
  )
}

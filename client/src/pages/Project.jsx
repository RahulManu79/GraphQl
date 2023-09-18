
import { Link,useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "../components/queries/projectQueries"
import ClientInfo from "../components/ClientInfo"
import EditProjectForm from "../components/EditProjectForm"
import DeleteProjectButton from "../components/DeleteProjectButton"


export default function Project() {
    const {id} = useParams()
    const{loading,error,data}=  useQuery(GET_PROJECT,{variables:{id}})
    console.log("🚀 ~ file: Project.jsx:14 ~ Project ~ data:", data)

    if (loading) return <Spinner/>
    if (error) return <p>Somthing Went Wrong!!</p>
  return (
  <>
          {!loading && !error && (
              <div className="mx-auto w-75 card p-5"
              >
                <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>
                <h1>{data.project.name}</h1>

                  <p>{data.project.description}</p>

                  <h5 className='mt-3'>Project Status</h5>
                  <p className='lead'>{data.project.status}</p>


                  {data.project.client ? <ClientInfo client={data.project?.client} /> : <p>No Clients Assigend till Now</p> }
                  

                  <EditProjectForm project={data.project} />

                  <DeleteProjectButton projectId={data.project.id} />
                
              </div>
          )}
  </>
  )
}

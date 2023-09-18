import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from './mutaions/ProjectMutation';
import { GET_PROJECTS } from './queries/projectQueries';
import { useMutation } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function DeleteProjectButton({ projectId }) {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => {
            toast.success("Project deleted Succesfully")
            navigate('/')
        },
        refetchQueries: [{ query: GET_PROJECTS }],
    });

    return (
        <div className='d-flex mt-5 ms-auto'>
            <ToastContainer/>
            <button className='btn btn-danger m-2' onClick={deleteProject}>
                <FaTrash className='icon' /> Delete Project
            </button>
        </div>
    );
}
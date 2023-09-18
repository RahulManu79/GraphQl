import Projects from "../components/Projects";
import AddClientModel from "../components/AddClientModel";
import Clients from "../components/Clients";
import AddProjectModal from "../components/AddProjectModal";

export default function Home() {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddClientModel />
                <AddProjectModal />

            </div>
            <Projects />
            <hr />
            <Clients />
        </>
    )
}

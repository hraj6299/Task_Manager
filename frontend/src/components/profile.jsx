
import "../page.css"
import { useState, useContext, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastContext from "../context/ToastContext";
import ChnageImagePrompt from "./ChangeImagePrompt";

const API = "http://localhost:5000";

const Profile = () => {
    const { toast } = useContext(ToastContext)
    const [data, setData] = useState({})
    const [tasks, setTasks] = useState([])
    const [updatePrompt, setUpdatePrompt] = useState(false)
    const [tasksCount, setTasksCount] = useState({
        pending: 0,
        completed: 0,
        total: 0
    })
    const navigate = useNavigate()
    const APICALL = async () => {
        await axios.get(API + "/user", { headers: { "authorization": localStorage.getItem('token') } })
            .then((res) => {
                setData(res.data.user)
                // localStorage.setItem('image',res.data.user.image)
                // console.log(res)
            })
            .catch((e) => {
                // console.log(e.message)
                toast.error(e.response.message)
            })
    }
    const getTasksCount = () => {
        const completedTask = tasks.filter((task) => task.status === "Completed")
        const newTasksCount = {
            pending: tasks.length - completedTask.length,
            completed: completedTask.length,
            total: tasks.length
        };
        setTasksCount(newTasksCount);
    }
    useEffect(() => {
        getTasksCount();
    }, [tasks])


    const TaskAPI = async () => {
        await axios.get(API + "/tasks", { headers: { "authorization": localStorage.getItem('token') } })
            .then((res) => {
                setTasks(res.data.tasks)
                console.log(res)
            })
            .catch((e) => {
                // console.log(e.message)
                toast.error(e.response.message)
            })
    }
    const handleEdit = () => {
        setUpdatePrompt(true)
    }
    const closePrompt = () => { // function for passing as a prop to close the prompt
        APICALL()
        setUpdatePrompt(false)
    }


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
        APICALL()
        TaskAPI()
    }, [])
    return (
        <section className="mt-4 mb-5">
            <div className="container bootstrap snippets bootdey" style={{marginBottom: "100px"}}>
                <div className="row">
                    <div className="profile-nav col-md-3">
                        <div className="panel">
                            <div className="user-heading round container">
                                <span className="figure">
                                    <img src={data.image} alt="profilePic" />
                                    <div className="data-container">
                                        <div className="name" onClick={handleEdit}>Edit</div>
                                    </div>
                                </span>
                                <h1 className="mt-3" style={{ marginTop: "5px" }}>{data.firstName} {data.lastName}</h1>
                                <p style={{ color: "white" }}>{data.occupation}</p>
                                <button type="button" className="btn mt-5 mb-5 px-4 text-white" style={{backgroundColor:"rgba(255,255,255,0.3)"}} onClick={() => navigate("/tasks")}>Go to tasks <i class="fas fa-external-link fa-sm text-white ml-2"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="prompt">
                        {updatePrompt && <ChnageImagePrompt closePrompt={closePrompt} />}
                    </div>
                    <div className="profile-info col-md-9">
                        <div className="panel">
                            <div className="panel-body bio-graph-heading" style={{ color: "white" }}>
                                <h1>My Dashboard</h1>
                                <div className="row mt-3">
                                    <div className="bio-row" style={{ color: "white" }}>
                                        <p><span>First Name </span>: {data.firstName}</p>
                                    </div>
                                    <div className="bio-row">
                                        <p><span>Last Name </span>: {data.lastName}</p>
                                    </div>
                                    <div className="bio-row">
                                        <p><span>Country </span>: {data.country}</p>
                                    </div>
                                    <div className="bio-row">
                                        <p><span>Occupation </span>: {data.occupation}</p>
                                    </div>
                                    <div className="bio-row">
                                        <p><span>Email </span>: {data.email}</p>
                                    </div>
                                    <div className="bio-row">
                                        <p><span>Mobile </span>: {data.phone}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="container body-ro">
                            <div className="row ml-5 pl-3 pt-4" >
                                <div className="col-sm">
                                    <h3 className="terques">Total Tasks</h3>
                                    <div style={{ display: "inline", width: "100px", height: "100px" }}><canvas width="100" height="100px"></canvas><input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value={tasksCount.total} data-fgcolor="#4CC5CD" data-bgcolor="#e8e8e8" style={{ width: "54px", height: "33px", position: "absolute", verticalAlign: "middle", marginTop: "30px", marginLeft: "-77px", border: "0", fontWeight: "bold", fontStyle: "normal", fontVariant: "normal", fontStretch: "normal", fontSize: "30px", lineHeight: "normal", fontFamily: "Arial", textAlign: "center", color: "rgb(76, 197, 205)", padding: "0", WebkitAppearance: "none", background: "none" }} /></div>
                                </div>
                                <div className="col-sm">
                                    <h3 className="red">Pending Tasks</h3>
                                    <div style={{ display: "inline", width: "100px", height: "100px" }}><canvas width="100" height="100px"></canvas><input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value={tasksCount.pending} data-fgcolor="#e06b7d" data-bgcolor="#e8e8e8" style={{ width: "54px", height: "33px", position: "absolute", verticalAlign: "middle", marginTop: "30px", marginLeft: "-77px", border: "0", fontWeight: "bold", fontStyle: "normal", fontVariant: "normal", fontStretch: "normal", fontSize: "30px", lineHeight: "normal", fontFamily: "Arial", textAlign: "center", color: "rgb(224, 107, 125)", padding: "0", WebkitAppearance: "none", background: "none" }} /></div>
                                </div>
                                <div className="col-sm">
                                    <h3 className="green">Completed Tasks</h3>
                                    <div style={{ display: "inline", width: "100px", height: "100px" }}><canvas width="100" height="100px"></canvas><input className="knob" data-width="100" data-height="100" data-displayprevious="true" data-thickness=".2" value={tasksCount.completed} data-fgcolor="#96be4b" data-bgcolor="#e8e8e8" style={{ width: "54px", height: "33px", position: "absolute", verticalAlign: "middle", marginTop: "30px", marginLeft: "-77px", border: "0", fontWeight: "bold", fontStyle: "normal", fontVariant: "normal", fontStretch: "normal", fontSize: "30px", lineHeight: "normal", fontFamily: "Arial", textAlign: "center", color: "rgb(150, 190, 75)", padding: "0", WebkitAppearance: "none", background: "none" }} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Profile;
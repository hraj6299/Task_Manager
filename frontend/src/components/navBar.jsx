import { useNavigate } from "react-router-dom"
const NavBar = () => {
  const navigate = useNavigate("")

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light new-col navBar-new-style">
        <div class="container-fluid">
          <span class="navbar-brand h1 ml-4" style={{color:"white"}}><h4><i>TaskBuddy</i></h4></span>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-4 mb-2 mb-lg-0">
            <li class="nav-item">
                <span class="nav-link" style={{ cursor: "pointer", color:"white",marginRight:"10px"  }} aria-current="page" onClick={() => navigate("/home")}><h6>Home</h6></span>
              </li>
              <li class="nav-item">
                <span class="nav-link" style={{ cursor: "pointer", color:"white" }} onClick={() => navigate("/tasks")}><h6>Tasks</h6></span>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto mb-2 mr-4 mb-lg-0">
              <li class="nav-item">
                <button class="nav-link" style={{ cursor: "pointer", color:"white" }} onClick={handleLogout}><h6>Logout <i class="fa fa-sign-out" aria-hidden="true"></i></h6></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
export default NavBar
import './App.css'
import Main from './pages/autorization/Main'
import Profile from "./pages/Profile"
import Ideas from './pages/Ideas'
import { useState, createContext } from 'react'
import { Modal, Box } from '@mui/material';
import Registration from './components/apply/GetApply'
import { auth } from "./app/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes, Route, } from "react-router-dom"
import Users from "./pages/Users"
import Table from './pages/Table'
import Admin from './pages/Admin'
import { allowed } from './components/Admin-comp/AllowedUser'
import Team from './pages/Team'


const ModalContext = createContext()
export { ModalContext }


function App() {
  const [modal, setModal] = useState(false)

  const [user] = useAuthState(auth)

  function handleClose() {
    setModal(false)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '0 30px 30px',
    color: 'black'
  };

  function checkAdmin() {
    return allowed.includes(user?.email)
  }
  

  return (
    <div className="App">
      <ModalContext.Provider value={[modal, setModal]}>
        <Routes>
          
          <Route path="/college-web/" element={<Main />} />
          <Route path="/college-web/profile" element={<Profile setModal={true} />} />
          <Route path="/college-web/ideas" element={<Ideas />} />
          <Route path="/college-web/user/:id" element={<Users />} />
          <Route path="/college-web/table" element={<Table/>} />
          {
            (checkAdmin())
            ? <Route path="/college-web/admin/" element={<Admin />} />
            : <Route path="/college-web/admin/" element={<Main />} />
          }
          <Route path='/college-web/admin/:team/' element={<Team/>}/>
        </Routes>

        <Modal
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {user ? <Registration current={user} /> : 'Необходимо войти в систему!!!'}
          </Box>
        </Modal>
      </ModalContext.Provider>
    </div>
  )
}

export default App

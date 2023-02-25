import './App.css'
import Main from './pages/autorization/Main'
import {useState, createContext} from 'react'
import {Modal, Box} from '@mui/material';
import Registration from './components/apply/GetApply'
import { auth } from "./app/firebase";
import './App.css'
import { useAuthState } from 'react-firebase-hooks/auth';

const ModalContext = createContext()
export {ModalContext}

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
    p: 4,
    color: 'black'
  };

  const modalText = {
    mt: 2,
    color: 'black'
  }

  return (
    <div className="App">
      <ModalContext.Provider value={[modal, setModal]}>
        <Main />
        <Modal
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {user ? <Registration current={user}/> : 'Необходимо войти в систему!!!'}
          </Box>
        </Modal>
      </ModalContext.Provider>
    </div>
  )
}

export default App

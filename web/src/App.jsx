import './App.css'
import RegistrationForm from './components/Login/RegistrationForm'
import LoginForm from './components/Login/LoginForm'
import Provider from './components/Login/Provider'
import CarsList from './components/Cars/CardList'
import CreateCarForm from './components/Cars/CreateCarForm'
import CarEdit from './components/Cars/CarEdit'
import Wrapper from './components/UI/Wrapper'
import Brands from './components/Brands/Brands'

function App() {

  return (
    <>
      {/* <Provider /> */}
      <Wrapper >
        <CarsList />
        {/* <Brands /> */}
      </Wrapper>
    </>
  )
}

export default App

import React, {useState, useEffect} from 'react';
import { NavbarBrand } from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Routes from './Routes';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { AppContext } from './lib/contextLib';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { onError } from './lib/errorLib';

function App() {
  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push('/login'); // 로그아웃 시 이동 경로 설정
  }

  return (
    isAuthenticating ? null : (
    <div className='App container py-3'>
      <Navbar collapseOnSelect bg='light' expand='md' className='mb-3'>
        <LinkContainer to='/'>
        <NavbarBrand className='font-weight-bold text-muted'>
            Scratch
          </NavbarBrand>
        </LinkContainer>
        <NavbarToggle />
        <Navbar.Collapse className='justify-content-end'>
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
            <>
              <LinkContainer to='/signup'>
                <Nav.Link>회원가입</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>로그인  </Nav.Link>
              </LinkContainer>
            </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
    )
  );
}

export default App;

import {Navbar,Nav, Container, NavDropdown} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
function Header() {


    let user = JSON.parse(localStorage.getItem('user-info'));
    // console.warn(user);
    const history = useNavigate ();
    function logOut(){
        localStorage.clear();
        history("/register");
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
            <Container>
                    <Navbar.Brand href="#home">E-Comm</Navbar.Brand>
                    <Nav className="me-auto navbar_warapper">
                        {
                            localStorage.getItem('user-info') ?
                            <>
                                <Link to="/">Products</Link>
                                <Link to="/add">Add Products</Link>
                                {/* <Link to="/update/">Update Products</Link>
                                <Link to="/search/">Search Products</Link> */}
                            </>
                            :
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        }
                    </Nav>
                    
                    {localStorage.getItem('user-info')?
                    <Nav>
                        <NavDropdown title={user && user.name}>
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    :null}

                    </Container>
            </Navbar>
        </div>
    )
}

export default Header
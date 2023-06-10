import "./header.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

  

const Header = () => {



  return (
    <>
      <Navbar className="header" expand="lg">
        <Container fluid  className="fg">
          <NavLink to="/"  className="col nav-link">
            <p className="logo">CampusConnet</p>
          </NavLink>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ backgroundColor: "#fdc200" }}
          />
          <Navbar.Collapse id="basic-navbar-nav" className="nav--links">
            <Nav className="me-auto">
              <NavLink
                // exact="true"
                to="/"
                // style={navStyles}
                className="nav-link nav--link"
              >
                Home
              </NavLink>
              <NavLink
                // exact="true"
                to="/"
                // style={navStyles}
                className="nav-link nav--link"
              >
                Campuses
              </NavLink>
              <NavLink
                // exact="true"
                to="/"
                // style={navStyles}
                className="nav-link wallet nav--link"
              >
                connect
              </NavLink>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
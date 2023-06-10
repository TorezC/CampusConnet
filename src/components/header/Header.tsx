import "./header.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ConnectWallet from "../wallet/Connectwallet";
import { useEffect, useState } from "react";
import { VenomConnect }  from 'venom-connect';
import { initVenomConnect } from "../wallet/configure";

type Props = {
    venomConnect: VenomConnect | undefined;
  };
  

const Header = () => {

const [venomConnect, setVenomConnect] = useState<VenomConnect | undefined>();

useEffect(() => {
    (async () => {
        const vc = await initVenomConnect()
        setVenomConnect(vc)
    }) ()
}, [])

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
                <ConnectWallet venomConnect={venomConnect}/>
              </NavLink>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
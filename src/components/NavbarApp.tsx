import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const NavbarApp = () => {
  const [isLoggedIn, setisLoggedIn] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState<any | null>(null);

  const accessToken: any = localStorage.getItem("token");
  console.log(accessToken);
  const decodedToken: any = jwt_decode(accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken == null) {
      navigate("/signin");
      setisLoggedIn(false);
    } else {
      setisLoggedIn(true);
      if (decodedToken.role == "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          {!isAdmin ? (
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/myorder">Myorder</Nav.Link>
              <Nav.Link href="/signin">Logout</Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/showproduct">ShowAllProduct</Nav.Link>
              <Nav.Link href="/signin">Logout</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarApp;

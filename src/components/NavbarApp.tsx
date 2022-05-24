import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const NavbarApp = () => {
  const [isLoggedIn, setisLoggedIn] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState<any | null>(null);

  const accessToken: any = localStorage.getItem("token");
  const userdata: any = JSON.parse(localStorage.getItem("user") as any);
  console.log("user", userdata);

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          {accessToken != null && userdata.role == "user" ? (
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/myorder">Myorder</Nav.Link>
              <Nav.Link href="/signin" onClick={Logout}>
                Logout
              </Nav.Link>
            </Nav>
          ) : accessToken != null && userdata.role == "admin" ? (
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/showproduct">Showallproduct</Nav.Link>
              <Nav.Link href="/signin" onClick={Logout}>
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link href="/signup">Signup</Nav.Link>
              <Nav.Link href="/signin">Signin</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarApp;

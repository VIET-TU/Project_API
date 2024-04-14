import React, { useContext, useEffect, useState } from "react";
import "./nav.scss";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { toast } from "react-toastify";
import { logoutUser } from "../../services/userSevice";

const NavHeader = () => {
  let location = useLocation();
  const { user, logoutContext } = useContext(UserContext);
  // useEffect(() => {
  //   if (location.pathname === "/login" || location.pathname === "/register") {
  //     setIsShow(false);
  //   }
  // }, []);
  const navigate = useNavigate();

  const handleLogoutUser = async () => {
    let response = await logoutUser(); // clear cookie
    let data = response.data;
    if (data && +data.EC === 0) {
      localStorage.removeItem("jwt"); //  clear storage
      logoutContext(); // clear user context
      toast.success("Logout success !");
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };

  if ((user && user.isAuthentication) || location.pathname === "/") {
    return (
      <div className="nav-dropdown">
        <Navbar className="bg-[#212833]" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img
                src="/logo192.png"
                width="30"
                height="30"
                className="align-top d-inline-block"
                alt="React Bootstrap logo"
              />{" "}
              React
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "active nav-link" : "nav-link";
                  }}
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "active nav-link" : "nav-link";
                  }}
                  to="/users"
                >
                  Users
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "active nav-link" : "nav-link";
                  }}
                  to="/roles"
                >
                  Roles
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "active nav-link" : "nav-link";
                  }}
                  to="/group-role"
                >
                  Group-Role
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "active nav-link" : "nav-link";
                  }}
                  to="/projects"
                >
                  Projects
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "active nav-link" : "nav-link";
                  }}
                  to="/about"
                >
                  About
                </NavLink>
              </Nav>
              <Nav>
                {user && user.isAuthentication === true ? (
                  <>
                    <Nav.Item className="text-white nav-link">
                      Welcome {user.account.username} !
                    </Nav.Item>
                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                      <NavDropdown.Item>Change Password</NavDropdown.Item>
                      <NavDropdown.Item>
                        <span onClick={handleLogoutUser}>Log Out</span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-white nav-link">
                      Login
                    </Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
};

export default NavHeader;

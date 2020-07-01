import React, { useState } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { signout, isAuth } from "../actions/auth";

import { APP_NAME } from "../config";
import Router from "next/router";

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light>
        <Link href="/">
          <NavLink style={{ cursor: "pointer" }} className="font-weight-bold">
            {APP_NAME}
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className="ml-auto">
            {!isAuth() && (
              <>
                <NavItem>
                  <NavLink style={{ cursor: "pointer" }} href="/signin">
                    Signin
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ cursor: "pointer" }} href="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    signout(() => {
                      Router.replace("/signin");
                    });
                  }}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

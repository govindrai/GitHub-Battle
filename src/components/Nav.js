import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <ul>
      <li>
        <NavLink activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/battle">
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/popular-repos">
          Popular Repos
        </NavLink>
      </li>
    </ul>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>
        GitHub Battle: See who ranks better on GitHub and view Popular Repos
      </h1>
      <Link to="/battle">
        <button>Battle</button>
      </Link>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>GitHub Battle</h1>
      <h2>See who ranks better on GitHub and view Popular Repos</h2>
      <Link to="/battle">
        <button>Battle</button>
      </Link>
    </div>
  );
}

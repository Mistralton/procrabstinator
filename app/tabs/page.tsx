"use client";

import Header from "../(components)/Header";
import Navbar from "../(components)/Navbar";
import Table from "../(components)/Table";

export default function Home() {
  return (
    <div>
      <Header />
      <Navbar />
      <Table type={"tabs"} />
    </div>
  );
}

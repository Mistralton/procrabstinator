"use client";

import Header from "./(components)/Header";
import Navbar from "./(components)/Navbar";
import { Context } from "@/context/ContextProvider";
import Table from "./(components)/Table";
import Login from "./(components)/Login";
import { useContext } from "react";

export default function Home() {
  const context = useContext(Context);

  return (
    <>
      {context?.logged ? (
        <div>
          <Header />
          <Navbar />
          <Table />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

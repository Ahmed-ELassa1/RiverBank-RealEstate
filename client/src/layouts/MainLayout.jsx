import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />

      {!isOpen && <Outlet />}

      <Footer />
    </>
  );
};

export default MainLayout;

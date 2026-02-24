import React from "react";
import Navbar from "@theme-original/Navbar";

export default function NavbarWrapper(props: any) {
  return (
    <div className="mwNavbar">
      <div className="mwNavbarInner">
        <Navbar {...props} />
      </div>
    </div>
  );
}

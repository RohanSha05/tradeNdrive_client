import ChangePass from "@/components/dashboard/ChangePass";

import Sidebar from "@/components/dashboard/Sidebar";
import Header4 from "@/components/headers/Header4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title:
    "Change Passwort || ISAM'S AUTO SALES & REPAIRS",
  description: "ISAM'S AUTO SALES & REPAIRS",
};
export default function ChangePassPage() {
  return (
    <>
      <MetaComponent meta={const metadata = {
    title: `${site_title ?? "Isam Auto"} || ${moto ?? "Sells & Repair"}`,
    description: description1 ?? "Isam Auto Sales & Repair",
};
} />
      <Sidebar />
      <div id="wrapper-dashboard">
        <div id="pagee" className="clearfix">
          <Header4 />
        </div>
        <div id="themesflat-content"></div>
        <div className="dashboard-toggle">Show DashBoard</div>
        <ChangePass />
      </div>
    </>
  );
}

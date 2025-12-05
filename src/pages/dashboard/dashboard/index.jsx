import DashBoard from "@/components/dashboard/DashBoard";
import Sidebar from "@/components/dashboard/Sidebar";
import Header4 from "@/components/headers/Header4";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import { Outlet, useLocation } from "react-router-dom";
import { useApi } from "@/providers/ApiProvider";

export default function DashboardPage({ dashboardData }) {
		const { data } = useApi();
		const { site_title, moto } = data.data || {};

		const metadata = {
			title: `${site_title ?? "Isam Auto"} - Dashboard`,
			description: moto,
		};
	const location = useLocation();

	return (
		<>
			<MetaComponent meta={metadata} />
			<div id="wrapper-dashboard">
				<div id="pagee" className="clearfix">
					<Header4 dashboardData={dashboardData} />
				</div>
				<div id="themesflat-content">
					{location.pathname === "/dashboard" && <DashBoard />}
					<Outlet />
				</div>
				<div className="dashboard-toggle">Show DashBoard</div>
			</div>
		</>
	);
}

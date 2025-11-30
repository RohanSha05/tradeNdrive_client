import MyListings from "@/components/dashboard/MyListings";
import Sidebar from "@/components/dashboard/Sidebar";
import Header4 from "@/components/headers/Header4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useApi } from "@/providers/ApiProvider";

export default function MyListingPage() {
		const { data } = useApi();
		const { site_title, moto } = data.data || {};

		const metadata = {
			title: `${site_title ?? "Isam Auto"} - My Listings`,
			description: moto,
		};

	return (
		<>
			<MetaComponent meta={metadata} />
			<Sidebar />
			<div id="wrapper-dashboard">
				<div id="pagee" className="clearfix">
					<Header4 />
				</div>
				<div id="themesflat-content"></div>
				<div className="dashboard-toggle">Show DashBoard</div>
				<MyListings />
			</div>
		</>
	);
}

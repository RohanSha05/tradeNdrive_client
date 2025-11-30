import AddListing from "@/components/dashboard/AddListing";
import Sidebar from "@/components/dashboard/Sidebar";
import Header4 from "@/components/headers/Header4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useApi } from "@/providers/ApiProvider";

export default function AddListingPage() {
	const { data, loading } = useApi();
	const { site_title, moto, description1 } = data.data || {};

	const metadata = {
		title: `Add Listing Page || ${site_title ?? "Isam Auto"} || ${
			moto ?? "Sells & Repair"
		}`,
		description: description1,
	};

	return (
		<>
			<MetaComponent meta={metadata} />
			<Sidebar />
			<div>
				<div className="dashboard-toggle">Show DashBoard</div>
				<AddListing />
			</div>
		</>
	);
}

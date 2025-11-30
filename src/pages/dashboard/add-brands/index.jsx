import AddBrands from "@/components/dashboard/AddBrands";
import Sidebar from "@/components/dashboard/Sidebar";
import Header4 from "@/components/headers/Header4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useApi } from "@/providers/ApiProvider";

export default function AddBrandsPage() {
	const { data } = useApi();
	const { site_title, moto, description1 } = data.data || {};

	const metadata = {
		title: `Add Brands || ${site_title ?? "Isam Auto"} || ${
			moto ?? "Sells & Repair"
		}`,
		description: { description1 },
	};

	return (
		<>
			<MetaComponent meta={metadata} />
			<Sidebar />
			<div>
				<div className="dashboard-toggle">Show DashBoard</div>
				<AddBrands />
			</div>
		</>
	);
}

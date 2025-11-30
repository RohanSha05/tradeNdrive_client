import AddBodyType from "@/components/dashboard/AddBodyType";
import Sidebar from "@/components/dashboard/Sidebar";
import Header4 from "@/components/headers/Header4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useApi } from "@/providers/ApiProvider";

export default function AddBodyTypes() {
	const { data } = useApi();
	const { site_title, moto, description1 } = data.data || {};

	const metadata = {
		title: `Add Body Types || ${site_title ?? "Isam Auto"} || ${
			moto ?? "Sells & Repair"
		}`,
		description: description1,
	};

	return (
		<>
			<MetaComponent meta={metadata} />
			<div>
				<div className="dashboard-toggle">Show DashBoard</div>
				<AddBodyType />
			</div>
		</>
	);
}

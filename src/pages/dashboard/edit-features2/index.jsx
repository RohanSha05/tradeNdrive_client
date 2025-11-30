import Sidebar from "@/components/dashboard/Sidebar";
import Header4 from "@/components/headers/Header4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import EditLoanBanner from "@/components/dashboard/EditLoanBanner";
import EditFeatures2 from "@/components/dashboard/EditFeatures2";
import { useApi } from "@/providers/ApiProvider";

export default function EditFeatures2Page() {
	const { data } = useApi();
	const { site_title, moto, description1 } = data.data || {};

	const metadata = {
		title: `Edit Features2 || ${site_title ?? "Isam Auto"} || ${
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
				<EditFeatures2 />
			</div>
		</>
	);
}

import Sidebar from "@/components/dashboard/Sidebar";
import Header4 from "@/components/headers/Header4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import EditLoanBanner from "@/components/dashboard/EditLoanBanner";
import { useApi } from "@/providers/ApiProvider";

export default function EditLoanBannerPage() {
	const { data } = useApi();
	const { site_title, moto, description1 } = data.data || {};

	const metadata = {
		title: `Edit Loan Banner || ${site_title ?? "Isam Auto"} || ${
			moto ?? "Sells & Repair"
		}`,
		description: description1,
	};

	return (
		<>
			<MetaComponent meta={metadata} />
			<div>
				<div className="dashboard-toggle">Show DashBoard</div>
				<EditLoanBanner />
			</div>
		</>
	);
}

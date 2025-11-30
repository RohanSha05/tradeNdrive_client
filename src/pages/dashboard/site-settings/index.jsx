import AddBodyType from "@/components/dashboard/AddBodyType";
import Sidebar from "@/components/dashboard/Sidebar";
import Header4 from "@/components/headers/Header4";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import SiteSettings from "@/components/dashboard/SiteSettings";
import { useApi } from "@/providers/ApiProvider";

export default function SiteSettingsPage() {
	const { data } = useApi();
	const { site_title, moto, description1 } = data.data || {};

	const metadata = {
		title: `Site Settings || ${site_title ?? "Isam Auto"} || ${
			moto ?? "Sells & Repair"
		}`,
		description: description1,
	};

	return (
		<>
			<MetaComponent meta={metadata} />
			<div className="dashboard-toggle">Show DashBoard</div>
			<SiteSettings />
		</>
	);
}

import ProfileSettings from "@/components/dashboard/ProfileSettings";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import SiteSettings from "@/components/dashboard/SiteSettings";
import { useApi } from "@/providers/ApiProvider";

export default function ProfileSettingsPage() {
	const { data } = useApi();
	const { site_title, moto, description1 } = data.data || {};

	const metadata = {
		title: `Profile || ${site_title ?? "Isam Auto"} || ${
			moto ?? "Sells & Repair"
		}`,
		description: description1,
	};

	return (
		<>
			<MetaComponent meta={metadata} />
			<div className="dashboard-toggle">Show DashBoard</div>
			<ProfileSettings />
		</>
	);
}


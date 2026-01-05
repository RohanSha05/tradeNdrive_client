import React from "react";
import Header4 from "@/components/headers/Header4";
import Footer1 from "@/components/footers/Footer1";
import Settings from "@/components/otherPages/Settings";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
	title: "Settings || ISAM Auto || Sells & Repair",
	description: "Manage your account settings and preferences",
};

export default function SettingsPage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header4 />
			<Settings />
			<Footer1 />
		</>
	);
}

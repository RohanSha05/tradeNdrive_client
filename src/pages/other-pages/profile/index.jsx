import React from "react";
import Header4 from "@/components/headers/Header4";
import Footer1 from "@/components/footers/Footer1";
import Profile from "@/components/otherPages/Profile";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
	title: "Profile || ISAM Auto || Sells & Repair",
	description: "Manage your profile and account settings",
};

export default function ProfilePage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header4 />
			<Profile />
			<Footer1 />
		</>
	);
}

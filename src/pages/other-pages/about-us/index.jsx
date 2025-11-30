import Agents from "@/components/common/Agents";
import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import RecomandedCars from "@/components/common/RecomandedCars";
import Header2 from "@/components/headers/Header2";
import Testimonials from "@/components/homes/home-1/Testimonials";
import Features from "@/components/homes/home-3/Features";
import Banner from "@/components/otherPages/about/Banner";

import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useApi } from "@/providers/ApiProvider";

export default function AboutUsPage() {
	const { data } = useApi();
	const { site_title, moto, description1 } = data.data || {};

	const metadata = {
		title: `${site_title ?? "Isam Auto"} - About Us`,
		description: description1,
	};

	return (
		<>
			<MetaComponent meta={metadata} />
			<div className="header-fixed">
				<Header2 />
			</div>
			<Banner />
			<div className="mt-5 pt-5"></div>
			<Features />

			<Footer1 />
		</>
	);
}

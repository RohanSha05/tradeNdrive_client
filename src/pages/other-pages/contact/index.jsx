import Brands from "@/components/common/Brands";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Contact from "@/components/otherPages/Contact";
import React from "react";
import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import { useApi } from "@/providers/ApiProvider";

export default function ContactPage() {
		const { data } = useApi();
		const { site_title, moto } = data.data || {};

		const metadata = {
			title: `${site_title ?? "Isam Auto"} - Contact`,
			description: moto,
		};
	return (
		<>
			<MetaComponent meta={metadata} />
			<div className="header-fixed">
				<Header2 />
			</div>
			<section className="flat-title mb-40">
				<div className="container2">
					<div className="row">
						<div className="col-lg-12">
							<div className="title-inner style">
								<div className="title-group fs-12">
									<Link className="home fw-6 text-color-3" to={`/`}>
										Home
									</Link>
									<span>Used cars for sale</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Contact />
			<Footer1 />
		</>
	);
}

import CarDetails1 from "@/components/carDetails/CarDetails1";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { allCars } from "@/data/cars";
import MetaComponent from "@/components/common/MetaComponent";
import { useApi } from "@/providers/ApiProvider";
import config from "@/config/config";
import { useTrackInteraction } from "@/hooks/useTrackInteraction";

export default function BlogListingDetailsPage1() {
	const { data, carListings, loading } = useApi();
	const { site_title = "Isam's Auto Repair", moto } = data.data || {};

	const metadata = {
		title: `${site_title} - Listing Detail ||`,
		description: moto,
	};

	const [carDetails, setCarDetails] = useState(null);
	const [error, setError] = useState(null);

	let params = useParams();

	const carItem =
		carListings.data?.find((elm) => {
			return (
				elm.slug &&
				params.model &&
				elm.slug.toLowerCase().replace(/\s+/g, "-") ===
					params.model.toLowerCase()
			);
		}) || carListings.data?.[0];

	// Track view interaction
	useTrackInteraction(carItem?.id, "view");

	useEffect(() => {
		if (!params.model) return;
		const url = `${config.apiEndpoint}/car-listings/${params.model}`;
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch car details");
				}
				return response.json();
			})
			.then((data) => {
				setCarDetails(data?.data);
			})
			.catch((error) => {
				console.error("Error fetching car details:", error);
				setError(error.message);
			});
	}, [params.model]);

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
							<div className="title-inner style ">
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
			{loading && <div>Loading...</div>}
			{error && <div style={{ color: "red" }}>Error: {error}</div>}
			{!loading && !error && <CarDetails1 carItem={carDetails || carItem} />}
			<Footer1 />
		</>
	);
}
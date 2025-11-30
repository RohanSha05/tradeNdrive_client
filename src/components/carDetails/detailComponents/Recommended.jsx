import { carListings2 } from "@/data/cars";
import { useApi } from "@/providers/ApiProvider";

import React from "react";
import { Link } from "react-router-dom";

export default function Recommended() {
	const { carListings } = useApi();
	const { data } = carListings;

	console.log("Recommended data", data);

	return (
		<div className="listing-recommended mb-30">
			{data.slice(0, 4).map((elm, i) => (
				<div key={i} className="item flex">
					<div className="image">
						<img
							className="lazyload"
							alt="image"
							src={elm.featured_image.image_url}
							width={450}
							height={338}
						/>
					</div>
					<div className="content">
						<h6>
							<Link to={`/car-details/${elm.slug}`}>{elm.title}</Link>
							{console.log("elm", elm)}
						</h6>
						<p className="fs-14 fw-7 text-color-2 font-1">
							${elm.selling_price}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

import { carListings2 } from "@/data/cars";
import { useApi } from "@/providers/ApiProvider";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecommendations } from "@/utils/collaborativeFiltering";
import { useAuth } from "@/providers/AuthProvider"; // Assuming you have this

export default function Recommended() {
	const { carListings } = useApi();
	const { data } = carListings;
	const { slug } = useParams();
	const { user } = useAuth(); // Get current user
	const [recommendations, setRecommendations] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (data && data.length > 0) {
			generateRecommendations();
		}
	}, [data]);

	const generateRecommendations = async () => {
		setLoading(true);
		try {
			// For testing, use a test user ID if not logged in
			const currentUserId = user ? user.uid : "testUser1";
			const allCars = data.map((car) => ({ id: car.id, ...car }));
			console.log("Generating recommendations for user:", currentUserId);
			console.log("Available cars count:", allCars.length);
			const recs = getRecommendations(currentUserId, null, allCars);
			console.log("Recommendations generated:", recs);
			setRecommendations(recs.slice(0, 4));
		} catch (error) {
			console.error("Error generating recommendations:", error);
			setRecommendations(data.slice(0, 4)); // Fallback
		} finally {
			setLoading(false);
		}
	};

	const displayCars =
		recommendations.length > 0 ? recommendations : data.slice(0, 4);

	return (
		<div className="listing-recommended mb-30">
			{loading ? (
				<p>Loading collaborative recommendations...</p>
			) : (
				displayCars.map((elm, i) => (
					<div key={i} className="item flex">
						<div className="image">
							<img
								className="lazyload"
								alt="image"
								src={elm.featured_image?.image_url || elm.imgSrc}
								width={450}
								height={338}
							/>
						</div>
						<div className="content">
							<h6>
								<Link to={`/car-details/${elm.slug}`}>{elm.title}</Link>
							</h6>
							<p className="fs-14 fw-7 text-color-2 font-1">
								${elm.selling_price || elm.price}
							</p>
						</div>
					</div>
				))
			)}
		</div>
	);
}

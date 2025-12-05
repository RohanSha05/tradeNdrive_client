import React from "react";
import StarRating from "@/components/common/StarRating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ReviewsSlider({ carItem }) {
	// Mock reviews data - replace with actual API call
	const mockReviews = [
		{
			id: 1,
			user_name: "John Smith",
			rating: 5,
			comment: "Excellent car! Very reliable and comfortable to drive.",
			created_at: "2025-11-28",
		},
		{
			id: 2,
			user_name: "Sarah Johnson",
			rating: 4,
			comment: "Great value for money. Minor issues but overall satisfied.",
			created_at: "2025-11-25",
		},
		{
			id: 3,
			user_name: "Mike Davis",
			rating: 5,
			comment: "Perfect condition! Exactly as described in the listing.",
			created_at: "2025-11-20",
		},
		{
			id: 4,
			user_name: "Emily Brown",
			rating: 4,
			comment: "Good experience overall. Would recommend to others.",
			created_at: "2025-11-15",
		},
	];

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now - date);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return "Today";
		if (diffDays === 1) return "Yesterday";
		if (diffDays < 7) return `${diffDays} days ago`;
		if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
		return date.toLocaleDateString();
	};

	const averageRating = carItem?.average_rating || 4.3;
	const totalReviews = carItem?.total_reviews || mockReviews.length;

	return (
		<div className="widget-listing mb-40">
			<div className="heading-widget">
				<h4>Customer Reviews</h4>
			</div>
			<div className="content-widget">
				{/* Average Rating Summary */}
				<div className="text-center mb-3 pb-3 border-bottom">
					<h2 className="mb-2" style={{ fontSize: "36px", fontWeight: "bold" }}>
						{averageRating.toFixed(1)}
					</h2>
					<StarRating rating={averageRating} size={20} />
					<p className="text-muted mt-2 mb-0" style={{ fontSize: "14px" }}>
						{totalReviews} reviews
					</p>
				</div>

				{/* Reviews Slider */}
				{mockReviews.length > 0 ? (
					<Swiper
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={20}
						slidesPerView={1}
						navigation={{
							nextEl: ".reviews-slider-next",
							prevEl: ".reviews-slider-prev",
						}}
						pagination={{ clickable: true }}
						autoplay={{ delay: 5000, disableOnInteraction: false }}
						loop={mockReviews.length > 1}
						className="reviews-slider"
					>
						{mockReviews.map((review) => (
							<SwiperSlide key={review.id}>
								<div
									className="review-card p-3"
									style={{
										backgroundColor: "#f8f9fa",
										borderRadius: "8px",
										minHeight: "200px",
									}}
								>
									{/* User Info */}
									<div className="d-flex align-items-center gap-3 mb-3">
										<div
											className="review-avatar"
											style={{
												width: "40px",
												height: "40px",
												borderRadius: "50%",
												backgroundColor: "#E90A1D",
												color: "white",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												fontSize: "16px",
												fontWeight: "bold",
												flexShrink: 0,
											}}
										>
											{review.user_name.charAt(0).toUpperCase()}
										</div>
										<div className="flex-grow-1">
											<h6 className="mb-0" style={{ fontSize: "14px" }}>
												{review.user_name}
											</h6>
											<small className="text-muted" style={{ fontSize: "12px" }}>
												{formatDate(review.created_at)}
											</small>
										</div>
									</div>

									{/* Rating */}
									<div className="mb-2">
										<StarRating rating={review.rating} size={16} />
									</div>

									{/* Comment */}
									<p
										className="mb-0"
										style={{
											fontSize: "13px",
											lineHeight: "1.6",
											color: "#555",
										}}
									>
										{review.comment}
									</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<div className="text-center py-4">
						<i className="fas fa-comments" style={{ fontSize: "32px", color: "#ddd" }} />
						<p className="text-muted mt-2 mb-0" style={{ fontSize: "14px" }}>
							No reviews yet
						</p>
					</div>
				)}

				{/* Navigation Buttons */}
				{mockReviews.length > 1 && (
					<div className="d-flex justify-content-center gap-2 mt-3">
						<button
							className="reviews-slider-prev"
							style={{
								width: "35px",
								height: "35px",
								border: "1px solid #ddd",
								borderRadius: "50%",
								backgroundColor: "white",
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								transition: "all 0.3s",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = "#E90A1D";
								e.currentTarget.style.borderColor = "#E90A1D";
								e.currentTarget.style.color = "white";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = "white";
								e.currentTarget.style.borderColor = "#ddd";
								e.currentTarget.style.color = "black";
							}}
						>
							<i className="fas fa-chevron-left" style={{ fontSize: "12px" }} />
						</button>
						<button
							className="reviews-slider-next"
							style={{
								width: "35px",
								height: "35px",
								border: "1px solid #ddd",
								borderRadius: "50%",
								backgroundColor: "white",
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								transition: "all 0.3s",
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = "#E90A1D";
								e.currentTarget.style.borderColor = "#E90A1D";
								e.currentTarget.style.color = "white";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = "white";
								e.currentTarget.style.borderColor = "#ddd";
								e.currentTarget.style.color = "black";
							}}
						>
							<i className="fas fa-chevron-right" style={{ fontSize: "12px" }} />
						</button>
					</div>
				)}
			</div>

			<style jsx>{`
				.reviews-slider .swiper-pagination {
					position: static;
					margin-top: 15px;
				}
				.reviews-slider .swiper-pagination-bullet {
					background-color: #ddd;
					opacity: 1;
				}
				.reviews-slider .swiper-pagination-bullet-active {
					background-color: #e90a1d;
				}
			`}</style>
		</div>
	);
}

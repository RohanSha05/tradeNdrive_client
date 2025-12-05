import React from "react";

/**
 * StarRating Component
 * @param {number} rating - Rating value (0-5)
 * @param {number} maxStars - Maximum number of stars (default: 5)
 * @param {number} size - Size of stars in pixels (default: 16)
 * @param {string} color - Color of filled stars (default: #FFA500)
 * @param {boolean} showRating - Show rating number next to stars (default: false)
 * @param {number} totalReviews - Total number of reviews (optional)
 */
export default function StarRating({
	rating = 0,
	maxStars = 5,
	size = 16,
	color = "#E90A1D",
	showRating = false,
	totalReviews = 0,
}) {
	// Ensure rating is between 0 and maxStars
	const normalizedRating = Math.min(Math.max(rating, 0), maxStars);

	// Calculate full stars, half stars, and empty stars
	const fullStars = Math.floor(normalizedRating);
	const hasHalfStar = normalizedRating % 1 >= 0.5;
	const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<div className="star-rating-component d-flex align-items-center gap-2">
			<div className="stars d-flex" style={{ gap: "2px" }}>
				{/* Full Stars */}
				{[...Array(fullStars)].map((_, index) => (
					<i
						key={`full-${index}`}
						className="fas fa-star"
						style={{ color, fontSize: `${size}px` }}
					/>
				))}

				{/* Half Star */}
				{hasHalfStar && (
					<i
						className="fas fa-star-half-alt"
						style={{ color, fontSize: `${size}px` }}
					/>
				)}

				{/* Empty Stars */}
				{[...Array(emptyStars)].map((_, index) => (
					<i
						key={`empty-${index}`}
						className="far fa-star"
						style={{ color, fontSize: `${size}px` }}
					/>
				))}
			</div>

			{/* Show rating number */}
			{showRating && (
				<span className="rating-text" style={{ fontSize: `${size - 2}px` }}>
					{normalizedRating.toFixed(1)}
					{totalReviews > 0 && (
						<span className="text-muted ms-1">({totalReviews})</span>
					)}
				</span>
			)}
		</div>
	);
}

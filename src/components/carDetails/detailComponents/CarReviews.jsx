import React, { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Swal from "sweetalert2";

export default function CarReviews({ carItem }) {
	const { user } = useContext(AuthContext);
	const [rating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [comment, setComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmitReview = async (e) => {
		e.preventDefault();

		if (!user) {
			Swal.fire({
				icon: "warning",
				title: "Please login to submit a review",
				showCancelButton: true,
				confirmButtonText: "Go to Login",
				cancelButtonText: "Cancel",
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.href = "/login";
				}
			});
			return;
		}

		if (rating === 0) {
			Swal.fire({
				icon: "error",
				title: "Please select a rating",
				timer: 1500,
				showConfirmButton: false,
			});
			return;
		}

		setIsSubmitting(true);

		try {
			// TODO: Replace with actual API call
			// const response = await fetch(`${config.apiEndpoint}/car-reviews/`, {
			//   method: "POST",
			//   headers: {
			//     "Content-Type": "application/json",
			//     Authorization: `Bearer ${user.accessToken}`,
			//   },
			//   body: JSON.stringify({
			//     car_id: carItem.id,
			//     rating,
			//     comment,
			//     user_email: user.email,
			//     user_name: user.displayName || user.email,
			//   }),
			// });

			await new Promise((resolve) => setTimeout(resolve, 1000));

			Swal.fire({
				icon: "success",
				title: "Review submitted successfully!",
				timer: 1500,
				showConfirmButton: false,
			});

			setRating(0);
			setComment("");
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Failed to submit review",
				text: error.message,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="listing-reviews-section">
			{/* Write a Review Form */}
			<div className="write-review-section">
				<h3 className="mb-3">Write a Review</h3>
				<form onSubmit={handleSubmitReview}>
					<div className="mb-3">
						<label className="form-label fw-semibold">Your Rating *</label>
						<div className="star-rating-input d-flex gap-2">
							{[1, 2, 3, 4, 5].map((star) => (
								<i
									key={star}
									className={`${
										star <= (hoveredRating || rating)
											? "fas fa-star"
											: "far fa-star"
									}`}
									style={{
										fontSize: "32px",
										color:
											star <= (hoveredRating || rating) ? "#E90A1D" : "#ddd",
										cursor: "pointer",
										transition: "color 0.2s",
									}}
									onClick={() => setRating(star)}
									onMouseEnter={() => setHoveredRating(star)}
									onMouseLeave={() => setHoveredRating(0)}
								/>
							))}
						</div>
						{rating > 0 && (
							<small className="text-muted d-block mt-2">
								{rating === 1 && "Poor"}
								{rating === 2 && "Fair"}
								{rating === 3 && "Good"}
								{rating === 4 && "Very Good"}
								{rating === 5 && "Excellent"}
							</small>
						)}
					</div>

					<div className="mb-3">
						<label className="form-label fw-semibold">Your Review (Optional)</label>
						<textarea
							className="form-control"
							rows={4}
							placeholder="Share your thoughts about this car..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							maxLength={500}
						/>
						<small className="text-muted">{comment.length}/500 characters</small>
					</div>

					{!user && (
						<div className="alert alert-warning" role="alert">
							<i className="fas fa-info-circle me-2" />
							You must be logged in to submit a review
						</div>
					)}

					<button
						type="submit"
						className="btn"
						disabled={isSubmitting || !user}
						style={{
							backgroundColor: "#E90A1D",
							color: "white",
							border: "none",
							padding: "10px 30px",
						}}
					>
						{isSubmitting ? (
							<>
								<span
									className="spinner-border spinner-border-sm me-2"
									role="status"
									aria-hidden="true"
								/>
								Submitting...
							</>
						) : (
							"Submit Review"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

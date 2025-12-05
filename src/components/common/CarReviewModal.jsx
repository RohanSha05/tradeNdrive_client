import React, { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Swal from "sweetalert2";

export default function CarReviewModal({ carId, carTitle, onReviewSubmitted }) {
	const { user } = useContext(AuthContext);
	const [rating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [comment, setComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
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
			// TODO: Replace with your actual API endpoint
			// const response = await fetch(`${config.apiEndpoint}/reviews/`, {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 		Authorization: `Bearer ${user.accessToken}`,
			// 	},
			// 	body: JSON.stringify({
			// 		car_id: carId,
			// 		rating,
			// 		comment,
			// 		user_email: user.email,
			// 		user_name: user.displayName || user.email,
			// 	}),
			// });

			// For now, simulate success
			await new Promise((resolve) => setTimeout(resolve, 1000));

			Swal.fire({
				icon: "success",
				title: "Review submitted successfully!",
				timer: 1500,
				showConfirmButton: false,
			});

			// Reset form
			setRating(0);
			setComment("");

			// Close modal
			const modal = document.getElementById(`reviewModal-${carId}`);
			const bsModal = bootstrap.Modal.getInstance(modal);
			bsModal?.hide();

			// Callback
			if (onReviewSubmitted) {
				onReviewSubmitted();
			}
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
		<div
			className="modal fade"
			id={`reviewModal-${carId}`}
			tabIndex={-1}
			aria-labelledby="reviewModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="reviewModalLabel">
							Rate & Review
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						/>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="modal-body">
							<div className="mb-3">
								<h6 className="mb-2">{carTitle}</h6>
								<p className="text-muted small">
									Share your experience with this vehicle
								</p>
							</div>

							{/* Star Rating Input */}
							<div className="mb-4">
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
													star <= (hoveredRating || rating)
														? "#FFA500"
														: "#ddd",
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
									<small className="text-muted">
										{rating === 1 && "Poor"}
										{rating === 2 && "Fair"}
										{rating === 3 && "Good"}
										{rating === 4 && "Very Good"}
										{rating === 5 && "Excellent"}
									</small>
								)}
							</div>

							{/* Comment */}
							<div className="mb-3">
								<label className="form-label fw-semibold">
									Your Review (Optional)
								</label>
								<textarea
									className="form-control"
									rows={4}
									placeholder="Share your thoughts about this car..."
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									maxLength={500}
								/>
								<small className="text-muted">
									{comment.length}/500 characters
								</small>
							</div>

							{!user && (
								<div className="alert alert-warning" role="alert">
									<i className="fas fa-info-circle me-2" />
									You must be logged in to submit a review
								</div>
							)}
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="btn btn-primary"
								disabled={isSubmitting || !user}
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
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

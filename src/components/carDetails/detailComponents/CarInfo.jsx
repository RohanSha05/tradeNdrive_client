import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function CarInfo({ carItem }) {
	const navigate = useNavigate();
	const { slug } = useParams();
	const isOfferCar =
		slug === "2014-ford-focus-se" || carItem?.slug === "2014-ford-focus-se";
	const [offerTime, setOfferTime] = useState(isOfferCar ? 600 : 0); // 10 minutes in seconds
	const [offerActive, setOfferActive] = useState(isOfferCar);

	// Timer effect for 10-minute offer
	useEffect(() => {
		if (!isOfferCar) return;

		const timer = setInterval(() => {
			setOfferTime((prev) => {
				if (prev <= 1) {
					setOfferActive(false);
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 100);

		return () => clearInterval(timer);
	}, [isOfferCar]);

	const handleApplyForFinance = () => {
		navigate("/credit-application-form", { state: { title: carItem?.title } });
	};

	const handlePayment = () => {
		// Ensure image data is included
		const carDataWithImage = {
			...carItem,
			imgSrc: carItem.imgSrc || carItem.allImages?.[0],
			allImages: carItem.allImages || (carItem.imgSrc ? [carItem.imgSrc] : []),
		};

		console.log("Passing to checkout:", carDataWithImage);

		const paymentPrice = offerActive ? discountedPrice : originalPrice;

		Swal.fire({
			title: "Proceed to Payment",
			text: `You are about to pay $${paymentPrice?.toLocaleString()} for ${
				carItem.title
			}.${offerActive ? " (50% OFF - Limited Time Offer)" : ""}`,
			icon: "info",
			showCancelButton: true,
			confirmButtonText: "Pay Now",
			cancelButtonText: "Cancel",
		}).then((result) => {
			if (result.isConfirmed) {
				navigate("/secure-checkout", { state: { carItem: carDataWithImage } });
			}
		});
	};

	console.log("Detailed Price: ", carItem);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs.toString().padStart(2, "0")}`;
	};

	const discountedPrice = carItem.selling_price
		? Math.round(carItem.selling_price / 2)
		: 0;
	const originalPrice = carItem.selling_price;
	const showOffer = isOfferCar && offerActive;

	return (
		<>
			<div className="icon-box flex flex-wrap">
				<div className="icons flex-three">
					<i className="icon-autodeal-km1" />
					<span>{carItem.mileage?.toLocaleString()} kms</span>
				</div>
				<div className="icons flex-three">
					<i className="icon-autodeal-diesel" />
					<span>{carItem.fuelType?.title}</span>
				</div>
				<div className="icons flex-three">
					<i className="icon-autodeal-automatic" />
					<span>{carItem.gear_type?.title}</span>
				</div>
				<div className="icons flex-three">
					<i className="icon-autodeal-owner" />
					<span>{carItem.owner_type?.title}</span>
				</div>
			</div>

			{/* Offer Section */}
			{showOffer && (
				<div
					style={{
						backgroundColor: "#E90A1D",
						color: "white",
						padding: "12px 15px",
						borderRadius: "8px",
						marginBottom: "15px",
						textAlign: "center",
					}}
				>
					<p
						style={{
							margin: "0 0 8px 0",
							fontSize: "14px",
							fontWeight: "600",
							color: "white",
						}}
					>
						🔥 50% OFF - LIMITED TIME OFFER
					</p>
					<p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "white" }}>
						Expires in: <strong>{formatTime(offerTime)}</strong>
					</p>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							gap: "15px",
							alignItems: "center",
						}}
					>
						<div>
							<span style={{ fontSize: "12px", opacity: 0.9 }}>Original: </span>
							<span
								style={{ fontSize: "13px", textDecoration: "line-through" }}
							>
								${originalPrice?.toLocaleString()}
							</span>
						</div>
						<div>
							<span style={{ fontSize: "16px", fontWeight: "bold" }}>
								${discountedPrice?.toLocaleString()}
							</span>
						</div>
					</div>
				</div>
			)}

			<div className="money text-color-3 font">
				$
				{offerActive
					? discountedPrice?.toLocaleString()
					: originalPrice?.toLocaleString()}
			</div>
			<div className="price-wrap">
				<p className="fs-12 lh-16 text-color-2">
					Monthly installment payment:
					<span className="fs-14 fw-5 font">
						{offerActive
							? Math.round(
									carItem.monthly_installment_price / 2
							  )?.toLocaleString()
							: carItem.monthly_installment_price?.toLocaleString()}
					</span>
				</p>
			</div>

			<div className="button-boxs-booking mb-2">
				<button
					onClick={handleApplyForFinance}
					className="sc-button text-white"
					name="submit"
					type="submit"
				>
					Apply for Finance
				</button>
			</div>

			<div className="button-boxs-booking mb-2">
				<button
					onClick={handlePayment}
					className="sc-button text-white"
					name="submit"
					type="button"
					style={{ backgroundColor: "#E90A1D" }}
				>
					Pay Now
				</button>
			</div>
		</>
	);
}

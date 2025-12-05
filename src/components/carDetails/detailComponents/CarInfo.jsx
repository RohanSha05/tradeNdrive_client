import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CarInfo({ carItem }) {
	const navigate = useNavigate();

	const handleApplyForFinance = () => {
		navigate("/credit-application-form", { state: { title: carItem?.title } });
	};

	console.log("Detailed Price: ", carItem);

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
			<div className="money text-color-3 font">
				${carItem.selling_price?.toLocaleString()}
			</div>
			<div className="price-wrap">
				<p className="fs-12 lh-16 text-color-2">
					Monthly installment payment:
					<span className="fs-14 fw-5 font">
						{carItem.monthly_installment_price?.toLocaleString()}
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
		</>
	);
}

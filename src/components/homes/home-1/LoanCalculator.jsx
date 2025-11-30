import React from "react";
import right from "/public/assets/images/icon-box/right.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function LoanCalculator() {
	return (
		<section
			className="loan-calculator inner-1 bg-2 mt-5"
			style={{
				backgroundImage: "url('/public/assets/images/car-list/couplebg.jpg')",
			}}
		>
			<div className="container d-flex justify-center align-center">
				<div className="row">
					<div>
						<h1 className="text-white text-center mb-2">
							Looking for a Quick & Hassle-free Car Financing?
						</h1>
						<div className="col-lg-12 flex flex-column-sm">
							<div className="flex flex-column justify-center align-center w-560">
								<div className="info-box text-white text-center">
									<h1 className="info-title">
										APPROVED IN <br />
										<span className="text-danger">5 MINUTES</span>
									</h1>
									<div className="button-boxs-booking mt-4 mb-2">
										<a href="/credit-application-form">
											<button className="sc-button" name="submit" type="submit">
												<span className="fs-4">Apply Now</span>
											</button>
										</a>
									</div>
								</div>
							</div>

							<div className="flex flex-column justify-center align-center mx-4 w-560">
								<ul className="benefits-list text-white">
									{[
										"Buy Now, Pay Later",
										"0 Down Payment",
										"Trusted by Thousands",
										"Flexible Payment Plans",
										"Personalized Advice",
										"Secured Transactions",
									].map((benefit, index) => (
										<li key={index} className="font-size benefit-item">
											<i className="fa-solid fa-circle-arrow-right fixed-icon"></i>
											<span className="mx-1">{benefit}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
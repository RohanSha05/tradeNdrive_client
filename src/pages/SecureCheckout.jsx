import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./SecureCheckout.scss";

export default function SecureCheckout() {
	const location = useLocation();
	const navigate = useNavigate();
	const { carItem } = location.state || {};

	// Dummy vehicle data if not passed
	const vehicleData = carItem || {
		title: "2023 Toyota Camry SE",
		make: "Toyota",
		model: "Camry",
		year: 2023,
		trim: "SE (Sport Edition)",
		vin: "4T1B11HK5PU123456",
		exteriorColor: "Celestial Silver Metallic",
		interiorColor: "Black Fabric",
		mileage: 12500,
		image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
		deliveryETA: "December 15, 2025",
		basePrice: 28500,
		addOns: 2500,
		taxes: 2280,
		fees: 895,
		registrationFee: 250,
		documentationFee: 399,
		deliveryFee: 0,
		discounts: 1000,
		tradeInValue: 5000,
		selling_price: 28524,
		features: ["Adaptive Cruise Control", "Lane Departure Warning", "Blind Spot Monitor", "Apple CarPlay", "Android Auto"]
	};

	const [currentStep, setCurrentStep] = useState(1);
	const [paymentMethod, setPaymentMethod] = useState("credit-card");
	const [financingOption, setFinancingOption] = useState("cash");
	const [formData, setFormData] = useState({
		// Personal Information
		fullName: "",
		dateOfBirth: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		email: "",
		phone: "",
		driverLicenseNumber: "",
		driverLicenseState: "",
		
		// Payment Information
		cardNumber: "",
		cardholderName: "",
		expiryDate: "",
		cvv: "",
		
		// Financing Information
		downPayment: "",
		loanTerm: "60",
		employmentStatus: "",
		annualIncome: "",
		
		// Trade-In Information
		hasTradeIn: false,
		tradeInVIN: "",
		tradeInYear: "",
		tradeInMake: "",
		tradeInModel: "",
		tradeInMileage: "",
		tradeInCondition: "good",
		
		// Delivery Information
		deliveryOption: "pickup",
		deliveryAddress: "",
		deliveryCity: "",
		deliveryState: "",
		deliveryZipCode: "",
		deliveryDate: "",
		pickupLocation: "Main Dealership - 123 Auto Blvd, City, ST 12345",
		
		// Insurance Information
		hasInsurance: false,
		insuranceProvider: "",
		insurancePolicyNumber: "",
		insuranceStartDate: "",
		
		// Add-Ons
		extendedWarranty: false,
		gapInsurance: false,
		maintenancePlan: false,
		tireProtection: false,
		
		// Legal Consents
		agreeTerms: "disagree",
		agreeCreditCheck: "disagree",
		agreeElectronicSignature: "disagree",
		agreePrivacyPolicy: "disagree",
		
		// File Uploads
		driverLicenseFront: null,
		driverLicenseBack: null,
		proofOfInsurance: null,
		selfiePhoto: null,
	});
	const [isProcessing, setIsProcessing] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [orderNumber, setOrderNumber] = useState("");

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({ 
			...prev, 
			[name]: type === "checkbox" ? checked : value 
		}));
	};

	const handleFileChange = (e) => {
		const { name, files } = e.target;
		if (files && files[0]) {
			setFormData((prev) => ({ ...prev, [name]: files[0] }));
		}
	};

	const calculateMonthlyPayment = () => {
		if (financingOption !== "financing") return 0;
		const principal = vehicleData.selling_price - (parseFloat(formData.downPayment) || 0);
		const apr = 4.9; // 4.9% APR
		const monthlyRate = apr / 100 / 12;
		const months = parseInt(formData.loanTerm);
		const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
		return payment.toFixed(2);
	};

	const calculateTotalFinanced = () => {
		const monthlyPayment = calculateMonthlyPayment();
		const months = parseInt(formData.loanTerm);
		return (monthlyPayment * months).toFixed(2);
	};

	const getFinalPrice = () => {
		let total = vehicleData.selling_price;
		if (formData.hasTradeIn) {
			total -= vehicleData.tradeInValue;
		}
		if (formData.extendedWarranty) total += 2500;
		if (formData.gapInsurance) total += 895;
		if (formData.maintenancePlan) total += 1500;
		if (formData.tireProtection) total += 450;
		if (formData.deliveryOption === "delivery") total += 299;
		return total;
	};

	const handleNextStep = () => {
		setCurrentStep(prev => prev + 1);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handlePrevStep = () => {
		setCurrentStep(prev => prev - 1);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handlePayment = (e) => {
		e.preventDefault();
		setIsProcessing(true);

		// Simulate payment processing
		setTimeout(() => {
			const generatedOrderNumber = `ISAM-${Date.now()}`;
			setOrderNumber(generatedOrderNumber);
			setShowConfirmation(true);
			setIsProcessing(false);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 2000);
	};

	if (showConfirmation) {
		return (
			<div className="secure-checkout confirmation-screen">
				<div className="container py-5">
					<div className="text-center mb-4">
						<div className="success-icon mb-3">
							<i className="fa fa-check-circle" style={{ fontSize: "80px", color: "#28a745" }}></i>
						</div>
						<h2 className="mb-3" style={{ color: "#E90A1D" }}>Purchase Confirmed!</h2>
						<p className="lead">Thank you for your purchase from Isam Auto</p>
					</div>

					<div className="card mx-auto shadow" style={{ maxWidth: "800px" }}>
						<div className="card-body p-4">
							<h4 className="mb-4">Order Details</h4>
							
							<div className="row mb-3">
								<div className="col-md-6">
									<p><strong>Order Number:</strong></p>
									<p className="text-primary fs-5">{orderNumber}</p>
								</div>
								<div className="col-md-6">
									<p><strong>Order Date:</strong></p>
									<p>{new Date().toLocaleDateString()}</p>
								</div>
							</div>

							<hr />

							<div className="mb-4">
								<h5>Vehicle Information</h5>
								<p><strong>{vehicleData.year} {vehicleData.make} {vehicleData.model}</strong></p>
								<p>VIN: {vehicleData.vin}</p>
							</div>

							<div className="mb-4">
								<h5>Total Amount</h5>
								<p className="fs-4 text-success"><strong>${getFinalPrice().toLocaleString()}</strong></p>
							</div>

							<div className="mb-4">
								<h5>Next Steps</h5>
								<ul>
									<li>You will receive a confirmation email at {formData.email || "your email"} within 5 minutes</li>
									<li>Please bring the following documents:
										<ul>
											<li>Valid driver's license</li>
											<li>Proof of insurance</li>
											<li>Photo ID</li>
										</ul>
									</li>
									{formData.deliveryOption === "pickup" ? (
										<li>Pickup Location: {formData.pickupLocation}</li>
									) : (
										<li>Delivery scheduled for: {formData.deliveryDate || vehicleData.deliveryETA}</li>
									)}
									<li>Estimated delivery/pickup date: {vehicleData.deliveryETA}</li>
								</ul>
							</div>

							<div className="mb-4">
								<h5>Contact & Support</h5>
								<p><i className="fa fa-phone"></i> (555) 123-4567</p>
								<p><i className="fa fa-envelope"></i> support@isamauto.com</p>
								<p><i className="fa fa-clock"></i> Mon-Sat: 9AM - 8PM, Sun: 10AM - 6PM</p>
							</div>

							<div className="d-flex gap-3">
								<button 
									className="btn btn-primary flex-fill"
									onClick={() => window.print()}
								>
									<i className="fa fa-print me-2"></i>Print Receipt
								</button>
								<button 
									className="btn btn-outline-primary flex-fill"
									onClick={() => navigate("/")}
								>
									<i className="fa fa-home me-2"></i>Return to Home
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="secure-checkout">
			<div className="container py-5">
				{/* Header with Progress Bar */}
				<div className="checkout-header mb-5">
					<h2 className="text-center mb-4" style={{ color: "#E90A1D" }}>
						<i className="fa fa-lock me-2"></i>Secure Checkout
					</h2>
					<div className="progress-steps mb-4">
						<div className="d-flex justify-content-between align-items-center">
							<div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
								<div className="step-number">1</div>
								<div className="step-label">Vehicle & Pricing</div>
							</div>
							<div className="step-line"></div>
							<div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
								<div className="step-number">2</div>
								<div className="step-label">Personal Info</div>
							</div>
							<div className="step-line"></div>
							<div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
								<div className="step-number">3</div>
								<div className="step-label">Payment</div>
							</div>
							<div className="step-line"></div>
							<div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
								<div className="step-number">4</div>
								<div className="step-label">Review</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					{/* Main Content */}
					<div className="col-lg-8">
						<form onSubmit={handlePayment}>
							{/* Step 1: Vehicle Summary & Pricing */}
							{currentStep === 1 && (
								<>
									{/* Vehicle Summary */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-car me-2"></i>Vehicle Summary</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="row">
													<div className="col-md-4">
														<img
															src={vehicleData.image}
															alt={vehicleData.title}
															className="img-fluid rounded"
															style={{ width: "100%", height: "200px", objectFit: "cover" }}
														/>
													</div>
													<div className="col-md-8">
														<h5 className="mb-3">{vehicleData.year} {vehicleData.make} {vehicleData.model}</h5>
														<div className="row">
															<div className="col-6 mb-2">
																<small className="text-muted">Trim Level</small>
																<p className="mb-0">{typeof vehicleData.trim === 'string' ? vehicleData.trim : vehicleData.trim?.title || 'N/A'}</p>
															</div>
															<div className="col-6 mb-2">
																<small className="text-muted">VIN</small>
																<p className="mb-0">{vehicleData.vin}</p>
															</div>
															<div className="col-6 mb-2">
																<small className="text-muted">Exterior Color</small>
																<p className="mb-0">{vehicleData.exteriorColor}</p>
															</div>
															<div className="col-6 mb-2">
																<small className="text-muted">Interior Color</small>
																<p className="mb-0">{vehicleData.interiorColor}</p>
															</div>
															<div className="col-6 mb-2">
																<small className="text-muted">Mileage</small>
																<p className="mb-0">{(vehicleData.mileage || 0).toLocaleString()} miles</p>
															</div>
															<div className="col-6 mb-2">
																<small className="text-muted">Delivery ETA</small>
																<p className="mb-0">{vehicleData.deliveryETA}</p>
															</div>
														</div>
														<div className="mt-3">
															<small className="text-muted">Key Features</small>
															<div className="d-flex flex-wrap gap-2 mt-1">
																{Array.isArray(vehicleData.features) ? vehicleData.features.map((feature, idx) => (
																	<span key={idx} className="badge bg-secondary">
																		{typeof feature === 'string' ? feature : feature?.title || 'Feature'}
																	</span>
																)) : (
																	<span className="badge bg-secondary">Standard Features</span>
																)}
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</section>

									{/* Pricing Breakdown */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-dollar-sign me-2"></i>Pricing Breakdown</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="pricing-row">
													<span>Base Vehicle Price</span>
													<span>${(vehicleData.basePrice || 0).toLocaleString()}</span>
												</div>
												<div className="pricing-row">
													<span>Add-ons / Options</span>
													<span>${(vehicleData.addOns || 0).toLocaleString()}</span>
												</div>
												<div className="pricing-row">
													<span>State/Local Taxes</span>
													<span>${(vehicleData.taxes || 0).toLocaleString()}</span>
												</div>
												<div className="pricing-row">
													<span>Registration Fee</span>
													<span>${(vehicleData.registrationFee || 0).toLocaleString()}</span>
												</div>
												<div className="pricing-row">
													<span>Documentation Fee</span>
													<span>${(vehicleData.documentationFee || 0).toLocaleString()}</span>
												</div>
												<div className="pricing-row">
													<span>Destination/Delivery Fee</span>
													<span>${(vehicleData.deliveryFee || 0).toLocaleString()}</span>
												</div>
												<div className="pricing-row text-success">
													<span>Promotions/Discounts</span>
													<span>-${(vehicleData.discounts || 0).toLocaleString()}</span>
												</div>
												{formData.hasTradeIn && (
													<div className="pricing-row text-success">
														<span>Trade-In Value</span>
														<span>-${(vehicleData.tradeInValue || 0).toLocaleString()}</span>
													</div>
												)}
												<hr />
												<div className="pricing-row total">
													<strong>Vehicle Total</strong>
													<strong className="text-primary">${(vehicleData.selling_price || 0).toLocaleString()}</strong>
												</div>
											</div>
										</div>
									</section>

									{/* Optional Add-Ons */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-plus-circle me-2"></i>Optional Protection & Services</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="form-check mb-3 p-3 border rounded">
													<input
														className="form-check-input"
														type="checkbox"
														name="extendedWarranty"
														id="extendedWarranty"
														checked={formData.extendedWarranty}
														onChange={handleInputChange}
													/>
													<label className="form-check-label w-100" htmlFor="extendedWarranty">
														<div className="d-flex justify-content-between">
															<div>
																<strong>Extended Warranty (5 Year / 100,000 Miles)</strong>
																<p className="text-muted mb-0 small">Comprehensive coverage beyond manufacturer warranty</p>
															</div>
															<strong>+$2,500</strong>
														</div>
													</label>
												</div>
												<div className="form-check mb-3 p-3 border rounded">
													<input
														className="form-check-input"
														type="checkbox"
														name="gapInsurance"
														id="gapInsurance"
														checked={formData.gapInsurance}
														onChange={handleInputChange}
													/>
													<label className="form-check-label w-100" htmlFor="gapInsurance">
														<div className="d-flex justify-content-between">
															<div>
																<strong>GAP Insurance</strong>
																<p className="text-muted mb-0 small">Covers the difference between loan and vehicle value</p>
															</div>
															<strong>+$895</strong>
														</div>
													</label>
												</div>
												<div className="form-check mb-3 p-3 border rounded">
													<input
														className="form-check-input"
														type="checkbox"
														name="maintenancePlan"
														id="maintenancePlan"
														checked={formData.maintenancePlan}
														onChange={handleInputChange}
													/>
													<label className="form-check-label w-100" htmlFor="maintenancePlan">
														<div className="d-flex justify-content-between">
															<div>
																<strong>Prepaid Maintenance Plan (3 Years)</strong>
																<p className="text-muted mb-0 small">Covers all scheduled maintenance services</p>
															</div>
															<strong>+$1,500</strong>
														</div>
													</label>
												</div>
												<div className="form-check mb-0 p-3 border rounded">
													<input
														className="form-check-input"
														type="checkbox"
														name="tireProtection"
														id="tireProtection"
														checked={formData.tireProtection}
														onChange={handleInputChange}
													/>
													<label className="form-check-label w-100" htmlFor="tireProtection">
														<div className="d-flex justify-content-between">
															<div>
																<strong>Tire & Wheel Protection</strong>
																<p className="text-muted mb-0 small">Protection against road hazards and damage</p>
															</div>
															<strong>+$450</strong>
														</div>
													</label>
												</div>
											</div>
										</div>
									</section>

									<div className="d-flex justify-content-end">
										<button type="button" className="btn btn-primary btn-lg" onClick={handleNextStep}>
											Continue <i className="fa fa-arrow-right ms-2"></i>
										</button>
									</div>
								</>
							)}

							{/* Step 2: Personal Information & Trade-In */}
							{currentStep === 2 && (
								<>
									{/* Personal Information */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-user me-2"></i>Personal & Contact Information</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="row">
													<div className="col-md-6 mb-3">
														<label className="form-label">Full Legal Name *</label>
														<input
															type="text"
															className="form-control"
															name="fullName"
															value={formData.fullName}
															onChange={handleInputChange}
															placeholder="John Doe"
															required
														/>
													</div>
													<div className="col-md-6 mb-3">
														<label className="form-label">Date of Birth *</label>
														<input
															type="date"
															className="form-control"
															name="dateOfBirth"
															value={formData.dateOfBirth}
															onChange={handleInputChange}
															required
														/>
													</div>
													<div className="col-md-12 mb-3">
														<label className="form-label">Street Address *</label>
														<input
															type="text"
															className="form-control"
															name="address"
															value={formData.address}
															onChange={handleInputChange}
															placeholder="123 Main Street"
															required
														/>
													</div>
													<div className="col-md-4 mb-3">
														<label className="form-label">City *</label>
														<input
															type="text"
															className="form-control"
															name="city"
															value={formData.city}
															onChange={handleInputChange}
															placeholder="Anytown"
															required
														/>
													</div>
													<div className="col-md-4 mb-3">
														<label className="form-label">State *</label>
														<select
															className="form-select"
															name="state"
															value={formData.state}
															onChange={handleInputChange}
															required
														>
															<option value="">Select State</option>
															<option value="CA">California</option>
															<option value="TX">Texas</option>
															<option value="FL">Florida</option>
															<option value="NY">New York</option>
															<option value="IL">Illinois</option>
														</select>
													</div>
													<div className="col-md-4 mb-3">
														<label className="form-label">ZIP Code *</label>
														<input
															type="text"
															className="form-control"
															name="zipCode"
															value={formData.zipCode}
															onChange={handleInputChange}
															placeholder="12345"
															required
														/>
													</div>
													<div className="col-md-6 mb-3">
														<label className="form-label">Email Address *</label>
														<input
															type="email"
															className="form-control"
															name="email"
															value={formData.email}
															onChange={handleInputChange}
															placeholder="john.doe@email.com"
															required
														/>
													</div>
													<div className="col-md-6 mb-3">
														<label className="form-label">Phone Number *</label>
														<input
															type="tel"
															className="form-control"
															name="phone"
															value={formData.phone}
															onChange={handleInputChange}
															placeholder="(555) 123-4567"
															required
														/>
													</div>
													<div className="col-md-6 mb-3">
														<label className="form-label">Driver's License Number *</label>
														<input
															type="text"
															className="form-control"
															name="driverLicenseNumber"
															value={formData.driverLicenseNumber}
															onChange={handleInputChange}
															placeholder="D1234567"
															required
														/>
													</div>
													<div className="col-md-6 mb-3">
														<label className="form-label">License State *</label>
														<select
															className="form-select"
															name="driverLicenseState"
															value={formData.driverLicenseState}
															onChange={handleInputChange}
															required
														>
															<option value="">Select State</option>
															<option value="CA">California</option>
															<option value="TX">Texas</option>
															<option value="FL">Florida</option>
															<option value="NY">New York</option>
														</select>
													</div>
												</div>
											</div>
										</div>
									</section>

									{/* Identity Verification */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-id-card me-2"></i>Identity Verification (KYC)</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="row">
													<div className="col-md-6 mb-3">
														<label className="form-label">Driver's License (Front) *</label>
														<input
															type="file"
															className="form-control"
															name="driverLicenseFront"
															onChange={handleFileChange}
															accept="image/*"
															required
														/>
														<small className="text-muted">Upload a clear photo of the front</small>
													</div>
													<div className="col-md-6 mb-3">
														<label className="form-label">Driver's License (Back) *</label>
														<input
															type="file"
															className="form-control"
															name="driverLicenseBack"
															onChange={handleFileChange}
															accept="image/*"
															required
														/>
														<small className="text-muted">Upload a clear photo of the back</small>
													</div>
													<div className="col-md-6 mb-3">
														<label className="form-label">Selfie Photo *</label>
														<input
															type="file"
															className="form-control"
															name="selfiePhoto"
															onChange={handleFileChange}
															accept="image/*"
															required
														/>
														<small className="text-muted">Take a clear selfie for verification</small>
													</div>
												</div>
											</div>
										</div>
									</section>

									{/* Trade-In Information */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-exchange-alt me-2"></i>Trade-In Vehicle (Optional)</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="form-check mb-3">
													<input
														className="form-check-input"
														type="checkbox"
														name="hasTradeIn"
														id="hasTradeIn"
														checked={formData.hasTradeIn}
														onChange={handleInputChange}
													/>
													<label className="form-check-label" htmlFor="hasTradeIn">
														I have a vehicle to trade in
													</label>
												</div>

												{formData.hasTradeIn && (
													<div className="row">
														<div className="col-md-6 mb-3">
															<label className="form-label">Trade-In VIN</label>
															<input
																type="text"
																className="form-control"
																name="tradeInVIN"
																value={formData.tradeInVIN}
																onChange={handleInputChange}
																placeholder="1HGBH41JXMN109186"
															/>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Year</label>
															<input
																type="number"
																className="form-control"
																name="tradeInYear"
																value={formData.tradeInYear}
																onChange={handleInputChange}
																placeholder="2020"
															/>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Make</label>
															<input
																type="text"
																className="form-control"
																name="tradeInMake"
																value={formData.tradeInMake}
																onChange={handleInputChange}
																placeholder="Honda"
															/>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Model</label>
															<input
																type="text"
																className="form-control"
																name="tradeInModel"
																value={formData.tradeInModel}
																onChange={handleInputChange}
																placeholder="Accord"
															/>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Mileage</label>
															<input
																type="number"
																className="form-control"
																name="tradeInMileage"
																value={formData.tradeInMileage}
																onChange={handleInputChange}
																placeholder="50000"
															/>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Condition</label>
															<select
																className="form-select"
																name="tradeInCondition"
																value={formData.tradeInCondition}
																onChange={handleInputChange}
															>
																<option value="excellent">Excellent</option>
																<option value="good">Good</option>
																<option value="fair">Fair</option>
																<option value="poor">Poor</option>
															</select>
														</div>
														<div className="col-12">
															<div className="alert alert-info">
																<strong>Estimated Trade-In Value: ${(vehicleData.tradeInValue || 0).toLocaleString()}</strong>
																<p className="mb-0 small">Final value subject to vehicle inspection</p>
															</div>
														</div>
													</div>
												)}
											</div>
										</div>
									</section>

									<div className="d-flex justify-content-between">
										<button type="button" className="btn btn-outline-secondary btn-lg" onClick={handlePrevStep}>
											<i className="fa fa-arrow-left me-2"></i>Back
										</button>
										<button type="button" className="btn btn-primary btn-lg" onClick={handleNextStep}>
											Continue <i className="fa fa-arrow-right ms-2"></i>
										</button>
									</div>
								</>
							)}

							{/* Step 3: Payment & Financing */}
							{currentStep === 3 && (
								<>
									{/* Payment Method Selection */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-credit-card me-2"></i>Payment Method</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="row">
													<div className="col-md-4 mb-3">
														<div className={`payment-method-card ${financingOption === 'cash' ? 'selected' : ''}`} onClick={() => setFinancingOption('cash')}>
															<input
																type="radio"
																name="financingOption"
																value="cash"
																checked={financingOption === 'cash'}
																onChange={(e) => setFinancingOption(e.target.value)}
															/>
															<i className="fa fa-money-bill-wave fa-2x mb-2"></i>
															<h6>Pay in Full</h6>
															<small className="text-muted">One-time payment</small>
														</div>
													</div>
													<div className="col-md-4 mb-3">
														<div className={`payment-method-card ${financingOption === 'financing' ? 'selected' : ''}`} onClick={() => setFinancingOption('financing')}>
															<input
																type="radio"
																name="financingOption"
																value="financing"
																checked={financingOption === 'financing'}
																onChange={(e) => setFinancingOption(e.target.value)}
															/>
															<i className="fa fa-file-invoice-dollar fa-2x mb-2"></i>
															<h6>Financing</h6>
															<small className="text-muted">Monthly payments</small>
														</div>
													</div>
													<div className="col-md-4 mb-3">
														<div className={`payment-method-card ${financingOption === 'lease' ? 'selected' : ''}`} onClick={() => setFinancingOption('lease')}>
															<input
																type="radio"
																name="financingOption"
																value="lease"
																checked={financingOption === 'lease'}
																onChange={(e) => setFinancingOption(e.target.value)}
															/>
															<i className="fa fa-calendar-alt fa-2x mb-2"></i>
															<h6>Lease</h6>
															<small className="text-muted">Lower monthly payments</small>
														</div>
													</div>
												</div>
											</div>
										</div>
									</section>

									{/* Financing Information */}
									{financingOption === 'financing' && (
										<section className="checkout-section mb-4">
											<div className="section-header">
												<h4><i className="fa fa-calculator me-2"></i>Financing Details</h4>
											</div>
											<div className="card shadow-sm">
												<div className="card-body">
													<div className="alert alert-info mb-4">
														<h6>Pre-Approved Financing Available!</h6>
														<p className="mb-0">Lender: Isam Auto Finance | APR: 4.9% | Terms: 36-72 months</p>
													</div>
													<div className="row">
														<div className="col-md-6 mb-3">
															<label className="form-label">Down Payment *</label>
															<input
																type="number"
																className="form-control"
																name="downPayment"
																value={formData.downPayment}
																onChange={handleInputChange}
																placeholder="5000"
																required
															/>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Loan Term *</label>
															<select
																className="form-select"
																name="loanTerm"
																value={formData.loanTerm}
																onChange={handleInputChange}
																required
															>
																<option value="36">36 months</option>
																<option value="48">48 months</option>
																<option value="60">60 months</option>
																<option value="72">72 months</option>
															</select>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Employment Status *</label>
															<select
																className="form-select"
																name="employmentStatus"
																value={formData.employmentStatus}
																onChange={handleInputChange}
																required
															>
																<option value="">Select Status</option>
																<option value="employed">Employed</option>
																<option value="self-employed">Self-Employed</option>
																<option value="retired">Retired</option>
															</select>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Annual Income *</label>
															<input
																type="number"
																className="form-control"
																name="annualIncome"
																value={formData.annualIncome}
																onChange={handleInputChange}
																placeholder="50000"
																required
															/>
														</div>
													</div>
													<div className="financing-summary bg-light p-3 rounded">
														<div className="d-flex justify-content-between mb-2">
															<span>Vehicle Price:</span>
															<strong>${getFinalPrice().toLocaleString()}</strong>
														</div>
														<div className="d-flex justify-content-between mb-2">
															<span>Down Payment:</span>
															<strong>${(formData.downPayment || 0).toLocaleString()}</strong>
														</div>
														<div className="d-flex justify-content-between mb-2">
															<span>Amount to Finance:</span>
															<strong>${(getFinalPrice() - (parseFloat(formData.downPayment) || 0)).toLocaleString()}</strong>
														</div>
														<div className="d-flex justify-content-between mb-2">
															<span>APR:</span>
															<strong>4.9%</strong>
														</div>
														<hr />
														<div className="d-flex justify-content-between mb-2">
															<span className="text-primary">Monthly Payment:</span>
															<strong className="text-primary fs-5">${calculateMonthlyPayment()}/mo</strong>
														</div>
														<div className="d-flex justify-content-between">
															<span>Total Cost Over Term:</span>
															<strong>${calculateTotalFinanced()}</strong>
														</div>
													</div>
												</div>
											</div>
										</section>
									)}

									{/* Payment Information */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-lock me-2"></i>Payment Information</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="payment-methods mb-3">
													<div className="form-check form-check-inline">
														<input
															className="form-check-input"
															type="radio"
															name="paymentMethod"
															id="creditCard"
															value="credit-card"
															checked={paymentMethod === 'credit-card'}
															onChange={(e) => setPaymentMethod(e.target.value)}
														/>
														<label className="form-check-label" htmlFor="creditCard">
															<i className="fa fa-credit-card me-1"></i>Credit/Debit Card
														</label>
													</div>
													<div className="form-check form-check-inline">
														<input
															className="form-check-input"
															type="radio"
															name="paymentMethod"
															id="bankTransfer"
															value="bank-transfer"
															checked={paymentMethod === 'bank-transfer'}
															onChange={(e) => setPaymentMethod(e.target.value)}
														/>
														<label className="form-check-label" htmlFor="bankTransfer">
															<i className="fa fa-university me-1"></i>Bank Transfer / ACH
														</label>
													</div>
												</div>

												{paymentMethod === 'credit-card' && (
													<div className="row">
														<div className="col-md-12 mb-3">
															<label className="form-label">Cardholder Name *</label>
															<input
																type="text"
																className="form-control"
																name="cardholderName"
																value={formData.cardholderName}
																onChange={handleInputChange}
																placeholder="John Doe"
																required
															/>
														</div>
														<div className="col-md-12 mb-3">
															<label className="form-label">Card Number *</label>
															<input
																type="text"
																className="form-control"
																name="cardNumber"
																value={formData.cardNumber}
																onChange={handleInputChange}
																placeholder="1234 5678 9012 3456"
																maxLength="19"
																required
															/>
															<div className="mt-2">
																<img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" width="40" />
																<img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" width="40" />
																<img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" width="40" />
															</div>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Expiry Date *</label>
															<input
																type="text"
																className="form-control"
																name="expiryDate"
																value={formData.expiryDate}
																onChange={handleInputChange}
																placeholder="MM/YY"
																maxLength="5"
																required
															/>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">CVV *</label>
															<input
																type="password"
																className="form-control"
																name="cvv"
																value={formData.cvv}
																onChange={handleInputChange}
																placeholder="123"
																maxLength="4"
																required
															/>
														</div>
													</div>
												)}

												{paymentMethod === 'bank-transfer' && (
													<div className="alert alert-info">
														<h6>Bank Transfer Instructions</h6>
														<p className="mb-0">After completing this order, you will receive wire transfer instructions via email.</p>
													</div>
												)}

												<div className="security-badges mt-3">
													<small className="text-muted">
														<i className="fa fa-lock me-1"></i>256-bit SSL Encryption
														<span className="mx-2">|</span>
														<i className="fa fa-shield-alt me-1"></i>PCI DSS Compliant
													</small>
												</div>
											</div>
										</div>
									</section>

									{/* Insurance Information */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-shield-alt me-2"></i>Insurance Information</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="form-check mb-3">
													<input
														className="form-check-input"
														type="checkbox"
														name="hasInsurance"
														id="hasInsurance"
														checked={formData.hasInsurance}
														onChange={handleInputChange}
													/>
													<label className="form-check-label" htmlFor="hasInsurance">
														I have existing insurance coverage
													</label>
												</div>

												{formData.hasInsurance && (
													<div className="row">
														<div className="col-md-6 mb-3">
															<label className="form-label">Insurance Provider *</label>
															<input
																type="text"
																className="form-control"
																name="insuranceProvider"
																value={formData.insuranceProvider}
																onChange={handleInputChange}
																placeholder="State Farm"
																required
															/>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Policy Number *</label>
															<input
																type="text"
																className="form-control"
																name="insurancePolicyNumber"
																value={formData.insurancePolicyNumber}
																onChange={handleInputChange}
																placeholder="POL-123456789"
																required
															/>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Coverage Start Date *</label>
															<input
																type="date"
																className="form-control"
																name="insuranceStartDate"
																value={formData.insuranceStartDate}
																onChange={handleInputChange}
																required
															/>
														</div>
														<div className="col-md-6 mb-3">
															<label className="form-label">Proof of Insurance *</label>
															<input
																type="file"
																className="form-control"
																name="proofOfInsurance"
																onChange={handleFileChange}
																accept=".pdf,image/*"
																required
															/>
														</div>
													</div>
												)}

												{!formData.hasInsurance && (
													<div className="alert alert-warning">
														<h6>Need Insurance?</h6>
														<p className="mb-2">We partner with leading insurance providers to get you the best rates.</p>
														<button type="button" className="btn btn-sm btn-warning">Get Insurance Quote</button>
													</div>
												)}
											</div>
										</div>
									</section>

									{/* Delivery/Pickup Selection */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-truck me-2"></i>Delivery or Pickup</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="row">
													<div className="col-md-6 mb-3">
														<div className={`delivery-option-card ${formData.deliveryOption === 'pickup' ? 'selected' : ''}`} onClick={() => setFormData(prev => ({...prev, deliveryOption: 'pickup'}))}>
															<input
																type="radio"
																name="deliveryOption"
																value="pickup"
																checked={formData.deliveryOption === 'pickup'}
																onChange={handleInputChange}
															/>
															<i className="fa fa-store fa-2x mb-2"></i>
															<h6>Dealership Pickup</h6>
															<small className="text-muted">FREE</small>
															<p className="small mt-2 mb-0">Main Dealership<br />123 Auto Blvd, City, ST 12345</p>
														</div>
													</div>
													<div className="col-md-6 mb-3">
														<div className={`delivery-option-card ${formData.deliveryOption === 'delivery' ? 'selected' : ''}`} onClick={() => setFormData(prev => ({...prev, deliveryOption: 'delivery'}))}>
															<input
																type="radio"
																name="deliveryOption"
																value="delivery"
																checked={formData.deliveryOption === 'delivery'}
																onChange={handleInputChange}
															/>
															<i className="fa fa-home fa-2x mb-2"></i>
															<h6>Home Delivery</h6>
															<small className="text-success">+$299</small>
															<p className="small mt-2 mb-0">Delivered to your doorstep</p>
														</div>
													</div>
												</div>

												{formData.deliveryOption === 'delivery' && (
													<div className="row mt-3">
														<div className="col-md-12 mb-3">
															<label className="form-label">Delivery Address *</label>
															<input
																type="text"
																className="form-control"
																name="deliveryAddress"
																value={formData.deliveryAddress}
																onChange={handleInputChange}
																placeholder="123 Home Street"
																required
															/>
														</div>
														<div className="col-md-4 mb-3">
															<label className="form-label">City *</label>
															<input
																type="text"
																className="form-control"
																name="deliveryCity"
																value={formData.deliveryCity}
																onChange={handleInputChange}
																required
															/>
														</div>
														<div className="col-md-4 mb-3">
															<label className="form-label">State *</label>
															<select
																className="form-select"
																name="deliveryState"
																value={formData.deliveryState}
																onChange={handleInputChange}
																required
															>
																<option value="">Select State</option>
																<option value="CA">California</option>
																<option value="TX">Texas</option>
																<option value="FL">Florida</option>
															</select>
														</div>
														<div className="col-md-4 mb-3">
															<label className="form-label">ZIP Code *</label>
															<input
																type="text"
																className="form-control"
																name="deliveryZipCode"
																value={formData.deliveryZipCode}
																onChange={handleInputChange}
																required
															/>
														</div>
														<div className="col-md-12 mb-3">
															<label className="form-label">Preferred Delivery Date *</label>
															<input
																type="date"
																className="form-control"
																name="deliveryDate"
																value={formData.deliveryDate}
																onChange={handleInputChange}
																min={new Date().toISOString().split('T')[0]}
																required
															/>
														</div>
													</div>
												)}

												<div className="alert alert-info mt-3 mb-0">
													<strong>Required Documents at Pickup/Delivery:</strong>
													<ul className="mb-0 mt-2">
														<li>Valid Driver's License</li>
														<li>Proof of Insurance</li>
														<li>Photo ID</li>
													</ul>
												</div>
											</div>
										</div>
									</section>

									<div className="d-flex justify-content-between">
										<button type="button" className="btn btn-outline-secondary btn-lg" onClick={handlePrevStep}>
											<i className="fa fa-arrow-left me-2"></i>Back
										</button>
										<button type="button" className="btn btn-primary btn-lg" onClick={handleNextStep}>
											Review Order <i className="fa fa-arrow-right ms-2"></i>
										</button>
									</div>
								</>
							)}

							{/* Step 4: Review & Confirmation */}
							{currentStep === 4 && (
								<>
									{/* Order Review */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-clipboard-check me-2"></i>Order Review</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<h6 className="mb-3">Vehicle Details</h6>
												<p className="mb-1"><strong>{vehicleData.year} {vehicleData.make} {vehicleData.model}</strong></p>
												<p className="mb-3 text-muted small">VIN: {vehicleData.vin}</p>

												<h6 className="mb-3 mt-4">Personal Information</h6>
												<div className="row">
													<div className="col-md-6 mb-2">
														<small className="text-muted">Name:</small>
														<p className="mb-0">{formData.fullName || "Not provided"}</p>
													</div>
													<div className="col-md-6 mb-2">
														<small className="text-muted">Email:</small>
														<p className="mb-0">{formData.email || "Not provided"}</p>
													</div>
													<div className="col-md-6 mb-2">
														<small className="text-muted">Phone:</small>
														<p className="mb-0">{formData.phone || "Not provided"}</p>
													</div>
													<div className="col-md-6 mb-2">
														<small className="text-muted">Address:</small>
														<p className="mb-0">{formData.address || "Not provided"}</p>
													</div>
												</div>

												<h6 className="mb-3 mt-4">Payment Method</h6>
												<p className="mb-0">
													{financingOption === 'cash' && "Pay in Full"}
													{financingOption === 'financing' && `Financing - ${formData.loanTerm} months at 4.9% APR`}
													{financingOption === 'lease' && "Lease"}
												</p>

												<h6 className="mb-3 mt-4">Delivery Method</h6>
												<p className="mb-0">
													{formData.deliveryOption === 'pickup' ? "Dealership Pickup" : `Home Delivery - ${formData.deliveryDate}`}
												</p>

												<div className="d-flex justify-content-end mt-3">
													<button type="button" className="btn btn-sm btn-outline-primary" onClick={() => setCurrentStep(1)}>
														<i className="fa fa-edit me-1"></i>Edit Details
													</button>
												</div>
											</div>
										</div>
									</section>

									{/* Legal & Compliance */}
									<section className="checkout-section mb-4">
										<div className="section-header">
											<h4><i className="fa fa-gavel me-2"></i>Legal & Compliance</h4>
										</div>
										<div className="card shadow-sm">
											<div className="card-body">
												<div className="form-group mb-3">
													<label className="form-label" htmlFor="agreeTerms">
														I agree to the <a href="#" className="text-primary">Terms & Conditions</a> and <a href="#" className="text-primary">Sales Agreement</a> *
													</label>
													<select
														className="form-select"
														name="agreeTerms"
														id="agreeTerms"
														value={formData.agreeTerms}
														onChange={handleInputChange}
														required
													>
														<option value="disagree">I Do Not Agree</option>
														<option value="agree">I Agree</option>
													</select>
												</div>
												<div className="form-group mb-3">
													<label className="form-label" htmlFor="agreePrivacyPolicy">
														I agree to the <a href="#" className="text-primary">Privacy Policy</a> *
													</label>
													<select
														className="form-select"
														name="agreePrivacyPolicy"
														id="agreePrivacyPolicy"
														value={formData.agreePrivacyPolicy}
														onChange={handleInputChange}
														required
													>
														<option value="disagree">I Do Not Agree</option>
														<option value="agree">I Agree</option>
													</select>
												</div>
												{financingOption === 'financing' && (
													<div className="form-group mb-3">
														<label className="form-label" htmlFor="agreeCreditCheck">
															I authorize a credit check for financing approval *
														</label>
														<select
															className="form-select"
															name="agreeCreditCheck"
															id="agreeCreditCheck"
															value={formData.agreeCreditCheck}
															onChange={handleInputChange}
															required
														>
															<option value="disagree">I Do Not Agree</option>
															<option value="agree">I Agree</option>
														</select>
													</div>
												)}
												<div className="form-group mb-3">
													<label className="form-label" htmlFor="agreeElectronicSignature">
														I consent to electronic document signing and communication *
													</label>
													<select
														className="form-select"
														name="agreeElectronicSignature"
														id="agreeElectronicSignature"
														value={formData.agreeElectronicSignature}
														onChange={handleInputChange}
														required
													>
														<option value="disagree">I Do Not Agree</option>
														<option value="agree">I Agree</option>
													</select>
												</div>

												<div className="alert alert-secondary mt-4">
													<h6>Return/Refund Policy</h6>
													<p className="mb-0 small">You have 7 days or 500 miles (whichever comes first) to return the vehicle for a full refund, subject to inspection.</p>
												</div>
											</div>
										</div>
									</section>

									<div className="d-flex justify-content-between">
										<button type="button" className="btn btn-outline-secondary btn-lg" onClick={handlePrevStep}>
											<i className="fa fa-arrow-left me-2"></i>Back
										</button>
										<button 
											type="submit" 
											className="btn btn-success btn-lg"
											disabled={isProcessing || formData.agreeTerms !== "agree" || formData.agreePrivacyPolicy !== "agree" || formData.agreeElectronicSignature !== "agree" || (financingOption === 'financing' && formData.agreeCreditCheck !== "agree")}
										>
											{isProcessing ? (
												<><i className="fa fa-spinner fa-spin me-2"></i>Processing...</>
											) : (
												<><i className="fa fa-lock me-2"></i>Finalize Purchase - ${getFinalPrice().toLocaleString()}</>
											)}
										</button>
									</div>
								</>
							)}
						</form>
					</div>

					{/* Sidebar - Order Summary */}
					<div className="col-lg-4">
						<div className="order-summary-sidebar sticky-top" style={{ top: "20px" }}>
							<div className="card shadow-sm">
								<div className="card-header bg-primary text-white">
									<h5 className="mb-0"><i className="fa fa-shopping-cart me-2"></i>Order Summary</h5>
								</div>
								<div className="card-body">
									<div className="summary-vehicle mb-3">
										<img src={vehicleData.image} alt={vehicleData.title} className="img-fluid rounded mb-2" />
										<h6>{vehicleData.year} {vehicleData.make} {vehicleData.model}</h6>
										<small className="text-muted">{typeof vehicleData.trim === 'string' ? vehicleData.trim : vehicleData.trim?.title || 'N/A'}</small>
									</div>

									<hr />

									<div className="summary-pricing">
										<div className="d-flex justify-content-between mb-2">
											<span>Base Price</span>
											<span>${(vehicleData.basePrice || 0).toLocaleString()}</span>
										</div>
										<div className="d-flex justify-content-between mb-2">
											<span>Taxes & Fees</span>
											<span>${((vehicleData.taxes || 0) + (vehicleData.fees || 0) + (vehicleData.registrationFee || 0) + (vehicleData.documentationFee || 0)).toLocaleString()}</span>
										</div>
										{formData.extendedWarranty && (
											<div className="d-flex justify-content-between mb-2 text-primary">
												<span>Extended Warranty</span>
												<span>+$2,500</span>
											</div>
										)}
										{formData.gapInsurance && (
											<div className="d-flex justify-content-between mb-2 text-primary">
												<span>GAP Insurance</span>
												<span>+$895</span>
											</div>
										)}
										{formData.maintenancePlan && (
											<div className="d-flex justify-content-between mb-2 text-primary">
												<span>Maintenance Plan</span>
												<span>+$1,500</span>
											</div>
										)}
										{formData.tireProtection && (
											<div className="d-flex justify-content-between mb-2 text-primary">
												<span>Tire Protection</span>
												<span>+$450</span>
											</div>
										)}
										{formData.deliveryOption === 'delivery' && (
											<div className="d-flex justify-content-between mb-2 text-primary">
												<span>Home Delivery</span>
												<span>+$299</span>
											</div>
										)}
												{formData.hasTradeIn && (
													<div className="d-flex justify-content-between mb-2 text-success">
														<span>Trade-In Value</span>
														<span>-${(vehicleData.tradeInValue || 0).toLocaleString()}</span>
													</div>
												)}
												<div className="d-flex justify-content-between mb-2 text-success">
													<span>Discounts</span>
													<span>-${(vehicleData.discounts || 0).toLocaleString()}</span>
												</div>										<hr />
										
										<div className="d-flex justify-content-between mb-3">
											<strong>Total Price</strong>
											<strong className="text-primary fs-5">${getFinalPrice().toLocaleString()}</strong>
										</div>

										{financingOption === 'financing' && formData.downPayment && (
											<>
												<div className="d-flex justify-content-between mb-2">
													<span>Down Payment</span>
													<span>${parseFloat(formData.downPayment).toLocaleString()}</span>
												</div>
												<div className="d-flex justify-content-between mb-2">
													<span>Monthly Payment</span>
													<strong className="text-success">${calculateMonthlyPayment()}/mo</strong>
												</div>
											</>
										)}
									</div>

									<hr />

									<div className="security-info text-center">
										<small className="text-muted">
											<i className="fa fa-lock me-1"></i>Secure 256-bit SSL Encryption
										</small>
										<div className="mt-2">
											<img src="https://img.icons8.com/color/48/000000/ssl.png" alt="SSL" width="30" />
											<img src="https://img.icons8.com/color/48/000000/verified-badge.png" alt="Verified" width="30" />
										</div>
									</div>
								</div>
							</div>

							{/* Help Card */}
							<div className="card shadow-sm mt-3">
								<div className="card-body text-center">
									<i className="fa fa-headset fa-2x mb-2 text-primary"></i>
									<h6>Need Help?</h6>
									<p className="small mb-2">Our team is here to assist you</p>
									<p className="mb-2"><i className="fa fa-phone me-1"></i>(555) 123-4567</p>
									<p className="mb-0 small text-muted">Mon-Sat: 9AM - 8PM</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Header2 from "@/components/headers/Header2";
import Footer1 from "@/components/footers/Footer1";
import "./ServiceBooking.scss";

export default function ServiceBooking() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		serviceCategory: "",
		workshopLocation: "",
		preferredDate: "",
		problemDescription: "",
		contactName: "",
		contactEmail: "",
		contactPhone: "",
		vehicleMake: "",
		vehicleModel: "",
		vehicleYear: "",
		vehicleVIN: "",
		images: [],
		videos: [],
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showBookingModal, setShowBookingModal] = useState(false);
	const [selectedService, setSelectedService] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e) => {
		const { name, files } = e.target;
		setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate submission
		setTimeout(() => {
			Swal.fire({
				title: "Booking Submitted!",
				text: "Your service booking has been received. You will receive a confirmation email shortly.",
				icon: "success",
				confirmButtonText: "OK",
			}).then(() => {
				setShowBookingModal(false);
				navigate("/service-status");
			});
			setIsSubmitting(false);
		}, 2000);
	};

	const handleServiceCardClick = (serviceName) => {
		setSelectedService(serviceName);
		setFormData(prev => ({ ...prev, serviceCategory: serviceName }));
		setShowBookingModal(true);
	};

	const handleBookNowClick = () => {
		setShowBookingModal(true);
	};

	const serviceCategories = [
		"General Maintenance",
		"Engine Repair",
		"AC Repair",
		"Electrical Repair",
		"Paint & Body Work",
	];

	const workshopLocations = [
		"Main Workshop - 123 Auto Blvd, City, ST 12345",
		"Downtown Branch - 456 Repair St, City, ST 12346",
		"North Side - 789 Service Ave, City, ST 12347",
	];

	return (
		<>
			<div className="header-fixed">
				<Header2 />
			</div>
			<div className="service-booking">
				{/* Hero Section */}
				<section className="hero-section text-white py-5">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeInLeft">
								Professional Car Repair & Service
							</h1>
							<p className="lead mb-4 animate__animated animate__fadeInLeft animate__delay-1s">
								Expert automotive repair services from ISAM Auto's certified technicians. 
								Keep your vehicle running smoothly and safely with our comprehensive maintenance and repair solutions.
							</p>
							<div className="d-flex gap-3">
								<button 
									className="btn btn-light btn-lg"
									onClick={handleBookNowClick}
								>
									<i className="fa fa-calendar me-2"></i>Book Service Now
								</button>
								<button className="btn btn-outline-light btn-lg">
									<i className="fa fa-phone me-2"></i>Call (555) 123-4567
								</button>
							</div>
						</div>
						<div className="col-lg-6 animate__animated animate__fadeInRight">
							<img 
								src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600&q=80" 
								alt="ISAM Auto Workshop" 
								className="img-fluid rounded shadow"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Key Service Details */}
			<section className="py-5 bg-light">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<h2 className="mb-4">What We Offer</h2>
							<div className="row">
								<div className="col-md-6 mb-3">
									<div 
										className="card h-100 border-0 shadow-sm service-card"
										onClick={() => handleServiceCardClick('General Maintenance')}
										style={{ cursor: 'pointer' }}
									>
										<div className="card-body text-center">
											<i className="fa fa-tools fa-3x text-primary mb-3"></i>
											<h5>General Maintenance</h5>
											<p className="text-muted">Oil changes, tire rotations, brake inspections, and routine check-ups</p>
										</div>
									</div>
								</div>
								<div className="col-md-6 mb-3">
									<div 
										className="card h-100 border-0 shadow-sm service-card"
										onClick={() => handleServiceCardClick('Engine Repair')}
										style={{ cursor: 'pointer' }}
									>
										<div className="card-body text-center">
											<i className="fa fa-cog fa-3x text-primary mb-3"></i>
											<h5>Engine Repair</h5>
											<p className="text-muted">Complete engine diagnostics, repairs, and performance optimization</p>
										</div>
									</div>
								</div>
								<div className="col-md-6 mb-3">
									<div 
										className="card h-100 border-0 shadow-sm service-card"
										onClick={() => handleServiceCardClick('AC Repair')}
										style={{ cursor: 'pointer' }}
									>
										<div className="card-body text-center">
											<i className="fa fa-snowflake fa-3x text-primary mb-3"></i>
											<h5>AC Repair</h5>
											<p className="text-muted">Air conditioning system repair, recharge, and maintenance</p>
										</div>
									</div>
								</div>
								<div className="col-md-6 mb-3">
									<div 
										className="card h-100 border-0 shadow-sm service-card"
										onClick={() => handleServiceCardClick('Electrical Repair')}
										style={{ cursor: 'pointer' }}
									>
										<div className="card-body text-center">
											<i className="fa fa-bolt fa-3x text-primary mb-3"></i>
											<h5>Electrical Repair</h5>
											<p className="text-muted">Battery replacement, wiring repairs, and electrical diagnostics</p>
										</div>
									</div>
								</div>
								<div className="col-md-6 mb-3">
									<div 
										className="card h-100 border-0 shadow-sm service-card"
										onClick={() => handleServiceCardClick('Paint & Body Work')}
										style={{ cursor: 'pointer' }}
									>
										<div className="card-body text-center">
											<i className="fa fa-paint-brush fa-3x text-primary mb-3"></i>
											<h5>Paint & Body Work</h5>
											<p className="text-muted">Collision repair, painting, dent removal, and body panel replacement</p>
										</div>
									</div>
								</div>
								<div className="col-md-6 mb-3">
									<div 
										className="card h-100 border-0 shadow-sm service-card"
										onClick={() => handleServiceCardClick('Problem Documentation')}
										style={{ cursor: 'pointer' }}
									>
										<div className="card-body text-center">
											<i className="fa fa-upload fa-3x text-primary mb-3"></i>
											<h5>Problem Documentation</h5>
											<p className="text-muted">Upload photos and videos of issues for accurate diagnosis</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits */}
			<section className="py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<h2 className="mb-4">Why Choose ISAM Auto?</h2>
							<div className="row">
								<div className="col-md-6 mb-4">
									<div className="d-flex align-items-start">
										<i className="fa fa-check-circle fa-2x text-success me-3 mt-1"></i>
										<div className="text-start">
											<h5>Certified Technicians</h5>
											<p className="text-muted mb-0">ASE-certified mechanics with years of experience</p>
										</div>
									</div>
								</div>
								<div className="col-md-6 mb-4">
									<div className="d-flex align-items-start">
										<i className="fa fa-clock fa-2x text-success me-3 mt-1"></i>
										<div className="text-start">
											<h5>Fast Turnaround</h5>
											<p className="text-muted mb-0">Most repairs completed same day or next day</p>
										</div>
									</div>
								</div>
								<div className="col-md-6 mb-4">
									<div className="d-flex align-items-start">
										<i className="fa fa-shield-alt fa-2x text-success me-3 mt-1"></i>
										<div className="text-start">
											<h5>Warranty Protection</h5>
											<p className="text-muted mb-0">12-month/12,000-mile warranty on all repairs</p>
										</div>
									</div>
								</div>
								<div className="col-md-6 mb-4">
									<div className="d-flex align-items-start">
										<i className="fa fa-dollar-sign fa-2x text-success me-3 mt-1"></i>
										<div className="text-start">
											<h5>Competitive Pricing</h5>
											<p className="text-muted mb-0">Transparent pricing with no hidden fees</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section className="py-5 bg-light">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<h2 className="mb-4">Service Pricing</h2>
							<p className="lead mb-4">Starting prices for our most popular services</p>
							<div className="row">
								<div className="col-md-4 mb-3">
									<div className="card h-100 border-0 shadow-sm">
										<div className="card-body">
											<h5>Oil Change</h5>
											<div className="display-6 text-primary mb-2">$39.99</div>
											<small className="text-muted">Synthetic oil included</small>
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="card h-100 border-0 shadow-sm">
										<div className="card-body">
											<h5>Brake Service</h5>
											<div className="display-6 text-primary mb-2">$149.99</div>
											<small className="text-muted">Per axle, parts included</small>
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="card h-100 border-0 shadow-sm">
										<div className="card-body">
											<h5>AC Recharge</h5>
											<div className="display-6 text-primary mb-2">$89.99</div>
											<small className="text-muted">R-134a refrigerant</small>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-4">
								<button className="btn btn-primary btn-lg">
									<i className="fa fa-calculator me-2"></i>Request Detailed Quote
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<h2 className="mb-4">How It Works</h2>
							<div className="row">
								<div className="col-md-3 mb-4">
									<div className="mx-auto mb-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
										<span className="badge bg-primary rounded-circle p-3 fs-4">1</span>
									</div>
									<h5>Book Online</h5>
									<p className="text-muted">Fill out our simple booking form with your vehicle details</p>
								</div>
								<div className="col-md-3 mb-4">
									<div className="mx-auto mb-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
										<span className="badge bg-primary rounded-circle p-3 fs-4">2</span>
									</div>
									<h5>Diagnosis</h5>
									<p className="text-muted">Our technicians inspect and diagnose the issue</p>
								</div>
								<div className="col-md-3 mb-4">
									<div className="mx-auto mb-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
										<span className="badge bg-primary rounded-circle p-3 fs-4">3</span>
									</div>
									<h5>Repair</h5>
									<p className="text-muted">We perform the necessary repairs using quality parts</p>
								</div>
								<div className="col-md-3 mb-4">
									<div className="mx-auto mb-3" style={{width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
										<span className="badge bg-primary rounded-circle p-3 fs-4">4</span>
									</div>
									<h5>Pickup</h5>
									<p className="text-muted">Your vehicle is ready for pickup with full warranty</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Photos */}
			<section className="py-5 bg-light">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<h2 className="mb-4">Our Workshop</h2>
							<div className="row">
								<div className="col-md-4 mb-3">
									<img 
										src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400" 
										alt="Modern Workshop" 
										className="img-fluid rounded shadow"
									/>
									<p className="mt-2 text-muted">State-of-the-art facility</p>
								</div>
								<div className="col-md-4 mb-3">
									<img 
										src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" 
										alt="Certified Technicians" 
										className="img-fluid rounded shadow"
									/>
									<p className="mt-2 text-muted">ASE-certified technicians</p>
								</div>
								<div className="col-md-4 mb-3">
									<img 
										src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400" 
										alt="Quality Parts" 
										className="img-fluid rounded shadow"
									/>
									<p className="mt-2 text-muted">Genuine OEM parts</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Related Services */}
			<section className="py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<h2 className="mb-4">Related Services</h2>
							<div className="row">
								<div className="col-md-4 mb-3">
									<div className="card h-100 border-0 shadow-sm">
										<div className="card-body">
											<i className="fa fa-car fa-3x text-primary mb-3"></i>
											<h5>Car Sales</h5>
											<p className="text-muted">Browse our inventory of quality pre-owned vehicles</p>
											<Link to="/car-list" className="btn btn-outline-primary">View Cars</Link>
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="card h-100 border-0 shadow-sm">
										<div className="card-body">
											<i className="fa fa-chart-line fa-3x text-primary mb-3"></i>
											<h5>Service Status</h5>
											<p className="text-muted">Track your current and past service bookings</p>
											<Link to="/service-status" className="btn btn-outline-primary">Check Status</Link>
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="card h-100 border-0 shadow-sm">
										<div className="card-body">
											<i className="fa fa-phone fa-3x text-primary mb-3"></i>
											<h5>Contact Us</h5>
											<p className="text-muted">Get in touch for questions or emergency repairs</p>
											<Link to="/contact" className="btn btn-outline-primary">Contact</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQs */}
			<section className="py-5 bg-light">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto">
							<h2 className="text-center mb-4">Frequently Asked Questions</h2>
							<div className="accordion" id="faqAccordion">
								<div className="accordion-item">
									<h2 className="accordion-header">
										<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
											How long does a typical repair take?
										</button>
									</h2>
									<div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
										<div className="accordion-body">
											Most repairs are completed within 1-3 business days. Simple services like oil changes take about 1 hour, while major repairs may take longer. We'll provide you with an estimated completion time when you book.
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
											Do you provide warranties on repairs?
										</button>
									</h2>
									<div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
										<div className="accordion-body">
											Yes, we offer a comprehensive 12-month or 12,000-mile warranty on all repair work and parts (whichever comes first). This ensures your peace of mind and covers any issues that may arise after the repair.
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
											What payment methods do you accept?
										</button>
									</h2>
									<div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
										<div className="accordion-body">
											We accept all major credit cards, debit cards, cash, and financing options. For larger repairs, we can also arrange payment plans. All transactions are secure and protected.
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header">
										<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
											Can I drop off my car for service?
										</button>
									</h2>
									<div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
										<div className="accordion-body">
											Absolutely! We offer convenient drop-off service at all our locations. Our courtesy shuttle can also pick you up and take you home while your vehicle is being serviced.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Trust Elements */}
			<section className="py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mx-auto text-center">
							<h2 className="mb-4">Why Trust ISAM Auto?</h2>
							<div className="row">
								<div className="col-md-4 mb-4">
									<div className="trust-element">
										<i className="fa fa-certificate fa-3x text-warning mb-3"></i>
										<h5>ASE Certified</h5>
										<p className="text-muted">All technicians are ASE-certified professionals</p>
									</div>
								</div>
								<div className="col-md-4 mb-4">
									<div className="trust-element">
										<i className="fa fa-star fa-3x text-warning mb-3"></i>
										<h5>4.8/5 Rating</h5>
										<p className="text-muted">Over 10,000 satisfied customers</p>
									</div>
								</div>
								<div className="col-md-4 mb-4">
									<div className="trust-element">
										<i className="fa fa-shield-alt fa-3x text-warning mb-3"></i>
										<h5>12-Month Warranty</h5>
										<p className="text-muted">Comprehensive warranty on all repairs</p>
									</div>
								</div>
							</div>
							<div className="mt-4">
								<p className="lead">Licensed • Insured • Family Owned Since 2010</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			</div>

			{/* Booking Modal */}
			<div className={`modal fade ${showBookingModal ? 'show' : ''}`} style={{ display: showBookingModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="bookingModalLabel" aria-hidden={!showBookingModal}>
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header" style={{ backgroundColor: "#E90A1D", color: "white" }}>
							<h5 className="modal-title" id="bookingModalLabel">
								<i className="fa fa-calendar-check me-2"></i>Book Your Service Today
							</h5>
							<button type="button" className="btn-close btn-close-white" onClick={() => setShowBookingModal(false)} aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<p className="lead text-center mb-4">
								Fill out the form below to schedule your vehicle service appointment.
							</p>

							<form onSubmit={handleSubmit}>
								{/* Service Details */}
								<div className="mb-4">
									<div className="section-header">
										<h4>
											<i className="fa fa-tools me-2"></i>Service Details
										</h4>
									</div>
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label">Service Category *</label>
											<select
												className="form-select"
												name="serviceCategory"
												value={formData.serviceCategory}
												onChange={handleInputChange}
												required
											>
												<option value="">Select Category</option>
												{serviceCategories.map((category) => (
													<option key={category} value={category}>
														{category}
													</option>
												))}
											</select>
										</div>
										<div className="col-md-6 mb-3">
											<label className="form-label">Workshop Location *</label>
											<select
												className="form-select"
												name="workshopLocation"
												value={formData.workshopLocation}
												onChange={handleInputChange}
												required
											>
												<option value="">Select Location</option>
												{workshopLocations.map((location) => (
													<option key={location} value={location}>
														{location}
													</option>
												))}
											</select>
										</div>
										<div className="col-md-6 mb-3">
											<label className="form-label">Preferred Date *</label>
											<input
												type="date"
												className="form-control"
												name="preferredDate"
												value={formData.preferredDate}
												onChange={handleInputChange}
												min={new Date().toISOString().split("T")[0]}
												required
											/>
										</div>
										<div className="col-12 mb-3">
											<label className="form-label">Problem Description *</label>
											<textarea
												className="form-control"
												name="problemDescription"
												value={formData.problemDescription}
												onChange={handleInputChange}
												rows="3"
												placeholder="Describe the issue with your vehicle..."
												required
											></textarea>
										</div>
									</div>
								</div>

								{/* Vehicle Information */}
								<div className="mb-4">
									<div className="section-header">
										<h4>
											<i className="fa fa-car me-2"></i>Vehicle Information
										</h4>
									</div>
									<div className="row">
										<div className="col-md-4 mb-3">
											<label className="form-label">Make *</label>
											<input
												type="text"
												className="form-control"
												name="vehicleMake"
												value={formData.vehicleMake}
												onChange={handleInputChange}
												required
											/>
										</div>
										<div className="col-md-4 mb-3">
											<label className="form-label">Model *</label>
											<input
												type="text"
												className="form-control"
												name="vehicleModel"
												value={formData.vehicleModel}
												onChange={handleInputChange}
												required
											/>
										</div>
										<div className="col-md-4 mb-3">
											<label className="form-label">Year *</label>
											<input
												type="number"
												className="form-control"
												name="vehicleYear"
												value={formData.vehicleYear}
												onChange={handleInputChange}
												min="1900"
												max={new Date().getFullYear() + 1}
												required
											/>
										</div>
										<div className="col-12 mb-3">
											<label className="form-label">VIN (Optional)</label>
											<input
												type="text"
												className="form-control"
												name="vehicleVIN"
												value={formData.vehicleVIN}
												onChange={handleInputChange}
												placeholder="Vehicle Identification Number"
											/>
										</div>
									</div>
								</div>

								{/* Contact Information */}
								<div className="mb-4">
									<div className="section-header">
										<h4>
											<i className="fa fa-user me-2"></i>Contact Information
										</h4>
									</div>
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label">Full Name *</label>
											<input
												type="text"
												className="form-control"
												name="contactName"
												value={formData.contactName}
												onChange={handleInputChange}
												required
											/>
										</div>
										<div className="col-md-6 mb-3">
											<label className="form-label">Email *</label>
											<input
												type="email"
												className="form-control"
												name="contactEmail"
												value={formData.contactEmail}
												onChange={handleInputChange}
												required
											/>
										</div>
										<div className="col-md-6 mb-3">
											<label className="form-label">Phone *</label>
											<input
												type="tel"
												className="form-control"
												name="contactPhone"
												value={formData.contactPhone}
												onChange={handleInputChange}
												required
											/>
										</div>
									</div>
								</div>

								{/* File Uploads */}
								<div className="mb-4">
									<div className="section-header">
										<h4>
											<i className="fa fa-upload me-2"></i>Upload Problem Images/Videos
										</h4>
									</div>
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label">Images (Optional)</label>
											<input
												type="file"
												className="form-control"
												name="images"
												onChange={handleFileChange}
												multiple
												accept="image/*"
											/>
											<small className="text-muted">Upload up to 5 images</small>
										</div>
										<div className="col-md-6 mb-3">
											<label className="form-label">Videos (Optional)</label>
											<input
												type="file"
												className="form-control"
												name="videos"
												onChange={handleFileChange}
												multiple
												accept="video/*"
											/>
											<small className="text-muted">Upload up to 2 videos</small>
										</div>
									</div>
								</div>

								{/* Submit Button */}
								<div className="text-center">
									<button
										type="submit"
										className="btn btn-primary btn-lg"
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<>
												<i className="fa fa-spinner fa-spin me-2"></i>Submitting...
											</>
										) : (
											<>
												<i className="fa fa-calendar-check me-2"></i>Book Service
											</>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* Modal Backdrop */}
			{showBookingModal && <div className="modal-backdrop fade show" onClick={() => setShowBookingModal(false)}></div>}
			<Footer1 />
		</>
	);
}
import React, { useState, useMemo } from "react";
import Header1 from "../../components/headers/Header1";
import Footer1 from "../../components/footers/Footer1";

export default function ServiceStatus() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [isLoading, setIsLoading] = useState(false);

	// Mock data for service bookings with more comprehensive information
	const [bookings] = useState([
		{
			id: "SRV-2025-001",
			serviceCategory: "Engine Repair",
			workshopLocation: "Main Workshop - 123 Auto Blvd, City, ST 12345",
			preferredDate: "2025-12-10",
			status: "Pending",
			vehicle: "2023 Toyota Camry",
			assignedMechanic: null,
			estimatedCompletion: "2025-12-12",
			notes: "Customer reported engine knocking sound",
			priority: "High",
			contactInfo: {
				phone: "(555) 123-4567",
				email: "main@isamauto.com"
			},
			progress: 0,
			lastUpdated: "2025-12-06T10:30:00Z"
		},
		{
			id: "SRV-2025-002",
			serviceCategory: "General Maintenance",
			workshopLocation: "Downtown Branch - 456 Repair St, City, ST 12346",
			preferredDate: "2025-12-08",
			status: "In Progress",
			vehicle: "2022 Honda Civic",
			assignedMechanic: "John Smith",
			estimatedCompletion: "2025-12-09",
			notes: "Oil change and tire rotation",
			priority: "Medium",
			contactInfo: {
				phone: "(555) 234-5678",
				email: "downtown@isamauto.com"
			},
			progress: 50,
			lastUpdated: "2025-12-06T14:15:00Z"
		},
		{
			id: "SRV-2025-003",
			serviceCategory: "AC Repair",
			workshopLocation: "North Side - 789 Service Ave, City, ST 12347",
			preferredDate: "2025-12-05",
			status: "Completed",
			vehicle: "2021 Ford F-150",
			assignedMechanic: "Mike Johnson",
			estimatedCompletion: "2025-12-06",
			notes: "AC compressor replacement",
			priority: "Low",
			contactInfo: {
				phone: "(555) 345-6789",
				email: "north@isamauto.com"
			},
			progress: 100,
			lastUpdated: "2025-12-06T16:45:00Z"
		},
		{
			id: "SRV-2025-004",
			serviceCategory: "Brake Service",
			workshopLocation: "South Branch - 321 Brake Ln, City, ST 12348",
			preferredDate: "2025-12-07",
			status: "In Progress",
			vehicle: "2020 Chevrolet Silverado",
			assignedMechanic: "Sarah Davis",
			estimatedCompletion: "2025-12-08",
			notes: "Brake pads and rotors replacement",
			priority: "High",
			contactInfo: {
				phone: "(555) 456-7890",
				email: "south@isamauto.com"
			},
			progress: 75,
			lastUpdated: "2025-12-06T11:20:00Z"
		}
	]);

	const getStatusColor = (status) => {
		switch (status) {
			case "Pending":
				return "warning";
			case "In Progress":
				return "info";
			case "Completed":
				return "success";
			case "Cancelled":
				return "danger";
			default:
				return "secondary";
		}
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case "Pending":
				return "fa-clock";
			case "In Progress":
				return "fa-cog fa-spin";
			case "Completed":
				return "fa-check-circle";
			case "Cancelled":
				return "fa-times-circle";
			default:
				return "fa-question-circle";
		}
	};

	const getPriorityColor = (priority) => {
		switch (priority) {
			case "High":
				return "danger";
			case "Medium":
				return "warning";
			case "Low":
				return "success";
			default:
				return "secondary";
		}
	};

	// Filter and search bookings
	const filteredBookings = useMemo(() => {
		return bookings.filter((booking) => {
			const matchesSearch =
				booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
				booking.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
				booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
				booking.workshopLocation.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesStatus = statusFilter === "all" || booking.status === statusFilter;

			return matchesSearch && matchesStatus;
		});
	}, [bookings, searchTerm, statusFilter]);

	const handleContactWorkshop = (booking) => {
		// Simulate loading state
		setIsLoading(true);
		setTimeout(() => {
			window.location.href = `tel:${booking.contactInfo.phone}`;
			setIsLoading(false);
		}, 500);
	};

	const handleSendMessage = (booking) => {
		window.location.href = `mailto:${booking.contactInfo.email}?subject=Service Inquiry - ${booking.id}`;
	};

	const handleLeaveReview = (booking) => {
		// Navigate to review page or open modal
		alert(`Redirecting to review page for service ${booking.id}`);
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const formatLastUpdated = (dateString) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

		if (diffInHours < 1) return "Just now";
		if (diffInHours < 24) return `${diffInHours}h ago`;
		return `${Math.floor(diffInHours / 24)}d ago`;
	};

	return (
		<>
			<Header1 />
			<div className="service-status py-5 bg-light">
				<div className="container">
					{/* Header Section */}
					<div className="text-center mb-5">
						<h1 className="mb-3" style={{ color: "#E90A1D" }}>
							<i className="fa fa-chart-line me-2"></i>Service Status Tracking
						</h1>
						<p className="lead text-muted">
							Track the progress of your vehicle service bookings in real-time.
						</p>
					</div>

				{/* Search and Filter Section */}
				<div className="card mb-4 shadow-sm">
					<div className="card-body">
						<div className="row g-3">
							<div className="col-md-6">
								<div className="input-group">
									<span className="input-group-text">
										<i className="fa fa-search"></i>
									</span>
									<input
										type="text"
										className="form-control"
										placeholder="Search by service ID, category, vehicle, or location..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
							</div>
							<div className="col-md-4">
								<select
									className="form-select"
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
								>
									<option value="all">All Statuses</option>
									<option value="Pending">Pending</option>
									<option value="In Progress">In Progress</option>
									<option value="Completed">Completed</option>
									<option value="Cancelled">Cancelled</option>
								</select>
							</div>
							<div className="col-md-2">
								<div className="d-grid">
									<button
										className="btn btn-outline-primary"
										onClick={() => {
											setSearchTerm("");
											setStatusFilter("all");
										}}
									>
										<i className="fa fa-refresh me-1"></i>Reset
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Results Summary */}
				<div className="mb-3">
					<small className="text-muted">
						Showing {filteredBookings.length} of {bookings.length} service bookings
					</small>
				</div>

				{/* Service Bookings Grid */}
				<div className="row">
					{filteredBookings.length === 0 ? (
						<div className="col-12">
							<div className="text-center py-5">
								<i className="fa fa-search fa-3x text-muted mb-3"></i>
								<h4 className="text-muted">No service bookings found</h4>
								<p className="text-muted">
									Try adjusting your search criteria or filter settings.
								</p>
							</div>
						</div>
					) : (
						filteredBookings.map((booking) => (
							<div key={booking.id} className="col-lg-6 mb-4">
								<div className="card shadow h-100 border-0">
									<div className="card-header bg-white border-bottom-0">
										<div className="d-flex justify-content-between align-items-start">
											<div>
												<h5 className="mb-1">
													Service Request #{booking.id}
												</h5>
												<small className="text-muted">
													Last updated {formatLastUpdated(booking.lastUpdated)}
												</small>
											</div>
											<div className="text-end">
												<span
													className={`badge bg-${getStatusColor(booking.status)} mb-2`}
												>
													<i className={`fa ${getStatusIcon(booking.status)} me-1`}></i>
													{booking.status}
												</span>
												<br />
												<span
													className={`badge bg-${getPriorityColor(booking.priority)}`}
												>
													{booking.priority} Priority
												</span>
											</div>
										</div>
									</div>
									<div className="card-body">
										<div className="row">
											<div className="col-md-6">
												<div className="mb-2">
													<strong className="text-primary">
														<i className="fa fa-wrench me-1"></i>Service:
													</strong>
													<p className="mb-1">{booking.serviceCategory}</p>
												</div>
												<div className="mb-2">
													<strong className="text-primary">
														<i className="fa fa-car me-1"></i>Vehicle:
													</strong>
													<p className="mb-1">{booking.vehicle}</p>
												</div>
												<div className="mb-2">
													<strong className="text-primary">
														<i className="fa fa-calendar me-1"></i>Preferred Date:
													</strong>
													<p className="mb-1">{formatDate(booking.preferredDate)}</p>
												</div>
												<div className="mb-2">
													<strong className="text-primary">
														<i className="fa fa-map-marker me-1"></i>Location:
													</strong>
													<p className="mb-1 small">{booking.workshopLocation}</p>
												</div>
											</div>
											<div className="col-md-6">
												{booking.assignedMechanic && (
													<div className="mb-2">
														<strong className="text-primary">
															<i className="fa fa-user me-1"></i>Mechanic:
														</strong>
														<p className="mb-1">{booking.assignedMechanic}</p>
													</div>
												)}
												<div className="mb-2">
													<strong className="text-primary">
														<i className="fa fa-clock me-1"></i>Est. Completion:
													</strong>
													<p className="mb-1">{formatDate(booking.estimatedCompletion)}</p>
												</div>
												<div className="mb-2">
													<strong className="text-primary">
														<i className="fa fa-sticky-note me-1"></i>Notes:
													</strong>
													<p className="mb-1 small">{booking.notes}</p>
												</div>
											</div>
										</div>

										{/* Progress Bar */}
										<div className="mt-3">
											<div className="d-flex justify-content-between mb-1">
												<small className="fw-semibold">Progress</small>
												<small className="text-muted">{booking.progress}%</small>
											</div>
											<div className="progress" style={{ height: "8px" }}>
												<div
													className={`progress-bar bg-${getStatusColor(booking.status)}`}
													style={{
														width: `${booking.progress}%`,
														transition: "width 0.3s ease"
													}}
												></div>
											</div>
										</div>

										{/* Action Buttons */}
										<div className="mt-3 d-flex gap-2 flex-wrap">
											<button
												className="btn btn-outline-primary btn-sm"
												onClick={() => handleContactWorkshop(booking)}
												disabled={isLoading}
											>
												<i className="fa fa-phone me-1"></i>
												{isLoading ? "Calling..." : "Contact Workshop"}
											</button>
											<button
												className="btn btn-outline-secondary btn-sm"
												onClick={() => handleSendMessage(booking)}
											>
												<i className="fa fa-envelope me-1"></i>Send Message
											</button>
											{booking.status === "Completed" && (
												<button
													className="btn btn-success btn-sm"
													onClick={() => handleLeaveReview(booking)}
												>
													<i className="fa fa-star me-1"></i>Leave Review
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>

				{/* Contact Information */}
				<div className="text-center mt-5">
					<div className="card border-0 shadow-sm">
						<div className="card-body">
							<h5 className="text-primary mb-3">
								<i className="fa fa-question-circle me-2"></i>Need Help?
							</h5>
							<div className="row">
								<div className="col-md-4 mb-3">
									<div className="d-flex align-items-center justify-content-center">
										<i className="fa fa-phone fa-2x text-primary me-3"></i>
										<div>
											<strong>Call Us</strong>
											<p className="mb-0">(555) 123-4567</p>
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="d-flex align-items-center justify-content-center">
										<i className="fa fa-envelope fa-2x text-primary me-3"></i>
										<div>
											<strong>Email Us</strong>
											<p className="mb-0">service@isamauto.com</p>
										</div>
									</div>
								</div>
								<div className="col-md-4 mb-3">
									<div className="d-flex align-items-center justify-content-center">
										<i className="fa fa-clock fa-2x text-primary me-3"></i>
										<div>
											<strong>Hours</strong>
											<p className="mb-0">Mon-Sat: 8AM - 6PM</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
			<Footer1 />
		</>
	);
}
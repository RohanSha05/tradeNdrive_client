import React, { useState, useEffect } from "react";
import DashboardChart from "./DashboardChart";
import { Link } from "react-router-dom";
import DropdownSelect from "../common/DropDownSelect";
import { cars } from "@/data/cars";
import Pagination2 from "../common/Pagination2";
import Sidebar from "./Sidebar";

export default function DashBoard() {
	const [activeTab, setActiveTab] = useState("overview");

	// Mock data for service bookings
	const serviceBookings = [
		{
			id: 1,
			serviceType: "General Maintenance",
			vehicle: "Toyota Camry 2020",
			status: "In Progress",
			date: "2025-12-15",
			amount: 150,
			workshop: "Downtown Workshop",
		},
		{
			id: 2,
			serviceType: "Engine Repair",
			vehicle: "Honda Civic 2019",
			status: "Completed",
			date: "2025-12-10",
			amount: 450,
			workshop: "North Side Workshop",
		},
		{
			id: 3,
			serviceType: "AC Repair",
			vehicle: "Ford Mustang 2021",
			status: "Scheduled",
			date: "2025-12-20",
			amount: 200,
			workshop: "South Branch",
		},
	];

	// Mock data for payments
	const paymentHistory = [
		{
			id: 1,
			type: "Service Payment",
			description: "Engine Repair - Honda Civic",
			amount: 450,
			date: "2025-12-10",
			status: "Completed",
			method: "Credit Card",
		},
		{
			id: 2,
			type: "Car Purchase",
			description: "Toyota Camry 2020",
			amount: 25000,
			date: "2025-11-15",
			status: "Completed",
			method: "Bank Transfer",
		},
		{
			id: 3,
			type: "Service Payment",
			description: "Oil Change - Ford Mustang",
			amount: 80,
			date: "2025-11-20",
			status: "Completed",
			method: "PayPal",
		},
	];

	// Mock data for car purchases
	const purchaseHistory = [
		{
			id: 1,
			car: "Toyota Camry 2020",
			price: 25000,
			purchaseDate: "2025-11-15",
			status: "Delivered",
			seller: "AutoMax Dealership",
			image: "/assets/images/cars/camry.jpg",
		},
		{
			id: 2,
			car: "Honda Civic 2019",
			price: 22000,
			purchaseDate: "2025-10-08",
			status: "Delivered",
			seller: "City Motors",
			image: "/assets/images/cars/civic.jpg",
		},
	];

	const getStatusColor = (status) => {
		switch (status.toLowerCase()) {
			case "completed":
			case "delivered":
				return "success";
			case "in progress":
			case "scheduled":
				return "warning";
			case "pending":
				return "secondary";
			default:
				return "primary";
		}
	};

	const getStatusIcon = (status) => {
		switch (status.toLowerCase()) {
			case "completed":
			case "delivered":
				return "fas fa-check-circle";
			case "in progress":
				return "fas fa-tools";
			case "scheduled":
				return "fas fa-calendar-check";
			case "pending":
				return "fas fa-clock";
			default:
				return "fas fa-info-circle";
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="">
					<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
				</div>
				<div className="">
					<div className="content-area">
						<main id="main" className="main-content">
							<div className="tfcl-dashboard">
								<h1 className="admin-title mb-4">My Dashboard</h1>

								{activeTab === "overview" && (
									<>
										{/* Overview Cards */}
										<div className="tfcl-dashboard-overview">
											<div className="row">
												<div className="col-sm-6 col-xl-3">
													<div className="tfcl-card">
														<div className="card-body">
															<div className="tfcl-icon-overview">
																<i className="fas fa-tools fa-2x text-primary"></i>
															</div>
															<div className="content-overview">
																<h5>Active Services</h5>
																<div className="tfcl-dashboard-title">
																	<span>
																		<b>3</b>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-sm-6 col-xl-3">
													<div className="tfcl-card">
														<div className="card-body">
															<div className="tfcl-icon-overview">
																<i className="fas fa-calendar-check fa-2x text-success"></i>
															</div>
															<div className="content-overview">
																<h5>Completed Services</h5>
																<div className="tfcl-dashboard-title">
																	<span>
																		<b>12</b>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-sm-6 col-xl-3">
													<div className="tfcl-card">
														<div className="card-body">
															<div className="tfcl-icon-overview">
																<i className="fas fa-car fa-2x text-info"></i>
															</div>
															<div className="content-overview">
																<h5>My Vehicles</h5>
																<div className="tfcl-dashboard-title">
																	<span>
																		<b>2</b>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-sm-6 col-xl-3">
													<div className="tfcl-card">
														<div className="card-body">
															<div className="tfcl-icon-overview">
																<i className="fas fa-dollar-sign fa-2x text-warning"></i>
															</div>
															<div className="content-overview">
																<h5>Total Spent</h5>
																<div className="tfcl-dashboard-title">
																	<span>
																		<b>$27,730</b>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Quick Actions */}
										<div className="row mt-4">
											<div className="col-md-12">
												<div className="card">
													<div className="card-header">
														<h5 className="mb-0">Quick Actions</h5>
													</div>
													<div className="card-body">
														<div className="row">
															<div className="col-md-3 mb-3">
																<Link
																	to="/service-booking"
																	className="btn btn-primary w-100"
																>
																	<i className="fas fa-calendar-plus me-2"></i>
																	Book Service
																</Link>
															</div>
															<div className="col-md-3 mb-3">
																<Link
																	to="/service-status"
																	className="btn btn-info w-100"
																>
																	<i className="fas fa-clock me-2"></i>
																	Check Status
																</Link>
															</div>
															<div className="col-md-3 mb-3">
																<Link
																	to="/emergency-service"
																	className="btn btn-danger w-100"
																>
																	<i className="fas fa-exclamation-triangle me-2"></i>
																	Emergency
																</Link>
															</div>
															<div className="col-md-3 mb-3">
																<Link
																	to="/cars-listings"
																	className="btn btn-success w-100"
																>
																	<i className="fas fa-car me-2"></i>
																	Browse Cars
																</Link>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										{/* Recent Activity */}
										<div className="row mt-4">
											<div className="col-md-8">
												<div className="card">
													<div className="card-header">
														<h5>Recent Service Bookings</h5>
													</div>
													<div className="card-body">
														<div className="table-responsive">
															<table className="table table-hover">
																<thead>
																	<tr>
																		<th>Service</th>
																		<th>Vehicle</th>
																		<th>Status</th>
																		<th>Date</th>
																		<th>Amount</th>
																	</tr>
																</thead>
																<tbody>
																	{serviceBookings.map((booking) => (
																		<tr key={booking.id}>
																			<td>
																				<strong>{booking.serviceType}</strong>
																				<br />
																				<small className="text-muted">
																					{booking.workshop}
																				</small>
																			</td>
																			<td>{booking.vehicle}</td>
																			<td>
																				<span
																					className={`badge bg-${getStatusColor(
																						booking.status
																					)}`}
																				>
																					<i
																						className={`${getStatusIcon(
																							booking.status
																						)} me-1`}
																					></i>
																					{booking.status}
																				</span>
																			</td>
																			<td>
																				{new Date(
																					booking.date
																				).toLocaleDateString()}
																			</td>
																			<td>${booking.amount}</td>
																		</tr>
																	))}
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-4">
												<div className="card">
													<div className="card-header">
														<h5>Service Analytics</h5>
													</div>
													<div className="card-body">
														<div className="tfcl-page-insight">
															<DashboardChart />
														</div>
													</div>
												</div>
											</div>
										</div>
									</>
								)}

								{activeTab === "services" && (
									<div className="service-history-section">
										<div className="card">
											<div className="card-header d-flex justify-content-between align-items-center">
												<h5 className="mb-0">Service History</h5>
												<div className="btn-group">
													<button className="btn btn-sm btn-outline-primary">
														All
													</button>
													<button className="btn btn-sm btn-outline-primary">
														Active
													</button>
													<button className="btn btn-sm btn-outline-primary">
														Completed
													</button>
												</div>
											</div>
											<div className="card-body">
												<div className="table-responsive">
													<table className="table table-hover">
														<thead>
															<tr>
																<th>Service ID</th>
																<th>Service Type</th>
																<th>Vehicle</th>
																<th>Workshop</th>
																<th>Status</th>
																<th>Date</th>
																<th>Amount</th>
																<th>Actions</th>
															</tr>
														</thead>
														<tbody>
															{serviceBookings.map((booking) => (
																<tr key={booking.id}>
																	<td>
																		#{booking.id.toString().padStart(4, "0")}
																	</td>
																	<td>
																		<strong>{booking.serviceType}</strong>
																	</td>
																	<td>{booking.vehicle}</td>
																	<td>{booking.workshop}</td>
																	<td>
																		<span
																			className={`badge bg-${getStatusColor(
																				booking.status
																			)}`}
																		>
																			<i
																				className={`${getStatusIcon(
																					booking.status
																				)} me-1`}
																			></i>
																			{booking.status}
																		</span>
																	</td>
																	<td>
																		{new Date(
																			booking.date
																		).toLocaleDateString()}
																	</td>
																	<td>${booking.amount}</td>
																	<td>
																		<div className="btn-group">
																			<button className="btn btn-sm btn-outline-primary">
																				<i className="fas fa-eye"></i>
																			</button>
																			<button className="btn btn-sm btn-outline-secondary">
																				<i className="fas fa-download"></i>
																			</button>
																		</div>
																	</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								)}

								{activeTab === "purchases" && (
									<div className="purchase-history-section">
										<div className="card">
											<div className="card-header">
												<h5 className="mb-0">Car Purchase History</h5>
											</div>
											<div className="card-body">
												<div className="row">
													{purchaseHistory.map((purchase) => (
														<div key={purchase.id} className="col-md-6 mb-4">
															<div className="card h-100">
																<div className="row g-0">
																	<div className="col-md-4">
																		<img
																			src={purchase.image}
																			className="img-fluid rounded-start h-100 object-fit-cover"
																			alt={purchase.car}
																			style={{ minHeight: "150px" }}
																		/>
																	</div>
																	<div className="col-md-8">
																		<div className="card-body">
																			<h6 className="card-title">
																				{purchase.car}
																			</h6>
																			<p className="card-text">
																				<small className="text-muted">
																					Purchased from {purchase.seller}
																				</small>
																			</p>
																			<div className="d-flex justify-content-between align-items-center">
																				<span className="h5 text-primary mb-0">
																					${purchase.price.toLocaleString()}
																				</span>
																				<span
																					className={`badge bg-${getStatusColor(
																						purchase.status
																					)}`}
																				>
																					{purchase.status}
																				</span>
																			</div>
																			<p className="card-text mt-2">
																				<small className="text-muted">
																					Purchase Date:{" "}
																					{new Date(
																						purchase.purchaseDate
																					).toLocaleDateString()}
																				</small>
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								)}

								{activeTab === "payments" && (
									<div className="payment-history-section">
										<div className="card">
											<div className="card-header d-flex justify-content-between align-items-center">
												<h5 className="mb-0">Payment History</h5>
												<div className="btn-group">
													<button className="btn btn-sm btn-outline-primary">
														All
													</button>
													<button className="btn btn-sm btn-outline-primary">
														Services
													</button>
													<button className="btn btn-sm btn-outline-primary">
														Purchases
													</button>
												</div>
											</div>
											<div className="card-body">
												<div className="table-responsive">
													<table className="table table-hover">
														<thead>
															<tr>
																<th>Transaction ID</th>
																<th>Type</th>
																<th>Description</th>
																<th>Amount</th>
																<th>Method</th>
																<th>Date</th>
																<th>Status</th>
															</tr>
														</thead>
														<tbody>
															{paymentHistory.map((payment) => (
																<tr key={payment.id}>
																	<td>
																		#{payment.id.toString().padStart(6, "0")}
																	</td>
																	<td>
																		<span
																			className={`badge bg-${
																				payment.type === "Service Payment"
																					? "info"
																					: "success"
																			}`}
																		>
																			{payment.type}
																		</span>
																	</td>
																	<td>{payment.description}</td>
																	<td className="fw-bold">
																		${payment.amount.toLocaleString()}
																	</td>
																	<td>
																		<i
																			className={`fas fa-${
																				payment.method === "Credit Card"
																					? "credit-card"
																					: payment.method === "PayPal"
																					? "paypal"
																					: "university"
																			} me-1`}
																		></i>
																		{payment.method}
																	</td>
																	<td>
																		{new Date(
																			payment.date
																		).toLocaleDateString()}
																	</td>
																	<td>
																		<span
																			className={`badge bg-${getStatusColor(
																				payment.status
																			)}`}
																		>
																			<i
																				className={`${getStatusIcon(
																					payment.status
																				)} me-1`}
																			></i>
																			{payment.status}
																		</span>
																	</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								)}
							</div>
						</main>
					</div>
				</div>
			</div>
		</div>
	);
}

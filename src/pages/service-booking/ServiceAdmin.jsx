import React, { useState } from "react";

export default function ServiceAdmin() {
	// Mock data for service bookings
	const [bookings, setBookings] = useState([
		{
			id: "SRV-2025-001",
			serviceCategory: "Engine Repair",
			workshopLocation: "Main Workshop",
			preferredDate: "2025-12-10",
			status: "Pending",
			vehicle: "2023 Toyota Camry",
			customerName: "John Doe",
			customerEmail: "john@example.com",
			customerPhone: "(555) 123-4567",
			assignedMechanic: "",
			estimatedCompletion: "",
			notes: "Customer reported engine knocking sound",
			priority: "High",
		},
		{
			id: "SRV-2025-002",
			serviceCategory: "General Maintenance",
			workshopLocation: "Downtown Branch",
			preferredDate: "2025-12-08",
			status: "In Progress",
			vehicle: "2022 Honda Civic",
			customerName: "Jane Smith",
			customerEmail: "jane@example.com",
			customerPhone: "(555) 987-6543",
			assignedMechanic: "John Smith",
			estimatedCompletion: "2025-12-09",
			notes: "Oil change and tire rotation",
			priority: "Medium",
		},
		{
			id: "SRV-2025-003",
			serviceCategory: "AC Repair",
			workshopLocation: "North Side",
			preferredDate: "2025-12-05",
			status: "Completed",
			vehicle: "2021 Ford F-150",
			customerName: "Bob Johnson",
			customerEmail: "bob@example.com",
			customerPhone: "(555) 456-7890",
			assignedMechanic: "Mike Johnson",
			estimatedCompletion: "2025-12-06",
			notes: "AC compressor replacement",
			priority: "Low",
		},
	]);

	const [filterStatus, setFilterStatus] = useState("All");
	const [selectedBooking, setSelectedBooking] = useState(null);

	const mechanics = ["John Smith", "Mike Johnson", "Sarah Davis", "Tom Wilson"];

	const handleStatusChange = (bookingId, newStatus) => {
		setBookings((prev) =>
			prev.map((booking) =>
				booking.id === bookingId ? { ...booking, status: newStatus } : booking
			)
		);
	};

	const handleMechanicAssignment = (bookingId, mechanic) => {
		setBookings((prev) =>
			prev.map((booking) =>
				booking.id === bookingId
					? { ...booking, assignedMechanic: mechanic }
					: booking
			)
		);
	};

	const handleCompletionDateChange = (bookingId, date) => {
		setBookings((prev) =>
			prev.map((booking) =>
				booking.id === bookingId
					? { ...booking, estimatedCompletion: date }
					: booking
			)
		);
	};

	const filteredBookings = bookings.filter(
		(booking) => filterStatus === "All" || booking.status === filterStatus
	);

	const getStatusColor = (status) => {
		switch (status) {
			case "Pending":
				return "warning";
			case "In Progress":
				return "info";
			case "Completed":
				return "success";
			default:
				return "secondary";
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

	return (
		<div className="service-admin py-5">
			<div className="container">
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h1 style={{ color: "#E90A1D" }}>
						<i className="fa fa-cogs me-2"></i>Service Admin Dashboard
					</h1>
					<div className="d-flex gap-2">
						<select
							className="form-select"
							value={filterStatus}
							onChange={(e) => setFilterStatus(e.target.value)}
						>
							<option value="All">All Status</option>
							<option value="Pending">Pending</option>
							<option value="In Progress">In Progress</option>
							<option value="Completed">Completed</option>
						</select>
					</div>
				</div>

				<div className="row">
					<div className="col-lg-8">
						<div className="card shadow">
							<div className="card-header">
								<h5 className="mb-0">Service Bookings</h5>
							</div>
							<div className="card-body p-0">
								<div className="table-responsive">
									<table className="table table-hover mb-0">
										<thead className="table-light">
											<tr>
												<th>ID</th>
												<th>Customer</th>
												<th>Service</th>
												<th>Status</th>
												<th>Priority</th>
												<th>Mechanic</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{filteredBookings.map((booking) => (
												<tr key={booking.id}>
													<td>
														<strong>{booking.id}</strong>
													</td>
													<td>
														<div>
															<div>{booking.customerName}</div>
															<small className="text-muted">
																{booking.vehicle}
															</small>
														</div>
													</td>
													<td>{booking.serviceCategory}</td>
													<td>
														<span
															className={`badge bg-${getStatusColor(booking.status)}`}
														>
															{booking.status}
														</span>
													</td>
													<td>
														<span
															className={`badge bg-${getPriorityColor(booking.priority)}`}
														>
															{booking.priority}
														</span>
													</td>
													<td>
														{booking.assignedMechanic || (
															<span className="text-muted">Unassigned</span>
														)}
													</td>
													<td>
														<button
															className="btn btn-sm btn-outline-primary me-1"
															onClick={() => setSelectedBooking(booking)}
														>
															<i className="fa fa-edit"></i>
														</button>
														<button className="btn btn-sm btn-outline-info">
															<i className="fa fa-eye"></i>
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-4">
						{/* Quick Stats */}
						<div className="card shadow mb-4">
							<div className="card-header">
								<h6 className="mb-0">Quick Stats</h6>
							</div>
							<div className="card-body">
								<div className="row text-center">
									<div className="col-6">
										<div className="fs-2 text-warning">
											{bookings.filter((b) => b.status === "Pending").length}
										</div>
										<div className="small text-muted">Pending</div>
									</div>
									<div className="col-6">
										<div className="fs-2 text-info">
											{bookings.filter((b) => b.status === "In Progress").length}
										</div>
										<div className="small text-muted">In Progress</div>
									</div>
									<div className="col-6 mt-3">
										<div className="fs-2 text-success">
											{bookings.filter((b) => b.status === "Completed").length}
										</div>
										<div className="small text-muted">Completed</div>
									</div>
									<div className="col-6 mt-3">
										<div className="fs-2 text-primary">{bookings.length}</div>
										<div className="small text-muted">Total</div>
									</div>
								</div>
							</div>
						</div>

						{/* Recent Activity */}
						<div className="card shadow">
							<div className="card-header">
								<h6 className="mb-0">Recent Activity</h6>
							</div>
							<div className="card-body">
								<div className="timeline">
									<div className="timeline-item mb-3">
										<div className="timeline-marker bg-success"></div>
										<div className="timeline-content">
											<small className="text-muted">2 hours ago</small>
											<p className="mb-0">Service SRV-2025-003 completed</p>
										</div>
									</div>
									<div className="timeline-item mb-3">
										<div className="timeline-marker bg-info"></div>
										<div className="timeline-content">
											<small className="text-muted">4 hours ago</small>
											<p className="mb-0">John Smith assigned to SRV-2025-002</p>
										</div>
									</div>
									<div className="timeline-item">
										<div className="timeline-marker bg-warning"></div>
										<div className="timeline-content">
											<small className="text-muted">6 hours ago</small>
											<p className="mb-0">New booking SRV-2025-001 received</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Edit Modal */}
				{selectedBooking && (
					<div
						className="modal fade show d-block"
						style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
					>
						<div className="modal-dialog modal-lg">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Edit Service Booking</h5>
									<button
										type="button"
										className="btn-close"
										onClick={() => setSelectedBooking(null)}
									></button>
								</div>
								<div className="modal-body">
									<div className="row">
										<div className="col-md-6">
											<label className="form-label">Status</label>
											<select
												className="form-select mb-3"
												value={selectedBooking.status}
												onChange={(e) =>
													handleStatusChange(selectedBooking.id, e.target.value)
												}
											>
												<option value="Pending">Pending</option>
												<option value="In Progress">In Progress</option>
												<option value="Completed">Completed</option>
											</select>
										</div>
										<div className="col-md-6">
											<label className="form-label">Assigned Mechanic</label>
											<select
												className="form-select mb-3"
												value={selectedBooking.assignedMechanic}
												onChange={(e) =>
													handleMechanicAssignment(selectedBooking.id, e.target.value)
												}
											>
												<option value="">Unassigned</option>
												{mechanics.map((mechanic) => (
													<option key={mechanic} value={mechanic}>
														{mechanic}
													</option>
												))}
											</select>
										</div>
										<div className="col-md-6">
											<label className="form-label">Estimated Completion</label>
											<input
												type="date"
												className="form-control mb-3"
												value={selectedBooking.estimatedCompletion}
												onChange={(e) =>
													handleCompletionDateChange(selectedBooking.id, e.target.value)
												}
											/>
										</div>
									</div>
									<div>
										<label className="form-label">Notes</label>
										<textarea
											className="form-control"
											rows="3"
											value={selectedBooking.notes}
											readOnly
										></textarea>
									</div>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										onClick={() => setSelectedBooking(null)}
									>
										Close
									</button>
									<button
										type="button"
										className="btn btn-primary"
										onClick={() => setSelectedBooking(null)}
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
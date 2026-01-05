import React from "react";
import Header4 from "@/components/headers/Header4";
import Footer1 from "@/components/footers/Footer1";
import MetaComponent from "@/components/common/MetaComponent";

const serviceRecords = [
	{
		id: "SRV-1042",
		vehicle: "BMW 3 Series",
		serviceType: "Full Service",
		workshop: "ISAM Auto HQ",
		status: "Completed",
		date: "2024-12-15",
		amount: 320,
	},
	{
		id: "SRV-1038",
		vehicle: "Honda Civic",
		serviceType: "Oil Change",
		workshop: "ISAM Auto East",
		status: "In Progress",
		date: "2024-12-20",
		amount: 120,
	},
	{
		id: "SRV-1031",
		vehicle: "Toyota Camry",
		serviceType: "Brake Inspection",
		workshop: "ISAM Auto West",
		status: "Scheduled",
		date: "2025-01-02",
		amount: 180,
	},
];

const statusStyles = {
	Completed: "bg-success",
	"In Progress": "bg-warning text-dark",
	Scheduled: "bg-info text-dark",
	Cancelled: "bg-secondary",
};

const metadata = {
	title: "Service History || ISAM Auto",
	description: "Review your past and ongoing vehicle service records.",
};

export default function ServiceHistoryPage() {
	return (
		<>
			<MetaComponent meta={metadata} />
			<Header4 />
			<section className="tf-section5 flat-contact py-5">
				<div className="container">
					<div className="row mb-4">
						<div className="col-12">
							<h2 className="fw-bold">Service History</h2>
							<p className="text-color-2 mb-0">
								Track completed, active, and scheduled services for your vehicles.
							</p>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-8 mb-4">
							<div className="card shadow-sm border-0">
								<div className="card-header bg-white d-flex justify-content-between align-items-center">
									<h5 className="mb-0 fw-semibold">
										<i className="fas fa-clipboard-list me-2 text-primary"></i>
										Recent Services
									</h5>
									<div className="btn-group btn-group-sm" role="group">
										<button type="button" className="btn btn-outline-primary">
											All
										</button>
										<button type="button" className="btn btn-outline-primary">
											Active
										</button>
										<button type="button" className="btn btn-outline-primary">
											Completed
										</button>
									</div>
								</div>
								<div className="card-body p-0">
									<div className="table-responsive">
										<table className="table table-hover mb-0 align-middle">
											<thead className="table-light">
												<tr>
													<th scope="col">Service ID</th>
													<th scope="col">Vehicle</th>
													<th scope="col">Service</th>
													<th scope="col">Workshop</th>
													<th scope="col">Status</th>
													<th scope="col">Date</th>
													<th scope="col" className="text-end">
														Amount
													</th>
												</tr>
											</thead>
											<tbody>
												{serviceRecords.map((record) => (
													<tr key={record.id}>
														<td className="fw-semibold">{record.id}</td>
														<td>{record.vehicle}</td>
														<td>{record.serviceType}</td>
														<td>{record.workshop}</td>
														<td>
															<span className={`badge ${statusStyles[record.status] || "bg-secondary"}`}>
																{record.status}
															</span>
														</td>
														<td>{new Date(record.date).toLocaleDateString()}</td>
														<td className="text-end">${record.amount.toFixed(2)}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4">
							<div className="card shadow-sm border-0 mb-4">
								<div className="card-header bg-white">
									<h6 className="mb-0 fw-semibold">
										<i className="fas fa-bell me-2 text-warning"></i>
										Upcoming Services
									</h6>
								</div>
								<div className="card-body">
									<ul className="list-group list-group-flush">
										{serviceRecords
											.filter((record) => record.status !== "Completed")
											.map((record) => (
												<li className="list-group-item d-flex justify-content-between align-items-start" key={record.id}>
													<div className="ms-2 me-auto">
														<div className="fw-semibold">{record.serviceType}</div>
														<small className="text-muted">{record.vehicle}</small>
													</div>
													<span className={`badge ${statusStyles[record.status] || "bg-secondary"} rounded-pill`}>
														{record.status}
													</span>
												</li>
											))}
									</ul>
								</div>
							</div>

							<div className="card shadow-sm border-0">
								<div className="card-header bg-white">
									<h6 className="mb-0 fw-semibold">
										<i className="fas fa-question-circle me-2 text-info"></i>
										Need help?
									</h6>
								</div>
								<div className="card-body">
									<p className="text-muted mb-3">
										Contact our service team if you have questions about a record or need to reschedule.
									</p>
									<div className="d-grid gap-2">
										<a className="btn btn-outline-primary" href="/contact">
											<i className="fas fa-headset me-2"></i>
											Contact Support
										</a>
										<a className="btn btn-outline-secondary" href="/service-booking">
											<i className="fas fa-calendar-plus me-2"></i>
											Book New Service
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer1 />
		</>
	);
}

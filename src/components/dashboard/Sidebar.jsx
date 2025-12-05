import { useApi } from "@/providers/ApiProvider";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ activeTab, setActiveTab }) {
	const { user, logOut } = useContext(AuthContext);
	const { data } = useApi();
	const { logo } = data.data || {};
	const { file_url } = logo || {};

	const fallbackImage =
		"https://i.ibb.co.com/gZdVcjFd/Isam-Auto-Repair-1024x373.png";
	const handleLogOut = () => {
		logOut();
	};

	const [hoveredTab, setHoveredTab] = useState(null);

	const getButtonStyle = (tab) => ({
		color: activeTab === tab || hoveredTab === tab ? "#fff" : "#fff",
		padding: "8px 14px",
		display: "block",
		borderRadius: "16px",
		fontSize: "16px",
		fontWeight: "500",
		lineHeight: "22.4px",
		position: "relative",
		border: "none",
		background:
			activeTab === tab ? "#E90A1D" : hoveredTab === tab ? "#333" : "none",
		width: "100%",
		textAlign: "left",
		cursor: "pointer",
		transition: "all 0.3s ease-in-out",
	});

	const getIconStyle = (tab) => ({
		color: activeTab === tab || hoveredTab === tab ? "#fff" : "#4d5153",
		fontSize: "20px",
		marginRight: "14px",
		transition: "all 0.3s ease-in-out",
	});

	useEffect(() => {
		// Function to open the dashboard
		const openDashboard = () => {
			document.querySelector(".sidebar-dashboard").classList.add("active");
			document.querySelector(".dashboard-overlay").classList.add("active");
		};

		// Function to close the dashboard
		const closeDashboard = () => {
			document.querySelector(".sidebar-dashboard").classList.remove("active");
			document.querySelector(".dashboard-overlay").classList.remove("active");
		};

		// Adding event listeners
		const openButton = document.querySelector(".dashboard-toggle");
		const overlay = document.querySelector(".dashboard-overlay");

		openButton?.addEventListener("click", openDashboard);
		overlay?.addEventListener("click", closeDashboard);

		// Cleanup: Remove event listeners on component unmount
		return () => {
			openButton?.removeEventListener("click", openDashboard);
			overlay?.removeEventListener("click", closeDashboard);
		};
	}, []);

	const { pathname } = useLocation();
	return (
		<>
			<div className="dashboard-overlay" />
			<aside className="sidebar-dashboard">
				<div className="db-content db-logo pad-30">
					<Link to={`/`} title="Isam Auto">
						<img
							className="site-logo"
							alt="autodecar"
							src={file_url}
							width={432}
							height={76}
							onError={(e) => {
								e.target.onerror = null;
								e.target.src = fallbackImage;
							}}
						/>
					</Link>
				</div>

				<div className="db-content db-list-menu" style={{ padding: "20px 0" }}>
					<h6 className="db-title" style={{ marginBottom: "4px" }}>
						Dashboard Tabs
					</h6>
					<div className="db-dashboard-menu">
						<ul>
							<li>
								<button
									className={`menu-index-1 ${
										activeTab === "overview" ? "active" : ""
									}`}
									onClick={() => setActiveTab("overview")}
									onMouseEnter={() => setHoveredTab("overview")}
									onMouseLeave={() => setHoveredTab(null)}
									style={getButtonStyle("overview")}
								>
									<i
										className="fas fa-tachometer-alt me-1"
										style={getIconStyle("overview")}
									></i>
									Overview
								</button>
							</li>
							<li>
								<button
									className={`menu-index-2 ${
										activeTab === "services" ? "active" : ""
									}`}
									onClick={() => setActiveTab("services")}
									onMouseEnter={() => setHoveredTab("services")}
									onMouseLeave={() => setHoveredTab(null)}
									style={getButtonStyle("services")}
								>
									<i
										className="fas fa-tools me-1"
										style={getIconStyle("services")}
									></i>
									Services
								</button>
							</li>
							<li>
								<button
									className={`menu-index-3 ${
										activeTab === "purchases" ? "active" : ""
									}`}
									onClick={() => setActiveTab("purchases")}
									onMouseEnter={() => setHoveredTab("purchases")}
									onMouseLeave={() => setHoveredTab(null)}
									style={getButtonStyle("purchases")}
								>
									<i
										className="fas fa-shopping-cart me-1"
										style={getIconStyle("purchases")}
									></i>
									Purchases
								</button>
							</li>
							<li>
								<button
									className={`menu-index-4 ${
										activeTab === "payments" ? "active" : ""
									}`}
									onClick={() => setActiveTab("payments")}
									onMouseEnter={() => setHoveredTab("payments")}
									onMouseLeave={() => setHoveredTab(null)}
									style={getButtonStyle("payments")}
								>
									<i
										className="fas fa-credit-card me-1"
										style={getIconStyle("payments")}
									></i>
									Payments
								</button>
							</li>
						</ul>
					</div>
				</div>
			</aside>
		</>
	);
}

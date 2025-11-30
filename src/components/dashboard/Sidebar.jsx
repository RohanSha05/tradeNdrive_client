import { useApi } from "@/providers/ApiProvider";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
	const { user, logOut } = useContext(AuthContext);
	const { data } = useApi();
	const { logo } = data.data || {};
	const { file_url } = logo || {};

	const fallbackImage =
		"https://i.ibb.co.com/gZdVcjFd/Isam-Auto-Repair-1024x373.png";
	const handleLogOut = () => {
		logOut();
	};

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

				<div className="db-content db-list-menu">
					<h6 className="db-title">Menu</h6>
					<div className="db-dashboard-menu">
						<ul>
							<li>
								<Link
									to={`/dashboard`}
									className={`menu-index-1 ${
										pathname == "/dashboard" ? "active" : ""
									} `}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={22}
										height={22}
										viewBox="0 0 22 22"
										fill="none"
									>
										<g opacity="0.2">
											<path
												d="M6.92479 9.35156V15.64"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M11.2021 6.34375V15.6412"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M15.4092 12.6758V15.6412"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M15.4619 1.83398H6.87143C3.87698 1.83398 2 3.95339 2 6.95371V15.0476C2 18.0479 3.86825 20.1673 6.87143 20.1673H15.4619C18.4651 20.1673 20.3333 18.0479 20.3333 15.0476V6.95371C20.3333 3.95339 18.4651 1.83398 15.4619 1.83398Z"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
									</svg>
									Dashboard
								</Link>
							</li>
							<li>
								<Link
									className={`menu-index-1 d-flex ${
										pathname == "/home-contents" ? "active" : ""
									} `}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={22}
										height={22}
										viewBox="0 0 22 22"
										fill="none"
									>
										<g opacity="0.2">
											<path
												d="M6.92479 9.35156V15.64"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M11.2021 6.34375V15.6412"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M15.4092 12.6758V15.6412"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M15.4619 1.83398H6.87143C3.87698 1.83398 2 3.95339 2 6.95371V15.0476C2 18.0479 3.86825 20.1673 6.87143 20.1673H15.4619C18.4651 20.1673 20.3333 18.0479 20.3333 15.0476V6.95371C20.3333 3.95339 18.4651 1.83398 15.4619 1.83398Z"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
									</svg>
									<div className="">
										<div
											data-toggle="collapse"
											href="#collapseExample"
											role="button"
											aria-expanded="false"
											aria-controls="collapseExample"
										>
											Home Contents
										</div>
										<div class="collapse" id="collapseExample">
											<Link
												className="m-1 text-black"
												to="/dashboard/edit-banner"
											>
												Edit Banner
											</Link>
											<Link
												className="m-1 text-black"
												to="/dashboard/edit-features"
											>
												Edit Features
											</Link>
											<Link
												className="m-1 text-black"
												to="/dashboard/edit-loan-banner"
											>
												Edit Loan Banner
											</Link>
											<Link
												className="m-1 text-black"
												to="/dashboard/edit-features2"
											>
												Edit Features2
											</Link>
											<Link
												className="m-1 text-black"
												to="/dashboard/edit-gallery"
											>
												Edit Gallery
											</Link>
										</div>
									</div>
								</Link>
							</li>

							<li>
								<Link
									to={`/dashboard/add-brands`}
									className={`menu-index-3 ${
										pathname == "/add-brands" ? "active" : ""
									} `}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={22}
										height={22}
										viewBox="0 0 22 22"
										fill="none"
									>
										<g opacity="0.2">
											<path
												d="M10.0135 2.55687H6.58608C3.76733 2.55687 2 4.55245 2 7.37762V14.9988C2 17.824 3.75908 19.8195 6.58608 19.8195H14.6747C17.5027 19.8195 19.2617 17.824 19.2617 14.9988V11.3065"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7.57059 10.0111L14.4208 3.16086C15.2743 2.30836 16.6575 2.30836 17.5109 3.16086L18.6265 4.27644C19.4799 5.12986 19.4799 6.51403 18.6265 7.36653L11.7433 14.2498C11.3702 14.6229 10.8642 14.8328 10.3362 14.8328H6.90234L6.98851 11.3678C7.00134 10.8581 7.20943 10.3723 7.57059 10.0111Z"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M13.3789 4.21875L17.5644 8.40425"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
									</svg>
									Add Brands
								</Link>
							</li>
							<li>
								<Link
									to={`/dashboard/add-body-types`}
									className={`menu-index-4 ${
										pathname == "/add-body-types" ? "active" : ""
									} `}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={22}
										height={22}
										viewBox="0 0 22 22"
										fill="none"
									>
										<g opacity="0.2">
											<path
												d="M10.0135 2.55687H6.58608C3.76733 2.55687 2 4.55245 2 7.37762V14.9988C2 17.824 3.75908 19.8195 6.58608 19.8195H14.6747C17.5027 19.8195 19.2617 17.824 19.2617 14.9988V11.3065"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7.57059 10.0111L14.4208 3.16086C15.2743 2.30836 16.6575 2.30836 17.5109 3.16086L18.6265 4.27644C19.4799 5.12986 19.4799 6.51403 18.6265 7.36653L11.7433 14.2498C11.3702 14.6229 10.8642 14.8328 10.3362 14.8328H6.90234L6.98851 11.3678C7.00134 10.8581 7.20943 10.3723 7.57059 10.0111Z"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M13.3789 4.21875L17.5644 8.40425"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
									</svg>
									Add Body Types
								</Link>
							</li>
							<li>
								<Link>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={22}
										height={22}
										viewBox="0 0 22 22"
										fill="none"
									>
										<g opacity="0.2">
											<path
												d="M10.0135 2.55687H6.58608C3.76733 2.55687 2 4.55245 2 7.37762V14.9988C2 17.824 3.75908 19.8195 6.58608 19.8195H14.6747C17.5027 19.8195 19.2617 17.824 19.2617 14.9988V11.3065"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7.57059 10.0111L14.4208 3.16086C15.2743 2.30836 16.6575 2.30836 17.5109 3.16086L18.6265 4.27644C19.4799 5.12986 19.4799 6.51403 18.6265 7.36653L11.7433 14.2498C11.3702 14.6229 10.8642 14.8328 10.3362 14.8328H6.90234L6.98851 11.3678C7.00134 10.8581 7.20943 10.3723 7.57059 10.0111Z"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M13.3789 4.21875L17.5644 8.40425"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
									</svg>
									Add Car List
								</Link>
							</li>
							<li>
								<Link
									to={`/dashboard/car-list-settings`}
									className={`menu-index-4 ${
										pathname == "/car-list-settings" ? "active" : ""
									} `}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={22}
										height={22}
										viewBox="0 0 22 22"
										fill="none"
									>
										<g opacity="0.2">
											<path
												d="M10.0135 2.55687H6.58608C3.76733 2.55687 2 4.55245 2 7.37762V14.9988C2 17.824 3.75908 19.8195 6.58608 19.8195H14.6747C17.5027 19.8195 19.2617 17.824 19.2617 14.9988V11.3065"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7.57059 10.0111L14.4208 3.16086C15.2743 2.30836 16.6575 2.30836 17.5109 3.16086L18.6265 4.27644C19.4799 5.12986 19.4799 6.51403 18.6265 7.36653L11.7433 14.2498C11.3702 14.6229 10.8642 14.8328 10.3362 14.8328H6.90234L6.98851 11.3678C7.00134 10.8581 7.20943 10.3723 7.57059 10.0111Z"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M13.3789 4.21875L17.5644 8.40425"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
									</svg>
									Car Listing Settings
								</Link>
							</li>
							<li>
								<Link to={`/dashboard/add-listing`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={22}
										height={22}
										viewBox="0 0 22 22"
										fill="none"
									>
										<g opacity="0.2">
											<path
												d="M10.0135 2.55687H6.58608C3.76733 2.55687 2 4.55245 2 7.37762V14.9988C2 17.824 3.75908 19.8195 6.58608 19.8195H14.6747C17.5027 19.8195 19.2617 17.824 19.2617 14.9988V11.3065"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7.57059 10.0111L14.4208 3.16086C15.2743 2.30836 16.6575 2.30836 17.5109 3.16086L18.6265 4.27644C19.4799 5.12986 19.4799 6.51403 18.6265 7.36653L11.7433 14.2498C11.3702 14.6229 10.8642 14.8328 10.3362 14.8328H6.90234L6.98851 11.3678C7.00134 10.8581 7.20943 10.3723 7.57059 10.0111Z"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M13.3789 4.21875L17.5644 8.40425"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
									</svg>
									Add Listing
								</Link>
							</li>
							<li>
								<Link>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={22}
										height={22}
										viewBox="0 0 22 22"
										fill="none"
									>
										<g opacity="0.2">
											<path
												d="M10.0135 2.55687H6.58608C3.76733 2.55687 2 4.55245 2 7.37762V14.9988C2 17.824 3.75908 19.8195 6.58608 19.8195H14.6747C17.5027 19.8195 19.2617 17.824 19.2617 14.9988V11.3065"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7.57059 10.0111L14.4208 3.16086C15.2743 2.30836 16.6575 2.30836 17.5109 3.16086L18.6265 4.27644C19.4799 5.12986 19.4799 6.51403 18.6265 7.36653L11.7433 14.2498C11.3702 14.6229 10.8642 14.8328 10.3362 14.8328H6.90234L6.98851 11.3678C7.00134 10.8581 7.20943 10.3723 7.57059 10.0111Z"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M13.3789 4.21875L17.5644 8.40425"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
									</svg>
									All Car List
								</Link>
							</li>

							<li>
								<Link
									href="#"
									onClick={(e) => {
										e.preventDefault();
										handleLogOut();
									}}
									className="menu-index-7"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={22}
										height={22}
										viewBox="0 0 22 22"
										fill="none"
									>
										<g opacity="0.2">
											<path
												d="M13.2237 6.77418V5.91893C13.2237 4.05352 11.7112 2.54102 9.84575 2.54102H5.377C3.5125 2.54102 2 4.05352 2 5.91893V16.1214C2 17.9868 3.5125 19.4993 5.377 19.4993H9.85492C11.7148 19.4993 13.2237 17.9914 13.2237 16.1315V15.2671"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M19.4516 11.0208H8.41406"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M16.7656 8.34766L19.4496 11.0197L16.7656 13.6927"
												stroke="#F1FAEE"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
									</svg>
									LogOut
								</Link>
							</li>
						</ul>
					</div>
					<h6 className="db-title mt-3">Manage Site Settings</h6>
					<div className="db-dashboard-menu">
						<ul>
							<li>
								<Link
									to={`/dashboard/site-settings`}
									className={`menu-index-1 ${
										pathname == "/site-settings" ? "active" : ""
									} `}
								>
									<span class="icon-autodeal-service mr-3"></span>
									Settings
								</Link>
							</li>
							<li>
								<Link
									to={`/dashboard/profile-settings`}
									className={`menu-index-1 ${
										pathname == "/profile-settings" ? "active" : ""
									} `}
								>
									<span class="icon-autodeal-user mr-3"></span>
									Profile
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</aside>
		</>
	);
}

import React, { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

/**
 * HeaderAuth Component - ISAM Auto Authentication & Service Management
 * 
 * Features:
 * - User authentication status display
 * - Service status indicator with pending count
 * - Emergency service quick access
 * - Comprehensive user dropdown menu with service options
 * 
 * Usage:
 * 1. Import this component in your header file
 * 2. Place it where you want the login/user info to appear
 * 
 * Example:
 * import HeaderAuth from '@/components/common/HeaderAuth';
 * 
 * // In your header component:
 * <div className="header-right">
 *   <HeaderAuth />
 * </div>
 */

const HeaderAuth = () => {
	const { user, logOut } = useContext(AuthContext);

	const handleLogout = async () => {
		try {
			await logOut();
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	if (!user) {
		// Show login/register buttons when user is not logged in
		return (
			<div className="header-auth-buttons">
				<a href="/login" className="btn btn-outline-primary me-2">
					<i className="fas fa-sign-in-alt me-1"></i>
					Login
				</a>
				<a href="/register" className="btn btn-primary">
					<i className="fas fa-user-plus me-1"></i>
					Register
				</a>
			</div>
		);
	}

	// Show user info when logged in
	return (
		<div className="header-user-info d-flex align-items-center">
			{/* Service Status Indicator */}
			<div className="me-3">
				<a
					href="/service-status"
					className="btn btn-sm position-relative"
					style={{
						backgroundColor: "#E90A1D",
						color: "white",
						border: "none",
						padding: "6px 12px",
						borderRadius: "20px",
						fontSize: "0.85rem",
						textDecoration: "none",
					}}
					title="Check Service Status"
				>
					<i className="fas fa-tools me-1"></i>
					Service Status
					<span
						className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning"
						style={{ fontSize: "0.7em", padding: "2px 6px" }}
					>
						1
					</span>
				</a>
			</div>

			<div className="dropdown">
				<button
					className="btn btn-link dropdown-toggle text-decoration-none"
					type="button"
					id="userDropdown"
					data-bs-toggle="dropdown"
					aria-expanded="false"
					style={{ display: "flex", alignItems: "center", gap: "8px" }}
				>
					{user.photoURL ? (
						<img
							src={user.photoURL}
							alt={user.displayName || "User"}
							className="rounded-circle"
							style={{
								width: "35px",
								height: "35px",
								objectFit: "cover",
							}}
						/>
					) : (
						<div
							className="rounded-circle d-flex align-items-center justify-content-center"
							style={{
								width: "35px",
								height: "35px",
								backgroundColor: "#007bff",
								color: "white",
								fontWeight: "bold",
							}}
						>
							{user.displayName?.charAt(0).toUpperCase() ||
								user.email?.charAt(0).toUpperCase() ||
								"U"}
						</div>
					)}
					<span className="fw-semibold">
						{user.displayName || user.email?.split("@")[0]}
					</span>
				</button>
				<ul
					className="dropdown-menu dropdown-menu-end"
					aria-labelledby="userDropdown"
					style={{
						minWidth: "280px",
						maxWidth: "320px",
						padding: "0.5rem 0",
						marginTop: "0.5rem",
						boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
						border: "1px solid rgba(0,0,0,0.1)",
						borderRadius: "8px",
					}}
				>
					<li>
						<div
							className="dropdown-item-text"
							style={{
								padding: "0.75rem 1rem",
								backgroundColor: "#f8f9fa",
							}}
						>
							<strong>{user.displayName || "User"}</strong>
							<br />
							<small className="text-muted" style={{ fontSize: "0.85rem" }}>
								{user.email}
							</small>
						</div>
					</li>
					<li>
						<hr className="dropdown-divider" />
					</li>
					<li>
						<a
							className="dropdown-item"
							href="/dashboard"
							style={{ padding: "0.6rem 1rem", fontSize: "0.95rem" }}
						>
							<i
								className="fas fa-tachometer-alt me-2"
								style={{ width: "18px" }}
							></i>
							Dashboard
						</a>
					</li>
					<li>
						<a
							className="dropdown-item"
							href="/service-booking"
							style={{ padding: "0.6rem 1rem", fontSize: "0.95rem" }}
						>
							<i
								className="fas fa-calendar-plus me-2"
								style={{ width: "18px" }}
							></i>
							Book New Service
						</a>
					</li>
					<li>
						<a
							className="dropdown-item"
							href="/service-status"
							style={{ padding: "0.6rem 1rem", fontSize: "0.95rem" }}
						>
							<i className="fas fa-clock me-2" style={{ width: "18px" }}></i>
							Service Status
						</a>
					</li>
					<li>
						<a
							className="dropdown-item"
							href="/service-history"
							style={{ padding: "0.6rem 1rem", fontSize: "0.95rem" }}
						>
							<i className="fas fa-history me-2" style={{ width: "18px" }}></i>
							Service History
						</a>
					</li>
					<li>
						<a
							className="dropdown-item"
							href="/my-review"
							style={{ padding: "0.6rem 1rem", fontSize: "0.95rem" }}
						>
							<i className="fas fa-star me-2" style={{ width: "18px" }}></i>
							My Reviews
						</a>
					</li>
					<li>
						<a
							className="dropdown-item"
							href="/profile"
							style={{ padding: "0.6rem 1rem", fontSize: "0.95rem" }}
						>
							<i className="fas fa-user-cog me-2" style={{ width: "18px" }}></i>
							Profile & Settings
						</a>
					</li>

					<li>
						<a
							className="dropdown-item"
							href="/contact"
							style={{ padding: "0.6rem 1rem", fontSize: "0.95rem" }}
						>
							<i className="fas fa-phone me-2" style={{ width: "18px" }}></i>
							Contact Support
						</a>
					</li>
					<li>
						<a
							className="dropdown-item"
							href="/faq"
							style={{ padding: "0.6rem 1rem", fontSize: "0.95rem" }}
						>
							<i
								className="fas fa-question-circle me-2"
								style={{ width: "18px" }}
							></i>
							Help & FAQ
						</a>
					</li>
					<li>
						<hr className="dropdown-divider" />
					</li>
					<li>
						<button
							className="dropdown-item text-danger"
							onClick={handleLogout}
							style={{
								padding: "0.6rem 1rem",
								fontSize: "0.95rem",
								fontWeight: "500",
							}}
						>
							<i
								className="fas fa-sign-out-alt me-2"
								style={{ width: "18px" }}
							></i>
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default HeaderAuth;

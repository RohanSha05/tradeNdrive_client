import React, { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

/**
 * Example of how to add authentication status to your header
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
				<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
					<li>
						<div className="dropdown-item-text">
							<strong>{user.displayName || "User"}</strong>
							<br />
							<small className="text-muted">{user.email}</small>
						</div>
					</li>
					<li>
						<hr className="dropdown-divider" />
					</li>
					<li>
						<a className="dropdown-item" href="/dashboard">
							<i className="fas fa-tachometer-alt me-2"></i>
							Dashboard
						</a>
					</li>
					<li>
						<a className="dropdown-item" href="/my-review">
							<i className="fas fa-star me-2"></i>
							My Reviews
						</a>
					</li>
					<li>
						<hr className="dropdown-divider" />
					</li>
					<li>
						<button
							className="dropdown-item text-danger"
							onClick={handleLogout}
						>
							<i className="fas fa-sign-out-alt me-2"></i>
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default HeaderAuth;

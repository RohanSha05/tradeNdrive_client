import React, { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserProfile = () => {
	const { user, logOut } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logOut();
			navigate("/");
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const confirmLogout = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You will be logged out",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, logout!",
		}).then((result) => {
			if (result.isConfirmed) {
				handleLogout();
			}
		});
	};

	if (!user) {
		return (
			<div className="header-user">
				<a href="/login" className="btn-login">
					Login
				</a>
				<a href="/register" className="btn-register ms-2">
					Register
				</a>
			</div>
		);
	}

	return (
		<div className="header-user dropdown">
			<button
				className="btn dropdown-toggle"
				type="button"
				id="userDropdown"
				data-bs-toggle="dropdown"
				aria-expanded="false"
				style={{
					background: "none",
					border: "none",
					display: "flex",
					alignItems: "center",
					gap: "8px",
				}}
			>
				{user.photoURL ? (
					<img
						src={user.photoURL}
						alt={user.displayName || "User"}
						style={{
							width: "32px",
							height: "32px",
							borderRadius: "50%",
							objectFit: "cover",
						}}
					/>
				) : (
					<div
						style={{
							width: "32px",
							height: "32px",
							borderRadius: "50%",
							backgroundColor: "#007bff",
							color: "white",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontWeight: "bold",
						}}
					>
						{user.displayName?.charAt(0).toUpperCase() ||
							user.email?.charAt(0).toUpperCase() ||
							"U"}
					</div>
				)}
				<span>{user.displayName || user.email}</span>
			</button>
			<ul className="dropdown-menu" aria-labelledby="userDropdown">
				<li>
					<span className="dropdown-item-text">
						<strong>{user.displayName || "User"}</strong>
						<br />
						<small className="text-muted">{user.email}</small>
					</span>
				</li>
				<li>
					<hr className="dropdown-divider" />
				</li>
				<li>
					<button className="dropdown-item" onClick={confirmLogout}>
						<i className="fas fa-sign-out-alt me-2"></i>
						Logout
					</button>
				</li>
			</ul>
		</div>
	);
};

export default UserProfile;

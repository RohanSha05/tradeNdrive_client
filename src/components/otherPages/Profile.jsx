import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { updateProfile, updatePassword, updateEmail } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "@/config/firebase.init";

export default function Profile() {
	const { user } = useContext(AuthContext);
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const fileInputRef = useRef(null);

	// Profile form state
	const [profileData, setProfileData] = useState({
		displayName: user?.displayName || "",
		email: user?.email || "",
		phone: user?.phoneNumber || "",
		photoURL: user?.photoURL || "",
	});

	// Password form state
	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const [previewImage, setPreviewImage] = useState(user?.photoURL || "");

	// Handle profile image upload
	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			// Validate file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				Swal.fire({
					icon: "error",
					title: "File too large",
					text: "Please select an image smaller than 5MB",
				});
				return;
			}

			// Validate file type
			if (!file.type.startsWith("image/")) {
				Swal.fire({
					icon: "error",
					title: "Invalid file type",
					text: "Please select an image file",
				});
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result);
				setProfileData({ ...profileData, photoURL: reader.result });
			};
			reader.readAsDataURL(file);
		}
	};

	// Handle profile update
	const handleProfileUpdate = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Update display name and photo
			await updateProfile(auth.currentUser, {
				displayName: profileData.displayName,
				photoURL: profileData.photoURL,
			});

			// Update email if changed
			if (profileData.email !== user.email) {
				await updateEmail(auth.currentUser, profileData.email);
			}

			Swal.fire({
				icon: "success",
				title: "Profile Updated!",
				text: "Your profile has been updated successfully",
				confirmButtonColor: "#E90A1D",
			});

			setIsEditing(false);
		} catch (error) {
			console.error("Profile update error:", error);
			Swal.fire({
				icon: "error",
				title: "Update Failed",
				text: error.message || "Failed to update profile. Please try again.",
				confirmButtonColor: "#E90A1D",
			});
		} finally {
			setLoading(false);
		}
	};

	// Handle password change
	const handlePasswordChange = async (e) => {
		e.preventDefault();

		// Validate passwords match
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			Swal.fire({
				icon: "error",
				title: "Passwords don't match",
				text: "New password and confirm password must match",
				confirmButtonColor: "#E90A1D",
			});
			return;
		}

		// Validate password strength
		if (passwordData.newPassword.length < 6) {
			Swal.fire({
				icon: "error",
				title: "Weak Password",
				text: "Password must be at least 6 characters long",
				confirmButtonColor: "#E90A1D",
			});
			return;
		}

		setLoading(true);

		try {
			await updatePassword(auth.currentUser, passwordData.newPassword);

			Swal.fire({
				icon: "success",
				title: "Password Updated!",
				text: "Your password has been changed successfully",
				confirmButtonColor: "#E90A1D",
			});

			// Clear password fields
			setPasswordData({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		} catch (error) {
			console.error("Password update error:", error);
			let errorMessage = "Failed to update password. Please try again.";
			
			if (error.code === "auth/requires-recent-login") {
				errorMessage = "Please log out and log in again before changing your password.";
			}

			Swal.fire({
				icon: "error",
				title: "Update Failed",
				text: errorMessage,
				confirmButtonColor: "#E90A1D",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="tf-section5 flat-contact profile-section">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="heading-section">
							<h2 className="fw-bold">My Profile & Settings</h2>
							<p className="text-color-2">
								Manage your account information and preferences
							</p>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					{/* Profile Information Card */}
					<div className="col-lg-8 mb-4">
						<div className="card shadow-sm border-0">
							<div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
								<h4 className="mb-0 fw-semibold">
									<i className="fas fa-user-circle me-2 text-primary"></i>
									Profile Information
								</h4>
								{!isEditing && (
									<button
										className="btn btn-sm btn-outline-primary"
										onClick={() => setIsEditing(true)}
									>
										<i className="fas fa-edit me-1"></i>
										Edit Profile
									</button>
								)}
							</div>
							<div className="card-body p-4">
								<form onSubmit={handleProfileUpdate}>
									{/* Profile Photo Section */}
									<div className="mb-4 text-center">
										<div className="position-relative d-inline-block">
											{previewImage ? (
												<img
													src={previewImage}
													alt="Profile"
													className="rounded-circle shadow-sm"
													style={{
														width: "150px",
														height: "150px",
														objectFit: "cover",
														border: "4px solid #E90A1D",
													}}
												/>
											) : (
												<div
													className="rounded-circle shadow-sm d-flex align-items-center justify-content-center"
													style={{
														width: "150px",
														height: "150px",
														backgroundColor: "#007bff",
														color: "white",
														fontSize: "3rem",
														fontWeight: "bold",
														border: "4px solid #E90A1D",
													}}
												>
													{user?.displayName?.charAt(0).toUpperCase() ||
														user?.email?.charAt(0).toUpperCase() ||
														"U"}
												</div>
											)}
											{isEditing && (
												<button
													type="button"
													className="btn btn-sm btn-danger rounded-circle position-absolute"
													style={{ bottom: "10px", right: "10px" }}
													onClick={() => fileInputRef.current.click()}
												>
													<i className="fas fa-camera"></i>
												</button>
											)}
											<input
												ref={fileInputRef}
												type="file"
												className="d-none"
												accept="image/*"
												onChange={handleImageUpload}
											/>
										</div>
										<p className="text-muted mt-2 small">
											Click camera icon to upload new photo (Max 5MB)
										</p>
									</div>

									{/* Profile Form Fields */}
									<div className="row">
										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">
												<i className="fas fa-user me-2"></i>
												Full Name
											</label>
											<input
												type="text"
												className="form-control"
												value={profileData.displayName}
												onChange={(e) =>
													setProfileData({
														...profileData,
														displayName: e.target.value,
													})
												}
												disabled={!isEditing}
												required
											/>
										</div>

										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">
												<i className="fas fa-envelope me-2"></i>
												Email Address
											</label>
											<input
												type="email"
												className="form-control"
												value={profileData.email}
												onChange={(e) =>
													setProfileData({
														...profileData,
														email: e.target.value,
													})
												}
												disabled={!isEditing}
												required
											/>
										</div>

										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">
												<i className="fas fa-phone me-2"></i>
												Phone Number
											</label>
											<input
												type="tel"
												className="form-control"
												value={profileData.phone}
												onChange={(e) =>
													setProfileData({
														...profileData,
														phone: e.target.value,
													})
												}
												disabled={!isEditing}
												placeholder="Optional"
											/>
										</div>

										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">
												<i className="fas fa-calendar me-2"></i>
												Member Since
											</label>
											<input
												type="text"
												className="form-control"
												value={
													user?.metadata?.creationTime
														? new Date(
																user.metadata.creationTime
														  ).toLocaleDateString()
														: "N/A"
												}
												disabled
											/>
										</div>
									</div>

									{isEditing && (
										<div className="d-flex gap-2 justify-content-end mt-4">
											<button
												type="button"
												className="btn btn-secondary"
												onClick={() => {
													setIsEditing(false);
													setProfileData({
														displayName: user?.displayName || "",
														email: user?.email || "",
														phone: user?.phoneNumber || "",
														photoURL: user?.photoURL || "",
													});
													setPreviewImage(user?.photoURL || "");
												}}
												disabled={loading}
											>
												<i className="fas fa-times me-1"></i>
												Cancel
											</button>
											<button
												type="submit"
												className="btn btn-primary"
												disabled={loading}
											>
												{loading ? (
													<>
														<span
															className="spinner-border spinner-border-sm me-2"
															role="status"
															aria-hidden="true"
														></span>
														Saving...
													</>
												) : (
													<>
														<i className="fas fa-save me-1"></i>
														Save Changes
													</>
												)}
											</button>
										</div>
									)}
								</form>
							</div>
						</div>
					</div>

					{/* Account Stats Sidebar */}
					<div className="col-lg-4 mb-4">
						<div className="card shadow-sm border-0 mb-3">
							<div className="card-header bg-white py-3">
								<h5 className="mb-0 fw-semibold">
									<i className="fas fa-chart-line me-2 text-success"></i>
									Account Activity
								</h5>
							</div>
							<div className="card-body">
								<div className="mb-3 pb-3 border-bottom">
									<div className="d-flex justify-content-between align-items-center">
										<div>
											<i className="fas fa-car text-primary me-2"></i>
											<span className="text-muted">Service Bookings</span>
										</div>
										<span className="badge bg-primary rounded-pill">3</span>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<div className="d-flex justify-content-between align-items-center">
										<div>
											<i className="fas fa-star text-warning me-2"></i>
											<span className="text-muted">Reviews Written</span>
										</div>
										<span className="badge bg-warning rounded-pill">2</span>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<div className="d-flex justify-content-between align-items-center">
										<div>
											<i className="fas fa-heart text-danger me-2"></i>
											<span className="text-muted">Favorites</span>
										</div>
										<span className="badge bg-danger rounded-pill">5</span>
									</div>
								</div>
								<div>
									<div className="d-flex justify-content-between align-items-center">
										<div>
											<i className="fas fa-clock text-info me-2"></i>
											<span className="text-muted">Last Login</span>
										</div>
										<span className="badge bg-info rounded-pill">Today</span>
									</div>
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div className="card shadow-sm border-0">
							<div className="card-header bg-white py-3">
								<h5 className="mb-0 fw-semibold">
									<i className="fas fa-bolt me-2 text-warning"></i>
									Quick Actions
								</h5>
							</div>
							<div className="card-body">
								<div className="d-grid gap-2">
									<a
										href="/service-booking"
										className="btn btn-outline-primary btn-sm"
									>
										<i className="fas fa-calendar-plus me-2"></i>
										Book Service
									</a>
									<a
										href="/service-status"
										className="btn btn-outline-info btn-sm"
									>
										<i className="fas fa-tasks me-2"></i>
										Check Status
									</a>
									<a href="/my-review" className="btn btn-outline-warning btn-sm">
										<i className="fas fa-star me-2"></i>
										Write Review
									</a>
									<a href="/contact" className="btn btn-outline-secondary btn-sm">
										<i className="fas fa-headset me-2"></i>
										Contact Support
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Change Password Section */}
				<div className="row mt-4">
					<div className="col-lg-8">
						<div className="card shadow-sm border-0">
							<div className="card-header bg-white py-3">
								<h4 className="mb-0 fw-semibold">
									<i className="fas fa-lock me-2 text-danger"></i>
									Change Password
								</h4>
							</div>
							<div className="card-body p-4">
								<form onSubmit={handlePasswordChange}>
									<div className="row">
										<div className="col-md-12 mb-3">
											<label className="form-label fw-semibold">
												<i className="fas fa-key me-2"></i>
												Current Password
											</label>
											<input
												type="password"
												className="form-control"
												value={passwordData.currentPassword}
												onChange={(e) =>
													setPasswordData({
														...passwordData,
														currentPassword: e.target.value,
													})
												}
												placeholder="Enter current password"
											/>
										</div>

										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">
												<i className="fas fa-lock me-2"></i>
												New Password
											</label>
											<input
												type="password"
												className="form-control"
												value={passwordData.newPassword}
												onChange={(e) =>
													setPasswordData({
														...passwordData,
														newPassword: e.target.value,
													})
												}
												placeholder="Enter new password"
												required
											/>
											<small className="text-muted">
												Minimum 6 characters
											</small>
										</div>

										<div className="col-md-6 mb-3">
											<label className="form-label fw-semibold">
												<i className="fas fa-check-circle me-2"></i>
												Confirm Password
											</label>
											<input
												type="password"
												className="form-control"
												value={passwordData.confirmPassword}
												onChange={(e) =>
													setPasswordData({
														...passwordData,
														confirmPassword: e.target.value,
													})
												}
												placeholder="Confirm new password"
												required
											/>
										</div>
									</div>

									<div className="d-flex justify-content-end mt-3">
										<button
											type="submit"
											className="btn btn-danger"
											disabled={loading}
										>
											{loading ? (
												<>
													<span
														className="spinner-border spinner-border-sm me-2"
														role="status"
														aria-hidden="true"
													></span>
													Updating...
												</>
											) : (
												<>
													<i className="fas fa-shield-alt me-1"></i>
													Update Password
												</>
											)}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

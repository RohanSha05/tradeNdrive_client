import React, { useState, useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { deleteUser, sendEmailVerification } from "firebase/auth";
import { auth } from "@/config/firebase.init";
import Swal from "sweetalert2";

export default function Settings() {
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

	// Settings state
	const [settings, setSettings] = useState({
		// Email Notifications
		emailNotifications: {
			serviceUpdates: true,
			promotionalEmails: true,
			weeklyNewsletter: false,
			reviewReminders: true,
		},
		// Push Notifications
		pushNotifications: {
			serviceReminders: true,
			statusUpdates: true,
			newMessages: true,
		},
		// Privacy Settings
		privacy: {
			showProfile: true,
			showReviews: true,
			allowMessaging: true,
		},
		// Display Settings
		display: {
			language: "en",
			theme: "light",
			dateFormat: "MM/DD/YYYY",
		},
	});

	// Handle toggle switches
	const handleToggle = (category, setting) => {
		setSettings({
			...settings,
			[category]: {
				...settings[category],
				[setting]: !settings[category][setting],
			},
		});
	};

	// Handle select changes
	const handleSelectChange = (category, setting, value) => {
		setSettings({
			...settings,
			[category]: {
				...settings[category],
				[setting]: value,
			},
		});
	};

	// Save settings
	const handleSaveSettings = async () => {
		setLoading(true);
		try {
			// In a real application, you would save these to a database
			// For now, we'll just show a success message
			await new Promise((resolve) => setTimeout(resolve, 1000));

			Swal.fire({
				icon: "success",
				title: "Settings Saved!",
				text: "Your preferences have been updated successfully",
				confirmButtonColor: "#E90A1D",
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Save Failed",
				text: "Failed to save settings. Please try again.",
				confirmButtonColor: "#E90A1D",
			});
		} finally {
			setLoading(false);
		}
	};

	// Verify email
	const handleVerifyEmail = async () => {
		setLoading(true);
		try {
			await sendEmailVerification(auth.currentUser);
			Swal.fire({
				icon: "success",
				title: "Verification Email Sent!",
				text: "Please check your email inbox",
				confirmButtonColor: "#E90A1D",
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Failed to Send",
				text: error.message,
				confirmButtonColor: "#E90A1D",
			});
		} finally {
			setLoading(false);
		}
	};

	// Delete account
	const handleDeleteAccount = async () => {
		const result = await Swal.fire({
			title: "Are you absolutely sure?",
			html: `
				<p class="text-danger fw-bold">This action cannot be undone!</p>
				<p>This will permanently delete your account and remove all your data.</p>
				<p>Type <strong>DELETE</strong> to confirm:</p>
			`,
			input: "text",
			inputPlaceholder: "Type DELETE to confirm",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#dc3545",
			cancelButtonColor: "#6c757d",
			confirmButtonText: "Yes, delete my account",
			cancelButtonText: "Cancel",
		});

		if (result.isConfirmed && result.value === "DELETE") {
			setLoading(true);
			try {
				await deleteUser(auth.currentUser);
				Swal.fire({
					icon: "success",
					title: "Account Deleted",
					text: "Your account has been permanently deleted",
					confirmButtonColor: "#E90A1D",
				}).then(() => {
					window.location.href = "/";
				});
			} catch (error) {
				let errorMessage = "Failed to delete account. Please try again.";
				
				if (error.code === "auth/requires-recent-login") {
					errorMessage = "Please log out and log in again before deleting your account.";
				}

				Swal.fire({
					icon: "error",
					title: "Deletion Failed",
					text: errorMessage,
					confirmButtonColor: "#E90A1D",
				});
			} finally {
				setLoading(false);
			}
		} else if (result.isConfirmed) {
			Swal.fire({
				icon: "error",
				title: "Incorrect Confirmation",
				text: 'You must type "DELETE" to confirm',
				confirmButtonColor: "#E90A1D",
			});
		}
	};

	return (
		<section className="tf-section5 flat-contact settings-section">
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="heading-section">
							<h2 className="fw-bold">Account Settings</h2>
							<p className="text-color-2">
								Manage your preferences and account options
							</p>
						</div>
					</div>
				</div>

				<div className="row mt-5">
					{/* Main Settings Content */}
					<div className="col-lg-8 mb-4">
						{/* Email Notifications */}
						<div className="card shadow-sm border-0 mb-4">
							<div className="card-header bg-white py-3">
								<h5 className="mb-0 fw-semibold">
									<i className="fas fa-envelope me-2 text-primary"></i>
									Email Notifications
								</h5>
							</div>
							<div className="card-body p-4">
								<div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
									<div>
										<strong>Service Updates</strong>
										<p className="text-muted small mb-0">
											Receive updates about your service appointments
										</p>
									</div>
									<div className="form-check form-switch">
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											checked={settings.emailNotifications.serviceUpdates}
											onChange={() =>
												handleToggle("emailNotifications", "serviceUpdates")
											}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>

								<div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
									<div>
										<strong>Promotional Emails</strong>
										<p className="text-muted small mb-0">
											Get special offers and deals
										</p>
									</div>
									<div className="form-check form-switch">
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											checked={settings.emailNotifications.promotionalEmails}
											onChange={() =>
												handleToggle("emailNotifications", "promotionalEmails")
											}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>

								<div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
									<div>
										<strong>Weekly Newsletter</strong>
										<p className="text-muted small mb-0">
											Weekly tips and automotive news
										</p>
									</div>
									<div className="form-check form-switch">
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											checked={settings.emailNotifications.weeklyNewsletter}
											onChange={() =>
												handleToggle("emailNotifications", "weeklyNewsletter")
											}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>

								<div className="d-flex justify-content-between align-items-center">
									<div>
										<strong>Review Reminders</strong>
										<p className="text-muted small mb-0">
											Reminders to review your service experience
										</p>
									</div>
									<div className="form-check form-switch">
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											checked={settings.emailNotifications.reviewReminders}
											onChange={() =>
												handleToggle("emailNotifications", "reviewReminders")
											}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Push Notifications */}
						<div className="card shadow-sm border-0 mb-4">
							<div className="card-header bg-white py-3">
								<h5 className="mb-0 fw-semibold">
									<i className="fas fa-bell me-2 text-warning"></i>
									Push Notifications
								</h5>
							</div>
							<div className="card-body p-4">
								<div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
									<div>
										<strong>Service Reminders</strong>
										<p className="text-muted small mb-0">
											Upcoming service appointment notifications
										</p>
									</div>
									<div className="form-check form-switch">
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											checked={settings.pushNotifications.serviceReminders}
											onChange={() =>
												handleToggle("pushNotifications", "serviceReminders")
											}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>

								<div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
									<div>
										<strong>Status Updates</strong>
										<p className="text-muted small mb-0">
											Real-time updates on your service status
										</p>
									</div>
									<div className="form-check form-switch">
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											checked={settings.pushNotifications.statusUpdates}
											onChange={() =>
												handleToggle("pushNotifications", "statusUpdates")
											}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>

								<div className="d-flex justify-content-between align-items-center">
									<div>
										<strong>New Messages</strong>
										<p className="text-muted small mb-0">
											Notifications for new messages from support
										</p>
									</div>
									<div className="form-check form-switch">
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											checked={settings.pushNotifications.newMessages}
											onChange={() =>
												handleToggle("pushNotifications", "newMessages")
											}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Privacy Settings */}
						<div className="card shadow-sm border-0 mb-4">
							<div className="card-header bg-white py-3">
								<h5 className="mb-0 fw-semibold">
									<i className="fas fa-shield-alt me-2 text-success"></i>
									Privacy Settings
								</h5>
							</div>
							<div className="card-body p-4">
								<div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
									<div>
										<strong>Show Profile Publicly</strong>
										<p className="text-muted small mb-0">
											Allow others to view your profile information
										</p>
									</div>
									<div className="form-check form-switch">
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											checked={settings.privacy.showProfile}
											onChange={() => handleToggle("privacy", "showProfile")}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>

								<div className="mb-3 pb-3 border-bottom d-flex justify-content-between align-items-center">
									<div>
										<strong>Show Reviews</strong>
										<p className="text-muted small mb-0">
											Display your reviews publicly
										</p>
									</div>
									<div className="form-check form-switch">
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											checked={settings.privacy.showReviews}
											onChange={() => handleToggle("privacy", "showReviews")}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>

								<div className="d-flex justify-content-between align-items-center">
									<div>
										<strong>Allow Messaging</strong>
										<p className="text-muted small mb-0">
											Let support and dealers contact you
										</p>
									</div>
									<div className="form-check form-switch">
										<input
											className="form-check-input"
											type="checkbox"
											role="switch"
											checked={settings.privacy.allowMessaging}
											onChange={() => handleToggle("privacy", "allowMessaging")}
											style={{ cursor: "pointer" }}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Display Settings */}
						<div className="card shadow-sm border-0 mb-4">
							<div className="card-header bg-white py-3">
								<h5 className="mb-0 fw-semibold">
									<i className="fas fa-desktop me-2 text-info"></i>
									Display Settings
								</h5>
							</div>
							<div className="card-body p-4">
								<div className="mb-3">
									<label className="form-label fw-semibold">
										<i className="fas fa-language me-2"></i>
										Language
									</label>
									<select
										className="form-select"
										value={settings.display.language}
										onChange={(e) =>
											handleSelectChange("display", "language", e.target.value)
										}
									>
										<option value="en">English</option>
										<option value="es">Spanish</option>
										<option value="fr">French</option>
										<option value="de">German</option>
									</select>
								</div>

								<div className="mb-3">
									<label className="form-label fw-semibold">
										<i className="fas fa-moon me-2"></i>
										Theme
									</label>
									<select
										className="form-select"
										value={settings.display.theme}
										onChange={(e) =>
											handleSelectChange("display", "theme", e.target.value)
										}
									>
										<option value="light">Light</option>
										<option value="dark">Dark</option>
										<option value="auto">Auto (System Default)</option>
									</select>
								</div>

								<div className="mb-3">
									<label className="form-label fw-semibold">
										<i className="fas fa-calendar-alt me-2"></i>
										Date Format
									</label>
									<select
										className="form-select"
										value={settings.display.dateFormat}
										onChange={(e) =>
											handleSelectChange("display", "dateFormat", e.target.value)
										}
									>
										<option value="MM/DD/YYYY">MM/DD/YYYY</option>
										<option value="DD/MM/YYYY">DD/MM/YYYY</option>
										<option value="YYYY-MM-DD">YYYY-MM-DD</option>
									</select>
								</div>
							</div>
						</div>

						{/* Save Button */}
						<div className="d-flex justify-content-end">
							<button
								className="btn btn-primary btn-lg"
								onClick={handleSaveSettings}
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
										<i className="fas fa-save me-2"></i>
										Save All Settings
									</>
								)}
							</button>
						</div>
					</div>

					{/* Sidebar */}
					<div className="col-lg-4 mb-4">
						{/* Account Security */}
						<div className="card shadow-sm border-0 mb-3">
							<div className="card-header bg-white py-3">
								<h5 className="mb-0 fw-semibold">
									<i className="fas fa-user-shield me-2 text-danger"></i>
									Account Security
								</h5>
							</div>
							<div className="card-body">
								<div className="mb-3">
									<div className="d-flex align-items-center mb-2">
										<i
											className={`fas ${
												user?.emailVerified ? "fa-check-circle" : "fa-times-circle"
											} me-2 ${user?.emailVerified ? "text-success" : "text-warning"}`}
										></i>
										<span>Email Verification</span>
									</div>
									{!user?.emailVerified && (
										<button
											className="btn btn-sm btn-outline-warning w-100"
											onClick={handleVerifyEmail}
											disabled={loading}
										>
											<i className="fas fa-envelope me-1"></i>
											Verify Email
										</button>
									)}
								</div>

								<div className="mb-3">
									<div className="d-flex align-items-center mb-2">
										<i className="fas fa-lock me-2 text-success"></i>
										<span>Password Protected</span>
									</div>
									<a
										href="/profile"
										className="btn btn-sm btn-outline-primary w-100"
									>
										<i className="fas fa-key me-1"></i>
										Change Password
									</a>
								</div>

								<div className="mb-3">
									<div className="d-flex align-items-center mb-2">
										<i className="fas fa-mobile-alt me-2 text-info"></i>
										<span>Two-Factor Auth</span>
									</div>
									<button className="btn btn-sm btn-outline-info w-100" disabled>
										<i className="fas fa-shield-alt me-1"></i>
										Enable 2FA (Coming Soon)
									</button>
								</div>
							</div>
						</div>

						{/* Data & Privacy */}
						<div className="card shadow-sm border-0 mb-3">
							<div className="card-header bg-white py-3">
								<h5 className="mb-0 fw-semibold">
									<i className="fas fa-database me-2 text-secondary"></i>
									Data & Privacy
								</h5>
							</div>
							<div className="card-body">
								<div className="d-grid gap-2">
									<button className="btn btn-sm btn-outline-secondary">
										<i className="fas fa-download me-1"></i>
										Download My Data
									</button>
									<button className="btn btn-sm btn-outline-secondary">
										<i className="fas fa-file-export me-1"></i>
										Export Account Info
									</button>
									<a href="/privacy-policy" className="btn btn-sm btn-outline-info">
										<i className="fas fa-file-contract me-1"></i>
										Privacy Policy
									</a>
									<a href="/terms" className="btn btn-sm btn-outline-info">
										<i className="fas fa-file-alt me-1"></i>
										Terms of Service
									</a>
								</div>
							</div>
						</div>

						{/* Danger Zone */}
						<div className="card shadow-sm border-danger mb-3">
							<div className="card-header bg-danger text-white py-3">
								<h5 className="mb-0 fw-semibold">
									<i className="fas fa-exclamation-triangle me-2"></i>
									Danger Zone
								</h5>
							</div>
							<div className="card-body">
								<p className="text-muted small mb-3">
									Once you delete your account, there is no going back. Please be
									certain.
								</p>
								<button
									className="btn btn-danger w-100"
									onClick={handleDeleteAccount}
									disabled={loading}
								>
									<i className="fas fa-trash-alt me-1"></i>
									Delete My Account
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

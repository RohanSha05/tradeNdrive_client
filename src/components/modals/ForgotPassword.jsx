import React, { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Swal from "sweetalert2";
import "./Allerts.css";
import Footer1 from "../footers/Footer1";
import Header2 from "../headers/Header2";
import MetaComponent from "../common/MetaComponent";
import { useApi } from "@/providers/ApiProvider";

export default function ForgotPassword() {
	const { data } = useApi();
	const { site_title, moto } = data.data || {};

	const metadata = {
		title: `${site_title ?? "Isam Auto"} - Reset Password`,
		description: moto,
	};

	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { resetPassword } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email) {
			Swal.fire({
				position: "top-end",
				icon: "error",
				title: "Please enter your email",
				showConfirmButton: false,
				timer: 1500,
				customClass: {
					popup: "custom-popup",
					title: "custom-title",
					icon: "custom-icon",
				},
			});
			return;
		}

		setIsLoading(true);

		try {
			await resetPassword(email);
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Password reset email sent! Check your inbox.",
				showConfirmButton: false,
				timer: 2000,
				customClass: {
					popup: "custom-popup",
					title: "custom-title",
					icon: "custom-icon",
				},
			});
			setEmail("");
		} catch (error) {
			Swal.fire({
				position: "top-end",
				icon: "error",
				title: error.message || "Failed to send reset email",
				showConfirmButton: false,
				timer: 1500,
				customClass: {
					popup: "custom-popup",
					title: "custom-title",
					icon: "custom-icon",
				},
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<MetaComponent meta={metadata} />
			<div className="header-fixed">
				<Header2 />
			</div>
			<div className="login-form" tabIndex={-1} aria-hidden="true">
				<div className="">
					<div className="">
						<div className="modal-body">
							<div className="flex">
								<div className="images flex-none">
									<img
										alt="images"
										src="/assets/images/section/login.jpg"
										width={380}
										height={640}
									/>
								</div>
								<div className="content">
									<h1 className="title-login">Reset Password</h1>
									<p className="mb-4 text-muted">
										Enter your email address and we'll send you a link to reset
										your password.
									</p>
									<div className="comments">
										<div className="respond-comment">
											<form
												onSubmit={handleSubmit}
												className="comment-form form-submit"
												acceptCharset="utf-8"
											>
												<fieldset className="">
													<label className="fw-6">Email Address</label>
													<input
														type="email"
														id="email"
														className="tb-my-input"
														name="email"
														placeholder="Enter your email"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
														required
													/>
													<div className="icon">
														<svg
															width={18}
															height={18}
															viewBox="0 0 18 18"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M2.25 5.25L9 9.75L15.75 5.25M2.25 5.25V12.75C2.25 13.1478 2.40804 13.5294 2.68934 13.8107C2.97064 14.092 3.35218 14.25 3.75 14.25H14.25C14.6478 14.25 15.0294 14.092 15.3107 13.8107C15.592 13.5294 15.75 13.1478 15.75 12.75V5.25M2.25 5.25C2.25 4.85218 2.40804 4.47064 2.68934 4.18934C2.97064 3.90804 3.35218 3.75 3.75 3.75H14.25C14.6478 3.75 15.0294 3.90804 15.3107 4.18934C15.592 4.47064 15.75 4.85218 15.75 5.25Z"
																stroke="#B6B6B6"
																strokeWidth="1.5"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</div>
												</fieldset>
												<button
													className="sc-button"
													name="submit"
													type="submit"
													disabled={isLoading}
												>
													<span>
														{isLoading ? "Sending..." : "Send Reset Link"}
													</span>
												</button>
												<div className="title-forgot mt-3 text-center">
													<span className="fs-14 fw-4">
														Remember your password?{" "}
														<a
															href="/login"
															className="text-primary"
															style={{ cursor: "pointer" }}
														>
															Login here
														</a>
													</span>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer1 />
		</>
	);
}

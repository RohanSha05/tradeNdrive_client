import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/providers/AuthProvider";
import PreLoader from "../pre-loader/PreLoader";
import Swal from "sweetalert2";
import "./Allerts.css";
import Footer1 from "../footers/Footer1";
import Header2 from "../headers/Header2";
import MetaComponent from "../common/MetaComponent";
import { useApi } from "@/providers/ApiProvider";

export default function Login() {
	const { data } = useApi();
	const { site_title, moto } = data.data || {};

	const metadata = {
		title: `${site_title ?? "Isam Auto"} - Login`,
		description: moto,
	};

	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const { signInUser, loading } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		const formData = new FormData(e.target);
		const email = formData.get("email");
		const password = formData.get("password");

		try {
			const result = await signInUser(email, password);
			if (result.status === "success") {
				Swal.fire({
					position: "top-end",
					icon: "success",
					title: "Successfully logged into the admin dashboard",
					showConfirmButton: false,
					timer: 1500,
					customClass: {
						popup: "custom-popup",
						title: "custom-title",
						icon: "custom-icon",
					},
				});
				navigate("/dashboard");
			}
		} catch (error) {
			setError(error.message);
			Swal.fire({
				position: "top-end",
				icon: "error",
				title: `${error.message}`,
				showConfirmButton: false,
				timer: 1500,
				customClass: {
					popup: "custom-popup",
					title: "custom-title",
					icon: "custom-icon",
				},
			});
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
									<h1 className="title-login">Login</h1>
									<div className="comments">
										<div className="respond-comment">
											<form
												onSubmit={handleSubmit}
												className="comment-form form-submit"
												acceptCharset="utf-8"
											>
												<fieldset className="">
													<label className="fw-6">Account</label>
													<input
														type="text"
														id="email"
														className="tb-my-input"
														name="email"
														placeholder="Your email"
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
																d="M11.8127 4.5C11.8127 5.24592 11.5164 5.96129 10.989 6.48874C10.4615 7.01618 9.74615 7.3125 9.00023 7.3125C8.25431 7.3125 7.53893 7.01618 7.01149 6.48874C6.48404 5.96129 6.18773 5.24592 6.18773 4.5C6.18773 3.75408 6.48404 3.03871 7.01149 2.51126C7.53893 1.98382 8.25431 1.6875 9.00023 1.6875C9.74615 1.6875 10.4615 1.98382 10.989 2.51126C11.5164 3.03871 11.8127 3.75408 11.8127 4.5ZM3.37598 15.0885C3.40008 13.6128 4.00323 12.2056 5.05536 11.1705C6.10749 10.1354 7.52429 9.55535 9.00023 9.55535C10.4762 9.55535 11.893 10.1354 12.9451 11.1705C13.9972 12.2056 14.6004 13.6128 14.6245 15.0885C12.86 15.8976 10.9413 16.3151 9.00023 16.3125C6.99323 16.3125 5.08823 15.8745 3.37598 15.0885Z"
																stroke="#B6B6B6"
																strokeWidth="1.5"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</div>
												</fieldset>
												<fieldset className="style-wrap">
													<label className="fw-6">Password</label>
													<input
														type="password"
														className="input-form password-input"
														name="password"
														placeholder="Your password"
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
																d="M12.375 7.875V5.0625C12.375 4.16739 12.0194 3.30895 11.3865 2.67601C10.7535 2.04308 9.89511 1.6875 9 1.6875C8.10489 1.6875 7.24645 2.04308 6.61351 2.67601C5.98058 3.30895 5.625 4.16739 5.625 5.0625V7.875M5.0625 16.3125H12.9375C13.3851 16.3125 13.8143 16.1347 14.1307 15.8182C14.4472 15.5018 14.625 15.0726 14.625 14.625V9.5625C14.625 9.11495 14.4472 8.68573 14.1307 8.36926C13.8143 8.05279 13.3851 7.875 12.9375 7.875H5.0625C4.61495 7.875 4.18573 8.05279 3.86926 8.36926C3.55279 8.68573 3.375 9.11495 3.375 9.5625V14.625C3.375 15.0726 3.55279 15.5018 3.86926 15.8182C4.18573 16.1347 4.61495 16.3125 5.0625 16.3125Z"
																stroke="#B6B6B6"
																strokeWidth="1.5"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</div>
												</fieldset>
												<div className="title-forgot">
													<a className="fs-14 fw-4">Forgot password</a>
												</div>
												<button
													className="sc-button"
													name="submit"
													type="submit"
												>
													<span>Login</span>
												</button>
												{loading && <PreLoader />}
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
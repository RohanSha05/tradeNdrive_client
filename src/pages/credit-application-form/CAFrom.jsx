import React, { useCallback, useEffect, useRef, useState } from "react";
import config from "@/config/config";
import Swal from "sweetalert2";
import PreLoader from "@/components/pre-loader/PreLoader";
import { useLocation } from "react-router-dom";
import { useApi } from "@/providers/ApiProvider";

export default function CAForm() {
	const formRef = useRef();
	const [success, setSuccess] = useState(true);
	const [showMessage, setShowMessage] = useState(false);
	const [showCoAForm, setShowCoAForm] = useState(false);
	const [formValues, setFormValues] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const [searchInput, setSearchInput] = useState("");
	const [carModels, setCarModels] = useState([]);
	const [selectedCarModel, setSelectedCarModel] = useState("");

	const handleShowMessage = useCallback(() => {
		setShowMessage(true);
		setTimeout(() => {
			setShowMessage(false);
		}, 2000);
	}, []);

	const toggleCoAForm = useCallback(() => {
		setShowCoAForm((prevShowCoAForm) => {
			const newShowCoAForm = !prevShowCoAForm;
			setFormValues((prevValues) => ({
				...prevValues,
				co_applicant: newShowCoAForm ? "yes" : "no",
			}));
			return newShowCoAForm;
		});
	}, []);

	const location = useLocation();
	const { title } = location.state || {};

	const sendMail = useCallback(
		(e) => {
			e.preventDefault();
			setIsLoading(true);
			const form = formRef.current;
			const formData = new FormData(form);

			fetch(`${config.apiEndpoint}/loan-application/`, {
				method: "POST",
				body: formData,
			})
				.then((res) => {
					setIsLoading(false);
					if (res.ok) {
						setSuccess(true);
						handleShowMessage();
						Swal.fire({
							position: "top-end",
							icon: "success",
							title: "Your application has been sent successfully",
							showConfirmButton: false,
							timer: 1500,
						});
						form.reset();
					} else {
						setSuccess(false);
						handleShowMessage();
					}
				})
				.catch((err) => {
					setIsLoading(false);
					console.error("Error fetching data:", err);
					setSuccess(false);
					handleShowMessage();
				});
		},
		[handleShowMessage]
	);

	const { carListings } = useApi();
	const { data } = carListings || {};

	console.log("Car Models Data:", data);

	const handleSearchInputChange = (e) => {
		const value = e.target.value;
		setSearchInput(value);

		if (value.length > 0) {
			const filteredModels = data
				?.filter((item) =>
					item.title.toLowerCase().includes(value.toLowerCase())
				)
				.map((item) => ({
					id: item.slug, // or item.id if available
					title: item.title,
				}));
			setCarModels(filteredModels);
		} else {
			setCarModels([]);
		}
	};

	const handleCarModelSelect = (model) => {
		setSelectedCarModel(model.title);
		setSearchInput(model.title);
		setCarModels([]);
	};

	return (
		<section className="tf-section-contact">
			<div className="container">
				<div className="row">
					<div className="">
						<div className="heading-section mb-30">
							<h2 className="fs-50 fw-20">Credit Application Form</h2>
							<p className="mt-12">
								Feel free to connect with us through our online channels for
								updates, news, and more.
							</p>
						</div>
						<div id="comments" className="comments">
							<div className="respond-comment">
								<form
									onSubmit={sendMail}
									ref={formRef}
									id="loan-calculator"
									className="comment-form form-submit"
									acceptCharset="utf-8"
								>
									{isLoading && <PreLoader />}
									<div className="mt-5">
										<div className="mt-5">
											<fieldset className="style-text">
												<label className="font-1 fs-14 fw-5 mr-2">
													Search Car Model
												</label>
												<div
													style={{
														position: "relative",
														display: "flex",
														gap: "0.5rem",
													}}
												>
													<input
														type="text"
														name="car_name"
														value={title ? title : searchInput}
														onChange={handleSearchInputChange}
														style={{ paddingRight: "2.5rem" }}
													/>
													<i
														className="icon-autodeal-search text-color-2"
														style={{
															position: "absolute",
															right: "0.5rem",
															top: "50%",
															transform: "translateY(-50%)",
														}}
													/>
												</div>
												{carModels.length > 0 && (
													<ul className="dropdown">
														{carModels.length > 0 && (
															<ul className="dropdown">
																{carModels.map((model) => (
																	<li
																		key={model.id}
																		onClick={() => handleCarModelSelect(model)}
																	>
																		{model.title}
																	</li>
																))}
															</ul>
														)}
													</ul>
												)}
											</fieldset>
										</div>
									</div>
									<div className="grid-sw-3">
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">First Name</label>
											<input type="text" name="first_name" required />
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Middle Name</label>
											<input
												type="text"
												className="tb-my-input"
												name="middle_name"
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Last Name</label>
											<input
												type="text"
												className="tb-my-input"
												name="last_name"
												required
											/>
										</fieldset>
									</div>
									<div className="grid-sw-3">
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Date of Birth</label>
											<input
												type="date"
												className="tb-my-input"
												name="dob_or_registerdate"
												required
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Phone Number</label>
											<input
												type="tel"
												className="tb-my-input"
												name="phone"
												required
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Email</label>
											<input
												type="email"
												className="tb-my-input"
												name="email"
												required
											/>
										</fieldset>
									</div>
									<div className="grid-sw-3">
										<fieldset className="style-text flex align-items-center">
											<label className="font-1 fs-14 fw-5">
												Marital Status
											</label>
											<div className="flex ">
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="marital_status"
														value="Single"
														required
													/>
													<span className="btn-checkbox px-2" /> Single
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="marital_status"
														value="Married"
														required
													/>
													<span className="btn-checkbox px-2" /> Married
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="marital_status"
														value="Other"
														required
													/>
													<span className="btn-checkbox px-2" /> Other
												</label>
											</div>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">
												Postal Code / Zip Code
											</label>
											<input
												type="text"
												className="tb-my-input"
												name="postal_code"
												required
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">SIN</label>
											<input type="text" className="tb-my-input" name="sin" />
										</fieldset>
									</div>
									<div className="grid-sw-3">
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Street Name</label>
											<input
												type="text"
												className="tb-my-input"
												name="street_name"
												required
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">City</label>
											<input
												type="text"
												className="tb-my-input"
												name="city"
												required
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Province</label>
											<input
												type="text"
												className="tb-my-input"
												name="province"
												required
											/>
										</fieldset>
									</div>
									<div className="grid-sw-2">
										{/* Additional fields can be added here */}
									</div>
									<div className="grid-sw-2 py-3">
										<fieldset className="style-text flex align-items-center">
											<label className="font-1 fs-14 fw-5">
												How long have you lived in your given address?
											</label>
											<div className="flex">
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="address_duration"
														value="1-2 Years"
														required
													/>
													<span className="btn-checkbox px-2" />{" "}
													<span className="text-nowrap">1-2 Years</span>
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="address_duration"
														value="3-4 Years"
														required
													/>
													<span className="btn-checkbox px-2" />
													<span className="text-nowrap">3-4 Years</span>
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="address_duration"
														value="5+ Years"
														required
													/>
													<span className="btn-checkbox px-2" />
													<span className="text-nowrap">5+ Years</span>
												</label>
											</div>
										</fieldset>
										<fieldset className="style-text flex align-items-center">
											<label className="font-1 fs-14 fw-5">
												Home Ownership
											</label>
											<div className="flex">
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="home_ownership"
														value="Owned"
														required
													/>
													<span className="btn-checkbox px-2 " /> Owned
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="home_ownership"
														value="Rented"
														required
													/>
													<span className="btn-checkbox px-2" /> Rented
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="home_ownership"
														value="Living with parents"
														required
													/>
													<span className="btn-checkbox px-2" />{" "}
													<span className="text-nowrap">
														Living with parents
													</span>
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="home_ownership"
														value="Amortized"
														required
													/>
													<span className="btn-checkbox px-2" /> Amortized
												</label>
											</div>
										</fieldset>
									</div>
									<h1 className="font-1 fs-30 fw-5 text-center my-1">
										Employment Information
									</h1>
									<fieldset className="style-text">
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Business Name</label>
											<input
												type="text"
												className="tb-my-input"
												name="business_name"
												required
											/>
										</fieldset>
										<div className="grid-sw-3">
											<fieldset className="style-text">
												<label className="font-1 fs-14 fw-5">Street Name</label>
												<input
													type="text"
													className="tb-my-input"
													name="emp_street_name"
													required
												/>
											</fieldset>
											<fieldset className="style-text">
												<label className="font-1 fs-14 fw-5">Province</label>
												<input
													type="text"
													className="tb-my-input"
													name="emp_province"
												/>
											</fieldset>
											<fieldset className="style-text">
												<label className="font-1 fs-14 fw-5">
													Postal Code / Zip Code
												</label>
												<input
													type="text"
													className="tb-my-input"
													name="emp_postal_code"
													required
												/>
											</fieldset>
										</div>
										<div className="grid-sw-3">
											<fieldset className="style-text">
												<label className="font-1 fs-14 fw-5">City</label>
												<input
													type="text"
													className="tb-my-input"
													name="emp_city"
													required
												/>
											</fieldset>
											<fieldset className="style-text">
												<label className="font-1 fs-14 fw-5">
													Length of Employment
												</label>
												<input
													type="number"
													className="tb-my-input"
													name="length_of_employment"
													required
												/>
											</fieldset>
											<fieldset className="style-text">
												<label className="font-1 fs-14 fw-5">Position</label>
												<input
													type="text"
													className="tb-my-input"
													name="position"
													required
												/>
											</fieldset>
										</div>
										<div className="grid-sw-3">
											<fieldset className="style-text">
												<label className="font-1 fs-14 fw-5">Department</label>
												<input
													type="text"
													className="tb-my-input"
													name="department"
													required
												/>
											</fieldset>
											<fieldset className="style-text">
												<label className="font-1 fs-14 fw-5">
													Gross Monthly Income
												</label>
												<input
													type="number"
													className="tb-my-input"
													name="gross_monthly_income"
													required
												/>
											</fieldset>
											<fieldset className="style-text">
												<label className="font-1 fs-14 fw-5">
													Company Number
												</label>
												<input
													type="tel"
													className="tb-my-input"
													name="company_number"
													required
												/>
											</fieldset>
										</div>
									</fieldset>

									<div className="flex justify-content-between gap-3">
										<p className="button-boxs">
											<label
												htmlFor="co-applicant-checkbox"
												className="sc-button text-white"
											>
												<input
													id="co-applicant-checkbox"
													type="checkbox"
													//name="co_applicant"
													value="yes"
													onClick={toggleCoAForm}
													aria-expanded={showCoAForm}
													aria-controls="collapseExample"
													className={`${showCoAForm ? "active" : ""}`}
												/>
												Co-Applicant Form
											</label>
											{/* Hidden input to ensure co_applicant value is submitted */}
											<input
												type="hidden"
												name="co_applicant"
												value={showCoAForm ? "yes" : "no"}
											/>
										</p>
										<div
											className={`${showCoAForm ? "d-none" : "button-boxs"}`}
										>
											<button
												className="sc-button"
												name="submit"
												type="submit"
												disabled={isLoading}
											>
												<span>Send Message</span>
											</button>
										</div>
									</div>
									{showCoAForm && (
										<div className="collapse show" id="collapseExample">
											<div className="container">
												<div className="row">
													<div className="">
														<div className="heading-section mb-30">
															<h2>Spouse / Co-Applicant Information</h2>
														</div>
														<div id="comments_2" className="comments">
															<div className="respond-comment">
																<div>
																	<div className="grid-sw-3">
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				First Name
																			</label>
																			<input
																				type="text"
																				className="tb-my-input"
																				name="co_first_name"
																				required
																			/>
																		</fieldset>
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				Middle Name
																			</label>
																			<input
																				type="text"
																				className="tb-my-input"
																				name="co_middle_name"
																			/>
																		</fieldset>
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				Last Name
																			</label>
																			<input
																				type="text"
																				className="tb-my-input"
																				name="co_last_name"
																				required
																			/>
																		</fieldset>
																	</div>
																	<div className="grid-sw-3">
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				Register Date
																			</label>
																			<input
																				type="date"
																				className="tb-my-input"
																				name="co_dob_or_registerdate"
																				required
																			/>
																		</fieldset>
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				Phone Number
																			</label>
																			<input
																				type="tel"
																				className="tb-my-input"
																				name="co_phone"
																				required
																			/>
																		</fieldset>
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				Email
																			</label>
																			<input
																				type="email"
																				className="tb-my-input"
																				name="co_email"
																				required
																			/>
																		</fieldset>
																	</div>
																	<div className="grid-sw-3">
																		<fieldset className="style-text flex align-items-center">
																			<label className="font-1 fs-14 fw-5">
																				Marital Status
																			</label>
																			<div className="flex ">
																				<label className="checkbox-label flex">
																					<input
																						type="radio"
																						className="checkbox-input"
																						name="co_marital_status"
																						value="Single"
																					/>{" "}
																					<span className="btn-checkbox px-2" />{" "}
																					Single
																				</label>
																				<label className="checkbox-label flex">
																					<input
																						type="radio"
																						className="checkbox-input"
																						name="co_marital_status"
																						value="Married"
																					/>{" "}
																					<span className="btn-checkbox px-2" />{" "}
																					Married
																				</label>
																				<label className="checkbox-label flex">
																					<input
																						type="radio"
																						className="checkbox-input"
																						name="co_marital_status"
																						value="Other"
																					/>{" "}
																					<span className="btn-checkbox px-2" />{" "}
																					Other
																				</label>
																			</div>
																		</fieldset>
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				SIN
																			</label>
																			<input
																				type="text"
																				className="tb-my-input"
																				name="co_sin"
																			/>
																		</fieldset>
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				Street Name
																			</label>
																			<input
																				type="text"
																				className="tb-my-input"
																				name="co_street_name"
																				required
																			/>
																		</fieldset>
																	</div>
																	<div className="grid-sw-3">
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				City
																			</label>
																			<input
																				type="text"
																				className="tb-my-input"
																				name="co_city"
																			/>
																		</fieldset>
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				Province
																			</label>
																			<input
																				type="text"
																				className="tb-my-input"
																				name="co_province"
																			/>
																		</fieldset>
																		<fieldset className="style-text">
																			<label className="font-1 fs-14 fw-5">
																				Postal Code / Zip Code
																			</label>
																			<input
																				type="text"
																				className="tb-my-input"
																				name="co_postal_code"
																				required
																			/>
																		</fieldset>
																	</div>
																	<div className="grid-sw-2 py-3">
																		<fieldset className="style-text flex align-items-center">
																			<label className="font-1 fs-14 fw-5">
																				How long have you lived in your given
																				address?
																			</label>
																			<div className="flex">
																				<label className="checkbox-label flex">
																					<input
																						type="radio"
																						className="checkbox-input"
																						name="co_address_duration"
																						value="1-2 Years"
																					/>{" "}
																					<span className="btn-checkbox px-2" />{" "}
																					<span className="text-nowrap">
																						1-2 Years
																					</span>
																				</label>
																				<label className="checkbox-label flex">
																					<input
																						type="radio"
																						className="checkbox-input"
																						name="co_address_duration"
																						value="3-4 Years"
																					/>{" "}
																					<span className="btn-checkbox px-2" />
																					<span className="text-nowrap">
																						3-4 Years
																					</span>
																				</label>
																				<label className="checkbox-label flex">
																					<input
																						type="radio"
																						className="checkbox-input"
																						name="co_address_duration"
																						value="5+ Years"
																					/>{" "}
																					<span className="btn-checkbox px-2" />
																					<span className="text-nowrap">
																						5+ Years
																					</span>
																				</label>
																			</div>
																		</fieldset>
																		<fieldset className="style-text flex align-items-center">
																			<label className="font-1 fs-14 fw-5">
																				Home Ownership
																			</label>
																			<div className="flex">
																				<label className="checkbox-label flex">
																					<input
																						type="radio"
																						className="checkbox-input"
																						name="co_home_ownership"
																						value="Owned"
																					/>{" "}
																					<span className="btn-checkbox px-2 " />{" "}
																					Owned
																				</label>
																				<label className="checkbox-label flex">
																					<input
																						type="radio"
																						className="checkbox-input"
																						name="co_home_ownership"
																						value="Rented"
																					/>{" "}
																					<span className="btn-checkbox px-2" />{" "}
																					Rented
																				</label>
																				<label className="checkbox-label flex">
																					<input
																						type="radio"
																						className="checkbox-input"
																						name="co_home_ownership"
																						value="Living with parents"
																					/>{" "}
																					<span className="btn-checkbox px-2" />{" "}
																					<span className="text-nowrap">
																						Living with parents
																					</span>
																				</label>
																				<label className="checkbox-label flex">
																					<input
																						type="radio"
																						className="checkbox-input"
																						name="co_home_ownership"
																						value="Amortized"
																					/>{" "}
																					<span className="btn-checkbox px-2" />{" "}
																					Amortized
																				</label>
																			</div>
																		</fieldset>
																	</div>
																	<h1 className="font-1 fs-30 fw-5 text-center my-4">
																		Employment Information
																	</h1>
																	<fieldset className="style-text">
																		<div className="grid-sw-3">
																			<fieldset className="style-text">
																				<label className="font-1 fs-14 fw-5">
																					Business Name
																				</label>
																				<input
																					type="text"
																					className="tb-my-input"
																					name="co_business_name"
																					required
																				/>
																			</fieldset>
																			<fieldset className="style-text">
																				<label className="font-1 fs-14 fw-5">
																					Length of Employment
																				</label>
																				<input
																					type="text"
																					className="tb-my-input"
																					name="co_length_of_employment"
																					required
																				/>
																			</fieldset>
																			<fieldset className="style-text">
																				<label className="font-1 fs-14 fw-5">
																					City
																				</label>
																				<input
																					type="text"
																					className="tb-my-input"
																					name="co_emp_city"
																					required
																				/>
																			</fieldset>
																		</div>
																		<div className="grid-sw-4">
																			<fieldset className="style-text">
																				<label className="font-1 fs-14 fw-5">
																					Street Name
																				</label>
																				<input
																					type="text"
																					className="tb-my-input"
																					name="co_emp_street_name"
																					required
																				/>
																			</fieldset>
																			<fieldset className="style-text">
																				<label className="font-1 fs-14 fw-5">
																					Province
																				</label>
																				<input
																					type="text"
																					className="tb-my-input"
																					name="co_emp_province"
																				/>
																			</fieldset>
																			<fieldset className="style-text">
																				<label className="font-1 fs-14 fw-5">
																					Postal Code / Zip Code
																				</label>
																				<input
																					type="text"
																					className="tb-my-input"
																					name="co_emp_postal_code"
																					required
																				/>
																			</fieldset>
																			<fieldset className="style-text">
																				<label className="font-1 fs-14 fw-5">
																					Position
																				</label>
																				<input
																					type="text"
																					className="tb-my-input"
																					name="co_position"
																				/>
																			</fieldset>
																		</div>
																		<div className="grid-sw-3">
																			<fieldset className="style-text">
																				<label className="font-1 fs-14 fw-5">
																					Department
																				</label>
																				<input
																					type="text"
																					className="tb-my-input"
																					name="co_department"
																				/>
																			</fieldset>
																			<fieldset className="style-text">
																				<label className="font-1 fs-14 fw-5">
																					Gross Monthly Income
																				</label>
																				<input
																					type="text"
																					className="tb-my-input"
																					name="co_gross_monthly_income"
																					required
																				/>
																			</fieldset>
																			<fieldset className="style-text">
																				<label className="font-1 fs-14 fw-5">
																					Company Number
																				</label>
																				<input
																					type="tel"
																					className="tb-my-input"
																					name="co_company_number"
																					required
																				/>
																			</fieldset>
																		</div>
																	</fieldset>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="button-boxs">
												<button
													className="sc-button"
													name="submit"
													type="submit"
													disabled={isLoading}
												>
													<span>Send Message</span>
												</button>
											</div>
										</div>
									)}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

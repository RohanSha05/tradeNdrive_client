import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import React from "react";
import { Link } from "react-router-dom";
import { useApi } from "@/providers/ApiProvider";


const TradeAppFrom = () => {

        const { data, loading } = useApi();
        const { site_title, moto } = data.data || {};
    
        const metadata = {
            title: `Credit Application Form || ${site_title ?? "Isam Auto"} || ${
                moto ?? "Sells & Repair"
            }`,
            description: moto,
        };
	return (
		<>
			<MetaComponent meta={metadata} />
			<div className="header-fixed">
				<Header2 />
			</div>
			<section className="flat-title mb-40">
				<div className="container2">
					<div className="row">
						<div className="col-lg-12">
							<div className="title-inner style">
								<div className="title-group fs-12">
									<Link className="home fw-6 text-color-3" to={`/`}>
										Home
									</Link>
									<span>Used cars for sale</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="container">
				<div className="row">
					<div className="">
						<div className="heading-section mb-30">
							<h2 className="text-center my-4">Trade Application Form</h2>
						</div>
						<div id="comments_2" className="comments">
							<div className="respond-comment">
								<div>
									<div className="grid-sw-3">
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">First Name</label>
											<input
												type="text"
												className="tb-my-input"
												name="co_first_name"
												required
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Middle Name</label>
											<input
												type="text"
												className="tb-my-input"
												name="co_middle_name"
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Last Name</label>
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
											<label className="font-1 fs-14 fw-5">Register Date</label>
											<input
												type="date"
												className="tb-my-input"
												name="co_dob_or_registerdate"
												required
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Phone Number</label>
											<input
												type="tel"
												className="tb-my-input"
												name="co_phone"
												required
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Email</label>
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
													<span className="btn-checkbox px-2" /> Single
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="co_marital_status"
														value="Married"
													/>{" "}
													<span className="btn-checkbox px-2" /> Married
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="co_marital_status"
														value="Other"
													/>{" "}
													<span className="btn-checkbox px-2" /> Other
												</label>
											</div>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">SIN</label>
											<input
												type="text"
												className="tb-my-input"
												name="co_sin"
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Street Name</label>
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
											<label className="font-1 fs-14 fw-5">City</label>
											<input
												type="text"
												className="tb-my-input"
												name="co_city"
											/>
										</fieldset>
										<fieldset className="style-text">
											<label className="font-1 fs-14 fw-5">Province</label>
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
												How long have you lived in your given address?
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
													<span className="text-nowrap">1-2 Years</span>
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="co_address_duration"
														value="3-4 Years"
													/>{" "}
													<span className="btn-checkbox px-2" />
													<span className="text-nowrap">3-4 Years</span>
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="co_address_duration"
														value="5+ Years"
													/>{" "}
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
														name="co_home_ownership"
														value="Owned"
													/>{" "}
													<span className="btn-checkbox px-2 " /> Owned
												</label>
												<label className="checkbox-label flex">
													<input
														type="radio"
														className="checkbox-input"
														name="co_home_ownership"
														value="Rented"
													/>{" "}
													<span className="btn-checkbox px-2" /> Rented
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
													<span className="btn-checkbox px-2" /> Amortized
												</label>
											</div>
										</fieldset>
									</div>
									<div className="button-boxs my-5">
										<button className="sc-button" name="submit" type="submit">
											<span>Send Message</span>
										</button>
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
};

export default TradeAppFrom;

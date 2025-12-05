// import { carListings } from "@/data/cars";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { toggleItems2, toggleItems3 } from "@/data/faqs";
import Accordion from "../common/Accordions";
import { useApi } from "@/providers/ApiProvider";

export default function Compare() {
	const { carListings } = useApi();

	const apiItems = carListings?.data || [];

	// Only show On Sale cars as available choices
	const availableCars = apiItems.filter((c) => c.status === "On Sale");

	// helper to normalize one API car object into the UI shape
	const normalize = (c) => {
		if (!c) return null;
		const featuredImage =
			c.featured_image?.image_url || c.featured_image?.image || "";
		const otherImages = (c.images || []).map(
			(img) => img.image_url || img.image || ""
		);
		return {
			id: c.id,
			title: c.title || "",
			year: c.model_year?.year || c.model_year || "",
			type: c.body_type?.title || "",
			price: Number(c.selling_price) || c.selling_price || 0,
			images: [featuredImage, ...otherImages].filter(Boolean),
			totalImage:
				c.total_images || (otherImages.length ? otherImages.length : 1),
			authorImage:
				c.dealer?.logo || featuredImage || "/assets/images/author/1.png",
			authorName: c.dealer?.name || c.dealer?.title || "",
			featured: c.is_featured || c.featured_image?.is_featured || false,
			fuelType: c.fuel_type?.title || "",
			km: c.mileage || c.kms || c.km || 0,
			transmission: c.gear_type?.title || c.transmission || "",
			ownership: c.owner_type?.title || c.owner || c.ownership || "",
			registrationYear: c.model_year?.year || c.model_year || "",
			insuranceType: c.insurance_type?.title || c.insurance_type || "",
			seats: c.seats || c.no_of_seats || c.seating_capacity || "",
			engineDisplacement:
				c.engine_displacement || c.engine_capacity || c.engine || "",
			location:
				c.location || c.city || c.dealer?.location || c.dealer?.address || "",
			slug: c.slug || "",
		};
	};

	const [selectedIds, setSelectedIds] = useState(["", "", ""]);

	const compareItems = [0, 1, 2].map((idx) => {
		const id = selectedIds[idx];
		const car = availableCars.find((c) => String(c.id) === id);
		return normalize(car);
	});

	return (
		<section className="tf-section3 flat-blog-list flat-property">
			<div className="container">
				<div className="inner-heading flex-two flex-wrap">
					<h1 className="heading-listing">Compare vehicle</h1>
					<div className="social-listing flex-six flex-wrap">
						<p>Share this page:</p>
						<div className="icon-social style1">
							<a href="#">
								<i className="icon-autodeal-facebook" />
							</a>
							<a href="#">
								<i className="icon-autodeal-linkedin" />
							</a>
							<a href="#">
								<i className="icon-autodeal-twitter" />
							</a>
							<a href="#">
								<i className="icon-autodeal-instagram" />
							</a>
						</div>
					</div>
				</div>

				<div className="wrap-single-compare">
					<div className="inner-respond">
						<div className="header-compare">
							{compareItems.map((elm, i) => (
								<div key={i} className="box-car-list hv-one">
									<div className="image-group relative">
										<div className="top flex-two">
											<ul className="d-flex gap-8">
												{elm?.featured ? (
													<li className="flag-tag success">Featured</li>
												) : null}
												<li className="flag-tag style-1">
													<div className="icon">
														<svg
															width={16}
															height={13}
															viewBox="0 0 16 13"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
																stroke="white"
																strokeWidth="1.5"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</div>
													{elm?.totalImage || 6}
												</li>
											</ul>
											<div className="year flag-tag">{elm?.year || ""}</div>
										</div>

										{/* overlay select — positioned absolute inside .image-group (which is relative) */}
										<div
											style={{
												position: "absolute",
												top: 8,
												right: 8,
												zIndex: 30,
											}}
										>
											<select
												className="form-select compare-select"
												value={selectedIds[i] || ""}
												onChange={(e) => {
													const val = e.target.value || "";
													setSelectedIds((prev) => {
														const next = [...(prev || [])];
														next[i] = val;
														return next;
													});
												}}
											>
												<option value="">Select car</option>
												{availableCars.map((opt) => (
													<option
														key={opt.id}
														value={String(opt.id)}
														disabled={
															selectedIds.includes(String(opt.id)) &&
															selectedIds[i] !== String(opt.id)
														}
													>
														{opt.title}
													</option>
												))}
											</select>

											{selectedIds[i] ? (
												<button
													type="button"
													className="btn btn-link btn-sm ml-2 clear-select"
													onClick={() =>
														setSelectedIds((prev) => {
															const next = [...(prev || [])];
															next[i] = "";
															return next;
														})
													}
												>
													Remove
												</button>
											) : null}
										</div>

										{elm && elm.images && elm.images.length > 0 && (
											<Swiper
												modules={[Pagination]}
												pagination={{ el: `.spd${i}`, clickable: true }}
												className="swiper-container carousel-2 img-style"
											>
												{elm.images.map((elm2, i2) => (
													<SwiperSlide key={i2} className="swiper-slide">
														<img
															className="lazyload"
															alt={elm.title || "image"}
															src={elm2}
															width={615}
															height={462}
														/>
													</SwiperSlide>
												))}

												<div className="pagi2">
													<div className={` swiper-pagination2 spd${i}`} />
												</div>
											</Swiper>
										)}
									</div>

									<div className="content">
										<div className="text-address">
											<p className="text-color-3 font">{elm?.type || ""}</p>
										</div>
										<h5 className="link-style-1">
											{elm ? (
												<Link to={`/listing-detail-v2/${elm.slug || elm.id}`}>
													{elm.title}
												</Link>
											) : (
												<span className="text-muted">No car selected</span>
											)}
										</h5>

										<div className="money fs-20 fw-5 lh-25 text-color-3">
											{elm ? (
												`$${
													typeof elm.price === "number"
														? elm.price.toLocaleString()
														: elm.price
												}`
											) : (
												<span className="text-muted">--</span>
											)}
										</div>
										<div className="days-box flex justify-space align-center">
											<div className="img-author">
												{elm?.authorImage ? (
													<img
														className="lazyload"
														alt={elm.authorName || "author"}
														src={elm.authorImage}
														width={120}
														height={120}
													/>
												) : (
													<div className="author-placeholder" />
												)}
												<span className="font text-color-2 fw-5">
													{elm?.authorName || ""}
												</span>
											</div>
											{elm ? (
												<Link
													to={`/listing-detail-v2/${elm.id}`}
													className="view-car"
												>
													View car
												</Link>
											) : (
												<button className="view-car btn btn-secondary" disabled>
													View car
												</button>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						<nav
							id="navbar-example2"
							className="navbar tab-listing-scroll mb-30"
						>
							<ul className="nav nav-pills">
								<li className="nav-item">
									<a className="nav-link" href="#scrollspyHeading1">
										Overview
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#scrollspyHeading2">
										Features
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#scrollspyHeading3">
										Specification
									</a>
								</li>
							</ul>
						</nav>

						<div
							data-bs-spy="scroll"
							data-bs-target="#navbar-example2"
							data-bs-offset={0}
							className="scrollspy-example"
							tabIndex={0}
						>
							<div id="scrollspyHeading1">
								<div className="tf-compare-overview compare-table">
									<h3 className="title-table">Car Overview</h3>
									<div className="title-tr">Price</div>
									<ul className="group-tr">
										{compareItems.map((c) => (
											<li key={c?.id}>
												{c
													? `$${
															typeof c.price === "number"
																? c.price.toLocaleString()
																: c.price
													  }`
													: "--"}
											</li>
										))}
									</ul>
									<div className="title-tr">Fuel Type</div>
									<ul className="group-tr">
										{compareItems.map((c) => (
											<li key={c?.id}>{c?.fuelType || "--"}</li>
										))}
									</ul>
									<div className="title-tr">Kms Driven</div>
									<ul className="group-tr">
										{compareItems.map((c) => (
											<li key={c?.id}>
												{c
													? `${
															c.km?.toLocaleString
																? c.km.toLocaleString()
																: c.km
													  } Kms`
													: "--"}
											</li>
										))}
									</ul>
									<div className="title-tr">Ownership</div>
									<ul className="group-tr">
										{compareItems.map((c) => (
											<li key={c?.id}>{c?.ownership || "--"}</li>
										))}
									</ul>
									<div className="title-tr">Registration Year</div>
									<ul className="group-tr">
										{compareItems.map((c) => (
											<li key={c?.id}>{c?.registrationYear || "--"}</li>
										))}
									</ul>
									<div className="title-tr">Transmission</div>
									<ul className="group-tr">
										{compareItems.map((c) => (
											<li key={c?.id}>{c?.transmission || "--"}</li>
										))}
									</ul>
									<div className="title-tr">Insurance Type</div>
									<ul className="group-tr">
										{compareItems.map((c) => (
											<li key={c?.id}>{c?.insuranceType || "--"}</li>
										))}
									</ul>
									<div className="title-tr">Seats</div>
									<ul className="group-tr">
										{compareItems.map((c) => (
											<li key={c?.id}>{c?.seats || "--"}</li>
										))}
									</ul>
									<div className="title-tr">Engine Displacement</div>
									<ul className="group-tr">
										{compareItems.map((c) => (
											<li key={c?.id}>{c?.engineDisplacement || "--"}</li>
										))}
									</ul>
									<div className="title-tr">Car location</div>
									<ul className="group-tr mb-0">
										{compareItems.map((c) => (
											<li key={c?.id}>{c?.location || "--"}</li>
										))}
									</ul>
								</div>
							</div>

							<div id="scrollspyHeading2">
								<div className="tf-compare-fatures compare-table">
									<h3 className="title-table">Features</h3>
									<div className="title-tr">Bottle Holder</div>
									<ul className="group-tr">
										<li>Front &amp; Rear Door</li>
										<li>Front &amp; Rear Door</li>
										<li>Front &amp; Rear Door</li>
									</ul>
									<div className="title-tr">Foldable Rear Seat</div>
									<ul className="group-tr">
										<li>60:40 Split</li>
										<li>60:40 Split</li>
										<li>60:40 Split</li>
									</ul>
									<div className="title-tr">Parking Sensors</div>
									<ul className="group-tr">
										<li>Rear</li>
										<li>Rear</li>
										<li>Rear</li>
									</ul>
									<ul className="group-tr">
										<li>Front</li>
										<li>Front</li>
										<li>Front &amp; Rear</li>
									</ul>
									<div className="title-tr">Central Console Armrest</div>
									<ul className="group-tr">
										<li>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={18}
												height={15}
												viewBox="0 0 18 15"
												fill="none"
											>
												<path
													d="M1.5 8.25L7.5 14.25L16.5 0.75"
													stroke="#FF7101"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</li>
										<li>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={18}
												height={15}
												viewBox="0 0 18 15"
												fill="none"
											>
												<path
													d="M1.5 8.25L7.5 14.25L16.5 0.75"
													stroke="#FF7101"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</li>
										<li>With Storage</li>
									</ul>
									<div className="title-tr">Luggage Hook And Net</div>
									<ul className="group-tr">
										<li>n/a</li>
										<li>n/a</li>
										<li>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={18}
												height={15}
												viewBox="0 0 18 15"
												fill="none"
											>
												<path
													d="M1.5 8.25L7.5 14.25L16.5 0.75"
													stroke="#FF7101"
													strokeWidth="1.5"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</li>
									</ul>
									<div className="title-tr">
										One Touch Operating Power Window
									</div>
									<ul className="group-tr">
										<li>Driver's Window</li>
										<li>Driver's Window</li>
										<li>Driver's Window</li>
									</ul>
									<div className="col-lg-12 flat-accordion">
										<Accordion
											parentClass="flat-toggle style-1"
											faqData={toggleItems2}
										/>
									</div>
								</div>
							</div>
							<div id="scrollspyHeading3">
								<div className="tf-compare-overview compare-table">
									<h3 className="title-table">Specification</h3>
									<div className="col-lg-12 flat-accordion">
										<Accordion
											parentClass="flat-toggle style-1"
											faqData={toggleItems3}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

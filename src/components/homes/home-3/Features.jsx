import React from "react";

export default function Features() {
	return (
		<section className="tf-section3 section-why-choose-us">
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="image-wcs relative">
							<ul className="icon-list">
								<li className="tf-icon-list ani5">
									<i className="icon-autodeal-check" />
									<span className="fs-18 fw-6 lh-25 text-color-2">
										Trusted by Thousands
									</span>
								</li>
								<li className="tf-icon-list ani4">
									<i className="icon-autodeal-check" />
									<span className="fs-18 fw-6 lh-25 text-color-2">
										1 Million Happy Customers
									</span>
								</li>
								<li className="tf-icon-list ani5">
									<i className="icon-autodeal-check" />
									<span className="fs-18 fw-6 lh-25 text-color-2">
										10,000+ Verified Listings
									</span>
								</li>
							</ul>
							<div className="image-inner1 hover-img-wrap img-style-hover">
								<img
									className="ls-is-cached lazyloaded"
									data-src="/assets/images/section/wcu-1.jpg"
									alt="Isams Auto"
									src="/assets/images/Gallary/isams-auto2.jpg"
									width={615}
									height={890}
								/>
							</div>
						</div>
					</div>
					<div className="col-md-6">
						<div className="content-wcs">
							<div className="heading-section">
								<h2
									className="wow fadeInUpSmall"
									data-wow-delay="0.2s"
									data-wow-duration="1000ms"
								>
									Why Choose Isams Auto
								</h2>
								<p
									className="mt-18 wow fadeInUpSmall"
									data-wow-delay="0.2s"
									data-wow-duration="1000ms"
								>
									At Isams Auto, we provide a seamless car buying and selling
									experience. Our platform connects buyers and sellers with
									ease, offering a wide range of vehicles to suit every need.
								</p>
							</div>
							<div className="tf-icon-box-list">
								<div
									className="tf-icon-box style-2 wow fadeInUpSmall"
									data-wow-delay="0.2s"
									data-wow-duration="1000ms"
								>
									<div className="icon">
										<i className="icon-autodeal-car" />
									</div>
									<div className="content">
										<h5>
											<a href="#">Wide Selection of Vehicles</a>
										</h5>
										<p>
											Explore a diverse range of new and pre-owned vehicles to
											find your perfect match.
										</p>
									</div>
								</div>
								<div
									className="tf-icon-box style-2 wow fadeInUpSmall"
									data-wow-delay="0.3s"
									data-wow-duration="1000ms"
								>
									<div className="icon">
										<i className="icon-autodeal-shield" />
									</div>
									<div className="content">
										<h5>
											<a href="#">Verified Listings</a>
										</h5>
										<p>
											All vehicles are thoroughly inspected and verified for
											quality and reliability.
										</p>
									</div>
								</div>
								<div
									className="tf-icon-box style-2 wow fadeInUpSmall"
									data-wow-delay="0.4s"
									data-wow-duration="1000ms"
								>
									<div className="icon">
										<i className="icon-autodeal-finance" />
									</div>
									<div className="content">
										<h5>
											<a href="#">Flexible Financing Options</a>
										</h5>
										<p>
											Get easy financing solutions tailored to your budget and
											drive your dream car today.
										</p>
									</div>
								</div>
								<div
									className="tf-icon-box style-2 wow fadeInUpSmall"
									data-wow-delay="0.5s"
									data-wow-duration="1000ms"
								>
									<div className="icon">
										<i className="icon-autodeal-support" />
									</div>
									<div className="content">
										<h5>
											<a href="#">24/7 Customer Support</a>
										</h5>
										<p>
											Our dedicated support team is here to assist you at every
											step of the way.
										</p>
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
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Testimonials.css"; // Import the CSS file
import config from "@/config/config";

export default function Testimonials() {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		fetch(`${config.apiEndpoint}/reviews/`)
			.then((response) => response.json())
			.then((data) => setReviews(data.reviews))
			.catch((error) => console.error("Error fetching reviews:", error));
	}, []);

	const swiperOptions = {
		autoplay: {
			delay: 500,
			disableOnInteraction: false,
		},
		loop: true,
		slidesPerView: 1,
		spaceBetween: 30,
		speed: 1000,
		pagination: {
			el: ".spd13",
			clickable: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
		},
	};

	return (
		<section className="tf-section3">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div
							className="heading-section center wow fadeInUpSmall"
							data-wow-delay="0.2s"
							data-wow-duration="1000ms"
						>
							<h2>We love our clients</h2>
						</div>
					</div>
					<div className="col-lg-12">
						<Swiper
							{...swiperOptions}
							modules={[Autoplay, Navigation, Pagination]}
							className="swiper-container carousel-7 overflow-hidden"
						>
							{reviews.map((test, index) => (
								<SwiperSlide key={index} className="swiper-slide">
									<div className="tf-testimonial bg-4">
										<div className="inner-top flex-two">
											<img
												className="lazyload"
												data-src={test.profile_photo_url}
												alt="images"
												src={`/assets/images/section/star-5.png`}
												width={112}
												height={21}
											/>
											<p className="fs-12">{test.relative_time_description}</p>
										</div>
										<p className="fs-16 lh-22 text-color-2 review-text">
											"{test.text}"
										</p>
										<a
											href={test.author_url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<div className="author-box flex">
												<div className="images">
													<img src={test.profile_photo_url} alt="" />
												</div>
												<div className="content">
													<h5>{test.author_name}</h5>
													<p className="fs-12 lh-16">{test.language}</p>
												</div>
											</div>
										</a>
									</div>
								</SwiperSlide>
							))}
							<div className="swiper-pagination3 spd13 pb-1" />
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
}
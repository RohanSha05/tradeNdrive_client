import { NcarBrands } from "@/data/categories";
import { useApi } from "@/providers/ApiProvider";
import { Autoplay, Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CarBrands2() {
	const { carBrands } = useApi();
	const { data } = carBrands;
	const navigate = useNavigate(); // Initialize useNavigate

	const swiperOptions = {
		autoplay: {
			delay: 1000,
			disableOnInteraction: false,
		},
		loop: true,
		slidesPerView: 1,
		spaceBetween: 10,
		pagination: {
			el: ".spd6",
			clickable: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			450: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 4,
			},
			1400: {
				slidesPerView: 5,
			},
		},
	};

	const handleSlideClick = (slide) => {
		// Prepare query parameters
		const queryParams = new URLSearchParams({ car_brand: slide.id }).toString();

		// Navigate to the listing-list page with query parameters
		navigate(`/car-list?${queryParams}`);
	};

	return (
		<section className="section-car-list2 tf-section3">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className=" flex justify-space px-4">
							<h2
								className="wow fadeInUpSmall"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								What would you like to find?
							</h2>
							<div className="flex-six gap-20 flex-wrap">
								<a
									href="car-list"
									className="tf-btn-arrow wow fadeInUpSmall"
									data-wow-delay="0.4s"
									data-wow-duration="1000ms"
								>
									View all
									<i className="icon-autodeal-btn-right" />
								</a>
							</div>
						</div>
					</div>
					<div className="col-lg-12">
						<div className="partner-slide3-wrap">
							<Swiper
								{...swiperOptions}
								modules={[Autoplay, Navigation, Pagination]}
								className="swiper-container carousel-7 overflow-hidden custom-swiper-padding"
								grid={{
									rows: 1,
									fill: "row",
								}}
							>
								{data?.map((slide, index) => (
									<SwiperSlide className="swiper-slide " key={index}>
										<a
											href="#"
											className="partner-item style-1"
											onClick={(e) => {
												e.preventDefault(); // Prevent default anchor behavior
												handleSlideClick(slide); // Handle slide click
											}}
										>
											<div className="image">
												<img
													className="lazyload"
													data-src={slide.imgSrc}
													alt="images"
													src={slide.logo}
													width={slide.imgWidth}
													height={slide.imgHeight}
												/>
											</div>
											<div className="content center">
												<div className="fs-16 fw-6 title text-color-2 font-2">
													{slide.title}
												</div>
												<span className="sub-title fs-12 fw-4 font-2">
													{slide.car_count}
												</span>
											</div>
										</a>
									</SwiperSlide>
								))}

								<div className="swiper-pagination3 spd6 pb-1" />
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
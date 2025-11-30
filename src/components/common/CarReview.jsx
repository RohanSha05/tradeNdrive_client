import { slides } from "@/data/carReviews";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "react-router-dom";
import { useEffect } from "react";
export default function CarReview() {
	const swiperOptions = {
		slidesPerView: 1,
		speed: 1100,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		fadeEffect: {
			crossFade: true,
		},
		navigation: {
			nextEl: ".custom-next-btn",
			prevEl: ".custom-prev-btn",
		},
	};

	useEffect(() => {
		const nextButton = document.querySelector(".custom-next-btn");
		const prevButton = document.querySelector(".custom-prev-btn");

		if (nextButton && prevButton) {
			nextButton.addEventListener("click", () => {
				document.querySelector(".swiper").swiper.slideNext();
			});
			prevButton.addEventListener("click", () => {
				document.querySelector(".swiper").swiper.slidePrev();
			});
		}
	}, []);
	return (
		<section className="tf-section-banner2">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="heading-section flex align-center justify-space flex-wrap gap-20">
							<h2
								className="wow fadeInUpSmall text-center"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								Deals and Offers
							</h2>
							{/* Updated Next Button */}
							<button
								className="tf-btn-arrow wow fadeInUpSmall  custom-next-btn"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								Next
								<i className="icon-autodeal-btn-right" />
							</button>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12 relative">
						<Swiper
							{...swiperOptions}
							modules={[Autoplay, EffectFade, Navigation]}
							className="swiper review-car carousel-3 overflow-hidden"
						>
							{slides.map((slide, index) => (
								<SwiperSlide className="swiper-slide" key={index}>
									<div className="slider-item">
										<div className="img-slider">
											<img
												className="lazyload"
												data-src={slide.imgSrc}
												alt={slide.imgAlt}
												src={slide.imgSrc}
												width={slide.imgWidth}
												height={slide.imgHeight}
											/>
										</div>
										<div className="content">
											<div className="heading">
												<h1 className="text-color-1 text-nowrap">
													{slide.title}
												</h1>
												<p className="text-color-1 font fw-4">
													{slide.description}
												</p>
												<div className="btn-wrap">
													<a href={slide.btnHref} className="sc-button">
														<span>{slide.btnText}</span>
													</a>
												</div>
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
}
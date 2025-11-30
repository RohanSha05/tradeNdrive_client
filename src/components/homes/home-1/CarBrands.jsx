import { useRef } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useApi } from "@/providers/ApiProvider";

export default function CarBrands() {
	const { bodyTypes } = useApi();
	const { data } = bodyTypes;

	const prevRef = useRef(null);
	const nextRef = useRef(null);

	const imageData = data?.map((item) => ({
		image_url: item.image_url,
		title: item.title,
		width: item.width,
		height: item.height,
		imgSrc: item.imgSrc,
	}));

	const swiperOptions = {
		slidesPerView: 3,
		spaceBetween: 40,
		centeredSlides: true,
		centeredSlidesBounds: true,
		navigation: {
			prevEl: prevRef.current,
			nextEl: nextRef.current,
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
			1200: {
				slidesPerView: 3,
			},
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		loop: true,
		modules: [Pagination, Navigation, Autoplay],
	};

	return (
		<section className="tf-section2">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="heading-section flex align-center justify-space flex-wrap gap-20">
							<h2
								className="wow fadeInUpSmall"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								Popular Car Makes and Body Types
							</h2>
							<a
								href="/car-list"
								className="tf-btn-arrow wow fadeInUpSmall"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								View all
								<i className="icon-autodeal-btn-right" />
							</a>
						</div>
					</div>
					<div className="col-lg-12" style={{ position: "relative" }}>
						<div ref={prevRef} className="swiper-button-prev style-2 snbn20" />
						<div ref={nextRef} className="swiper-button-next style-2 snbp20" />
						<Swiper
							{...swiperOptions}
							onBeforeInit={(swiper) => {
								// @ts-ignore
								swiper.params.navigation.prevEl = prevRef.current;
								// @ts-ignore
								swiper.params.navigation.nextEl = nextRef.current;
							}}
							className="swiper listing-slide overflow-hidden"
							style={{ minHeight: "100%" }}
						>
							{imageData?.map((slide, index) => (
								<SwiperSlide className="swiper-slide" key={index}>
									<div className="tf-listing-slide">
										<div className="img-style1">
											<img
												className="lazyload"
												data-src={slide.imgSrc}
												alt="image"
												src={slide.image_url}
												width={slide.width}
												height={slide.height}
											/>
										</div>
										<div className="content-style center">
											<div className="fs-16 fw-6 lh-22 text-color-2 font-2">
												{slide.title}
											</div>
											<p className="fs-12"></p>
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

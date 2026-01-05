import { slides } from "@/data/heroSlides";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import FinanceFeatures from "@/components/common/FinanceFeatures";
import { useApi } from "@/providers/ApiProvider";

export default function Hero() {
	const { heroBanner } = useApi();
	const { data } = heroBanner;

	const swiperOptions = {
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},

		slidesPerView: 1,
		loop: true,
		speed: 800,
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
		navigation: {
			nextEl: ".snbn7",
			prevEl: ".snbp7",
		},
	};
	return (
		<div>
			<Swiper
				{...swiperOptions}
				modules={[Autoplay, Navigation, Pagination, EffectFade]}
				className="swiper mainslider slider home"
			>
				{data?.map((elm, i) => (
					<SwiperSlide key={i} className="swiper-slide">
						<div className="slider-item border-bottom-0">
							<div className="img-slider">
								<img
									className="img-item lazyload"
									alt=""
									src={elm.hero_image}
									width={3840}
									height={1820}
									loading={i === 0 ? "eager" : "lazy"}
								/>
							</div>
							<div className="container relative">
								<div className="row">
									<div className="col-lg-12">
										<div className="content po-content-two">
											<div className="heading">
												<h1 className="text-color-1 fade-item fade-item-1">
													tradeNDrive
												</h1>
												<ul className="ul flex flex-wrap category-list-car fade-item fade-item-2">
													<p className="w-50 text-color-1 text-2xl fade-item fade-item-3 text-wrap">
														At tradeNDrive Sales & Repair, we offer quality
														vehicles and trusted repair services, backed by
														years of experience and thorough inspections—all at
														competitive prices.
													</p>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}

				<div className="swiper-button-next snbn7" />
				<div className="swiper-button-prev snbp7" />
			</Swiper>
			<FinanceFeatures></FinanceFeatures>
		</div>
	);
}

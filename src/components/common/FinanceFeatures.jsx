import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useApi } from "@/providers/ApiProvider";

export default function FinanceFeatures() {
	const { scrollBars } = useApi();
	const { data } = scrollBars;

	// const benifitLists = [
	// 	"Buy Now, Pay Later",
	// 	"0 Down Payment",
	// 	"Trusted by Thousands",
	// 	"Flexible Payment Plans",
	// 	"Personalized Advice",
	// ];

	const swiperOptions = {
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		slidesPerView: 2,
		loop: true,
		spaceBetween: 20,
		speed: 10000,
		observer: true,
		observeParents: true,

		breakpoints: {
			450: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			868: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			992: {
				slidesPerView: 4,
				spaceBetween: 10,
			},
		},
	};
	return (
		<section className="features-section">
			<div className="flex sm-flex-column">
				<div className="">
					<Link
						to={"/credit-application-form"}
						className=" text-nowrap partner-brand3 fs-5 font-monospace fw-bold"
					>
						Apply For Finance
					</Link>
				</div>
				<div className="col-lg-12 py-3 partner-brand2">
					<Swiper
						{...swiperOptions}
						modules={[Autoplay, Pagination]}
						className="swiper-container carousel-5"
					>
						{data?.map((list, index) => (
							<SwiperSlide className="swiper-slide" key={index}>
								<div className="">
									<div className="text-center fs-15 text-nowrap fw-bold">
										<i className="fa-solid fa-circle-arrow-right text-white fixed-icon position-relative">
											<span className="mx-1 fs-5 text-white font-monospace">
												{list.title}
											</span>
										</i>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
}

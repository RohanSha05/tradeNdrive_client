import { gallerySlides } from "@/data/gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay, FreeMode, Navigation, Thumbs, Grid } from "swiper/modules";
import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";

const Gallery = ({ parentClass = "section-blog tf-section" }) => {
	useEffect(() => {
		const lightbox = new PhotoSwipeLightbox({
			gallery: "#my-gallery",
			children: ".image",
			pswpModule: () => import("photoswipe"),
		});
		lightbox.init();
		return () => {
			lightbox.destroy();
		};
	}, []);

	return (
		<section className="my-4">
			<div className="container">
				<div className="row">
					<div className="">
						<div className="heading-section flex align-center justify-space flex-wrap gap-20">
							<h2
								className="wow fadeInUpSmall"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								Gallery
							</h2>
							<Link
								to={`/blog-grid`}
								className="tf-btn-arrow wow fadeInUpSmall"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								View all
								<i className="icon-autodeal-btn-right" />
							</Link>
						</div>
						<Swiper
							className="swiper tf-sw-mobile"
							id="my-gallery"
							slidesPerView={4}
							grid={{
								rows: 2,
								fill: "row",
							}}
							breakpoints={{
								1024: {
									slidesPerView: 4,
								},
								768: {
									slidesPerView: 3,
								},
								0: {
									slidesPerView: 2,
								},
							}}
							spaceBetween={30}
							modules={[Grid, Autoplay, FreeMode, Navigation, Thumbs]}
						>
							{gallerySlides.slice(0, 8).map((slide, index) => (
								<SwiperSlide className="swiper-slide" key={index}>
									<a
										href={slide.imgSrc}
										data-pswp-width="1245"
										data-pswp-height="701"
										target="_blank"
										className="image"
									>
										<div className="blog-article-item style1 hover-img">
											<div className="images img-style relative flex-none">
												<img
													className="lazyload"
													alt="image"
													src={slide.imgSrc}
													width={1245}
													height={701}
												/>
											</div>
										</div>
									</a>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Gallery;

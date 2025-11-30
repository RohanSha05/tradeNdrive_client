import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { blogPosts2, gallerySlides } from "@/data/gallery";
import Pagination2 from "../common/Pagination2";
import PhotoSwipeLightbox from "photoswipe/lightbox";
export default function Blogs2() {
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
		<section className="tf-section3 flat-blog-grid flat-blog-list flat-property my-1">
			<div className="container">
				<div className="inner-heading flex-two flex-wrap">
					<h1 className="heading-listing">Blog Page</h1>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<div className="post">
							<div className="flat-blog">
								<div className="row">
									{gallerySlides.map((post, index) => (
										<div className="col-lg-3 col-md-6" key={index}>
											<a
												href={post.imgSrc}
												data-pswp-width="1245"
												data-pswp-height="701"
												className="image"
											>
												<div className="blog-article-item style1 hover-img">
													<div className="images img-style relative flex-none">
														<img
															className="lazyload"
															alt="image"
															src={post.imgSrc}
														/>
													</div>
												</div>
											</a>
										</div>
									))}
								</div>
							</div>
							{/* <div className="themesflat-pagination clearfix center">
								<ul>
									<Pagination2 />
								</ul>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

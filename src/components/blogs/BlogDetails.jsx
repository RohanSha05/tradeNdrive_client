import React from "react";

import BlogCategories from "./BlogCategories";
import FeaturedItems from "./FeaturedItems";
import NewsLetter from "./NewsLetter";
import PopulerTags from "./PopulerTags";
import CommentForm from "./CommentForm";
import BlogSearch from "./BlogSearch";

export default function BlogDetails({ blogItem }) {
	return (
		<section className="tf-section3 flat-blog-detail flat-property-detail">
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
						<div className="post">
							<h1 className="title-heading">{blogItem.title}</h1>
							<div className="icon-boxs flex flex-wrap gap-20">
								<div className="icon flex align-center">
									<svg
										width={16}
										height={16}
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M11.9883 12.4831C11.5225 11.8664 10.9198 11.3662 10.2278 11.022C9.53575 10.6779 8.77324 10.4991 8.00033 10.4998C7.22743 10.4991 6.46492 10.6779 5.77288 11.022C5.08084 11.3662 4.47816 11.8664 4.01233 12.4831M11.9883 12.4831C12.8973 11.6746 13.5384 10.6088 13.8278 9.4272C14.1172 8.24555 14.0405 7.00386 13.608 5.86679C13.1754 4.72972 12.4075 3.75099 11.4059 3.0604C10.4044 2.36982 9.21656 2 8 2C6.78344 2 5.59562 2.36982 4.59407 3.0604C3.59252 3.75099 2.82455 4.72972 2.39202 5.86679C1.95949 7.00386 1.88284 8.24555 2.17221 9.4272C2.46159 10.6088 3.10333 11.6746 4.01233 12.4831M11.9883 12.4831C10.891 13.4619 9.47075 14.0019 8.00033 13.9998C6.52969 14.0021 5.10983 13.4621 4.01233 12.4831M10.0003 6.4998C10.0003 7.03024 9.78962 7.53894 9.41455 7.91402C9.03948 8.28909 8.53077 8.4998 8.00033 8.4998C7.4699 8.4998 6.96119 8.28909 6.58612 7.91402C6.21105 7.53894 6.00033 7.03024 6.00033 6.4998C6.00033 5.96937 6.21105 5.46066 6.58612 5.08559C6.96119 4.71052 7.4699 4.4998 8.00033 4.4998C8.53077 4.4998 9.03948 4.71052 9.41455 5.08559C9.78962 5.46066 10.0003 5.96937 10.0003 6.4998Z"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<span className="fw-6 text-color-3 fs-16">
										{blogItem.admin || "Isam's Auto Repair"}
									</span>
								</div>
								<div className="icon flex align-center">
									<svg
										width={16}
										height={16}
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1.5 8.5V8C1.5 7.60218 1.65804 7.22064 1.93934 6.93934C2.22064 6.65804 2.60218 6.5 3 6.5H13C13.3978 6.5 13.7794 6.65804 14.0607 6.93934C14.342 7.22064 14.5 7.60218 14.5 8V8.5M8.70667 4.20667L7.29333 2.79333C7.20048 2.70037 7.09022 2.62661 6.96886 2.57628C6.84749 2.52595 6.71739 2.50003 6.586 2.5H3C2.60218 2.5 2.22064 2.65804 1.93934 2.93934C1.65804 3.22064 1.5 3.60218 1.5 4V12C1.5 12.3978 1.65804 12.7794 1.93934 13.0607C2.22064 13.342 2.60218 13.5 3 13.5H13C13.3978 13.5 13.7794 13.342 14.0607 13.0607C14.342 12.7794 14.5 12.3978 14.5 12V6C14.5 5.60218 14.342 5.22064 14.0607 4.93934C13.7794 4.65804 13.3978 4.5 13 4.5H9.414C9.14887 4.49977 8.89402 4.39426 8.70667 4.20667Z"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<span className="fw-6 text-color-3 fs-16">
										{blogItem.category || "Car Care"}
									</span>
								</div>
								<div className="icon flex align-center">
									<svg
										width={16}
										height={16}
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M4.5 2V3.5M11.5 2V3.5M2 12.5V5C2 4.60218 2.15804 4.22064 2.43934 3.93934C2.72064 3.65804 3.10218 3.5 3.5 3.5H12.5C12.8978 3.5 13.2794 3.65804 13.5607 3.93934C13.842 4.22064 14 4.60218 14 5V12.5M2 12.5C2 12.8978 2.15804 13.2794 2.43934 13.5607C2.72064 13.842 3.10218 14 3.5 14H12.5C12.8978 14 13.2794 13.842 13.5607 13.5607C13.842 13.2794 14 12.8978 14 12.5M2 12.5V7.5C2 7.10218 2.15804 6.72064 2.43934 6.43934C2.72064 6.15804 3.10218 6 3.5 6H12.5C12.8978 6 13.2794 6.15804 13.5607 6.43934C13.842 6.72064 14 7.10218 14 7.5V12.5"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<span className="fs-16">
										{blogItem.date || "March 24, 2025"}
									</span>
								</div>
							</div>
							<div className="texts-1 fs-16 fw-5 lh-22 text-color-2">
								{blogItem.description ||
									"Isam's Auto Repair – Your trusted destination for expert car maintenance and repair. Quality service, skilled mechanics, and reliable solutions to keep your vehicle running smoothly!"}
							</div>
							<div className="image">
								<img
									alt="images"
									src={
										blogItem.imgSrc || "/assets/images/blog/blog-details-1.jpg"
									}
									width={1260}
									height={710}
								/>
							</div>
							<h3>{blogItem.title || "Expert Car Maintenance Tips"}</h3>
							<p className="texts-2">
								At Isam's Auto Repair, we believe in providing top-notch service
								to ensure your vehicle stays in excellent condition. From
								routine maintenance to complex repairs, our skilled mechanics
								are here to help.
							</p>
							<p className="texts-2">
								Regular maintenance is key to extending the life of your car.
								Our team specializes in oil changes, brake inspections, tire
								rotations, and more. Trust us to keep your car running smoothly
								and safely.
							</p>
							<div className="tag-wrap flex flex-wrap justify-space align-center gap-8">
								<div className="tags-box">
									<div className="tags flex-three">
										<p className="text-color-2 fw-5 font">Tags :</p>
										<div className="flex fs-13 fw-6 link-style-1">
											<a href="#">Car Maintenance</a>
											<a href="#">Auto Repair</a>
											<a href="#">Isam's Auto Repair</a>
										</div>
									</div>
								</div>
								<div className="share-box flex-three">
									<p className="text-color-2 fw-5 font">Share this post:</p>
									<div className="icon-social">
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
						</div>
					</div>
					<div className="col-lg-4">
						<aside className="side-bar side-bar-1 side-blog">
							<div className="inner-side-bar">
								<div className="widget-rent">
									<div className="flat-tabs style2">
										<div className="form-s2">
											<BlogSearch />
										</div>
									</div>
								</div>
								<BlogCategories />
								<FeaturedItems />
								<NewsLetter />
								<PopulerTags />
							</div>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
}
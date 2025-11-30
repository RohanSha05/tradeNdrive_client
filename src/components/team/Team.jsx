import React from "react";
import { Link } from "react-router-dom";
import { teamMembers } from "@/data/agents";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Agents() {
	return (
		<section className="tf-section3 flat-property">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="heading-section flex align-center justify-space flex-wrap gap-20">
							<h2
								className="wow fadeInUpSmall text-center"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								Our Team
							</h2>
							<Link
								to={`/team-details`}
								className="tf-btn-arrow wow fadeInUpSmall"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								View all
								<i className="icon-autodeal-btn-right" />
							</Link>
						</div>
					</div>
					{teamMembers.slice(0, 4).map((member, index) => (
						<div key={index} className="col-lg-3 col-6">
							<div className="tf-team box hover-img tf-sw-mobile4">
								<div className="images relative img-style">
									<Link to={`/sale-agents-detail/${member.id}`}>
										<img
											className="image"
											data-src={member.imageSrc}
											alt="images"
											src={member.imageSrc}
										/>
									</Link>
									<div className="icon-socials">
										<a href="#">
											<i className="icon-autodeal-facebook" />
										</a>
										<a href="#">
											<i className="icon-autodeal-twitter" />
										</a>
										<a href="#">
											<i className="icon-autodeal-linkedin" />
										</a>
										<a href="#">
											<i className="icon-autodeal-instagram" />
										</a>
									</div>
								</div>
								<div className="content flex-two">
									<div className="inner">
										<h3 className="link-style-1">
											<Link to={`/sale-agents-detail/${member.id}`}>
												{member.name}
											</Link>
										</h3>
										<p className="text-color-2">{member.position}</p>
									</div>
									<div className="icon-box flex">
										<a href={`tel:${member.phone}`}>
											<i className="fas fa-phone-alt" />
										</a>
										<a href={`mailto:${member.email}`}>
											<i className="fas fa-envelope" />
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<Swiper
					className="swiper-container overflow-visible tf-sw-mobile4-swiper"
					spaceBetween={30}
					slidesPerView={2}
					breakpoints={{
						1000: {
							slidesPerView: 3,
						},
						600: {
							slidesPerView: 2,
						},
						0: {
							slidesPerView: 1,
						},
					}}
				>
					{teamMembers.map((member, index) => (
						<SwiperSlide key={index}>
							<div className="tf-team box hover-img">
								<div className="images relative img-style">
									<Link to={`/sale-agents-detail/${member.id}`}>
										<img
											className=""
											data-src={member.imageSrc}
											alt="images"
											src={member.imageSrc}
										/>
									</Link>
									<div className="icon-socials">
										<a href="#">
											<i className="icon-autodeal-facebook" />
										</a>
										<a href="#">
											<i className="icon-autodeal-twitter" />
										</a>
										<a href="#">
											<i className="icon-autodeal-linkedin" />
										</a>
										<a href="#">
											<i className="icon-autodeal-instagram" />
										</a>
									</div>
								</div>
								<div className="content flex-two">
									<div className="inner">
										<h3 className="link-style-1">
											<Link to={`/sale-agents-detail/${member.id}`}>
												{member.name}
											</Link>
										</h3>
										<p className="text-color-2">{member.position}</p>
									</div>
									<div className="icon-box flex">
										<a href={`tel:${member.phone}`}>
											<i className="fas fa-phone-alt" />
										</a>
										<a href={`mailto:${member.email}`}>
											<i className="fas fa-envelope" />
										</a>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}

import abcd from "../../../public/assets/images/partner/abcdlogo-1.png";

export default function Brands() {
	return (
		<section className="partner-brand my-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-section center">
							<h2
								className="wow fadeInUpSmall mb-2 "
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								Our partner
							</h2>
						</div>
						{/* Responsive grid: 1 column on small, 2 columns on large */}

						<div className="flex flex-wrap justify-content-center">
							<div className="tf-image-box style1 bg-orange flex-three">
								<div className="image">
									<a
										href="https://abcdauto.ca/"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src={abcd}
											alt="https://isamrepair.ca/"
											style={{
												maxWidth: "180px",
												width: "100%",
												height: "auto",
												margin: "0 auto",
											}}
										/>
									</a>
								</div>
								<div className="content">
									<h1 className="text-white">All Budget Car Dealer - ABCD</h1>
									<p className="text-white">
										Located in Saskatoon, SK, we offer professional car
										detailing services like deep vacuuming, shampoo washes, rim
										& tire care, and under-hood cleaning starting at just
										$29.99. With experienced technicians and a full-service
										approach, we ensure your vehicle shines inside and out.
										Contact us today to book your detailing appointment or
										explore our dealership offerings!
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
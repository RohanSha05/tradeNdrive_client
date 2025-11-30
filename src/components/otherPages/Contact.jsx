import React, { useRef, useState } from "react";

import emailjs from "@emailjs/browser";
import { useApi } from "@/providers/ApiProvider";
export default function Contact() {
	const formRef = useRef();
	const [success, setSuccess] = useState(true);
	const [showMessage, setShowMessage] = useState(false);

	const handleShowMessage = () => {
		setShowMessage(true);
		setTimeout(() => {
			setShowMessage(false);
		}, 2000);
	};

	const sendMail = (e) => {
		e.preventDefault();
		emailjs
			.sendForm("service_noj8796", "template_fs3xchn", formRef.current, {
				publicKey: "iG4SCmR-YtJagQ4gV",
			})
			.then((res) => {
				if (res.status === 200) {
					setSuccess(true);
					handleShowMessage();

					formRef.current.reset();
				} else {
					setSuccess(false);
					handleShowMessage();
				}
			});
	};

	const { data, loading } = useApi();
	const fallbackImage =
		"https://i.ibb.co.com/gZdVcjFd/Isam-Auto-Repair-1024x373.png";

	const {
		contact_email,
		contact_number,
		address,
		facebook,
		x,
		instagram,
		linkedin,
		youtube,
		whatsapp,
		address_embaded_code,
	} = data.data || {};

	const mapEmbedCode =
		address_embaded_code ||
		"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9797.85106057459!2d-106.68533550000001!3d52.1259031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5304f7341a317c93%3A0x8fa3456f6eeb1ead!2sIsam&#39;s%20auto%20repair!5e0!3m2!1sen!2sbd!4v1746689137994!5m2!1sen!2sbd";

	return (
		<>
			<section className="flat-property">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="inner-heading flex-two flex-wrap">
								<h1 className="heading-listing">Contact us</h1>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="tf-section-contact">
				<div className="container">
					<div className="row">
						<div className="col-md-8 contact-left">
							<div className="heading-section mb-30">
								<h2>Drop Us a Line</h2>
								<p className="mt-12">
									Feel free to connect with us through our online channels for
									updates, news, and more.
								</p>
							</div>
							<div id="comments" className="comments">
								<div className="respond-comment">
									<form
										onSubmit={sendMail}
										ref={formRef}
										id="loan-calculator"
										className="comment-form form-submit"
										acceptCharset="utf-8"
									>
										<div className="grid-sw-2">
											<fieldset className="email-wrap style-text">
												<label className="font-1 fs-14 fw-5">Name</label>
												<input
													type="text"
													className="tb-my-input"
													name="name"
													placeholder="Your name"
													required
												/>
											</fieldset>
											<fieldset className="phone-wrap style-text">
												<label className="font-1 fs-14 fw-5">
													Email address
												</label>
												<input
													type="email"
													className="tb-my-input"
													name="email"
													placeholder="Your email"
													required
												/>
											</fieldset>
										</div>
										<div className="grid-sw-2">
											<fieldset className="email-wrap style-text">
												<label className="font-1 fs-14 fw-5">
													Phone Numbers
												</label>
												<input
													type="tel"
													className="tb-my-input"
													name="tel"
													placeholder="Phone Numbers"
													required
												/>
											</fieldset>
											<fieldset className="phone-wrap style-text">
												<label className="font-1 fs-14 fw-5">Subject</label>
												<input
													type="text"
													className="tb-my-input"
													name="subject"
													placeholder="Enter Keyword"
													required
												/>
											</fieldset>
										</div>
										<fieldset className="phone-wrap style-text">
											<label className="font-1 fs-14 fw-5">Your Message</label>
											<textarea
												id="comment-message"
												name="message"
												rows={4}
												tabIndex={4}
												placeholder="Your message"
												aria-required="true"
												required
												defaultValue={""}
											/>
										</fieldset>
										<div
											className={`tfSubscribeMsg  footer-sub-element ${
												showMessage ? "active" : ""
											}`}
										>
											{success ? (
												<p style={{ color: "rgb(52, 168, 83)" }}>
													Message has been sent successfully
												</p>
											) : (
												<p style={{ color: "red" }}>Something went wrong</p>
											)}
										</div>
										<div className="button-boxs">
											<button className="sc-button" name="submit" type="submit">
												<span>Send Message</span>
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-md-4 contact-right">
							<div className="contact-info box-sd">
								<h2 className="mb-30">Contact Us</h2>
								<div className="wrap-info">
									<div className="box-info">
										<h5>Address</h5>
										<p>{address}</p>
									</div>
									<div className="box-info">
										<h5>Infomation:</h5>
										<p>{contact_number}</p>
										<p>{contact_email}</p>
									</div>
									<div className="box-info">
										<h5>Opentime:</h5>
										<p>Sat & Sun: 10:00 AM- 6:00 PM</p>
										<p>Mon-Fri: 9:00 AM-7:00 PM</p>
									</div>
									<div className="box-info">
										<h5>Follow Us:</h5>
										<div className="icon-social style2">
											{(facebook || linkedin || x || instagram || youtube) && (
												<div className="icon-social box-3 text-color-1">
													{(facebook ||
														"https://www.facebook.com/isamauto") && (
														<a
															href={facebook || "https://facebook.com/default"}
														>
															<i className="icon-autodeal-facebook" />
														</a>
													)}
													{(linkedin ||
														"https://www.linkedin.com/company/isamauto/") && (
														<a
															href={linkedin || "https://linkedin.com/default"}
														>
															<i className="icon-autodeal-linkedin" />
														</a>
													)}
													{(x || "https://x.com/isamauto") && (
														<a href={x || "https://twitter.com/default"}>
															<i className="icon-autodeal-twitter" />
														</a>
													)}
													{(instagram ||
														"https://www.instagram.com/isamauto/#") && (
														<a
															href={
																instagram || "https://instagram.com/default"
															}
														>
															<i className="icon-autodeal-instagram" />
														</a>
													)}
													{(youtube ||
														"https://www.youtube.com/channel/UC_ISAM_AUTO") && (
														<a href={youtube || "https://youtube.com/default"}>
															<i className="icon-autodeal-youtube" />
														</a>
													)}
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="tf-section-map container mb-5">
				<div className="container-fluid">
					<div className="map">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9797.85106057459!2d-106.68533550000001!3d52.1259031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5304f7341a317c93%3A0x8fa3456f6eeb1ead!2sIsam&#39;s%20auto%20repair!5e0!3m2!1sen!2sbd!4v1746689137994!5m2!1sen!2sbd"
							className="map-content"
							width="600"
							height="450"
							style={{ border: 0 }}
							allowFullScreen
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>
			</section>
		</>
	);
}

import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import { useApi } from "@/providers/ApiProvider";
import HeaderAuth from "../common/HeaderAuth";

export default function Header1() {
	const { data, loading } = useApi();
	const { logo } = data?.data || {};

	const fallbackImage = "/assets/images/logo/Isam-Auto-Repair-1024x373.png";

	const [logoSrc, setLogoSrc] = useState(fallbackImage);

	useEffect(() => {
		if (logo && logo.trim() !== "") {
			setLogoSrc(logo);
		}
	}, [logo]);

	return (
		<header className="main-header style2">
			<style>{`
				.main-header .main-menu .navigation > li {
					margin-right: 15px !important;
				}
				.main-header .main-menu .navigation > li > a {
					font-size: 14px !important;
					padding: 37px 0px !important;
					white-space: nowrap;
				}
				.main-header .main-menu {
					margin-left: 80px !important;
				}
				@media (max-width: 1400px) {
					.main-header .main-menu .navigation > li {
						margin-right: 10px !important;
					}
					.main-header .main-menu .navigation > li > a {
						font-size: 13px !important;
					}
				}
				@media (max-width: 1200px) {
					.main-header .main-menu .navigation > li {
						margin-right: 8px !important;
					}
					.main-header .main-menu .navigation > li > a {
						font-size: 12px !important;
					}
					.main-header .main-menu {
						margin-left: 40px !important;
					}
				}
			`}</style>
			{/* Header Lower */}
			<div className="header-lower">
				<div className="container2">
					<div className="row">
						<div className="col-lg-12">
							<div className="inner-container d-flex justify-content-between align-center">
								{/* Logo Box */}
								<div className="logo-box">
									<div className="logo">
										<Link to={`/`}>
											<img
												alt="Isam Auto"
												width={160}
												height={120}
												src={logoSrc}
												onError={() => setLogoSrc(fallbackImage)} // Handle invalid URL
											/>
										</Link>
									</div>
								</div>
								<div className="nav-outer">
									{/* Main Menu */}
									<nav className="main-menu show navbar-expand-md">
										<div
											className="navbar-collapse collapse clearfix"
											id="navbarSupportedContent"
										>
											<ul className="navigation clearfix">
												<Nav />
											</ul>
										</div>
									</nav>
									{/* Main Menu End */}
								</div>
								<div className="header-account">
									{/* <div className="button-boxs-booking">
										<a href="/credit-application-form">
											<button className="sc-button" name="submit" type="submit">
												<span className="text-white">Apply for Finance</span>
											</button>
										</a>
									</div> */}
									<div className="ms-3">
										<HeaderAuth />
									</div>
								</div>
								<div
									className="mobile-nav-toggler mobile-button"
									onClick={() =>
										document.body.classList.add("mobile-menu-visible")
									}
								>
									<span></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* End Header Lower */}
			{/* Mobile Menu */}
			<div
				className="close-btn"
				onClick={() => document.body.classList.remove("mobile-menu-visible")}
			>
				<span className="icon flaticon-cancel-1" />
			</div>
			<div className="mobile-menu">
				<div
					className="menu-backdrop"
					onClick={() => document.body.classList.remove("mobile-menu-visible")}
				/>
				<nav className="menu-box">
					<div className="nav-logo">
						<Link to={`/`}>
							<img
								alt="Isam Auto"
								width={80}
								height={60}
								src={logoSrc}
								onError={() => setLogoSrc(fallbackImage)}
							/>
						</Link>
					</div>
					<div className="bottom-canvas">
						<MobileNav />
					</div>
				</nav>
			</div>
			{/* End Mobile Menu */}
		</header>
	);
}

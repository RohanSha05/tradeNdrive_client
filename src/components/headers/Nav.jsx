import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { blogPages, homepages, listingPages, otherPages } from "@/data/menu";
import CarSearchbyTitle from "../carSearchbyTitle/CarSearchbyTitle";

export default function Nav() {
	const { pathname } = useLocation();
	const isActive = (menus) => {
		let active = false;

		menus.forEach((elm) => {
			if (elm.links) {
				elm.links.forEach((elm2) => {
					if (elm2.href.split("/")[1] == pathname.split("/")[1]) {
						active = true;
					}
				});
			} else {
				if (elm.href.split("/")[1] == pathname.split("/")[1]) {
					active = true;
				}
			}
		});
		return active;
	};
	return (
		<>
			<li className={`tf-megamenu  ${isActive(homepages) ? "current" : ""} `}>
				<a href="/">Home</a>
			</li>
			<li className={"about-us" == pathname.split("/")[1] ? "current" : ""}>
				<a href="/about-us">About Us</a>
			</li>
			<li className={`  ${isActive(otherPages) ? "current" : ""} `}>
				<a href="/car-list">Cars</a>
			</li>
			<li className={`  ${isActive(otherPages) ? "current" : ""} `}>
				<Link to="/service-booking">Auto Repair</Link>
			</li>
			<li className={`dropdown2 ${isActive(otherPages) ? "current" : ""} `}>
				<a href="#">Research</a>
				<ul>
					<li>
						<a href="/research/car-comparison">Car Comparison</a>
					</li>
					<li>
						<a href="/research/market-trends">Market Trends</a>
					</li>
					<li>
						<a href="/research/buying-guides">Buying Guides</a>
					</li>
					<li>
						<a href="/research/car-reviews">Car Reviews</a>
					</li>
					<li>
						<a href="/research/finance-tips">Financing Tips</a>
					</li>
					<li>
						<Link to="/service-status">Service Status</Link>
					</li>
				</ul>
			</li>
			<li className={"contact" == pathname.split("/")[1] ? "current" : ""}>
				<CarSearchbyTitle variant="nav" />
			</li>
		</>
	);
}

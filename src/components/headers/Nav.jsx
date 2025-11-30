import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { blogPages, homepages, listingPages, otherPages } from "@/data/menu";

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
				<a href="https://isamrepair.ca/" target="blank">
					Auto Repair
				</a>
			</li>

			<li className={"contact" == pathname.split("/")[1] ? "current" : ""}>
				<Link to={`/contact`}>Contact</Link>
			</li>
		</>
	);
}

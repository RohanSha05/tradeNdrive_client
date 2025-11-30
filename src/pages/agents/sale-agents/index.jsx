import Agents from "@/components/agents/Agents";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import { Link } from "react-router-dom";
import React from "react";

export default function SaleAgentsPage() {
  return (
		<>
			<div className="header-fixed">
				<Header2 />
			</div>
			<section className="flat-title mb-40">
				<div className="container2">
					<div className="row">
						<div className="col-lg-12">
							<div className="title-inner style">
								<div className="title-group fs-12">
									<Link className="home fw-6 text-color-3" to={`/`}>
										Home
									</Link>
									<span>Used cars for sale</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Agents />
			<Footer1 />
		</>
	);
}

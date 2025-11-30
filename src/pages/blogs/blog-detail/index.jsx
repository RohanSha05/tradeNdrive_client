import BlogDetails from "@/components/blogs/BlogDetails";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { allBlogs } from "@/data/gallery";
import MetaComponent from "@/components/common/MetaComponent";
import { useApi } from "@/providers/ApiProvider";

export default function BlogDetailsPage() {
	const { data } = useApi();
	const { site_title, moto } = data.data || {};

	const metadata = {
		title: `${site_title ?? "Isam Auto"} - Our Team`,
		description: moto,
	};

	let params = useParams();
	const blogItem =
		allBlogs.filter((elm) => elm.id == params.id)[0] || allBlogs[0];
	return (
		<>
			<div className="header-fixed mb-5">
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
			<BlogDetails blogItem={blogItem} />
			<Footer1 />
		</>
	);
}

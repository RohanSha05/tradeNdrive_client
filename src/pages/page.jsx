import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/common/Banner";
import Brands from "@/components/common/Brands";
import CarBrands from "@/components/homes/home-1/CarBrands";
import CarReview from "@/components/common/CarReview";
import Cars from "@/components/common/Cars";

import Filter from "@/components/homes/home-1/Filter";
import Hero from "@/components/homes/home-1/Hero";
import LoanCalculator from "@/components/homes/home-1/LoanCalculator";

import MetaComponent from "@/components/common/MetaComponent";
import CarBrands2 from "@/components/common/CarBrands2";
import Features1 from "@/components/homes/home-1/Features1";
import Features from "@/components/common/Features";
import Gallery from "@/components/gallery/Gallery";
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget/GoogleReviewsWidget";
import { useApi } from "@/providers/ApiProvider";
import Topbar from "@/components/headers/Topbar";
import SoldCars from "@/components/common/SoldCars";
import CarSearchbyTitle from "@/components/carSearchbyTitle/CarSearchbyTitle";

export default function HomePage1() {
	const { data, loading } = useApi();
	const { site_title, moto } = data.data || {};

	const metadata = {
		title: ` ${site_title ?? "Isam Auto"} - Home`,
		description: moto,
	};

	return (
		<>
			<MetaComponent meta={metadata} />
			<Topbar></Topbar>
			<div className="header-fixed">
				<Header1 />
			</div>
			<Hero />
			<Filter />
			<CarBrands2></CarBrands2>
			<Cars />
			<SoldCars />
			<CarReview />
			<Features1></Features1>
			<CarBrands />
			<LoanCalculator />
			<Features />
			{/* <Testimonials></Testimonials> */}
			<GoogleReviewsWidget></GoogleReviewsWidget>
			<Banner />
			<Brands />
			<Gallery></Gallery>
			{/* <Team></Team> */}
			{/* <Blogs /> */}
			<Footer1 />
		</>
	);
}

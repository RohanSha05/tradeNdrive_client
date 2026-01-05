// filepath: /C:/Users/msi/Documents/GitHub/isamauto-frontend/src/App.jsx
import "rc-slider/assets/index.css";
import "./styles/style.scss";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "photoswipe/style.css";
import { lazy, useEffect, useState } from "react";
import BackToTop from "@/components/common/BacktoTop";
import { Route, Routes, useLocation } from "react-router-dom";
import WOW from "./utlis/wow";
import ScrollTopBehaviour from "./components/common/ScrollToTopBehaviour";

import "@fortawesome/fontawesome-free/css/all.min.css";

import PreLoader from "./components/pre-loader/PreLoader";

import { ApiProvider, useApi } from "./providers/ApiProvider";
import CarComparison from "./pages/car-comparison";
import CarCompare from "./components/common/CarCompare";
import CarComparePage from "./pages/car-comparison";

const HomePage1 = lazy(() => import("./pages/page"));
const ListingListPage = lazy(() => import("./pages/car-listings/listing-list"));

const BlogListingDetailsPage1 = lazy(() =>
	import("./pages/car-details/listing-detail-v1")
);
const AboutUsPage = lazy(() => import("./pages/other-pages/about-us"));
const SaleAgentsPage = lazy(() => import("./pages/agents/sale-agents"));
const SaleAgentDetailsPage = lazy(() =>
	import("./pages/agents/sale-agents-detail")
);
const CreditApplicationForm = lazy(() =>
	import("./pages/credit-application-form/CreditApplicationForm")
);
const BlogPage = lazy(() => import("./pages/blogs/blog"));
const BlogGridPage = lazy(() => import("./pages/blogs/blog-grid"));
const BlogDetailsPage = lazy(() => import("./pages/blogs/blog-detail"));
const TeamDetails = lazy(() => import("./components/team/TeamDetails"));

const MyReviewPage = lazy(() => import("./pages/dashboard/my-review"));
const ContactPage = lazy(() => import("./pages/other-pages/contact"));
const Login = lazy(() => import("./components/modals/Login"));
const Register = lazy(() => import("./components/modals/Register"));
const ForgotPassword = lazy(() => import("./components/modals/ForgotPassword"));
const ProfilePage = lazy(() => import("./pages/other-pages/profile"));
const SettingsPage = lazy(() => import("./pages/other-pages/settings"));
const MyListingPage = lazy(() => import("./pages/dashboard/my-listing"));
const MyFavoritePage = lazy(() => import("./pages/dashboard/my-favorite"));
const MessagePage = lazy(() => import("./pages/dashboard/message"));
const MyProfilePage = lazy(() => import("./pages/dashboard/my-profile"));
const DashboardPage = lazy(() => import("./pages/dashboard/dashboard"));
const TradeAppFrom = lazy(() =>
	import("./pages/trade-application-form/TradeAppFrom")
);
import PrivateRoute from "./routes/PrivateRoute";
import Chatbot from "./components/chatbot/Chatbot";
const SecureCheckout = lazy(() => import("./pages/SecureCheckout"));
const ServiceBooking = lazy(() =>
	import("./pages/service-booking/ServiceBooking")
);
const ServiceStatus = lazy(() =>
	import("./pages/service-booking/ServiceStatus")
);
const ServiceHistory = lazy(() =>
	import("./pages/service-booking/ServiceHistory")
);
const ServiceAdmin = lazy(() => import("./pages/service-booking/ServiceAdmin"));

function App() {
	const [loading, setLoading] = useState(true);
	const { data, loading: apiLoading } = useApi();

	// Update favicon dynamically
	useEffect(() => {
		if (!apiLoading && data.data?.favicon) {
			const faviconElement = document.getElementById("dynamic-favicon");
			if (faviconElement) {
				faviconElement.href = data.data.favicon;
			} else {
				faviconElement.href = "/favicon.ico";
			}
		}
	}, [data.data, apiLoading]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			import("bootstrap/dist/js/bootstrap.esm").then(() => {});
		}
	}, []);

	const { pathname } = useLocation();

	useEffect(() => {
		const handleScroll = () => {
			const nav = document.querySelector(".header-lower");
			if (document.querySelector(".header-fixed") && nav) {
				if (window.scrollY > 200) {
					nav.classList.add("is-fixed");
				} else {
					nav.classList.remove("is-fixed");
				}

				if (window.scrollY > 300) {
					nav.classList.add("is-small");
				} else {
					nav.classList.remove("is-small");
				}
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [pathname]);

	useEffect(() => {
		const wow = new WOW({
			mobile: false,
			live: false,
		});
		wow.init();
	}, [pathname]);

	useEffect(() => {
		let timer;
		if (pathname === "/") {
			setLoading(true);
			timer = setTimeout(() => {
				// Only hide loader if API is also done loading
				if (!apiLoading) setLoading(false);
			}, 2000);
		} else {
			setLoading(false);
		}
		return () => clearTimeout(timer);
	}, [pathname, apiLoading]);

	useEffect(() => {
		if (pathname === "/" && !apiLoading) {
			setLoading(false);
		}
	}, [apiLoading, pathname]);
	return (
		<>
			{loading && <PreLoader />}
			<div id="wrapper">
				<div id="pagee" className="clearfix">
					<ApiProvider>
						<Routes>
							<Route path="/">
								<Route
									index
									element={
										<ApiProvider>
											<div style={{ display: loading ? "none" : "block" }}>
												<HomePage1 />
											</div>
										</ApiProvider>
									}
								/>
								<Route path="car-list" element={<ListingListPage />} />

								<Route
									path="car-details/:model"
									element={<BlogListingDetailsPage1 />}
								/>
								<Route path="about-us" element={<AboutUsPage />} />
								<Route path="sale-agents" element={<SaleAgentsPage />} />
								<Route
									path="sale-agents-detail/:id"
									element={<SaleAgentDetailsPage />}
								/>
								<Route
									path="credit-application-form"
									element={
										<ApiProvider>
											<CreditApplicationForm />
										</ApiProvider>
									}
								/>
								<Route path="blog" element={<BlogPage />} />
								<Route path="blog-grid" element={<BlogGridPage />} />
								<Route path="team-details" element={<TeamDetails />} />
								<Route path="blog-detail/:id" element={<BlogDetailsPage />} />
								<Route path="my-review" element={<MyReviewPage />} />
								<Route path="contact" element={<ContactPage />} />
								<Route path="login" element={<Login />} />
								<Route path="register" element={<Register />} />
								<Route path="forgot-password" element={<ForgotPassword />} />
								<Route path="profile" element={<ProfilePage />} />
								<Route path="settings" element={<SettingsPage />} />
								<Route
									path="dashboard"
									element={
										<PrivateRoute>
											<DashboardPage />
										</PrivateRoute>
									}
								/>
								<Route
									path="dashboard/my-listing"
									element={
										<PrivateRoute>
											<MyListingPage />
										</PrivateRoute>
									}
								/>
								<Route
									path="dashboard/my-favorite"
									element={
										<PrivateRoute>
											<MyFavoritePage />
										</PrivateRoute>
									}
								/>
								<Route
									path="dashboard/message"
									element={
										<PrivateRoute>
											<MessagePage />
										</PrivateRoute>
									}
								/>
								<Route
									path="dashboard/my-profile"
									element={
										<PrivateRoute>
											<MyProfilePage />
										</PrivateRoute>
									}
								/>
								<Route path="trade-form" element={<TradeAppFrom />} />
								<Route
									path="/research/car-comparison"
									element={<CarComparePage />}
								/>

								<Route
									path="/research/market-trends"
									element={<CarCompare />}
								/>
								<Route path="secure-checkout" element={<SecureCheckout />} />
								<Route path="service-booking" element={<ServiceBooking />} />
								<Route path="service-status" element={<ServiceStatus />} />
								<Route path="service-history" element={<ServiceHistory />} />
								<Route path="service-admin" element={<ServiceAdmin />} />
							</Route>
						</Routes>
					</ApiProvider>
				</div>
			</div>

			<BackToTop />
			<ScrollTopBehaviour />
			<Chatbot />
		</>
	);
}

export default App;

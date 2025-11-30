import config from "@/config/config";
import { createContext, useContext, useEffect, useState } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);
	const [models, setModels] = useState([]);
	const [bodyTypes, setBodyTypes] = useState([]);
	const [carBrands, setCarBrands] = useState([]);
	const [carListings, setCarListings] = useState([]);
	const [heroBanner, setHeroBanner] = useState([]);
	const [modelYears, setModelYears] = useState([]);
	const [carTypes, setCarTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [scrollBars, setScrollBars] = useState([]);
	const [aboutContent, setABoutContent] = useState([]);
	const [fuelTypes, setFuelTypes] = useState([]);
	const [driveTypes, setDriveTypes] = useState([]);
	const [gearTypes, setGearTypes] = useState([]);
	const [ownerTypes, setOwnerTypes] = useState([]);
	const [carModels, setCarModels] = useState([]);
	const [carDealers, setCarDealers] = useState([]);

	// Helper function to fetch and set data
	const fetchData = async (endpoint, setter) => {
		try {
			const res = await fetch(`${config.apiEndpoint}/${endpoint}`);
			const result = await res.json();
			setter(result);
		} catch (error) {
			console.error(`Error fetching ${endpoint}:`, error);
		}
	};

	useEffect(() => {
		const loadAll = async () => {
			setLoading(true);
			await Promise.all([
				fetchData("settings", setData),
				fetchData("model-years", setModelYears),
				fetchData("car-models", setModels),
				fetchData("body-types", setBodyTypes),
				fetchData("car-brands", setCarBrands),
				fetchData("car-listings", setCarListings),
				fetchData("hero-banners", setHeroBanner),
				fetchData("car-types", setCarTypes),
				fetchData("scroll-bars", setScrollBars),
				fetchData("about-content", setABoutContent),
				fetchData("fuel-types", setFuelTypes),
				fetchData("drive-types", setDriveTypes),
				fetchData("gear-types", setGearTypes),
				fetchData("owner-types", setOwnerTypes),
				fetchData("car-models", setCarModels),
				fetchData("car-dealers", setCarDealers),
			]);
			setLoading(false);
		};

		loadAll();
	}, []);

	return (
		<ApiContext.Provider
			value={{
				data,
				models,
				bodyTypes,
				carBrands,
				carListings,
				heroBanner,
				carTypes,
				scrollBars,
				aboutContent,
				fuelTypes,
				gearTypes,
				modelYears,
				driveTypes,
				ownerTypes,
				carModels,
				carDealers,
				loading,
			}}
		>
			{children}
		</ApiContext.Provider>
	);
};

export const useApi = () => useContext(ApiContext);

export const getFooterData = (description1, carBrands = []) => [
	{
		heading: "About Isam's Auto",
		menuItems: [
			{
				text: description1
					? description1
					: "At Isam Auto Sales & Repair, we are committed to providing top-quality vehicles and reliable repair services that you can trust. With years of experience in the automotive industry, we offer a wide range of vehicles at competitive prices and ensure that every car undergoes thorough inspection and servicing.",
				href: "#",
			},
		],
	},
	{
		heading: "Popular Car Brand",
		menuItems: carBrands.length
			? carBrands.slice(0, 5).map((brand) => ({
					text: brand.title,
					href: "/car-list",
					id: brand.id,
			  }))
			: [
					{ text: "Chevrolet", href: "/listing-list" },
					{ text: "Land Rover", href: "/listing-list" },
					{ text: "Tesla", href: "/listing-list" },
					{ text: "Volkswagen", href: "/listing-list" },
					{ text: "Honda", href: "/listing-list" },
			  ],
	},
];

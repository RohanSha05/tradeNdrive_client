
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { allCars } from "@/data/cars";
import "./carSearchbyTitle.scss";

const CarSearchbyTitle = ({ variant = "default" }) => {
	// input controlled separately so search only runs on submit/click
	const [input, setInput] = useState("");
	const [query, setQuery] = useState("");

	const results = useMemo(() => {
		const q = (query || "").trim().toLowerCase();
		if (!q) return [];
		return allCars.filter((car) => {
			const title = (car.title || car.model || "").toString().toLowerCase();
			return title.includes(q);
		});
	}, [query]);

	const onSubmit = (e) => {
		e.preventDefault();
		setQuery(input);
	};

	const clear = () => {
		setInput("");
		setQuery("");
	};

	const highlight = (text = "", q = "") => {
		if (!q) return text;
		const idx = text.toLowerCase().indexOf(q.toLowerCase());
		if (idx === -1) return text;
		const before = text.slice(0, idx);
		const match = text.slice(idx, idx + q.length);
		const after = text.slice(idx + q.length);
		return (
			<>
				{before}
				<mark style={{ background: "#ffe58f" }}>{match}</mark>
				{after}
			</>
		);
	};

	const compactResults = results.slice(0, 6);

	const handleNavChange = (value) => {
		setInput(value);
		setQuery(value);
	};

	if (variant === "nav") {
		return (
			<div
				className="car-search-by-title nav-compact position-relative"
				style={{ minWidth: 200, maxWidth: 220 }}
			>
				<form
					onSubmit={onSubmit}
					className="d-flex align-items-center gap-2"
					role="search"
					aria-label="Search cars by title"
				>
					<div style={{ position: "relative", width: 200 }}>
						<span
							className="text-muted"
							style={{ position: "absolute", left: 10, top: 9, fontSize: 14 }}
						>
							<i className="fas fa-search" aria-hidden="true"></i>
						</span>
						<input
							type="search"
							className="form-control"
							placeholder="Search cars by title"
							value={input}
							onChange={(e) => handleNavChange(e.target.value)}
							style={{ paddingLeft: 34, height: 38, fontSize: 14 }}
						/>
					</div>
					{input && (
						<button
							type="button"
							onClick={clear}
							className="btn btn-outline-secondary"
							style={{ height: 38, padding: "0 10px" }}
							aria-label="Clear search"
						>
							Clear
						</button>
					)}
				</form>

				{query && (
					<div
						className="nav-search-results"
						style={{
							position: "absolute",
							top: "105%",
							left: 0,
							width: 280,
							maxHeight: 320,
							overflowY: "auto",
							background: "#fff",
							boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
							borderRadius: 8,
							padding: "10px 12px",
							zIndex: 1000,
							border: "1px solid rgba(0,0,0,0.08)",
						}}
					>
						<div className="text-muted mb-2" style={{ fontSize: 13 }}>
							{compactResults.length > 0
								? `Showing ${compactResults.length} of ${results.length} matches for "${query}"`
								: `No cars found for "${query}"`}
						</div>
						{compactResults.length === 0 ? (
							<div className="text-color-3" style={{ fontSize: 13 }}>
								<Link to={`/car-list?search=${encodeURIComponent(query)}`}>
									Search all cars for "{query}"
								</Link>
							</div>
						) : (
							<ul
								className="list-unstyled mb-0"
								style={{ fontSize: 14, lineHeight: 1.4 }}
							>
								{compactResults.map((car) => {
									const target = car.slug || car.model || car.id;
									return (
										<li key={car.id || car.title} className="py-1">
											<Link
												to={`/car-details/${target}`}
												className="d-flex align-items-center gap-2"
											>
												<span
													className="text-muted"
													style={{ width: 26, textAlign: "center" }}
												>
													<i className="fas fa-car-side" aria-hidden="true"></i>
												</span>
												<span style={{ flex: 1 }}>
													{highlight(car.title || car.model, query)}
													{car.year ? (
														<span className="text-muted ms-1">
															({car.year})
														</span>
													) : null}
												</span>
												<span className="text-muted" style={{ fontSize: 12 }}>
													${car.price}
												</span>
											</Link>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="car-search-by-title">
			<h2
				className="wow fadeInUpSmall"
				data-wow-delay="0.2s"
				data-wow-duration="1000ms"
			>
				Search Cars by Title
			</h2>
			<form
				onSubmit={onSubmit}
				className="d-flex gap-2 align-items-center mb-4"
			>
				<input
					type="search"
					className="form-control"
					placeholder="Search cars by title — try 'Hyundai', '2017' or 'Mazda'"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					aria-label="Search cars by title"
				/>
				<button
					type="submit"
					className="tf-btn-arrow btn sc-button btn-primary"
				>
					Search
				</button>
				<button
					type="button"
					onClick={clear}
					className="btn btn-outline-secondary"
				>
					Clear
				</button>
			</form>

			<div className="search-meta mb-2">
				{query ? (
					<div className="text-small text-color-3">
						Showing <strong>{results.length}</strong> result
						{results.length !== 1 ? "s" : ""} for "{query}"
					</div>
				) : (
					<div className="text-small text-color-4">
						Enter a search term and press Search or Enter.
					</div>
				)}
			</div>

			<div className="search-results">
				{query && results.length === 0 && (
					<div className="no-results text-color-3">No cars found.</div>
				)}

				{results.length > 0 && (
					<div className="list-car-grid-vertical">
						{results.map((car) => {
							const target = car.slug || car.model || car.id;
							return (
								<div
									key={car.id || car.title}
									className="search-result-item box-car-list hv-one mb-3 p-3"
								>
									<div className="image-group relative d-flex gap-3">
										<div className="img-style" style={{ width: 140 }}>
											<img
												className="lazyload"
												alt={car.title}
												src={car.imgSrc || car.allImages?.[0] || ""}
												style={{
													width: 140,
													height: 90,
													objectFit: "cover",
													borderRadius: 6,
												}}
											/>
										</div>
										<div className="content flex-1">
											<h5 className="link-style-1 mb-1">
												<Link to={`/car-details/${target}`}>
													{highlight(car.title || car.model, query)}
												</Link>
											</h5>
											<div className="text-small text-color-3 mb-1">
												<span className="me-3">{car.year}</span>
												<span className="me-3">{car.location}</span>
												<span className="me-3">${car.price}</span>
											</div>
											<p className="mt-1 text-color-4" style={{ margin: 0 }}>
												{car.short_description?.slice(0, 120) || ""}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default CarSearchbyTitle;
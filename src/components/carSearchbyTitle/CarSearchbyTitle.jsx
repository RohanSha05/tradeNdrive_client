
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { allCars } from "@/data/cars";
import "./carSearchbyTitle.scss";

const CarSearchbyTitle = () => {
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

    return (
        <div className="car-search-by-title">
            <h2
								className="wow fadeInUpSmall"
								data-wow-delay="0.2s"
								data-wow-duration="1000ms"
							>
								Search Cars by Title
							</h2>
            <form onSubmit={onSubmit} className="d-flex gap-2 align-items-center mb-4">
                <input
                    type="search"
                    className="form-control"
                    placeholder="Search cars by title — try 'Hyundai', '2017' or 'Mazda'"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    aria-label="Search cars by title"
                />
                <button type="submit" className="tf-btn-arrow btn sc-button btn-primary">
                    Search
                </button>
                <button type="button" onClick={clear} className="btn btn-outline-secondary">
                    Clear
                </button>
            </form>

            <div className="search-meta mb-2">
                {query ? (
                    <div className="text-small text-color-3">
                        Showing <strong>{results.length}</strong> result{results.length !== 1 ? "s" : ""} for "{query}"
                    </div>
                ) : (
                    <div className="text-small text-color-4">Enter a search term and press Search or Enter.</div>
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
                                <div key={car.id || car.title} className="search-result-item box-car-list hv-one mb-3 p-3">
                                    <div className="image-group relative d-flex gap-3">
                                        <div className="img-style" style={{ width: 140 }}>
                                            <img
                                                className="lazyload"
                                                alt={car.title}
                                                src={car.imgSrc || car.allImages?.[0] || ''}
                                                style={{ width: 140, height: 90, objectFit: 'cover', borderRadius: 6 }}
                                            />
                                        </div>
                                        <div className="content flex-1">
                                            <h5 className="link-style-1 mb-1">
                                                <Link to={`/car-details/${target}`}>{highlight(car.title || car.model, query)}</Link>
                                            </h5>
                                            <div className="text-small text-color-3 mb-1">
                                                <span className="me-3">{car.year}</span>
                                                <span className="me-3">{car.location}</span>
                                                <span className="me-3">${car.price}</span>
                                            </div>
                                            <p className="mt-1 text-color-4" style={{ margin: 0 }}>
                                                {car.short_description?.slice(0, 120) || ''}
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
import React, { useMemo, useState } from "react";
import { allCars } from "@/data/cars";
import { Link } from "react-router-dom";

const CarCardSelect = ({ index, entry, makes, models, onChange, onRemove }) => {
    return (
        <div className="card p-3" style={{ minWidth: 260, borderRadius: 12 }}>
            <h5 className="mb-3">Car {index + 1}</h5>
            <div className="mb-2">
                <label className="form-label">Select Make</label>
                <select className="form-control" value={entry.make} onChange={(e) => onChange(index, { ...entry, make: e.target.value, model: "", car: null })}>
                    <option value="">Make</option>
                    {makes.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>
            <div className="mb-2">
                <label className="form-label">Select Model</label>
                <select className="form-control" value={entry.model} onChange={(e) => onChange(index, { ...entry, model: e.target.value, car: allCars.find(c=> (c.model===e.target.value || c.title===e.target.value) ) || null })}>
                    <option value="">Model</option>
                    {models.map((mo) => (
                        <option key={mo} value={mo}>{mo}</option>
                    ))}
                </select>
            </div>
            {entry.car && (
                <div className="mt-3">
                    <div style={{display:'flex',gap:12}}>
                        <img src={entry.car.imgSrc || entry.car.allImages?.[0]} alt={entry.car.title} style={{width:120,height:70,objectFit:'cover',borderRadius:8}} />
                        <div>
                            <div className="fw-6">{entry.car.title}</div>
                            <div className="text-small text-color-4">${entry.car.price} • {entry.car.year}</div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-3 d-flex justify-content-end">
                <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(index)}>Remove</button>
            </div>
        </div>
    );
};

export default function ComponentCompare() {
    const [entries, setEntries] = useState([
        { make: "", model: "", car: null },
        { make: "", model: "", car: null },
    ]);

    const makes = useMemo(() => {
        const s = new Set();
        allCars.forEach(c => c.make && s.add(c.make));
        return Array.from(s).sort();
    }, []);

    const modelsFor = (make) => {
        const s = new Set();
        allCars.filter(c => (make ? c.make === make : true)).forEach(c => {
            const name = c.model || c.title;
            if (name) s.add(name);
        });
        return Array.from(s);
    };

    const updateEntry = (i, next) => {
        setEntries(prev => prev.map((p, idx) => idx === i ? next : p));
    };

    const removeEntry = (i) => {
        setEntries(prev => prev.filter((_, idx) => idx !== i));
    };

    const addEntry = () => {
        if (entries.length >= 4) return;
        setEntries(prev => [...prev, { make: "", model: "", car: null }]);
    };

    return (
        <div>
            <div className="row mb-4 align-items-start">
                {entries.map((entry, idx) => (
                    <div key={idx} className="col-lg-3 col-md-6 mb-3">
                        <CarCardSelect
                            index={idx}
                            entry={entry}
                            makes={makes}
                            models={modelsFor(entry.make)}
                            onChange={updateEntry}
                            onRemove={removeEntry}
                        />
                    </div>
                ))}

                <div className="col-lg-12 text-center mt-3">
                    <button className="btn btn-outline-primary me-3" onClick={addEntry} disabled={entries.length>=4}>Add another car to compare</button>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-center gap-4 mb-4">
                        <div className="fw-7 fs-20">VS.</div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    {entries.map((e, i) => (
                                        <th key={i} className="text-center">{e.car ? e.car.title : `Car ${i+1}`}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Image</td>
                                    {entries.map((e,i)=>(<td key={i} className="text-center">{e.car ? <img src={e.car.imgSrc||e.car.allImages?.[0]} alt="img" style={{width:140,height:80,objectFit:'cover',borderRadius:6}} /> : '-'}</td>))}
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    {entries.map((e,i)=>(<td key={i} className="text-center">{e.car ? `$${e.car.price}` : '-'}</td>))}
                                </tr>
                                <tr>
                                    <td>Year</td>
                                    {entries.map((e,i)=>(<td key={i} className="text-center">{e.car ? e.car.year : '-'}</td>))}
                                </tr>
                                <tr>
                                    <td>Kilometers</td>
                                    {entries.map((e,i)=>(<td key={i} className="text-center">{e.car ? e.car.km : '-'}</td>))}
                                </tr>
                                <tr>
                                    <td>Fuel</td>
                                    {entries.map((e,i)=>(<td key={i} className="text-center">{e.car ? e.car.fuelType : '-'}</td>))}
                                </tr>
                                <tr>
                                    <td>Transmission</td>
                                    {entries.map((e,i)=>(<td key={i} className="text-center">{e.car ? e.car.transmission : '-'}</td>))}
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    {entries.map((e,i)=>(<td key={i}>{e.car ? e.car.short_description : '-'}</td>))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from "react";


export default function AddModelYear() {

    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="content-area">
                        <main id="main" className="main-content">
                            <div className="tfcl-dashboard">
                                <div className="tfcl-add-listing car-details">
                                    <h3>Model Year details</h3>
                                    <div className="form-group">
                                        <label htmlFor="listing_title">Model Title *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="listing_title"
                                            placeholder="Enter title"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="group-button-submit">
                                        <button className="pre-btn">List Now</button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

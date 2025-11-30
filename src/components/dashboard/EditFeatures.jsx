import React from "react";

export default function EditFeatures() {
 
  return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="content-area">
                        <main id="main" className="main-content">
                            <div className="tfcl-dashboard">
                                <h1 className="admin-title mb-3">Edit Features</h1>
                                
                                <div className="tfcl-add-listing car-details">
                                    <h3>Car details</h3>
                                    <div className="form-group">
                                        <label htmlFor="listing_title">Listing Title *</label>
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
                                    <button className="second-btn">Save &amp; Preview</button>
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

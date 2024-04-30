import React, { useState } from 'react';
import DemoCarousel from "../../Components/Carousel/Carousel";
import styles from './FindDonor.module.css';
import Data from '../../assets/data';

const FindDonor = () => {
    const [state, setState] = useState();
    const [district, setDistrict] = useState();
    const [bloodGroup, setBloodGroup] = useState();
    const userID = localStorage.getItem('userID');
    const userType = localStorage.getItem('userType');
    const [donors, setDonors] = useState([]);
    const [bloodBanks, setBloodBanks] = useState([]);
    const [showDonorsTable, setShowDonorsTable] = useState(false);
    const [showBloodBanksTable, setShowBloodBanksTable] = useState(false);

    if (userType !== 'user') {
        window.location.href = '/'; // Redirect to home page
        return null; // Return null to prevent rendering the rest of the component
    }

    const availableDistrict = Data.states.find((item) => item.state === state);

    const handleStateChange = (e) => {
        setState(e.target.value);
    }

    const handleDistrictChange = (e) => {
        setDistrict(e.target.value);
    }

    const handleBloodGroupChange = (e) => {
        setBloodGroup(e.target.value);
    }

    const handleDonorsResponse = (response) => {
        setDonors(response);
    };

    const handleDonorSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user/find-donors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    state,
                    district,
                    bloodGroup,
                }),
            });
            if (response.status === 200) {
                const data = await response.json();
                handleDonorsResponse(data.data);
                setShowDonorsTable(true);
                setShowBloodBanksTable(false);

            } else {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            console.error(error);
            alert('Search Request Failed');
        }
    };

    const handleBloodBankSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user/find-blood-banks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    state,
                    district,
                    bloodGroup
                }),
            });
            if (response.status === 200) {
                const data = await response.json();
                setBloodBanks(data.data);
                setShowDonorsTable(false);
                setShowBloodBanksTable(true);

            } else {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            console.error(error);
            alert('Search Request Failed');
        }
    };

    return (
        <>
            <div className={styles.body}>
                <div className={styles.carousel}>
                    <DemoCarousel />
                </div>
                <div className={styles.search}>
                    <form className={styles.donorsForm}>
                        <h1>SEARCH BLOOD STOCK</h1>
                        <div>
                            <select id="state" name="state" onChange={handleStateChange}>
                                <option value="">Select State</option>
                                {Data.states.map((value, key) => {
                                    return (
                                        <option key={key} value={value.state}>{value.state}</option>
                                    )
                                })}
                            </select>

                            <select id="district" name="district" onChange={handleDistrictChange}>
                                <option value="">Select District</option>
                                {availableDistrict && availableDistrict.districts.map((value, key) => {
                                    return (
                                        <option key={key} value={value}>{value}</option>
                                    )
                                })}
                            </select>

                            <select id="bloodGroup" name="bloodGroup" onChange={handleBloodGroupChange}>
                                <option value="">Select Blood Group</option>
                                {Data.bloodGroups.map((value, key) => {
                                    return (
                                        <option key={key} value={value}>{value}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <button type="submit" onClick={handleDonorSearch}>Search Donors</button>
                            <button type="submit" onClick={handleBloodBankSearch}>Search Blood Banks</button>
                        </div>
                    </form>
                </div>
            </div>
            <div  className={styles.response}>
                {showDonorsTable ? (
                    <div className={styles.responseTable}>
                        {donors.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map over the donors array and render each donor */}
                                    {donors.map((donor, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{donor.FirstName + " " + donor.LastName}</td>
                                            <td>{donor.Mobile}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.message}>No donors available</p>
                        )}
                    </div>
                ) : null}
                {showBloodBanksTable ? (
                    <div className={styles.responseTable}>
                        {bloodBanks.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Available Units</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map over the bloodBanks array and render each blood bank */}
                                    {bloodBanks.map((bloodBank, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{bloodBank.Name}</td>
                                            <td>{bloodBank.email}</td>
                                            <td>{bloodBank[`${bloodGroup}`]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.message}>No blood banks available</p>
                        )}
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default FindDonor;

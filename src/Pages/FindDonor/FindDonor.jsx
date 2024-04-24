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
        // Assuming the response is an array of donor objects
        setDonors(response);
    };
    
    const handleDonorsSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/find-donors', {
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
                handleDonorsResponse(data);
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
                            return(
                                <option key={key} value={value.state}>{value.state}</option>
                            )
                        })
                        }
                    </select>

                    <select id="district" name="district" onChange={handleDistrictChange}>
                        <option value="">Select District</option>
                        {availableDistrict && availableDistrict.districts.map((value, key) => {
                            return(
                                <option key={key} value={value}>{value}</option>
                            )
                        
                        })
                    }
                    </select>
                    
                    <select id="bloodGroup" name="bloodGroup" onChange={handleBloodGroupChange}>
                        <option value="">Select Blood Group</option>
                        {
                            Data.bloodGroups.map((value, key) => {
                                return(
                                    <option key={key} value={value}>{value}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <button type="submit" onClick={handleDonorsSubmit}>Search Donors</button>
                    <button type="submit">Search Blood Banks</button>            
                </div>
            </form>
            </div>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over the donors array and render each donor */}
                    {donors.map((donor, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{donor.FirstName}</td>
                            <td>{donor.LastName}</td>
                            <td>{donor.Mobile}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default FindDonor;
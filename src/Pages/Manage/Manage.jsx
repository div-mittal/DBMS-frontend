import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
const Manage = () => {
    const userType = localStorage.getItem('userType');

    if (userType !== 'admin') {
        window.location.href = '/'; // Redirect to home page
        return null; // Return null to prevent rendering the rest of the component
    }

    return (
        <>
            <Helmet>
                <title>Blood Guardian | Manage Blood Bank</title>
            </Helmet>
            <div>
                <h1>Manage Blood Bank</h1>
            </div>
        </>
        
    );
}

export default Manage;
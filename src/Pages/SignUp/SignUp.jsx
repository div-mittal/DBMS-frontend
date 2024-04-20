const SignUp = () => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (loggedInEmail) {
        window.location.href = '/'; // Redirect to home page
        return null; // Return null to prevent rendering the rest of the component
    }
    return (
        <div>
        <h1>Sign Up</h1>
        </div>
    )
}

export default SignUp;
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return ( 
        <div className="not-found">
            <h2>Sorry the page you are looking for no more exists</h2>
            <Link to='/'>Click here to go back to the home page</Link>
            
        </div>
     );
}
 
export default ErrorPage;
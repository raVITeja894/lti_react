import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export { Home };

function Home() {
    const auth = useSelector(x => x.auth.value);
    return (
        <div>
            <h1>Hi {auth?.firstName}!</h1>
            
            <p><Link to="/users">Manage Events</Link></p>
        </div>
    );
}

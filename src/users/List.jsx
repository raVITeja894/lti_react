import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '_store';

export { List };

function List() {
    const users = useSelector(x => x.users.list);
    console.log("User",users)
    const sum=users?.value?.reduce((total, event) => {
       
        return total + (event.eventPrice? event.eventPrice:0);
      }, 0);
    console.log("SUMs",sum)
   
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);
    
    return (
        <div>
            <h1>Events</h1>
            <Link to="add" className="btn btn-sm btn-success mb-2">Add Event</Link>
            <p>Total Base Price of events are  :- <strong style={{fontWeight:'bold'}}>{sum}</strong></p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Event Name</th>
                        <th style={{ width: '20%' }}>Event Description</th>
                        <th style={{ width: '20%' }}>Event Price</th>
                        <th style={{ width: '20%' }}>Booking Type</th>
                        <th style={{ width: '20%' }}>Event Date</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.value?.slice(1).map(user =>
                        <tr key={user.id}>
                            <td>{user.eventName}</td>
                            <td>{user.eventDescription}</td>
                            <td>{user.eventPrice}</td>
                            <td>{user.bookingType}</td>
                            <td>{user.eventDate}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => dispatch(userActions.delete(user.id))} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {users?.loading &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

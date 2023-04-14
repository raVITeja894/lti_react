import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { userActions, alertActions } from '_store';

export { AddEdit };

function AddEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const user = useSelector(x => x.users?.item);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        eventName: Yup.string()
            .required('Event Name is required'),
        eventDescription: Yup.string()
            .required('Event Description is required'),
        username: Yup.string()
            .required('Username is required'),
        eventPrice:Yup.number()
            .required('Enter Number'),
        bookingType:Yup.string().required('Radio button is required').oneOf(['Premium','Normal']),
        acceptTerms:Yup.boolean().oneOf([true],'Checkbox is required'),
        eventDate: Yup.string()
            .required('Event Date is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Event must be a valid date in the format YYYY-MM-DD')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Edit Event');
            // fetch user details into redux state and 
            // populate form fields with reset()
            dispatch(userActions.getById(id)).unwrap()
                .then(user => reset(user));
        } else {
            setTitle('Add Event');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update user based on id param
            let message;
            if (id) {
                await dispatch(userActions.update({ id, data })).unwrap();
                message = 'Event updated';
            } else {
                await dispatch(userActions.register(data)).unwrap();
                message = 'Event added';
            }

            // redirect to user list with success message
            history.navigate('/users');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <>
            <h1>{title}</h1>
            {!(user?.loading || user?.error) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        {/* <div className="mb-3 col">
                            <label className="form-label">First Name</label>
                            <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div> */}
                        <div className="mb-3 col">
                            <label className="form-label">Event Name</label>
                            <input name="eventName" type="text" {...register('eventName')} className={`form-control ${errors.eventName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.eventName?.message}</div>
                        </div>
                       
                        <div className="mb-3 col">
                            <label className="form-label">Event Description</label>
                            <input name="eventDescription" type="text" {...register('eventDescription')} className={`form-control ${errors.eventDescription ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.eventDescription?.message}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">User Name</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Event Price</label>
                            <input name="eventPrice" type="number" {...register('eventPrice')} className={`form-control ${errors.eventPrice ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.eventPrice?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">
                                Event Date
                            </label>
                            <input name="eventDate" type="date" {...register('eventDate')} className={`form-control ${errors.eventDate ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.eventDate?.message}</div>
                        </div>
                     </div>
                     <div  >
                        
                            <p className="form-label">Booking Type</p>
                            <div style={{display:"flex",gap:'10px'}}>
                                <div style={{width:'20%'}}>
                                    <label htmlFor='Premium'><input  name="bookingType" type="radio"value ="Premium"  {...register('bookingType')} className={`form-check-input ${errors.bookingType ? 'is-invalid' : ''}`} />Premium</label>
                                </div>
                                <div >
                                    <label htmlFor='Normal'><input name="bookingType" type="radio"value ="Normal"  {...register('bookingType')} className={`form-check-input ${errors.bookingType ? 'is-invalid' : ''}`} />Normal</label>            
                                </div>
                             </div>
                            <div className="invalid-feedback">{errors.bookingType?.message}</div>
                         
                    </div>
                    <div style={{marginTop:'10px',marginBottom:'10px'}}>
                    <input name="acceptTerms" type="checkbox" {...register('acceptTerms')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                        <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                        <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/users" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            }
            {user?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {user?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading user: {user.error}</div>
                </div>
            }
        </>
    );
}

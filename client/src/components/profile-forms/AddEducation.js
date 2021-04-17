import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({addEducation,history}) => {

    const [currentCheck, toggleCurrent] = useState(false);
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        current: currentCheck,
        to: '',
        description: ''
    });

    

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description 
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, history);
    }

    return (
        <Fragment>
             <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p class="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* School or Bootcamp"
                    name="school"
                    value={school}
                    onChange={e => onChange(e)}
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* Degree or Certificate"
                    name="degree"
                        value={degree}
                    onChange={e => onChange(e)}
                />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy"
                    value={fieldofstudy}
                    onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                    <input type="date" name="from"
                    value={from}
                    onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <p>
                        <input type="checkbox" name="current" checked={currentCheck}
                        value={currentCheck}
                    onChange={() => toggleCurrent(!currentCheck)}/> Current School or Bootcamp
                </p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                    <input type="date" name="to" disabled = {currentCheck}
                    value={to}
                    onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                        placeholder="Program Description"
                        value={description}
                    onChange={e => onChange(e)}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
        )
}

export default connect(null,{addEducation})(AddEducation);
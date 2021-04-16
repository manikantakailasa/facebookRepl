import React from 'react';
import { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Link }  from 'react-router-dom'


const Register = ({setAlert, register,isAuth}) => {

    const [formData, setfromData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const onChange = e => setfromData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('password does not match','danger');
        } else {
            register({ name, email, password });
        }
    }

    const { name, email, password, password2 } = formData;

    if (isAuth) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name"
                            value={name}
                            onChange={e => onChange(e)}
                             />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" 
                            value={email}
                            onChange={e => onChange(e)} />
                        <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
                        >
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                  
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={e => onChange(e)}
                        
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>

    );
}

const mapStateToProps = state => ({
    isAuth : state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert , register})(Register);
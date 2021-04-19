import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    
    let nav = <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            <ul>
                <li><Link to="/developers">Developers</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
    </nav>
    
    if (isAuthenticated) {
        nav= <nav class="navbar bg-dark">
      <h1>
        <Link to="/"><i class="fas fa-code"></i> DevConnector</Link>
      </h1>
      <ul>
        <li><Link to="/developers">Developers</Link></li>
        <li><Link to="/posts">Posts</Link></li>
        <li>
          |
          <Link to="/dashboard"><i class="fas fa-user"></i>{' '}
            <span class="hide-sm">Dashboard</span></Link>
        </li>
        <li>
          <Link to="#!" title="Logout">
            <i class="fas fa-sign-out-alt"></i>{' '}
            <span class="hide-sm" onClick={logout} >Logout</span></Link>
        </li>
      </ul>
    </nav>
    }

    return (
        !loading && nav
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{logout})(Navbar);
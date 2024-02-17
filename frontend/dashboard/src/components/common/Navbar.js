import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from '../../hooks/useLogout';

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    {user ? `${user.role} Dashboard` : 'Dashboard'}
                </NavLink>
                <button
                    className="navbar-toggler collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mobileMenu"
                    aria-controls="mobileMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mobileMenu">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {user && user.role === "Admin" && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/cruds/new">Add User</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/cruds">Crimes</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/users">Users</NavLink>
                                </li>
                            </>
                        )}

                        {user && (user.role == "Officer" || user.role == "Admin") && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/officer">Officers' Submission</NavLink>
                            </li>
                        )}

                        {!user ? (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-outline-success" onClick={handleClick}>Log out</button>
                            </li>
                        )}
                    </ul>
                </div>
                {user && (
                    <div className="navbar-text">
                        <p>{user.email}</p>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

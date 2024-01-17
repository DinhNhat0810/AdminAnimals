import { Redirect, Route, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ user, children, path }) => {
    if (!user && path === '/auth') {
        return children;
    }

    if (user && path === '/auth') {
        return <Redirect extract to="/admin/default" />;
    }

    if (!user && path === '/') {
        return children;
    }

    if (!user) {
        return <Redirect extract to="/auth/sign-in" />;
    }

    return children;
};
export default ProtectedRoute;

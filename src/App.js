import { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import RtlLayout from 'layouts/rtl';
import routes from 'routes';
import ProtectedRoute from 'components/ProtectedRoute';

function App() {
    const user = false;

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {!user ? <Redirect to="/auth/sign-in" /> : <Redirect to="/admin/default" />}
                </Route>

                {routes.map((route, index) => {
                    let Layout = AuthLayout;
                    if (route.layout === '/admin') {
                        Layout = AdminLayout;
                    } else if (route.layout === '/rtl') {
                        Layout = RtlLayout;
                    }

                    const Page = route.component;

                    return (
                        <Route
                            key={index}
                            path={route.layout}
                            component={() => (
                                <ProtectedRoute user={user} path={route.layout}>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </ProtectedRoute>
                            )}
                        />
                    );
                })}

                {/* <ProtectedRoute key={index} user={false} path={route.layout + route?.path}>
                  <Layout></Layout>
              
                </ProtectedRoute> */}

                {/* <Route path={`/admin`} component={AdminLayout} /> */}
                {/* <Route path={`/rtl`} component={RtlLayout} /> */}
            </Switch>
        </BrowserRouter>
    );
}

export default App;

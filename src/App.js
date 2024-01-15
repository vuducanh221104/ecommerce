import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/Layout';
import { Fragment } from 'react';
import ScrollToTop from './components/ScrollToTop';
import { LoginProvider as MyLoginProvider } from './components/LoginProvider/LoginProvider';
import Auth from './services/Auth/Auth';
import { QuantityProductCartProvider } from '~/Context/CartContext/CartContext';
function App() {
    return (
        <Router>
            <QuantityProductCartProvider>
                <Auth>
                    <div className="App">
                        <ScrollToTop />
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                let Layout = DefaultLayout;

                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }

                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                            {/* <Route path="*" element={<Navigate to="/" />} /> */}
                        </Routes>
                    </div>
                </Auth>
            </QuantityProductCartProvider>
        </Router>
    );
}

export default App;

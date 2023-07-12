import config from '~/config';
// Layouts
import { HeaderOnly } from '~/Layout';

import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import SlugContent from '~/pages/SlugContent';
import Slug from '~/pages/Slug';
// Public Routes
const publicRoutes = [
    { path: config.routes.product, component: Slug },
    { path: config.routes.contentProduct, component: SlugContent },
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

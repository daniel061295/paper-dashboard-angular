import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { dataResolverService } from 'app/pages/dashboard/resolvers/data.resolver.service';
import { AuthGuard } from 'app/guards/auth.guard';


export const AdminLayoutRoutes: Routes = [
    // { path: 'dashboard',      component: DashboardComponent, resolve:{dataResolver : dataResolverService}},
    { path: 'dashboard',      component: DashboardComponent, resolve:{dataResolver : dataResolverService}, canActivate: [AuthGuard] },
    // { path: 'user',           component: UserComponent },
    // { path: 'table',          component: TableComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    // { path: 'login',          component: LoginPageComponent}
];

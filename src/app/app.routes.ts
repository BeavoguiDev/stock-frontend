import { Routes } from '@angular/router';
import { PageInscription } from './components/page-inscription/page-inscription';
import { PageLogin } from './components/page-login/page-login';
import { AuthGuard } from './auth-guard';
import { InventoryPage } from './components/inventory-page/inventory-page';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Dashboard } from './components/dashboard/dashboard';
import { ManageStore } from './components/manage-store/manage-store';
import { Orders } from './components/orders/orders';
import { Settings } from './components/settings/settings';
import { Suppliers } from './components/suppliers/suppliers';



export const routes: Routes = [
    //{ path: 'Acceuil', component: PageAccueil, canActivate: [AuthGuard] },
    {path:'login',component:PageLogin},
    {path:'register',component:PageInscription},
    {
        path:'',
        component:MainLayout,
        canActivate: [AuthGuard],
        children:[
            {path:'',redirectTo:'inventory',pathMatch:'full'},
            {path:'inventory',component:InventoryPage},
            {path:'dashboard',component:Dashboard},
             {path:'store',component:ManageStore},
             {path:'orders',component:Orders},
            // {path:'reports',component:Report},
             {path:'settings',component:Settings},
             {path:'suppliers',component:Suppliers}
        ]
    },
    {path:'**',redirectTo:'login'}
];

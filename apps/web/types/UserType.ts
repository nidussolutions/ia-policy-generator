import {PlanType} from './PlanType';
import {SiteType} from './SitesType';

export type UserType = {
    id?: string;
    name: string;
    email: string;
    password?: string;
    lastLogin: string;
    plan?: PlanType;
    sites?: SiteType[];
};
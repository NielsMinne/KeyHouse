import Property from "../Property/Property.entity";
import User from "../User/User.entity";

export interface FavoriteBody {
    userId:number;
    user?:User;
    propertyId:number;
    property?:Property;
}

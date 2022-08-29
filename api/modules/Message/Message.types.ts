import Property from "../Property/Property.entity";
import User from "../User/User.entity";

export interface MessageBody {
    name: string;
    description: string;
    time: number;
    date: string;
    projectId: number;
    property?: Property;
    userId: number;
    user?: User;
}

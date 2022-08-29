import Agency from "../Agency/Agency.entity";
import Category from "../Categories/Categories.entity";

export interface PropertyBody {
    name: string;
    address: string;
    city: string;
    price: number;
    rooms: number;
    bathrooms: number;
    year: string;
    square: number;
    avatar?: string | null;
    agencyId: number;
    agency?: Agency;
    categoryId: number;
    category?: Category;
}

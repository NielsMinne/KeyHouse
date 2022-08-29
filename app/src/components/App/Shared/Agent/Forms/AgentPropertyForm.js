import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";

import GenericSelect from "../../Generic/Select/GenericSelect";
import FileInput from "../../../../Design/Form/FileInput";
import CategorySelect from "../../Categories/Select/CategorySelect";
import { useOutletContext } from "react-router-dom";

const saleOrRent = [
    { name: "Sale", id: "SALE" },
    { name: "Rent", id: "RENT" },
];

const schema = yup.object().shape({
    name: yup.string().required(),
    agencyId: yup.number().nullable().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    price: yup.number().required(),
    year: yup.string().required(),
    saleOrRent: yup.string().required(),
    rooms: yup.number().required(),
    bathrooms: yup.number().required(),
    square: yup.number().required(),
    categoryId: yup.string().required(),
});

const transformInitialData = (initialData) => {
    if (initialData.agency) {
        initialData = {
            ...initialData,
            agencyId: initialData.agency.id,
        };
    }
    return initialData;
};

const AgentPropertyForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const { user } = useOutletContext();
    const { t } = useTranslation();
    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        name: "",
        address: "",
        city: "",
        price: "",
        year: "",
        saleOrRent: "",
        rooms: "",
        bathrooms: "",
        square: "",
        soldOrAvailable: "AVAILABLE",
        agencyId: user.agency.id,
        categoryId: "",
        ...transformInitialData(initialData),
    });

    const handleData = (values) => {
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit(handleData)} noValidate={true}>
            <FormGroup>
                <Label htmlFor="name">{t("fields.name")}</Label>
                <Input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="avatar">{t("fields.avatar")}</Label>
                <FileInput
                    name="avatar"
                    value={values.avatar}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.avatar}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="categoryId">{t("fields.category")}</Label>
                <CategorySelect
                    name="categoryId"
                    value={values.categoryId}
                    onChange={handleChange}
                    error={errors.categoryId}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="address">{t("fields.address")}</Label>
                <Input
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    error={errors.address}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="city">{t("fields.city")}</Label>
                <Input
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    error={errors.city}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price">{t("fields.price")}</Label>
                <Input
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    error={errors.price}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="year">{t("fields.year")}</Label>
                <Input
                    name="year"
                    value={values.year}
                    onChange={handleChange}
                    error={errors.year}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="saleOrRent">{t("fields.saleOrRent")}</Label>
                <GenericSelect
                    name="saleOrRent"
                    value={values.saleOrRent}
                    onChange={handleChange}
                    error={errors.saleOrRent}
                    data={saleOrRent}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="rooms">{t("fields.rooms")}</Label>
                <Input
                    name="rooms"
                    value={values.rooms}
                    onChange={handleChange}
                    error={errors.rooms}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="bathrooms">{t("fields.bathrooms")}</Label>
                <Input
                    name="bathrooms"
                    value={values.bathrooms}
                    onChange={handleChange}
                    error={errors.bathrooms}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="square">{t("fields.square")}</Label>
                <Input
                    name="square"
                    value={values.square}
                    onChange={handleChange}
                    error={errors.square}
                />
            </FormGroup>

            <Button type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default AgentPropertyForm;

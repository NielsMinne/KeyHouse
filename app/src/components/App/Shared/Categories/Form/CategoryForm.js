import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";

// dynamic schema
const getSchema = (isUpdate) => {
    return yup.object().shape({
        name: yup.string().required(),
    });
};

const CategoryForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const { t } = useTranslation();
    const isUpdate = !!initialData.id;
    const { values, errors, handleChange, handleSubmit } = useForm(
        getSchema(isUpdate),
        {
            name: "",
            ...initialData,
        }
    );

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
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.name}
                />
            </FormGroup>
            <Button type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default CategoryForm;

import Button from "../../../../Design/Buttons/Button";
import FormGroup from "../../../../Design/Form/FormGroup";
import Input from "../../../../Design/Form/Input";
import Label from "../../../../Design/Form/Label";
import * as yup from "yup";
import useForm from "../../../../../core/hooks/useForm";
import { useTranslation } from "react-i18next";
import PasswordInput from "../../../../Design/Form/PasswordInput";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

// dynamic schema
const getSchema = (isUpdate) => {
    return yup.object().shape({
        name: yup.string().required(),
        surname: yup.string().required(),
        email: yup.string().email().required(),
        password: isUpdate ? yup.string() : yup.string().required(),
        role: yup.string().required(),
        agencyId: yup.number().nullable().required(),
    });
};

const transformValues = (values) => {
    // don't send password if it's empty
    if (values.password.length === 0) {
        const { password, ...rest } = values; // or use "delete" keyword
        values = rest;
    }
    return values;
};

const AgentUserForm = ({ initialData = {}, disabled, onSubmit, label }) => {
    const [password, setPassword] = useState("");
    const { user } = useOutletContext();
    const { t } = useTranslation();
    const isUpdate = !!initialData.id;

    const { values, errors, handleChange, handleSubmit } = useForm(
        getSchema(isUpdate),
        {
            name: "",
            surname: "",
            email: "",
            password: "",
            role: "AGENT",
            agencyId: user.agency.id,
            ...initialData,
        }
    );

    const handleData = (values) => {
        onSubmit(transformValues(values));
    };

    const handleClick = () => {
        const randomPassword =
            Math.random().toString(36).slice(2) +
            Math.random().toString(36).slice(2);
        setPassword(randomPassword);
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
            <FormGroup>
                <Label htmlFor="surname">{t("fields.surname")}</Label>
                <Input
                    name="surname"
                    value={values.surname}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.surname}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">{t("fields.email")}</Label>
                <Input
                    name="email"
                    value={values.email}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.email}
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">{t("fields.password")}</Label>
                <PasswordInput
                    name="password"
                    value={password}
                    disabled={disabled}
                    onChange={handleChange}
                    error={errors.password}
                />
                {isUpdate && (
                    <p className="text-muted">
                        {t("users.edit.password_print")}
                    </p>
                )}
                <Button onClick={handleClick}>{t('generatePassword')}</Button>
            </FormGroup>
            <Button type="submit" disabled={disabled}>
                {label}
            </Button>
        </form>
    );
};

export default AgentUserForm;

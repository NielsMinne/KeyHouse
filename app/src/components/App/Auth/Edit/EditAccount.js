import useForm from "../../../../core/hooks/useForm";
import useMutation from "../../../../core/hooks/useMutation";
import Alert from "../../../Design/Alert";
import Button from "../../../Design/Buttons/Button";
import Container from "../../../Design/Container";
import FormGroup from "../../../Design/Form/FormGroup";
import Input from "../../../Design/Form/Input";
import Label from "../../../Design/Form/Label";
import { useAuthContext } from "../AuthProvider";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { GuestRoutes, route } from "../../../../core/routing";
import PasswordInput from "../../../Design/Form/PasswordInput";

const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const EditAccount = () => {
    const { auth } = useAuthContext();
    const { t } = useTranslation();
    const { isLoading, error, mutate } = useMutation();
    const navigate = useNavigate();

    const defaultData = {
        email: auth.user.email,
        password: "",
        name: auth.user.name,
        surname: auth.user.surname,
    };

    const { values, errors, handleChange, handleSubmit } = useForm(schema, {
        ...defaultData,
    });

    const handleData = (values) => {
        mutate(`${process.env.REACT_APP_API_URL}/user/${auth.user.id}`, {
            method: "PATCH",
            data: values,
            onSuccess: () => {
                navigate(route(GuestRoutes.Home));
            },
        });
    };

    return (
        <Container>
            <h1>{t("navigation.edit")}</h1>
            <form onSubmit={handleSubmit(handleData)} noValidate={true}>
                {error && <Alert color="danger">{error}</Alert>}
                <FormGroup>
                    <Label htmlFor="name">{t("fields.name")}</Label>
                    <Input
                        name="name"
                        value={values.name}
                        error={errors.name}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="surname">{t("fields.surname")}</Label>
                    <Input
                        name="surname"
                        value={values.surname}
                        error={errors.surname}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">{t("fields.email")}</Label>
                    <Input
                        name="email"
                        value={values.email}
                        error={errors.email}
                        disabled={isLoading}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">{t("fields.password")}</Label>
                    <PasswordInput
                        name="password"
                        value={values.password}
                        disabled={isLoading}
                        onChange={handleChange}
                        error={errors.password}
                    />
                </FormGroup>
                <Button type="submit" disabled={isLoading}>
                    {t("onboarding.register.button")}
                </Button>
            </form>
        </Container>
    );
};

export default EditAccount;

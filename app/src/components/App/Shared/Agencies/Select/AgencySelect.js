import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const AgencySelect = (props) => {
    const { data: agencies } = useFetch("/agencies");

    const options = agencies
        ? agencies.map((c) => ({ value: c.id, label: c.name }))
        : null;

    return <Select options={options} {...props} />;
};

export default AgencySelect;

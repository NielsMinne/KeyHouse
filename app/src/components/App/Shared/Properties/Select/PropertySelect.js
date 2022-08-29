import useFetch from "../../../../../core/hooks/useFetch";
import Select from "../../../../Design/Form/Select";

const PropertySelect = (props) => {
    const { data: properties } = useFetch("/properties");

    const options = properties
        ? properties.map((p) => ({ value: p.id, label: p.name }))
        : null;

    return <Select options={options} {...props} />;
};

export default PropertySelect;

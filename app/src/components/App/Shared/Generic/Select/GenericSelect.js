import Select from "../../../../Design/Form/Select";

const GenericSelect = (props) => {
    const options = props.data
        ? props.data.map((p) => ({ value: p.id, label: p.name }))
        : null;

    return <Select options={options} {...props} />;
};

export default GenericSelect;

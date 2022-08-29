import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    formatMinutesToString,
    parseStringToMinutes,
} from "../../../../../core/modules/messages/utils";
import Input from "../../../../Design/Form/Input";

const MessageTimeInput = ({ value, name, onChange, ...rest }) => {
    const [time, setTime] = useState(value ? formatMinutesToString(value) : "");

    const handleBlur = (e) => {
        onChange({
            target: {
                value: parseStringToMinutes(e.target.value),
                name,
            },
        });
    };

    useEffect(() => {
        setTime(formatMinutesToString(value));
    }, [value]);

    return (
        <Input
            onBlur={handleBlur}
            value={time}
            name={name}
            onChange={(e) => setTime(e.target.value)}
            {...rest}
        />
    );
};

MessageTimeInput.propTypes = {
    ...Input.propTypes,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MessageTimeInput;

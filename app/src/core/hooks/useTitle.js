import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | Keyhouse`;
    }, [title]);
};

export default useTitle;

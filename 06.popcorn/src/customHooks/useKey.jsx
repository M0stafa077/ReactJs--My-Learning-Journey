import { useEffect } from "react";

export function useKey(key, listener) {
    useEffect(() => {
        function callback(e) {
            if (
                key.toLowerCase() === e.code.toLowerCase() ||
                key.toLowerCase() === e.key.toLowerCase()
            ) {
                e.preventDefault();
                listener();
            }
        }
        document.addEventListener("keydown", callback);
        return () => document.removeEventListener("keydown", callback);
    }, [key, listener]);
}

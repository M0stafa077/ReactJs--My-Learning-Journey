import { Link } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonTypes {
    PRIMARY = "primary",
    SMALL = "small",
}

function Button({
    children,
    disabled = false,
    to,
    type = ButtonTypes.PRIMARY,
}: {
    children: any;
    disabled?: boolean;
    to?: string;
    type?: ButtonTypes;
}) {
    const base =
        "inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wider text-stone-800 text-sm transition-colors duration-300 hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed px-4 ";
    const styles = {
        primary: base + "py-3 md:px-6 md:py-4",
        small: base + "py-2 md:px-5 md:py-2.5 text-xs",
    };
    if (to)
        return (
            <Link className={styles[type]} to={to}>
                {children}
            </Link>
        );
    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    );
}

export default Button;

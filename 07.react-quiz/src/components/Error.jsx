function Error() {
    function reloadPage() {
        window.location.reload();
    }
    return (
        <>
            <p className="error">
                <span>💥</span> There was an error fecthing questions.
            </p>
            <button
                className="btn"
                style={{ marginTop: "25px" }}
                onClick={reloadPage}
            >
                Reload ⟳
            </button>
        </>
    );
}

export default Error;

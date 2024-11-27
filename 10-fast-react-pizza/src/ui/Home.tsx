import CreateUser from "../features/user/CreateUser";
function Home() {
    return (
        <div className="my-10 px-4 text-center sm:py-16">
            <h1 className="mb-8 px-3 text-xl font-semibold md:px-1 md:text-3xl lg:px-0">
                The best pizza.
                <br />
                <span className="text-yellow-500">
                    Straight out of the oven, straight to you.
                </span>
            </h1>
            <CreateUser />
        </div>
    );
}

export default Home;

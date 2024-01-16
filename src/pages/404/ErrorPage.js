import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

function ErrorPage() {

    let navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                <h1 className="font-bold text-[#703cf0] text-9xl">404</h1>
                <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                    <span className="text-red-500">Oops!</span> Page Not Found
                </p>
                <p className="mb-8 text-center text-gray-500 md:text-lg">
                    The page you’re looking for doesn’t exist.
                </p>
                <Button
                            size="small"
                            type="primary"
                            text="Return home"
                            isAsync={false}
                            onPress={() => {
                                navigate("/");
                            }}
                        />
                <div className="mt-4 w-32 h-32">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/humanview-d6bc8.appspot.com/o/assets%2Flogo.png?alt=media&token=dc30d2ee-0511-40e7-9acb-6fda054dec56"
                        alt="img"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </>
    );
}

export default ErrorPage;
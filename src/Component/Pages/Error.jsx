
import lerror from "../../assets/error.json"
import Lottie from 'lottie-react';
const Error = () => {
    return (
        <div className="w-full bg-newT min-h-screen flex justify-center items-center ">
            <div className="container center w-[50%] h-full">

            <Lottie animationData={lerror} loop={true} ></Lottie>
            </div>
  
        </div>
    );
};

export default Error;
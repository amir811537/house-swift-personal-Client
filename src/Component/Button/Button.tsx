import React from "react";

type ButtonNameProp = {
    children : React.ReactNode
}

const Button = ({children} : ButtonNameProp) => {
    return (
        <div className="uppercase w-fit border border-[#09BE51] bg-[#09BE51] hover:bg-transparent text-white py-1 text-lg px-6 md:ml-8 hover:border hover:border-[#09BE51] hover:text-[#09BE51] duration-300 cursor-pointer">
            {children}
        </div>
    );
};

export default Button;
import { useParams } from "react-router-dom";

const PaymentFail = () => {
    const { tranId } = useParams();



    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg">
            <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <h2 className="text-3xl font-semibold text-center text-red-500 mt-4 mb-2">Payment Failed!</h2>
            <p className="text-gray-700 text-lg text-center">Sorry, your payment failed this ID {tranId}.</p>
        </div>
    </div>
    );
};

export default PaymentFail;
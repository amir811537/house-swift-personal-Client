import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
    const { tranId } = useParams();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg">
                <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="text-3xl font-semibold text-center text-green-500 mt-4 mb-2">Payment Successful!</h2>
                <p className="text-gray-700 text-lg text-center">Your payment with transaction ID {tranId} has been successfully processed.</p>
            </div>
        </div>
    );
};

export default PaymentSuccess;

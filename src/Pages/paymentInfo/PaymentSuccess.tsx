import { useParams } from "react-router-dom";

const PaymentSuccess = () => {

const {tranId}=useParams();


    return (
        <div>
            your payment successful {tranId}
        </div>
    );
};

export default PaymentSuccess;
import React,{useState} from "react";
import Img from"./image/jobform_automator_logo.jpg"
import "./styles.css"


const Payment = function () {
    const [coupon, setCoupon] = useState("");
    const coupon_code = "AIKING50"
    let amount = "80000";
    const currency = "INR";
    const receiptId = "qwsaq1";

    const paymentHandler = async (e) => {
        
        e.preventDefault();
        if(coupon===coupon_code){
            amount = amount-10000
        
        }
        const response = await fetch("http://localhost:5000/order", {
            method: "POST",
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const order = await response.json();
        console.log(order);

        var options = {
            key: "rzp_test_fuInk3cztCaRqm", // Enter the Key ID generated from the Dashboard
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            name: "JobForm Automator", //your business name
            description: "Subscription",
            image: Img,
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                const body = {
                    ...response,
                };

                const validateRes = await fetch(
                    "http://localhost:5000/order/validate",
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const jsonRes = await validateRes.json();
                console.log(jsonRes);
            },
            prefill: {
                //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                name: "", //your customer's name
                email: "",
                contact: "8768814455", //Provide the customer's phone number for better conversion rates
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    };

    return (
        <div className="product">
            {/* <h2>Tshirt</h2>
        <p>Solid blue cotton Tshirt</p>
        <img src={TshirtImg} />
        <br /> */}
            {/* <h5>Subscription</h5>
            <img src={Img} alt="jobform-automator" />

            <button type="button"  onClick={paymentHandler}>Pay</button> */}
            <form onSubmit={paymentHandler} >
                <input type="text" placeholder="Enter Coupon"  onChange={(e) => setCoupon(e.target.value)} />
                
                <button type="submit">Pay</button>
            </form>
        </div>
    );
}

export default Payment;
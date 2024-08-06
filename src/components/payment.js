import React, { useState } from "react";
import Img from "./image/jobform_automator_logo.jpg"
import "./styles.css"
import rupay from "./image/rupay.svg";
// import am from "./image/amex.svg";
import mastercard from "./image/mastercard.svg"
import upi from "./image/upi.svg";
import visa from "./image/visa.svg"


const Payment = function () {
    const [currency, setCurrency] = useState('INR');
    const [amount, setAmount] = useState(currency === 'INR' ? 999 : 20);
    const [promocode, setPromocode] = useState('');
    const [discount, setDiscount] = useState(0);
    // console.log(window.location)
    const [coupon, setCoupon] = useState("");
    const coupon_code = "AIKING50"
    // let amount = "80000";
    // const currency = "INR";
    const receiptId = "qwsaq1";
    const handlePayment = async (e) => {
        e.preventDefault();
        // const isScriptLoaded = await loadRazorpayScript();
        // if (!isScriptLoaded) {
        //     alert('Razorpay SDK failed to load. Are you online?');
        //     return;
        // }

        const finalAmount = (amount - discount)*100;
        

        // const orderResponse = await axios.post('http://localhost:3000/create-order', {
        //     amount: finalAmount,
        //     currency,
        // });
        const response = await fetch("http://localhost:5000/order", {
            method: "POST",
            body: JSON.stringify({
                amount:finalAmount,
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
    }
    const applyPromocode = async (e) => {
        // const promoRef = firebase.database().ref('promocodes').child(promocode);
        // const snapshot = await promoRef.once('value');
        // const promoData = snapshot.val();
        console.log(promocode)
        const promoData = {
            "discount": 100,
            "active": true
        }
        if (promoData && promoData.active) {
            setDiscount(promoData.discount);
        } else {
            alert('Invalid or inactive promocode');
        }
    };

    // const paymentHandler = async (e) => {

    //     e.preventDefault();
    //     if (coupon === coupon_code) {
    //         amount = amount - 10000

    //     }
    //     const response = await fetch("http://localhost:5000/order", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             amount,
    //             currency,
    //             receipt: receiptId,
    //         }),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     const order = await response.json();
    //     console.log(order);

    //     var options = {
    //         key: "rzp_test_fuInk3cztCaRqm", // Enter the Key ID generated from the Dashboard
    //         amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         currency,
    //         name: "JobForm Automator", //your business name
    //         description: "Subscription",
    //         image: Img,
    //         order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         handler: async function (response) {
    //             const body = {
    //                 ...response,
    //             };

    //             const validateRes = await fetch(
    //                 "http://localhost:5000/order/validate",
    //                 {
    //                     method: "POST",
    //                     body: JSON.stringify(body),
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                 }
    //             );
    //             const jsonRes = await validateRes.json();
    //             console.log(jsonRes);
    //         },
    //         prefill: {
    //             //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
    //             name: "", //your customer's name
    //             email: "",
    //             contact: "8768814455", //Provide the customer's phone number for better conversion rates
    //         },
    //         notes: {
    //             address: "Razorpay Corporate Office",
    //         },
    //         theme: {
    //             color: "#3399cc",
    //         },
    //     };
    //     var rzp1 = new window.Razorpay(options);
    //     rzp1.on("payment.failed", function (response) {
    //         alert(response.error.code);
    //         alert(response.error.description);
    //         alert(response.error.source);
    //         alert(response.error.step);
    //         alert(response.error.reason);
    //         alert(response.error.metadata.order_id);
    //         alert(response.error.metadata.payment_id);
    //     });
    //     rzp1.open();
    //     e.preventDefault();
    // };

    return (
        <div>
            <h1>Razorpay Payment Integration</h1>
            <div>
                <label>
                    Currency:
                    <select value={currency} onChange={(e) => {
                        setCurrency(e.target.value);
                        setAmount(e.target.value === 'INR' ? 999 : 20);
                    }}>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Amount: {currency === 'INR' ? '₹' : '$'} {amount - discount}
                </label>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Promocode"
                    value={promocode}
                    onChange={(e) => setPromocode(e.target.value)}
                />
                <button onClick={applyPromocode}>Apply Promocode</button>
            </div>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
}

export default Payment;
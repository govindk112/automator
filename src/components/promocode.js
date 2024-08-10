import React, { useState } from "react";
import app from "./firebase";
import { ref, set, getDatabase } from "firebase/database";
import { toast } from "react-toastify";



const Promocode = function () {
    let ODE1 = {
        "discount_type": "percentage",
        "discount_value": 10,
        "expiration_date": "2024-12-31T23:59:59Z"
    }
    const [promocode, setPromocode] = useState("")
    const [discount_type, setDiscount_type] = useState("");
    const [discount_value, setDiscount_value] = useState(0);
    // count[expiration_date,setExpiration_date] = useState()
    let db = getDatabase(app)
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("Hii")
        const newDocRef = ref(db, "promo_codes/" + promocode);
        set(newDocRef, {
            discount_type: discount_type,
            discount_value: Number(discount_value)

        }).then(() => {
            toast.success("promocode add successfully")
        }).catch((err) => {
            toast.error(err)
        })





    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input type="text" onChange={(e) => setPromocode(e.target.value)} required />
                <input type="text" onChange={(e) => setDiscount_type(e.target.value)} required />
                <input type="number" onChange={(e) => setDiscount_value(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}
export default Promocode;
import React from "react";


const GetId = function (){
    const getReferralCodeFromCookie = () => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('referral='));
        console.log( cookie ? cookie.split('=')[1] : null);
      };
      getReferralCodeFromCookie()
      return(
        <div>
            GetId
        </div>
      )
      
}
export default GetId;
export function useMaisValiaTaxExemptionPercentage(sellValue, paidLoanAmount, invesmentValue = null){

    let exemptionPercentage = 0;
    let finalSellValue = 0;

    /*
        If the mais valia is to be reinvested in another HPP (first house) then the exemption percentage is calculated based on the reinvestment value
        The formula is as follows:
        Value that the house was sold for - What was paid for the loan
        Investment Value
        
        Investment Value = V2
        Final Sell Value = V1 (Value that the house was sold for - What was paid for the loan)
        Then we need to get a percentage change from the value that was reinvested to the final sell value
        Exemption Percentage = 100 - (|V2 - V1| / V1) * 100
        The 100 - is because for some reason i'm calculating it the other way around
    */
    if(invesmentValue !== null && invesmentValue > 0){
        finalSellValue = sellValue - paidLoanAmount;
        if(invesmentValue > finalSellValue){
            return 101;
        }
        let percentageDifference = Math.abs((invesmentValue - finalSellValue) / finalSellValue * 100);
        exemptionPercentage = (100 - percentageDifference).toFixed(2);
        return exemptionPercentage;
    }

    /*
        If the mais valia is not to be reinvested then the exemption percentage is calculated based on the sell value
        The formula is as follows:
        Value that the house was sold for
        Amount Paid for the house

        Amount Paid for the house = V2
        Final Sell Value = V1
        Then we need to get a percentage change from the value that was already paid for the house
        Exemption Percentage = 100 - (|V2 - V1| / V1) * 100
    */
    exemptionPercentage = (100 - Math.abs(((paidLoanAmount -  sellValue) / sellValue) * 100)).toFixed(2);
    
    return exemptionPercentage;
    
}
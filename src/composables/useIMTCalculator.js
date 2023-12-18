import { IMTTableContinental, IMTTableIslands } from "../utils/IMTTables";

export function useIMTCalculator(location, purpose, amount){
    let IMTTable = location === 'portugal' ? IMTTableContinental : IMTTableIslands;
    let table = IMTTable.purpose[purpose];

    let result = {
        'percentage': null,
        'discount': null,
        'total': null,
    };

    if( Array.isArray(IMTTable.purpose[purpose]) === true){
        for(let i = 0; i < table.length; i++){
            let range = table[i].range;
            if(amount >= range[0] && amount < range[1]){
                result.percentage = table[i].percentage;
                result.discount = (table[i].discount !== null) ? table[i].discount : 0;
                break;
            }
        }
    }else{
        result.percentage = table.percentage;
        result.discount = 0;
    }

    function calculateStampTax(amount){
        return amount * (0.8 / 100);
    }

    function calculateFinalIMT(){
        let IMTValue = (amount * (result.percentage / 100)) - result.discount;
        let stampTax = calculateStampTax(amount);
        let total = IMTValue + stampTax;
        //add validation for exemption
        return {
            'percentage': result.percentage,
            'IMTValue': IMTValue,
            'stampTax': stampTax,
            'total': total
        };
    }

    return calculateFinalIMT();
}
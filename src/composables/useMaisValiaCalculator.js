import { currencyDevaluationPortugal } from "@/utils/currencyDevaluationBP";
import { differenceInCalendarYears } from "date-fns";

export function useMaisValiaCalculator(purchaseValues, sellValues, extraSpendings){

    const purchaseDate = new Date(purchaseValues.houseYear, purchaseValues.houseMonth - 1, 1);

    const sellDate = new Date(sellValues.houseYear, sellValues.houseMonth - 1, 1);

    const yearDifference = differenceInCalendarYears(sellDate, purchaseDate);

    let purchaseValue = purchaseValues.houseCost;

    let purchaseValueDevaluation = purchaseValues.houseCost;

    let currentDevaluationPurchaseYear = currencyDevaluationPortugal[purchaseValues.houseYear] || null;

    if(currentDevaluationPurchaseYear !== null){
        purchaseValue = purchaseValue * currentDevaluationPurchaseYear;
        purchaseValueDevaluation = purchaseValue;
    }

    let totalProfit = sellValues.houseCost - purchaseValue;

    if(extraSpendings > 0){
        totalProfit = totalProfit - extraSpendings;
    }

    return {
        'totalProfit': totalProfit,
        'currentDevaluationApplied': currentDevaluationPurchaseYear,
        'purchaseCost': purchaseValues.houseCost,
        'updatedPurchaseCost': purchaseValueDevaluation,
        'sellValue': sellValues.houseCost,
        'extraSpendings': extraSpendings,
    }
    
}
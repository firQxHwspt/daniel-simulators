import { useIRSTable } from "./useIRSTable";

export function useMaisValiaTaxCalculator(
    maisValiaValue,
    incomeValue,
    isCouple = false
){

    //already comes pre-calculated
    let taxableMaisValia = maisValiaValue;

    let totalIncome = taxableMaisValia + incomeValue;
    let originalTotalIncome = totalIncome;

    if (isCouple === true) {
        totalIncome = totalIncome / 2;
    }

    const incomeTaxBracketMaisValia = useIRSTable(totalIncome);
    const totalDeductionMaisValia = incomeTaxBracketMaisValia.deduction;
    let totalIRS = totalIncome * (incomeTaxBracketMaisValia.marginalRate / 100) - totalDeductionMaisValia;

    if(isCouple === true){
        totalIRS = totalIRS * 2;
    }

    const incomeTaxBracketBase = useIRSTable(incomeValue);
    const totalDeductionBase = incomeTaxBracketBase.deduction;
    let totalIRSBase = incomeValue * (incomeTaxBracketBase.marginalRate / 100) - totalDeductionBase;

    return {
        'withMaisValia': {
            'taxableMaisValia': taxableMaisValia,
            'preCalculatedTotalIncome': originalTotalIncome,
            'taxableIncome': totalIncome,
            'incomeTaxBracket': incomeTaxBracketMaisValia,
            'totalIRS': totalIRS
        },
        'withoutMaisValia': {
            'taxableIncome': incomeValue,
            'incomeTaxBracket': incomeTaxBracketBase,
            'totalIRS': totalIRSBase
        }
    }

}
import { useIRSTable } from "./useIRSTable";

export function useMaisValiaTaxCalculator(
    maisValiaValue,
    incomeValue,
    isCouple = false,
    stateAidLessTenYearsAgo = false
){

    //already comes pre-calculated
    let taxableMaisValia = maisValiaValue;

    if(isCouple === true){
        taxableMaisValia = incomeValue / 2;
    }

    let totalIncome = taxableMaisValia + incomeValue;

    if(stateAidLessTenYearsAgo === true){
        taxableMaisValia = maisValiaValue * 1;
    }

    const incomeTaxBracketMaisValia = useIRSTable(totalIncome);
    const totalDeductionMaisValia = (isCouple === true) ? incomeTaxBracketMaisValia.deduction * 2 : incomeTaxBracketMaisValia.deduction;
    let totalIRS = totalIncome * (incomeTaxBracketMaisValia.marginalRate / 100) - totalDeductionMaisValia;

    const incomeTaxBracketBase = useIRSTable(incomeValue);
    const totalDeductionBase = (isCouple === true) ? incomeTaxBracketBase.deduction * 2 : incomeTaxBracketBase.deduction;
    let totalIRSBase = incomeValue * (incomeTaxBracketBase.marginalRate / 100) - totalDeductionBase;

    return {
        'withMaisValia': {
            'taxableMaisValia': taxableMaisValia,
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
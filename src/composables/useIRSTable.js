export function useIRSTable(income){
    const incomeTaxBrackets = [
        {
          min: 0,
          max: 7703,
          marginalRate: 13,
          deduction: 0
        },
        {
          min: 7703,
          max: 11623,
          marginalRate: 18,
          deduction: 365.89
        },
        {
          min: 11623,
          max: 16472,
          marginalRate: 23,
          deduction: 946.98
        },
        {
          min: 16472,
          max: 21321,
          marginalRate: 26,
          deduction: 1441.3
        },
        {
          min: 21321,
          max: 27146,
          marginalRate: 32.75,
          deduction: 2880.46
        },
        {
          min: 27146,
          max: 39791,
          marginalRate: 37,
          deduction: 4034.01
        },
        {
          min: 39791,
          max: 51997,
          marginalRate: 43.5,
          deduction: 6620.26
        },
        {
          min: 51997,
          max: 81199,
          marginalRate: 46,
          deduction: 7400.48
        },
        {
          min: 81199,
          max: Infinity,
          marginalRate: 48,
          deduction: 9836.45
        }
    ];

    return incomeTaxBrackets.find(bracket => income >= bracket.min && income < bracket.max);

}
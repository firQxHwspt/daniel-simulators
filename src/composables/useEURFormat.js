export function useEURFormat(number){
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(number);
}
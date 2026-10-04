// Money is integer paise everywhere; format only here.
const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export const formatMoney = (paise: number) => fmt.format(Math.round(paise / 100))

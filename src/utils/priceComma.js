const priceComma = (askingPrice) => askingPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export default priceComma;
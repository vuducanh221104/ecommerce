function FormattedPrice({ value }) {
    const formattedPrice = () => {
        return value?.toLocaleString('vi-VN', {
            currency: 'VND',
        });
    };

    const formattedPriceString = formattedPrice();

    return <>{formattedPriceString + 'đ'}</>;
}

export default FormattedPrice;

import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus, faHome, faTags } from '@fortawesome/free-solid-svg-icons';
import CartNavStep from './components/CartNavStep';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { setLocalStorage, getLocalStorage } from '~/components/EncodeLocalStorage';
import FormattedPrice from '~/components/FormattedPrice';
import { useQuantityProductCart } from '~/Context/CartContext/CartContext';

const cx = classNames.bind(styles);
function Cart() {
    // LOCAL STORAGE
    const Navigate = useNavigate();
    const [dataFromLocalStorage, setDataFromLocalStorage] = useState(getLocalStorage('addToCart', 'addToCart'));
    console.log(dataFromLocalStorage);
    const { quantityProductInCart, handleQuantityInCart } = useQuantityProductCart();
    let sumProduct;

    const formik = useFormik({
        initialValues: {
            color: '',
        },
        validationSchema: Yup.object({
            color: Yup.string().required('Vui lòng chọn màu sắc.'),
        }),
    });

    // Function Update Price
    const updatePrice = () => {
        let sum = 0;
        dataFromLocalStorage.forEach((item) => {
            let price = item.price_discount;
            sum += item.amount * price;
            sumProduct = sum;
        });
    };
    if (dataFromLocalStorage) {
        updatePrice();
    }

    // Handle  Increase And Minus + & -
    const handleMinusandIncrease = (data, btn, index) => {
        let updatedAmount = data.amount + btn;
        if (updatedAmount < 1) {
            updatedAmount = 1;
        }

        const updatedData = [...dataFromLocalStorage];
        updatedData[index] = { ...data, amount: updatedAmount };

        setDataFromLocalStorage(updatedData);
        setLocalStorage('addToCart', updatedData, 'addToCart');
        updatePrice();

        // CHANGE QUANTIY IN CART ON HEADER
        if (btn === +1) {
            handleQuantityInCart(+1);
        } else if (btn === -1 && quantityProductInCart > dataFromLocalStorage.length) {
            handleQuantityInCart(-1);
        }
    };

    // DELETE
    const handleDelete = (index) => {
        const deletedProduct = dataFromLocalStorage[index];
        const update = dataFromLocalStorage.filter((item, i) => i !== index);

        // Update quantity in the cart header
        handleQuantityInCart(-deletedProduct.amount);

        setDataFromLocalStorage(update);
        setLocalStorage('addToCart', update, 'addToCart');
        updatePrice();
    };

    //Handle Sumbit
    const handleSubmit = (e) => {
        const orderId = uuidv4();
        const storedData = getLocalStorage('addToCart', 'addToCart');
        if (storedData && storedData.length > 0) {
            const updatedData = [...storedData];
            // Calculate the total price
            const simplifiedData = updatedData.map((item) => ({
                quantity: item.amount,
                name: item.name,
                image: item.images[0],
                selectedColor: item.selectedColor,
                description: item.description,
                link: item.storage[0].link,
                price: item.price_discount,
            }));
            // Data
            const orderData = {
                products: [...simplifiedData],
                totalPrice: sumProduct,
                orderId,
            };

            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 1);

            setLocalStorage('infoProduct', orderData, 'infoProduct');
            Navigate('/cart/customer');
        }
    };

    // Update selected color, image, and price
    const updateSelection = (index, color, image, price) => {
        dataFromLocalStorage[index].selectedColor = color;
        dataFromLocalStorage[index].images[0] = image;
        dataFromLocalStorage[index].price_discount = price;
    };

    // Change Color Product
    const handleColorChange = (e, index) => {
        formik.handleChange(e);
        const selectedColor = e.target.value;
        if (selectedColor === 'none-color') {
            alert('Vui lòng chọn màu sắc!!');
            return;
        }
        const updatedData = [...dataFromLocalStorage];
        const selectedProduct = updatedData[index];

        // Find the selected color in the product's available colors
        const selectedColorData = selectedProduct.color_available.stock.find((item) => item.color === selectedColor);

        // Update the state variables with the selected color data
        updateSelection(index, selectedColor, selectedColorData.image, selectedColorData.price);
    };
    return (
        <>
            <div className={cx('wrapper', 'pt-0 pt-lg-0', 'container')}>
                <div className={cx('cart')}>
                    {dataFromLocalStorage && dataFromLocalStorage.length ? (
                        <>
                            <CartNavStep activeStep={1} />
                            <h3 className={cx('cart-title')}>Đơn hàng của bạn</h3>
                            {dataFromLocalStorage.map((data, index) => (
                                <>
                                    <div className={cx('cart-product-header', 'mt-4')}>
                                        <div className={cx('display-header')}>
                                            <Link to={`/product/${data.slug}`}>
                                                <img
                                                    src={data.images[0]}
                                                    alt={data.name}
                                                    className={cx('product-img', 'col')}
                                                />
                                            </Link>
                                            <div className={cx('display-body', ' col flex-column')}>
                                                <div className={cx('product-body-header', 'col')}>
                                                    <Link to={`/product/${data.slug}`}>
                                                        <div className={cx('product-name')}>
                                                            <p>{data.name}</p>
                                                        </div>
                                                    </Link>
                                                    <div
                                                        className={cx('icon-trash')}
                                                        onClick={() => handleDelete(index)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </div>
                                                </div>
                                                <div
                                                    className={cx(
                                                        'cart-product-body',
                                                        'col-12 d-flex flex-wrap flex-column',
                                                    )}
                                                >
                                                    <select
                                                        className={cx('product-body-body')}
                                                        onChange={(e) => handleColorChange(e, index)}
                                                        name="color"
                                                        id="color"
                                                    >
                                                        <option value="none-color" selected="">
                                                            Màu Sắc
                                                        </option>
                                                        {data.color_available.stock.map((item) => (
                                                            <option
                                                                key={item.color}
                                                                value={item.color}
                                                                selected={data.selectedColor === item.color}
                                                            >
                                                                {item.color}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {/* {formik.errors.color && (
                                                            <p className={cx('error-message')}>{formik.errors.color}</p>
                                                        )} */}
                                                </div>
                                                <div className={cx('cart-product-footer')}>
                                                    <div className={cx('product-price')}>
                                                        <p className={cx('price-discount')}>
                                                            <FormattedPrice value={data.price_discount} />
                                                        </p>
                                                        <p className={cx('price-real')}>
                                                            <FormattedPrice value={data.price} />
                                                        </p>
                                                    </div>
                                                    <div className={cx('product-quantity')}>
                                                        <button
                                                            className={cx('btn-minus')}
                                                            onClick={() => {
                                                                handleMinusandIncrease(data, -1, index);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </button>
                                                        <input
                                                            type="number"
                                                            className={cx('input-number')}
                                                            value={data.amount}
                                                        />
                                                        <button
                                                            className={cx('btn-increase')}
                                                            onClick={() => {
                                                                handleMinusandIncrease(data, +1, index);
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* DON HANG */}
                                        </div>
                                    </div>
                                </>
                            ))}
                            <div className={cx('cart-coupons', 'row', 'mt-5')}>
                                <input
                                    type="text"
                                    placeholder="Nhập Mã Giảm Giá(Nếu Có)"
                                    className={cx('', 'col-10')}
                                />
                                <button className={cx('btn-coupons', 'col-2')}>
                                    <FontAwesomeIcon icon={faTags} className={cx('icon-tag')} />
                                </button>
                                {/* <p className={cx('counpons-fails')}>Mã Giảm Giá Không Hợp Lệ</p> */}
                            </div>
                            <div className={cx('cart-total')}>
                                <p>Tạm Tính</p>
                                <span className={cx('price-total')}>
                                    <FormattedPrice value={sumProduct} />
                                </span>
                            </div>
                            <div className={cx('btn-order')} onClick={(e) => handleSubmit(e)}>
                                {/* <Link to="/cart/customer"> */}
                                <button>ĐẶT HÀNG</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={cx('cart-not-product')}>
                                <h3 className={cx('cart-no-product-title')}>Đơn hàng của bạn</h3>
                                <div className={cx('cart-body')}>
                                    <div className={cx('cart-description')}>
                                        <p>Hiện chưa có thông tin đặt hàng.</p>
                                    </div>
                                    <Link to="/">
                                        <button className={cx('btn-no-product')}>
                                            <FontAwesomeIcon icon={faHome} className={cx('icon-home')} />
                                            <p>Tiếp Tục Mua Hàng...</p>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Cart;

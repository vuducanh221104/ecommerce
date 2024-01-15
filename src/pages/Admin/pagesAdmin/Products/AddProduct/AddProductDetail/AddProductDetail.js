import classNames from 'classnames/bind';
import styles from './AddProductDetail.module.scss';

import React, { useEffect, useRef, useState } from 'react';

import { Button, Space, Form, Input, message } from 'antd';
import { DeleteOutlined, TableOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import TextArea from 'antd/es/input/TextArea';

const cx = classNames.bind(styles);
function AddProductDetail() {
    const Navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    //Get LocalStorage
    const lsData = JSON.parse(localStorage.getItem('itemProductDetail'));
    // Formilk
    const formik = useFormik({
        initialValues: {
            images: lsData?.images || [''],
            name: lsData?.name || '',
            price: lsData?.price || '',
            price_discount: lsData?.price_discount || '',
            color_available: lsData?.color_available || {
                stock: [
                    {
                        color: '',
                        image: '',
                        price: '',
                    },
                ],
                out_stock: [
                    {
                        color: '',
                        image: '',
                        price: '',
                    },
                ],
            },
            subcategory_slug: lsData?.subcategory_slug || '',
            storage: lsData?.storage || [
                {
                    link: '',
                    name: '',
                    price: '',
                },
            ],
            description: lsData?.description || '',
            introduce: lsData?.introduce || '',
            infomation: lsData?.infomation || '',
            stored: lsData?.stored || '',
            amount: 1,
        },
        validationSchema: Yup.object({
            images: Yup.array().of(Yup.string().required('Required')),
            name: Yup.string().required('Required'),
            price: Yup.string().required('Required'),
            price_discount: Yup.string().required('Required'),
            color_available: Yup.object().shape({
                stock: Yup.array().of(
                    Yup.object().shape({
                        color: Yup.string().required('Required'),
                        image: '',
                        price: Yup.string().required('Required'),
                    }),
                ),
                out_stock: Yup.array().of(
                    Yup.object().shape({
                        color: Yup.string().required('Required'),
                        image: Yup.string().required('Required'),
                        price: Yup.string().required('Required'),
                    }),
                ),
            }),

            subcategory_slug: Yup.string().required('Required'),
            storage: Yup.array().of(
                Yup.object().shape({
                    link: Yup.string().required('Required'),
                    name: Yup.string().required('Required'),
                    price: Yup.string().required('Required'),
                }),
            ),

            description: Yup.string().required('Required'),
            introduce: Yup.string().required('Required'),
            infomation: Yup.string().required('Required'),
            stored: Yup.string().required('Required'),
        }),
    });

    useEffect(() => {
        localStorage.setItem('itemProductDetail', JSON.stringify(formik.values));
        // When refresh page still have data
        const handleBeforeUnload = (e) => {
            // Save the form values to localStorage before unloading
            localStorage.setItem('itemProductDetail', JSON.stringify(formik.values));
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            // Remove the event listener when the component is unmounted
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [formik.values]);

    const success = (message, icon) => {
        messageApi.open({
            type: icon,
            content: message,
        });
    };

    // BUTTON ADD & DELETE
    const addInput = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, [...formikValuesData, '']);
    };

    const deleteInput = (formikValuesData, nameValue, index) => {
        const updateData = formikValuesData.filter((item, i) => i !== index);
        formik.setFieldValue(nameValue, updateData);
    };

    // MARDOWN
    const mdParser = new MarkdownIt();

    function handleEditorChange({ html, text }) {
        formik.setFieldValue('description', text);
    }

    function handleEditorChangeIntroduce({ html, text }) {
        formik.setFieldValue('introduce', text);
    }
    // Function to add a new HTML structure to the information field
    const addNewInfo = () => {
        const existingInfo = formik.values.infomation;
        const newInfo = `
         <tr>
            <th>Cot</th>
            <td>
                <p>Data</p>
            </td>
        </tr>
            `;
        formik.setFieldValue('infomation', existingInfo + newInfo);
    };
    const addNewInfoBr = () => {
        const existingInfo = formik.values.infomation;
        const newInfo = `
         <tr>
            <th>Cot</th>
            <td>
                Data
                <br>Data
                <br>Data
            </td>
        </tr>
            `;
        formik.setFieldValue('infomation', existingInfo + newInfo);
    };

    const handleClick = async () => {
        if (formik.isValid) {
            const LSValue = JSON.parse(localStorage.getItem('itemProduct'));
            if (LSValue) {
                await axios.post(`http://localhost:4000/api-product/product-add`, LSValue);
                await axios.post(`http://localhost:4000/api-product/product-add-detail`, formik.values);
                localStorage.removeItem('itemProduct');
                localStorage.removeItem('itemProductDetail');
                Navigate('/admin/productList', 'success');
                success('Save Sucessfully !!');
            }
        } else {
            success('Please Input Missing', 'error');
        }
    };
    return (
        <div>
            <ArrowLeftOutlined
                style={{ cursor: 'pointer', fontSize: '2.5rem' }}
                onClick={() => Navigate('/admin/addProduct')}
            />
            <div className={cx('wrapper')} style={{ maxWidth: '1100px', margin: '1.5rem auto 35px' }}>
                {contextHolder}

                <div>
                    <h2 style={{ color: '#FF5456', textAlign: 'center' }}>Product Details</h2>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 3,
                            style: {
                                lineHeight: '40px',
                            },
                        }}
                        wrapperCol={{
                            span: 21,
                        }}
                        style={{
                            maxWidth: '100%',

                            fontWeight: '600',
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                    >
                        <Form.Item label="Name" className={cx('label-edit')}>
                            <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
                            {formik.errors.name && <p className={cx('error-message')}>{formik.errors.name}</p>}
                        </Form.Item>
                        <Form.Item label="Price" className={cx('label-edit')}>
                            <Input name="price" value={formik.values.price} onChange={formik.handleChange} />
                            {formik.errors.price && <p className={cx('error-message')}>{formik.errors.price}</p>}
                        </Form.Item>
                        <Form.Item label="Price Discount" className={cx('label-edit')}>
                            <Input
                                name="price_discount"
                                value={formik.values.price_discount}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.price_discount && (
                                <p className={cx('error-message')}>{formik.errors.price_discount}</p>
                            )}
                        </Form.Item>
                        <Form.Item label="Description" className={cx('label-edit')}>
                            <div style={{ maxWidth: '100%' }}>
                                <MdEditor
                                    style={{ height: '250px', wordWrap: 'break-word' }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={handleEditorChange}
                                    name="description"
                                    value={formik.values.description}
                                    className={cx('markdown')}
                                />
                            </div>
                            {formik.errors.description && (
                                <p className={cx('error-message')}>{formik.errors.description}</p>
                            )}
                        </Form.Item>
                        <Form.Item label="Introduce" className={cx('label-edit')}>
                            <div style={{ maxWidth: '100%' }}>
                                <MdEditor
                                    style={{ height: '250px', wordWrap: 'break-word' }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={handleEditorChangeIntroduce}
                                    name="introduce"
                                    value={formik.values.introduce}
                                    className={cx('markdown')}
                                />
                            </div>
                            {formik.errors.introduce && (
                                <p className={cx('error-message')}>{formik.errors.introduce}</p>
                            )}
                        </Form.Item>
                        <Form.Item label="Infomation" className={cx('label-edit')}>
                            <div>
                                <div className={cx('navigation')}>
                                    <TableOutlined onClick={addNewInfo} style={{ marginLeft: '10px' }} />
                                    <h3
                                        style={{
                                            margin: '0',
                                            padding: '7px 8px',
                                            cursor: 'pointer',
                                            marginLeft: '10px',
                                        }}
                                        onClick={addNewInfoBr}
                                    >
                                        br
                                    </h3>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <TextArea
                                        name="infomation"
                                        value={formik.values.infomation}
                                        onChange={formik.handleChange}
                                        style={{ height: '270px', width: '689px', padding: '10px 20px' }}
                                    />
                                    <div className={cx('product-descripion-specifications')}>
                                        <div
                                            className={cx('specifications-content')}
                                            dangerouslySetInnerHTML={{
                                                __html: `<table>${formik.values.infomation}</table>`,
                                            }}
                                        />
                                    </div>
                                </div>
                                {formik.errors.infomation && (
                                    <p className={cx('error-message')}>{formik.errors.infomation}</p>
                                )}
                            </div>
                        </Form.Item>
                        <Form.Item label={'Images'} className={cx('label-custom')}>
                            <div
                                style={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textAlign: 'start',
                                    verticalAlign: 'middle',
                                }}
                            >
                                <div style={{ marginTop: '20px' }}>
                                    {(formik.values.images || []).map((item, index) => (
                                        <Form.Item
                                            label={`${index + 1}`}
                                            className={cx('label-edit')}
                                            style={{ margin: '20px 0' }}
                                        >
                                            <div style={{ display: 'flex' }}>
                                                <div
                                                    className={cx('wrapper-images')}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `<img src="${item}" alt="img${index}"/>`,
                                                    }}
                                                />
                                                <Input
                                                    id={`images[${index}]`}
                                                    name={`images[${index}]`}
                                                    value={item}
                                                    onChange={formik.handleChange}
                                                />
                                                <Space>
                                                    <DeleteOutlined
                                                        onClick={() =>
                                                            deleteInput(formik.values.images, 'images', index)
                                                        }
                                                        style={{
                                                            color: '#ff4d4f',
                                                            cursor: 'pointer',
                                                            fontSize: '1.8rem',
                                                            marginLeft: '20px',
                                                        }}
                                                    />
                                                </Space>
                                            </div>
                                            {formik.errors.images && (
                                                <div className="error-message">{formik.errors.images[index]}</div>
                                            )}
                                        </Form.Item>
                                    ))}
                                </div>
                                <Button
                                    type="link"
                                    onClick={() => addInput(formik.values.images, 'images')}
                                    style={{ marginLeft: '14%', marginTop: '-10px' }}
                                >
                                    Add...
                                </Button>
                            </div>
                        </Form.Item>
                        <div className={'wrapper-custom'}>
                            <Form.Item label={'Product color available'} className={cx('label-custom')}>
                                <div style={{ marginTop: '55px' }}>
                                    <div className={cx('stock')}>
                                        <h3 style={{ fontSize: '1.5rem' }}>Color available :</h3>
                                        {(formik.values.color_available.stock || []).map((item, index) => (
                                            <div style={{ marginLeft: '25px' }}>
                                                <Form.Item label={`${index + 1}`} className={cx('label-edit')}>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            marginLeft: '10px',
                                                            marginTop: '30px',
                                                        }}
                                                    >
                                                        <span style={{ marginRight: '10px', lineHeight: '40px' }}>
                                                            Name:
                                                        </span>
                                                        <Input
                                                            name={`color_available.stock[${index}].color`}
                                                            id={`color_available.stock[${index}].color`}
                                                            defaultValue={item.color}
                                                            value={item.color}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <span
                                                            style={{
                                                                marginLeft: '10px',
                                                                marginRight: '10px',
                                                                lineHeight: '40px',
                                                            }}
                                                        >
                                                            Price:
                                                        </span>
                                                        <Input
                                                            name={`color_available.stock[${index}].price`}
                                                            id={`color_available.stock[${index}].price`}
                                                            defaultValue={item.price}
                                                            value={item.price}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <span
                                                            style={{
                                                                marginLeft: '10px',
                                                                marginRight: '10px',
                                                                lineHeight: '40px',
                                                                display: 'flex',
                                                            }}
                                                        >
                                                            Image:
                                                            <div
                                                                className={cx('wrapper-images')}
                                                                style={{ margin: '0 0 0 5px' }}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: `<img src="${item.image}" alt="img${
                                                                        index + 1
                                                                    }"/>`,
                                                                }}
                                                            />
                                                        </span>
                                                        <Input
                                                            name={`color_available.stock[${index}].image`}
                                                            id={`color_available.stock[${index}].image`}
                                                            defaultValue={item.image}
                                                            value={item.image}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <Space>
                                                            <DeleteOutlined
                                                                onClick={() =>
                                                                    deleteInput(
                                                                        formik.values.color_available.stock,
                                                                        'color_available.stock',
                                                                        index,
                                                                    )
                                                                }
                                                                style={{
                                                                    color: '#ff4d4f',
                                                                    cursor: 'pointer',
                                                                    fontSize: '1.8rem',
                                                                    marginLeft: '20px',
                                                                }}
                                                            />
                                                        </Space>
                                                    </div>
                                                    {(!formik.values.color_available.stock[index].color ||
                                                        !formik.values.color_available.stock[index].price ||
                                                        !formik.values.color_available.stock[index].image) && (
                                                        <div className="error-message">Required</div>
                                                    )}
                                                </Form.Item>
                                            </div>
                                        ))}
                                        <Button
                                            type="link"
                                            onClick={() =>
                                                addInput(formik.values.color_available.stock, 'color_available.stock')
                                            }
                                            style={{ marginLeft: '16%', marginTop: '-10px' }}
                                        >
                                            Add...
                                        </Button>
                                    </div>
                                    <div className={cx('out-stock')}>
                                        <h3 style={{ fontSize: '1.5rem' }}>Color not available :</h3>
                                        {(formik.values.color_available.out_stock || []).map((item, index) => (
                                            <div style={{ marginLeft: '25px' }}>
                                                <Form.Item label={`${index + 1}`} className={cx('label-edit')}>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            marginLeft: '10px',
                                                            marginTop: '30px',
                                                        }}
                                                    >
                                                        <span style={{ marginRight: '10px', lineHeight: '40px' }}>
                                                            Name:
                                                        </span>
                                                        <Input
                                                            name={`color_available.out_stock[${index}].color`}
                                                            id={`color_available.out_stock[${index}].color`}
                                                            defaultValue={item.color}
                                                            value={item.color}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <span
                                                            style={{
                                                                marginLeft: '10px',
                                                                marginRight: '10px',
                                                                lineHeight: '40px',
                                                            }}
                                                        >
                                                            Price:
                                                        </span>
                                                        <Input
                                                            name={`color_available.out_stock[${index}].price`}
                                                            id={`color_available.out_stock[${index}].price`}
                                                            defaultValue={item.price}
                                                            value={item.price}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <span
                                                            style={{
                                                                marginLeft: '10px',
                                                                marginRight: '10px',
                                                                lineHeight: '40px',
                                                                display: 'flex',
                                                            }}
                                                        >
                                                            Image:
                                                            <div
                                                                className={cx('wrapper-images')}
                                                                style={{ margin: '0 0 0 5px' }}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: `<img src="${item.image}" alt="img${
                                                                        index + 1
                                                                    }"/>`,
                                                                }}
                                                            />
                                                        </span>
                                                        <Input
                                                            name={`color_available.out_stock[${index}].image`}
                                                            id={`color_available.out_stock[${index}].image`}
                                                            defaultValue={item.image}
                                                            value={item.image}
                                                            onChange={formik.handleChange}
                                                        />
                                                        <Space>
                                                            <DeleteOutlined
                                                                onClick={() =>
                                                                    deleteInput(
                                                                        formik.values.color_available.out_stock,
                                                                        'color_available.out_stock',
                                                                        index,
                                                                    )
                                                                }
                                                                style={{
                                                                    color: '#ff4d4f',
                                                                    cursor: 'pointer',
                                                                    fontSize: '1.8rem',
                                                                    marginLeft: '20px',
                                                                }}
                                                            />
                                                        </Space>
                                                    </div>
                                                    {(!formik.values.color_available.out_stock[index].color ||
                                                        !formik.values.color_available.out_stock[index].price ||
                                                        !formik.values.color_available.out_stock[index].image) && (
                                                        <div className="error-message">Required</div>
                                                    )}
                                                </Form.Item>
                                            </div>
                                        ))}
                                        <Button
                                            type="link"
                                            onClick={() =>
                                                addInput(
                                                    formik.values.color_available.out_stock,
                                                    'color_available.out_stock',
                                                )
                                            }
                                            style={{ marginLeft: '16%', marginTop: '-10px' }}
                                        >
                                            Add...
                                        </Button>
                                    </div>
                                </div>
                            </Form.Item>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginLeft: '34px' }}>Storage :</h3>

                            {(formik.values.storage || []).map((item, index) => (
                                <div style={{ marginLeft: '25px' }}>
                                    <Form.Item label={`${index + 1}`} className={cx('label-edit')}>
                                        <div style={{ display: 'flex', marginLeft: '10px', marginTop: '30px' }}>
                                            <span style={{ marginRight: '10px', lineHeight: '40px' }}>Name:</span>
                                            <Input
                                                name={`storage[${index}].name`}
                                                id={`storage[${index}].name`}
                                                value={item.name}
                                                onChange={formik.handleChange}
                                            />
                                            <span
                                                style={{
                                                    marginLeft: '10px',
                                                    marginRight: '10px',
                                                    lineHeight: '40px',
                                                }}
                                            >
                                                Price:
                                            </span>
                                            <Input
                                                name={`storage[${index}].price`}
                                                id={`storage[${index}].price`}
                                                value={item.price}
                                                onChange={formik.handleChange}
                                            />
                                            <span
                                                style={{ marginLeft: '10px', marginRight: '10px', lineHeight: '40px' }}
                                            >
                                                Link:
                                            </span>
                                            <Input
                                                name={`storage[${index}].link`}
                                                id={`storage[${index}].link`}
                                                value={item.link}
                                                onChange={formik.handleChange}
                                            />
                                            <Space>
                                                <DeleteOutlined
                                                    onClick={() => deleteInput(formik.values.storage, 'storage', index)}
                                                    style={{
                                                        color: '#ff4d4f',
                                                        cursor: 'pointer',
                                                        fontSize: '1.8rem',
                                                        marginLeft: '20px',
                                                    }}
                                                />
                                            </Space>
                                        </div>
                                        {(!formik.values.storage[index].name ||
                                            !formik.values.storage[index].price ||
                                            !formik.values.storage[index].link) && (
                                            <div className="error-message">Required</div>
                                        )}
                                    </Form.Item>
                                </div>
                            ))}
                            <Button
                                type="link"
                                onClick={() => addInput(formik.values.storage, 'storage')}
                                style={{ marginLeft: '16%', marginTop: '-10px' }}
                            >
                                Add...
                            </Button>
                        </div>
                        <div className={'wrapper-custom'}>
                            <Form.Item label="Category Product Relative " className={cx('label-edit')}>
                                <Input
                                    name="subcategory_slug"
                                    defaultValue={formik.values.subcategory_slug}
                                    value={formik.values.subcategory_slug}
                                    onChange={formik.handleChange}
                                    style={{ marginTop: '0px' }}
                                />
                                {formik.errors.subcategory_slug && (
                                    <p className={cx('error-message')}>{formik.errors.subcategory_slug}</p>
                                )}
                            </Form.Item>
                        </div>

                        <Form.Item label="Stored" className={cx('label-edit')}>
                            <Input
                                name="stored"
                                defaultValue={formik.values.stored}
                                value={formik.values.stored}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.stored && <p className={cx('error-message')}>{formik.errors.stored}</p>}
                        </Form.Item>
                    </Form>
                    {/* BUTTON */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button onClick={() => Navigate('/admin/addProduct')}>Cancel</Button>
                        <Button
                            type="primary"
                            style={{ marginLeft: '10px' }}
                            onClick={() => {
                                handleClick();
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductDetail;

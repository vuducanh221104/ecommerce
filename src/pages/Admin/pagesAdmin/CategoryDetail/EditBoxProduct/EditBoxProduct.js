import classNames from 'classnames/bind';
import styles from './EditBoxProduct.module.scss';

import React, { useEffect, useState } from 'react';
import { Modal, Button, Space, Input, Form, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ModalLoading from '~/pages/Admin/components/ModalLoading';
import WrapperContainer from '~/pages/Admin/components/WrapperContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useFormikCategoryBox } from '~/FormikConfig/FormikCategory/FormikCategoryBox';
import { useMessage } from '~/pages/Admin/components/Message';
import MessageFormikError from '~/components/MessageFormikError';
import ImageCustom from '~/pages/Admin/components/ImageCustom';

const cx = classNames.bind(styles);

function EditBoxProduct() {
    const { messageSuccess, messageError, messageMissingInput, contextHolder } = useMessage();
    const [haveData, setHaveData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const segments = pathname.split('/');
    const slugParams = segments[segments.length - 1];

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        const fetchApi = async () => {
            await axios.delete(
                `http://localhost:4000/api-image/admin/image/edit/add-category-box-product/${slugParams}`,
            );
            try {
                setLoading(false);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
                setIsModalOpen(false);
            }
        };
        fetchApi();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const formik = useFormikCategoryBox();

    useEffect(() => {
        const fecthApi = async () => {
            const response = await axios.get(
                `http://localhost:4000/api-image/admin/image/category-box-product/${slugParams}`,
            );
            try {
                setHaveData(true);
                formik.setValues({
                    box_product: response.data.box_product.map((boxProduct) => ({
                        box_product_name: boxProduct.box_product_name,
                        box_product_image: boxProduct.box_product_image,
                        box_product_slug: boxProduct.box_product_slug,
                    })),
                    category_name: response.data.category_name,
                    category_image: response.data.category_image,
                    category_slug: response.data.category_slug,
                    category_parent_slug: response.data.category_parent_slug,
                });
            } catch (err) {
                console.log(err);
            }
        };
        fecthApi();
    }, []);

    const handleFileChange = (e, nameValue) => {
        const target = e.target.files[0];
        formik.setFieldValue(nameValue, target);
    };
    const editImage = (formikValuesData, nameValue) => {
        formik.setFieldValue(nameValue, (formikValuesData = ''));
    };
    // BUTTON ADD & DELETE

    const addInput = () => {
        const newBoxProduct = {
            box_product_name: '',
            box_product_image: '',
            box_product_slug: '',
        };

        formik.setFieldValue('box_product', [...formik.values.box_product, newBoxProduct]);
    };

    const deleteInput = (formikValuesData, nameValue, index) => {
        const updateData = formikValuesData.filter((item, i) => i !== index);
        formik.setFieldValue(nameValue, updateData);
    };

    const handleSubmit = async () => {
        if (formik.isValid) {
            setLoading(true);
            try {
                // HANDLE IMAGE THUMB
                const formDataImageColor2 = new FormData();

                if (formik.values.category_image instanceof File) {
                    formDataImageColor2.append('img', formik.values.category_image);

                    const dataImageThumb = await axios.post(
                        'http://localhost:4000/api/admin/upload/uploadCloud',
                        formDataImageColor2,
                    );
                    formik.values.category_image = dataImageThumb.data[0].path;
                }

                // HANDLE BOX_PRODUCT
                const formDataImageColor = new FormData();
                const originalIndices = [];

                formik.values.box_product.forEach((item, index) => {
                    if (item.box_product_image instanceof File) {
                        formDataImageColor.append('img', item.box_product_image);
                        originalIndices.push(index);
                    }
                });
                const dataImage = await axios.post(
                    'http://localhost:4000/api/admin/upload/uploadCloud',
                    formDataImageColor,
                );

                originalIndices.forEach((originalIndices, index) => {
                    formik.values.box_product[originalIndices].box_product_image = dataImage.data[index].path;
                });

                //  SAVE DATA
                const response = await axios.patch(
                    `http://localhost:4000/api-image/admin/image/edit/category-box-product/${slugParams}`,
                    formik.values,
                );
                messageSuccess();
            } catch (error) {
                console.error('Error:', error);
                messageError();
            } finally {
                setLoading(false);
            }
        } else {
            messageMissingInput();
        }
    };

    return (
        <>
            {contextHolder}
            {loading && <ModalLoading />}
            <WrapperContainer title={'Edit Category Box '}>
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
                    <>
                        <ArrowLeftOutlined
                            style={{ fontSize: '2rem', cursor: 'pointer' }}
                            onClick={() => navigate(-1)}
                        />
                        <Form.Item label="Image">
                            <div style={{ marginTop: '20px' }}>
                                <ImageCustom
                                    file={formik.values.category_image}
                                    handleEdit={() => editImage(formik.values.category_image, 'category_image')}
                                    handleFileChange={(e) => handleFileChange(e, 'category_image')}
                                    width="200px"
                                    height="200px"
                                />
                                <MessageFormikError formikErrorValue={formik.errors.category_image} />
                            </div>
                        </Form.Item>
                        <Form.Item label="Name">
                            <Input
                                name="category_name"
                                value={formik.values.category_name}
                                onChange={formik.handleChange}
                            />
                            <MessageFormikError formikErrorValue={formik.errors.category_name} />
                        </Form.Item>
                        <Form.Item label="Slug">
                            <Input
                                name="category_slug"
                                value={formik.values.category_slug}
                                onChange={formik.handleChange}
                            />
                            <MessageFormikError formikErrorValue={formik.errors.category_slug} />
                        </Form.Item>
                        <Form.Item label="Parent Slug">
                            <Input
                                name="category_parent_slug"
                                value={formik.values.category_parent_slug}
                                onChange={formik.handleChange}
                            />
                            <MessageFormikError formikErrorValue={formik.errors.category_parent_slug} />
                        </Form.Item>
                        {!formik.values.box_product.length <= 0 && (
                            <Form.Item label="Product">
                                <div style={{ marginTop: '40px', marginLeft: '30px' }}>
                                    {formik.values.box_product.map((item, index) => (
                                        <Form.Item
                                            label={index + 1}
                                            style={{ marginTop: '30px' }}
                                            className={cx('index-category')}
                                        >
                                            <Form.Item label="Box Name">
                                                <Input
                                                    name={`box_product[${index}].box_product_name`}
                                                    value={item.box_product_name}
                                                    onChange={formik.handleChange}
                                                />
                                                <MessageFormikError
                                                    formikErrorValue={
                                                        formik.errors.box_product?.[index]?.box_product_name
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item label="Slug">
                                                <Input
                                                    name={`box_product[${index}].box_product_slug`}
                                                    value={item.box_product_slug}
                                                    onChange={formik.handleChange}
                                                />
                                                <MessageFormikError
                                                    formikErrorValue={
                                                        formik.errors.box_product?.[index]?.box_product_slug
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item label="Image" className={cx('box-product-image')}>
                                                <ImageCustom
                                                    file={item.box_product_image}
                                                    handleEdit={() =>
                                                        editImage(
                                                            formik.values.box_product[index].box_product_image,
                                                            `box_product[${index}].box_product_image`,
                                                        )
                                                    }
                                                    handleFileChange={(e) =>
                                                        handleFileChange(e, `box_product[${index}].box_product_image`)
                                                    }
                                                />
                                            </Form.Item>
                                            <Space>
                                                <DeleteOutlined
                                                    onClick={() =>
                                                        deleteInput(formik.values.box_product, 'box_product', index)
                                                    }
                                                    style={{
                                                        color: '#ff4d4f',
                                                        cursor: 'pointer',
                                                        fontSize: '1.8rem',
                                                        marginLeft: '20px',
                                                    }}
                                                    className={cx('btn-detele')}
                                                />
                                            </Space>
                                        </Form.Item>
                                    ))}

                                    <Button
                                        type="link"
                                        onClick={() => addInput('box_product')}
                                        style={{ marginLeft: '20px', marginTop: '-10px' }}
                                    >
                                        Add...
                                    </Button>
                                </div>
                            </Form.Item>
                        )}
                    </>
                    {/* ))} */}

                    {/* BUTTON */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="primary" danger onClick={showModal} style={{ marginRight: '10px' }}>
                            Delete
                        </Button>
                        <Button type="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </Form>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <h2>You still want to detele ?</h2>
                </Modal>
            </WrapperContainer>
        </>
    );
}

export default EditBoxProduct;

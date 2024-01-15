import classNames from 'classnames/bind';
import styles from './ImageCustom.module.scss';

import { Image } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import 'react-markdown-editor-lite/lib/index.css';

const cx = classNames.bind(styles);

function ImageCustom({ file, handleDelete, handleEdit, handleFileChange, width, height }) {
    return (
        <div className={cx('wrapper-images-preview-content')} style={{ width: width, height: height }}>
            {file ? (
                <>
                    <Image
                        src={file instanceof File ? URL.createObjectURL(file) : file}
                        className={cx('wrapper-images-preview-img')}
                    />
                    {handleEdit ? (
                        <EditOutlined className={cx('icon-trash-in-image')} onClick={() => handleEdit()} />
                    ) : (
                        <DeleteOutlined className={cx('icon-trash-in-image')} onClick={() => handleDelete()} />
                    )}
                </>
            ) : (
                <div className={cx('upload-wrapper')} style={{ width: width, height: height }}>
                    <span className={cx('upload-content')}>
                        <input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e)} />
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: '8px' }}>Upload</div>
                        </div>
                    </span>
                </div>
            )}
        </div>
    );
}

export default ImageCustom;

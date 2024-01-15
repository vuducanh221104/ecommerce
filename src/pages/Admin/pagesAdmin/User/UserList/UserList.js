import classNames from 'classnames/bind';
import styles from './UserList.module.scss';

import React, { useEffect, useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Table, Modal, Space, Form, Input, Tooltip, Radio, message } from 'antd';
import { DeleteOutlined, SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import axios from 'axios';
import EditUser from './EditUser';
import AddUser from './AddUser';
import { useMessage } from '~/pages/Admin/components/Message';

const cx = classNames.bind(styles);
function UserList() {
    const { messageSuccess, messageError, contextHolder } = useMessage();
    const [dataUser, setDataUser] = useState([]);
    const [selectedListId, setSelectedListId] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [userDeleteId, setUserDeleteId] = useState(null);
    const [infoModal, setInfoModal] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                            height: 40,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                            height: 40,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        danger
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    // HANDLE EDIT
    const showEditModal = (recordId) => {
        setEditUserId(recordId);
    };

    // CALL API DATA
    const fetchApi = () => {
        axios
            .get('http://localhost:4000/api/admin/user')
            .then((res) => setDataUser(res.data))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchApi();
    }, []);

    // HANDLE DELETE
    const showDeleteModal = (recordId) => {
        setUserDeleteId(recordId);
    };

    const hideDeleteModal = () => {
        setUserDeleteId(null);
    };

    // Click Delete Product & Product Detail
    const handleDeleteCickOk = (listId) => {
        axios
            .delete(`http://localhost:4000/api/admin/user/${listId}`)
            .then(() => {
                fetchApi();
                messageSuccess();
            })
            .catch((err) => {
                console.error(err);
                messageError();
            })
            .finally(() => {
                setUserDeleteId(null);
            });
    };

    // Handle Selected Element
    const onSelectChange = (newselectedListId) => {
        setSelectedListId(newselectedListId);
    };
    const rowSelection = {
        selectedListId,
        onChange: onSelectChange,
    };

    // Set value for each element
    const rows = dataUser.map((record) => ({
        key: record._id,
        id: record._id,
        fullname: record.fullname,
        username: record.username,
        avatar: record.avatar,
        email: record.email,
        phone: record.phone,
        password: record.password,
        isVerified: record.isVerified,
        createdAt: record.createdAt,
        role: record.role,
        // token & email
        verificationToken: record.verificationToken,
        newEmail: record.newEmail,
        newEmailVerificationToken: record.newEmailVerificationToken,
    }));

    const columns = [
        // _Id
        {
            title: '_Id',
            dataIndex: 'id',
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('id'),
            width: 70,
            render: (text, record) => (
                <div className="modal-info-detail">
                    <InfoCircleOutlined
                        onClick={() => setInfoModal(record.key)}
                        style={{ color: '#08c', fontSize: '1.6rem' }}
                    />
                    <span style={{ marginLeft: '10px' }}>
                        <Tooltip placement="topLeft" title={text}>
                            {text}
                        </Tooltip>
                    </span>
                    <Modal
                        title="Info"
                        visible={infoModal === record.key}
                        onOk={() => {
                            setInfoModal(null);
                        }}
                        onCancel={() => {
                            setInfoModal(null);
                        }}
                        className={cx('modal-custom')}
                    >
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
                            className={cx('text-form-custom')}
                            style={{
                                maxWidth: '100%',
                                marginLeft: '10px',
                                fontWeight: '600',
                                padding: '0 20px',
                                overflowY: 'scroll',
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                        >
                            <Form.Item label="Fullname" name="fullname" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.fullname} />
                            </Form.Item>
                            <Form.Item label="Username" name="username" className={cx('label-edit')}>
                                <Tooltip placement="topLeft" title={record.username}>
                                    <Input disabled defaultValue={record.username} />
                                </Tooltip>
                            </Form.Item>
                            <Form.Item label="Email" name="email" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.email} />
                            </Form.Item>
                            <Form.Item label="Phone" name="phone" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.phone} />
                            </Form.Item>
                            <Form.Item label="Password" name="password" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.password} />
                            </Form.Item>
                            <Form.Item label="Verified" name="isVerified" className={cx('label-edit')} style={{}}>
                                <Input disabled defaultValue={record.isVerified} />
                            </Form.Item>
                            <Form.Item label="Created At" name="createdAt" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.createdAt} />
                            </Form.Item>
                            <Form.Item label="Role" name="role" className={cx('label-edit')}>
                                <Input disabled defaultValue={record.role} />
                            </Form.Item>
                            {record.verificationToken && (
                                <Form.Item
                                    label="Verification Token"
                                    name="verificationToken"
                                    className={cx('label-edit')}
                                >
                                    <Input disabled defaultValue={record.verificationToken} />
                                </Form.Item>
                            )}
                            {record.newEmailVerificationToken && record.newEmail && (
                                <>
                                    <Form.Item
                                        label="Change Verification Token"
                                        name="verificationToken"
                                        className={cx('label-edit')}
                                    >
                                        <Input disabled defaultValue={record.newEmailVerificationToken} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Change Email"
                                        name="verificationToken"
                                        className={cx('label-edit')}
                                    >
                                        <Input disabled defaultValue={record.newEmail} />
                                    </Form.Item>
                                </>
                            )}
                        </Form>
                    </Modal>
                </div>
            ),
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            ellipsis: {
                showTitle: false,
            },
            width: 70,
            render: (text, record) => (
                <>
                    <img src={text} alt="" style={{ maxWidth: '40px' }} />
                </>
            ),
        },
        // NAME
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            ellipsis: {
                showTitle: true,
            },
            width: 140,
            ...getColumnSearchProps('fullname'),
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        // USER NAME
        {
            title: 'Username',
            dataIndex: 'username',
            ellipsis: {
                showTitle: false,
            },
            width: 50,
            ...getColumnSearchProps('username'),
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        // EMAIL
        {
            title: 'Email',
            dataIndex: 'email',
            ellipsis: {
                showTitle: false,
            },
            width: 150,
            ...getColumnSearchProps('email'),
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        // PHONE
        {
            title: 'Phone',
            dataIndex: 'phone',
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('phone'),
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        // PASSWORD
        {
            title: 'Password',
            dataIndex: 'password',
            ellipsis: {
                showTitle: false,
            },
            render: (text) => (
                <Tooltip title={text}>
                    <span>{text}</span>
                </Tooltip>
            ),
        },
        // ROLE
        {
            title: 'Role',
            dataIndex: 'role',
            render: (isRole, record) => (isRole === 2 ? <>Admin</> : <>User</>),

            ellipsis: {
                showTitle: false,
            },
        },
        // IsVerified
        {
            title: 'IsVerified',
            dataIndex: 'isVerified',
            render: (isBoolean, record) => (isBoolean ? <>True</> : <>False</>),
            ellipsis: {
                showTitle: false,
            },
        },
        // CREATED AT
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('createdAt'),
        },
        // ACTION
        {
            title: 'Action',
            dataIndex: 'action',
            width: 150,
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => {
                            showEditModal(record.id);
                        }}
                        style={{ marginRight: '10px' }}
                    >
                        Edit
                    </Button>
                    {/* MODAL */}
                    <EditUser
                        editUserId={editUserId}
                        recordId={record.id}
                        setEditUserId={setEditUserId}
                        record={record}
                    />

                    {/* BTN DELETE */}
                    <Space onClick={() => showDeleteModal(record.id)}>
                        <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer', fontSize: '1.8rem' }} />
                    </Space>
                    <Modal
                        title="Are You Sure You Want To Delete??"
                        visible={userDeleteId === record.id}
                        onOk={() => {
                            handleDeleteCickOk(record.id);
                        }}
                        onCancel={hideDeleteModal}
                        style={{ marginTop: '150px' }}
                    >
                        <p>
                            Xóa
                            <span style={{ fontWeight: '700', fontSize: '1.5rem' }}> {record.actionDelete}</span>
                        </p>
                    </Modal>
                </>
            ),
        },
    ];

    return (
        <div>
            {contextHolder}
            <div
                style={{
                    marginBottom: 16,
                    display: 'flex',
                }}
            >
                <span
                    style={{
                        marginLeft: 8,
                    }}
                    className={'ant-col ant-col-md-22 css-dev-only-do-not-override-pr0fja'}
                >
                    {selectedListId.length > 0 ? (
                        <span>
                            Selected {selectedListId.length} items
                            <Button
                                onClick={() => {
                                    setShowModalDelete(true);
                                }}
                                type="primary"
                                danger
                                style={{ marginLeft: '10px' }}
                            >
                                Xóa
                            </Button>
                        </span>
                    ) : (
                        ''
                    )}
                    <Modal
                        title="Bạn Có Chắc Chắn Muốn Xóa Không ?"
                        visible={showModalDelete}
                        onOk={() => {
                            handleDeleteCickOk(selectedListId);
                            setShowModalDelete(false);
                            setSelectedListId([]);
                        }}
                        onCancel={() => setShowModalDelete(false)}
                        style={{ marginTop: '150px' }}
                    >
                        <p>Xóa</p>
                    </Modal>
                </span>
                <div>
                    <Button type="primary">ADD</Button>
                </div>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={rows}
                rowKey={(record) => record.id}
                scroll={{ x: 'max-content' }}
            />
        </div>
    );
}
export default UserList;

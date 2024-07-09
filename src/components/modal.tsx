import React, { useState } from 'react';
import { Button, Modal, Radio, Input, Form, Select } from 'antd';
import Uploading from './upload-images';
export const CreateModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Maxsulot Qoshish
      </Button>
      <Modal title="Maxshulot Qoshish" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="wrap"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item rules={[{ required: true }]}>
            <Input placeholder='Maxsulot nomi...' required type='text'/>
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input placeholder='Discription' required type='text'/>
          </Form.Item>

          <Form.Item  rules={[{ required: true }]}>
            <Input placeholder='Maxsulor narhi...' type='number' required/>
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input type='color' required/>
          </Form.Item>
          <Form.Item>
            <Select placeholder='Kategoriya'>
              <Select.Option value='men'>Mens</Select.Option>
            </Select>
          </Form.Item>
          <Uploading/>
        </Form>
        <Radio.Group className='mt-[15px] mb-[15px]'>
          <Radio value={'man'}>Erkak</Radio>
          <Radio value={'women'}>Ayol</Radio>
          <Radio value={'umumiy'}>Umumiy</Radio>
        </Radio.Group>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Modal>
    </>
  );
};

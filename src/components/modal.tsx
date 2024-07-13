import React, { useState } from 'react';
import { Button, Modal, Radio, Input, Form, Select } from 'antd';
import Uploading from './upload-images';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, } from "firebase/firestore";
import { db } from '../firebase';

export const CreateModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  
  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const uploadfiles = async ()=> {
    const uploadPromises = files.map(async (file) => {
      const storage = getStorage();
      const storageRef = ref(storage, 'products/' + file.name);

      try {
        await uploadBytes(storageRef, file)
        const url = getDownloadURL(ref(storage, 'products/' + file.name))
        return url;
      } catch (error){
        console.log(error);
        throw error
      }
    })
    try {
      const urls = await Promise.all(uploadPromises);
      console.log('asdasdasd', urls);
      return urls;
    } catch (error) {
      console.error('one', error);
      throw error
    }
  }

  const onFinesh = async (value: object) => {
    console.log(value);
    try {
      const urls = await uploadfiles()
      console.log(urls);
      const data = {
        ...value,
        images: urls,
      }

      const defRef = await addDoc(collection(db, "products"), {data});
      console.log("daoadasd", defRef);
    } catch (error) {
      
    }
    console.log(files); 
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Maxsulot Qoshish
      </Button>
      <Modal title="Maxshulot Qoshish" open={isModalOpen} footer={null} onCancel={handleCancel}>
        <Form
          onFinish={onFinesh}
          name="wrap"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name={'name'} rules={[{ required: true }]}>
            <Input placeholder='Maxsulot nomi...' required type='text'/>
          </Form.Item>

          <Form.Item name={'description'} rules={[{ required: true }]}>
            <Input placeholder='Discription' required type='text'/>
          </Form.Item>

          <Form.Item name={'price'} rules={[{ required: true }]}>
            <Input placeholder='Maxsulor narhi...' type='number' required/>
          </Form.Item>

          <Form.Item name={'color'} rules={[{ required: true }]}>
            <Input type='color' required/>
          </Form.Item>
          <Form.Item name={'category'}>
            <Select placeholder='Kategoriya'>
              <Select.Option value='men'>Mens</Select.Option>
              <Select.Option value='men'>women</Select.Option>
              <Select.Option value='men'>umumiy</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item className='flex justify-center'>
            <Uploading setFiles={setFiles}/>
          </Form.Item>
          <Form.Item name={'gender'} className='flex justify-center'>
            <Radio.Group>
              <Radio value={'man'}>Erkak</Radio>
              <Radio value={'women'}>Ayol</Radio>
              <Radio value={'umumiy'}>Umumiy</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button onClick={handleCancel} type="primary" className='w-full' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

import { CreateModal } from "../../components/modal";
import { Button, ConfigProvider, Form, Input, Select } from 'antd';
import { useState } from "react";
import { Divider, Radio, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space } from 'antd';

export default function Products(){
    const [search, setSearch] = useState();
    const [formvalue, setFormvalue] = useState<{}>({});

    interface DataType {
        key: React.Key;
        name: string;
        price: number;
        categoriye: string;
        discription: string;
        color: string;
        image: string;
    }
      
      const columns: TableColumnsType<DataType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text: string) => <a>{text}</a>,
        },
        {
          title: 'Price',
          dataIndex: 'price',
        },
        {
          title: 'Categoriya',
          dataIndex: 'categoriye',
        },
        {
          title: 'Discription',
          dataIndex: 'discription',
        },
        {
          title: 'Color',
          dataIndex: 'color',
        },
        {
          title: 'Image',
          dataIndex: 'image',
        },
      ];
      
      const data: DataType[] = [
        {
          key: '1',
          name: 's',
          price: 32,
          categoriye: 'men',
          discription: 'New York No. 1 Lake Park',
          color: 'red',
          image: 'as',
        }
      ];
      
      // rowSelection object indicates the need for row selection
      const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };


    const onFinish = (value: object) =>{
        setFormvalue(value)
        // console.log(formvalue);
    }

    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
    console.log(search);
  
    const datas = async()=>{
      const querySnapshot = await getDocs(collection(db, "products"));
      console.log(querySnapshot);
      
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    }
    datas()
    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    const onDownload = () => {
      fetch(src)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.download = 'image.png';
          document.body.appendChild(link);
          link.click();
          URL.revokeObjectURL(url);
          link.remove();
        });
    };

    return (
        <ConfigProvider>

        <div className="w-full bg-white">
            <div className="w-full px-[30px] flex justify-between items-center h-[80px] bg-white">
                <Form
                    onFinish={onFinish}
                    className="flex gap-[50px]"
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Title" name={'name'} rules={[{ required: true }]}>
                        <Input type='text'/>
                    </Form.Item>
                    <Form.Item label="Price" name={'price'} rules={[{ required: true }]}>
                      <Input type="number" />
                    </Form.Item>
                    <Form.Item label="Price" name={'categoriya'} rules={[{ required: true }]}>
                      <Select placeholder='Kategoriya'>
                        <Select.Option value='men'>Mens</Select.Option>
                        <Select.Option value='men'>women</Select.Option>
                        <Select.Option value='men'>umumiy</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" >
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
                <CreateModal/>
            </div>
            <div className="px-[30px]">
                <div>
                    <Radio.Group
                    onChange={({ target: { value } }) => {
                        setSelectionType(value);
                    }}
                    value={selectionType}
                    >
                    <Radio value="checkbox">Checkbox</Radio>
                    <Radio value="radio">radio</Radio>
                    </Radio.Group>
                    <Divider />
                    <Table
                      rowSelection={{
                          type: selectionType,
                          ...rowSelection,
                      }}
                      columns={columns}
                      dataSource={data}
                      
                    />
                </div>
            </div>
        </div>
        </ConfigProvider>
    )
}
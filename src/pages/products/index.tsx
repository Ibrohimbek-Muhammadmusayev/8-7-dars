import { CreateModal } from "../../components/modal";
import Tablecontent from "../../components/table";
import { Button, Form, Input } from 'antd';

export default function Products(){
    return (
        <div>
            <div className="w-full px-[30px] flex justify-between items-center h-[80px] bg-white">
                <Form
                    className="flex gap-[50px]"
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label="Title" rules={[{ required: true }]}>
                        <Input type='text'/>
                    </Form.Item>

                    <Form.Item label="Price" rules={[{ required: true }]}>
                        <Input type='number'/>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                    </Form.Item>
                </Form>
                <CreateModal/>
            </div>
            <div className="">
                <Tablecontent/>
            </div>
        </div>
    )
} 
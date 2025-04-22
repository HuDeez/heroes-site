import {LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

export default function LoadingCard() {
    return (
        <>
            <div className="flex p-16 justify-center w-full">
                <div className="bg-[#181a1e] flex flex-col justify-center items-center p-8 rounded-2xl space-y-5">
                    <div>
                        <h1 className="text-xl text-center md:text-2xl">Содержимое страницы загружается</h1>
                    </div>
                    <div className="overflow-y-hidden">
                        <Spin className="overflow-hidden" indicator={<LoadingOutlined style={{ fontSize: 48}} spin />} />
                    </div>
                    <div className="text-center md:text-xl text-base">
                        <p>Пожалуйста, подождите</p>
                    </div>
                </div>
            </div>
        </>
    )
}

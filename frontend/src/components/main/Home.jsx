import {useOutletContext} from "react-router-dom";



export default function Home() {
    const [isMobile] = useOutletContext()

    const requirements = [
        {header: "Возраст", requirement: "От 18 лет"},
        {header: "Состояние здоровья", requirement: "По определению военного комиссариата"},
        {header: "Срок контракта", requirement: "От 1 года, 3 или 5 лет"}
    ];

    const guarantees = [
        "Социальные льготы",
        "Региональные льготы",
        "Денежное довольствие"
    ]

    return (
        <>
            {isMobile ?
                <MobileHome requirements={requirements} guarantees={guarantees}/>
                :
                <DesktopHome requirements={requirements} guarantees={guarantees}/>
            }
        </>
    )
}

function DesktopHome({requirements, guarantees}) {
    return (
        <>
            <div className="contract-card flex flex-row p-20 items-center justify-center space-x-32">
                <div className="requirements flex flex-col space-y-8">
                    <div className="requirements-header min-w-full">
                        <h1 className="font-semibold text-[44px]">Военная служба по <br/> контракту</h1>
                    </div>
                    <div className="list bg-[#181a1e] space-y-8 rounded-2xl p-6">
                        {requirements.map(object => (
                            <span key={object.header} className="flex flex-col space-y-5 text-left">
                        <h1 className="font-semibold content-center">
                            {object.header}
                            <i className="bi bi-check-circle px-3.5 text-blue-400 text-2xl"></i>
                        </h1>
                        <p className="text-xl">{object.requirement}</p>
                    </span>
                        ))
                        }
                    </div>
                </div>
                <div className="request flex flex-col space-y-8">
                    <h1>Выбор <span className="underline-offset-auto">настоящего героя</span> <br/> Присоединяйся
                        к <span
                            className="text-blue-600 font-semibold">СВО</span>им
                    </h1>
                    <div className="guarantees flex flex-col space-y-8 text-xl bg-[#181a1e] p-6 rounded-2xl">
                        <h1 className="text-2xl">
                            Гарантии и поддержка
                            <i className="bi bi-shield-fill-check text-blue-400 px-3.5"></i>
                        </h1>
                        <div className="guarantees-list flex flex-col space-y-6">
                            {
                                guarantees.map((guarantee, index) => (
                                    <span key={guarantee}>
                                <i className={`bi bi-${index + 1}-circle text-blue-400 pr-2`}></i>
                                        {guarantee}
                            </span>
                                ))
                            }
                        </div>
                    </div>
                    <a href="https://contract.gosuslugi.ru/"
                       className="px-12 py-4 bg-blue-600 rounded-xl text-center hover:bg-blue-500 transition all duration-200 text-white">
                        Записаться на прием
                    </a>
                </div>
            </div>

            <div className="p-20">
                <div className="flex items-center justify-center flex-row-reverse gap-8 ">

                    <div className="flex flex-col space-y-8 items-center">
                        <div className="max-w-xl bg-[#181a1e] rounded-2xl p-6">
                        <span className="text-lg text-left">
                            На острие решения самых сложных задач, ответственных и опасных, безусловно, находятся наши военные, наши воины, находящиеся в зоне специальной военной операции. Я искренне считаю, что все они - герои, все, кто несет это тяжелую, ответственную и опасную службу
                        </span>
                        </div>

                        <a href="http://putin.kremlin.ru/bio/"
                           className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-center transition all duration-200 text-white">
                            Узнать больше о президенте
                        </a>
                    </div>

                    <div className="flex flex-col items-center space-y-6 p-6 bg-[#181a1e] rounded-2xl">
                        <div
                            className="photo max-w-48 max-h-48 rounded-full border-4 border-solid border-blue-600 overflow-hidden">
                            <img src="/putin.png" alt="" className="w-full h-full"/>
                        </div>
                        <span className="text-center p-4 bg-[#131417] rounded-2xl leading-6 ">
                            Президент Российской Федерации <br/> Владимир Владимирович Путин
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

function MobileHome({requirements, guarantees}) {
    return (
        <>
            <div className="contract-box flex flex-col items-center">
                <div className="contract-head text-center">
                    <h1 className={`max-w-[300px]`}>Военная служба по контракту</h1>
                </div>
                <div className="requirements">
                    <div className="requirements-box p-4">
                        <ul className={`requirements-list flex flex-col gap-5 p-4 bg-[#181a1e] rounded-2xl`}>
                            {
                                requirements.map(requirement => (
                                    <li key={requirement.header} className={`flex flex-col gap-1 text-left max-w-[300px] sm:max-w-[500px]`}>
                                        <div className="requirement-header flex flex-row items-center">
                                            <h1 className={`w-full`}>{requirement.header}</h1>
                                            <i className="bi bi-check-circle px-3.5 text-blue-400 text-2xl"/>
                                        </div>
                                        <div className="requirement-body">
                                            <p className={`w-full break-words`}>{requirement.requirement}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className="support-box flex flex-col items-center">
                <div className="support-head text-center">
                    <h1 className={`max-w-[300px] sm:max-w-[500px]`}>
                        Выбор истинного <span className="text-blue-600 font-semibold">героя</span>
                        <br/>
                        Присоединяйся к <span className="text-blue-600 font-semibold">СВО</span>им
                    </h1>
                </div>
                <div className="guarantees">
                    <div className="guarantees-box p-4">
                        <ul className={`requirements-list flex flex-col gap-5 p-4 bg-[#181a1e] rounded-2xl`}>
                            <li>
                                <h1 className={`text-3xl text-center`}>Гарантии и поддержка</h1>
                            </li>
                            {
                                guarantees.map((guarantees, index) => (
                                    <li key={guarantees} className={`flex flex-row items-center justify-start gap-4 max-w-[300px] sm:max-w-[500px]`}>
                                        <i className={`bi bi-${index + 1}-circle text-blue-400 p-1 text-xl`}></i>
                                        <p className={`w-full text-2xl`}>{guarantees}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className="president-box flex flex-col items-center gap-5">
                <div className="president-head flex flex-col gap-4 p-4 bg-[#181a1e] rounded-2xl max-w-[300px] sm:max-w-[500px]">
                    <div className="image h-[300px] overflow-hidden ">
                        <img src="/putin.png" alt="" className="w-full h-full object-cover rounded-full text-center border-4 border-solid border-blue-600"/>
                    </div>

                    <div className="description flex flex-col gap-2 bg-[#131417] p-2 text-center rounded-2xl">
                        <p>Президент Российской Федерации</p>
                        <p>Владимир Владимирович Путин</p>
                    </div>
                </div>
                <div className="president-quote flex flex-col gap-5 items-center p-4">
                    <div className="quote">
                        <p className={`p-4 bg-[#181a1e] rounded-2xl max-w-[300px] sm:max-w-[500px] text-xl text-left`}>
                            На острие решения самых сложных задач, ответственных и опасных, безусловно, находятся наши военные, наши воины, находящиеся в зоне специальной военной операции. Я искренне считаю, что все они - герои, все, кто несет это тяжелую, ответственную и опасную службу
                        </p>
                    </div>
                    <div className="buttons p-4 bg-blue-600 text-center rounded-2xl">
                        <a href="http://putin.kremlin.ru/bio/">
                            Узнать больше о президенте
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}


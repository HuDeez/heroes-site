import {useOutletContext} from "react-router-dom";

export default function About() {

    const [isMobile] = useOutletContext()

    return (
        <>
            {
                isMobile ?
                    <MobileAbout />
                    :
                    <DesktopAbout />
            }
        </>
    )
}

function DesktopAbout() {
    return (
        <>
            <div className="about-head">
                <h1 className={`text-4xl`}>О проекте</h1>
            </div>
            <div className="about grid grid-cols-2 gap-4 p-4">
                <p className={`p-4 bg-[#181a1e] text-2xl rounded-2xl leading-10`}>Проект посвящён подвигам участников Специальной военной операции, удостоенных медали «Золотая Звезда». Основу составляют реальные события, восстановленные по рассказам героев, сослуживцев и архивным материалам.</p>
                <p className={`p-4 bg-[#181a1e] text-2xl rounded-2xl leading-10`}>Визуальный формат выбран для наглядной передачи информации школьникам и молодёжи. Подвиги лётчиков, танкистов, десантников и разведчиков представлены через иллюстрации, выполненные на основе документальных фотографий.</p>
                <p className={`p-4 bg-[#181a1e] text-2xl rounded-2xl leading-10`}>Работа над материалами велась в свободное от основной деятельности время. Информация может быть использована для проведения тематических уроков и классных часов.</p>
                <p className={`p-4 bg-[#181a1e] text-2xl rounded-2xl leading-10`}>Проект продолжает развиваться и охватывает еще больше историй с передовой, позволяя узнать о многих других совершенных подвигах</p>
            </div>
            <div className="contribution">
                <div className="contribution-head w-full text-center p-4">
                    <p className={`text-2xl w-1/2 inline-block p-3 bg-[#181a1e] rounded-2xl leading-10`}>Вы можете стать частью проекта, прислав нам историю в Telegram или VKontakte о своем родственнике, принимавшем участие в Специальной Военной Операции</p>
                </div>
            </div>
        </>
    )
}

function MobileAbout() {
    return (
        <>
            <div className="about-head">
                <h1 className={`text-4xl`}>О проекте</h1>
            </div>
            <div className="about grid grid-cols-1 gap-8 p-4">
                <p className={`p-4 bg-[#181a1e] text-2xl rounded-2xl leading-10`}>Проект посвящён подвигам участников Специальной военной операции, удостоенных медали «Золотая Звезда». Основу составляют реальные события, восстановленные по рассказам героев, сослуживцев и архивным материалам.</p>
                <p className={`p-4 bg-[#181a1e] text-2xl rounded-2xl leading-10`}>Визуальный формат выбран для наглядной передачи информации школьникам и молодёжи. Подвиги лётчиков, танкистов, десантников и разведчиков представлены через иллюстрации, выполненные на основе документальных фотографий.</p>
                <p className={`p-4 bg-[#181a1e] text-2xl rounded-2xl leading-10`}>Работа над материалами велась в свободное от основной деятельности время. Информация может быть использована для проведения тематических уроков и классных часов.</p>
                <p className={`p-4 bg-[#181a1e] text-2xl rounded-2xl leading-10`}>Проект продолжает развиваться и охватывает еще больше историй с передовой, позволяя узнать о многих других совершенных подвигах</p>
            </div>
            <div className="contribution">
                <div className="contribution-head p-4">
                    <p className={`text-2xl inline-block p-3 bg-[#181a1e] rounded-2xl leading-10`}>Вы можете стать частью проекта, прислав нам историю в Telegram или VKontakte о своем родственнике, принимавшем участие в Специальной Военной Операции</p>
                </div>
            </div>
        </>
    )
}

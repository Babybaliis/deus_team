import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import InputMask from "react-input-mask";
import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './cta.scss'

import manager from '../../img/manager.png';
import axios from './../../axios'
import RetryImage from "../../helpers/RetryImage";
import WOW from "wowjs";
import {connect, useSelector} from "react-redux";
import RoundButton from "../animation/roundButton";
import {Icon} from "../icon/Icon";

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : process.env.REACT_APP_LOCALHOST_URI;

function Checkbox(props) {
    return (
        <Field name={props.name}>
            {({ field, form }) => (
                <label className="form__checks-label">
                    <input
                        {...field}
                        type="checkbox"
                        checked={field.value.includes(props.value)}
                        onChange={() => {
                            const set = new Set(field.value);
                            if (set.has(props.value)) {
                                set.delete(props.value);
                            } else {
                                set.add(props.value);
                            }
                            form.setFieldValue(field.name, (Array.from(set)));
                        }}
                    />
                    <div className="form__checks-c">
                        <div className="form__checks-text">
                            {props.text}
                        </div>
                    </div>
                </label>
            )}
        </Field>
    );
}

const Cta = (props) => {


    const [worker, setWorker] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //         const wow = new WOW.WOW();
    //         wow.init();
    //         wow.sync();
    // });

    useEffect(() => {
        contacts.map((item, index) => (
            item.pageName === props.formName ? setWorker(item) : null
        ))
    }, [props]);

    useEffect(() => {
        const event = new CustomEvent("isLoadingMainPage", {detail: {isLoading: true}});
        window.dispatchEvent(event)

        const handleLoad = (e) => {
            if (e.detail.isLoading !== isLoading) {
                setIsLoading(e.detail.isLoading);
            }
        };

        window.addEventListener('isLoadingMainPage', handleLoad);
        return () => {
            window.removeEventListener('isLoadingMainPage', handleLoad);
        };
    },[]);


    const { formName } = props;
    const [success, setSuccess] = useState(false);


    const sendEmail = async (values) => {
        try {
            const response = await axios.post(`${apiUrl}/api/mail`, values);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const {services, contacts } = props;
    return (
        <>
            {!isLoading &&
        <section className="cta">
            <div className="container">
                <div className="cta__wrap">
                    <div>
                        <span className="sticky-h2">
                        <h2 className="heading-secondary">Брифы для заполнения</h2>
                        <div className="cta__wrap-wrapper">
                            <a href="/services/firmennii-stil">
                                <div className="item p-style">
                                    <div>Фирменный стиль</div>
                                    <img src="/static/media/arrow-go.16debacde59dcde765fc801f2b622b05.svg" alt="go"/>
                                </div>
                            </a>
                            <a href="/services/saiti-i-servisi">
                                <div className="item p-style">
                                    <div>Сайты и сервисы</div>
                                    <img src="/static/media/arrow-go.16debacde59dcde765fc801f2b622b05.svg" alt="go"/>
                                </div>
                            </a>
                            <a href="/services/podderzhka-i-razvitie">
                                <div className="item p-style">
                                    <div>Поддержка и развитие</div>
                                    <img src="/static/media/arrow-go.16debacde59dcde765fc801f2b622b05.svg" alt="go"/>
                                </div>
                            </a>
                            <a href="/services/seo-prodvizhenie">
                                <div className="item p-style">
                                    <div>SEO продвижение</div>
                                    <img src="/static/media/arrow-go.16debacde59dcde765fc801f2b622b05.svg" alt="go"/>
                                </div>
                            </a>
                        </div>
                        <p className="p-style-grey pb-20">После заполнения брифа<br/> пришлите его нам на почту</p>
                        <p className="heading-tertiary">hello@de-us.ru</p>
                        </span>
                    </div>

                    <div>
                        {/*<div className="cta__person sticky-person">*/}
                        {/*    /!* <img src={formName === 'tender' ? tender : manager} alt={formName === 'tender' ? 'Позвать в тендер' : 'Хотите обсудить проект?'} className="cta__person-img" /> *!/*/}
                        {/*    {*/}
                        {/*        worker && worker.image ?*/}
                        {/*            (*/}
                        {/*                    <RetryImage src={`${apiUrl}/uploads/${worker.image.filename}`} alt={worker.title}*/}
                        {/*                         className="cta__person-img"/>*/}
                        {/*            ) : (*/}
                        {/*                    <img src={manager} alt="Хотите обсудить проект?" className="cta__person-img"/>*/}
                        {/*            )*/}
                        {/*    }*/}
                        {/*    <div className="cta__person-descr">*/}
                        {/*        /!* {*/}
                        {/*        formName === 'tender' ? 'Алена Фролова — тендерный специалист, ответит на ваши вопросы и организует встречу'*/}
                        {/*            : 'Павел Докторов — Менеджер проектов, ответит на ваши вопросы и организует встречу'*/}
                        {/*    } *!/*/}
                        {/*        {*/}
                        {/*            worker && worker.description ? worker.description : null*/}
                        {/*        }*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="cta__f">
                        <Formik
                            initialValues={{ name: '', company: '', phone: '', email: '', about: '', file: '', ctaServices: [], budget: '', formName: formName === 'tender' ? 'Тендер' : 'Хотите обсудить проект?' }}
                            validate={values => {
                                const errors = {};
                                if (!values.name || values.name.length < 2) {
                                    errors.name = 'Обязательное поле';
                                }
                                if (!values.company || values.company.length < 2) {
                                    errors.company = 'Обязательное поле';
                                }
                                if (!values.phone || values.phone.indexOf("_") !== -1) {
                                    errors.phone = 'Обязательное поле';
                                }
                                if (!values.email || !(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))) {
                                    errors.email = 'Обязательное поле';
                                }
                                if (!values.about || values.about.length < 2) {
                                    errors.about = 'Обязательное поле';
                                }
                                if (values.ctaServices.length === 0) {
                                    errors.ctaServices = 'Обязательное поле';
                                }
                                if (!values.budget.length) {
                                    errors.budget = 'Обязательное поле';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setTimeout(() => {
                                    console.log(values);
                                    sendEmail(values);
                                    setSuccess(true);
                                    const formData = new FormData();
                                    for (const [key, value] of Object.entries(values)) {
                                        formData.append(key, value);
                                    }

                                    axios.post(`${apiUrl}/api/form/`, formData)
                                        .then((response) => {
                                            console.log(response.data);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                    setSubmitting(false);
                                    resetForm();
                                }, 400);
                                setTimeout(() => {
                                    setSuccess(false);
                                }, 4554);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                setFieldValue,
                            }) => (

                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="form__inner" style={{ display: success ? 'none' : 'block' }}>
                                        <input type="hidden" name="formName" value={formName === 'tender' ? 'Тендер' : 'Обсудить проект'} />
                                        <div className="form__title">Хотите обсудить проект?</div>
                                        <div className="form__checks">
                                            <div className="form__checks-title">Выберите услугу</div>
                                            <div className="form__checks-wrap">
                                                <Checkbox name="ctaServices" value="Фирменный стиль" text="Фирменный стиль" />
                                                <Checkbox name="ctaServices" value="Сайты и сервисы" text="Сайты и сервисы" />
                                                <Checkbox name="ctaServices" value="Контент - маркетинг" text="Контент - маркетинг" />
                                                <Checkbox name="ctaServices" value="SEO - продвижение" text="SEO - продвижение" />
                                                <Checkbox name="ctaServices" value="Лидогенерация" text="Лидогенерация" />
                                                <Checkbox name="ctaServices" value="Поддержка и развитие" text="Поддержка и развитие" />
                                            </div>
                                            <div className="form__error">{errors.ctaServices && touched.ctaServices && errors.ctaServices}</div>
                                        </div>
                                        <div className="form__wrap">
                                            <div className="form__group">
                                                <input type="text" name="name" className="form__input" onChange={handleChange} value={values.name} placeholder="Ваше имя" />
                                                <div className="form__error">{errors.name && touched.name && errors.name}</div>
                                            </div>
                                            <div className="form__group">
                                                <input type="text" name="company" className="form__input" onChange={handleChange} value={values.company} placeholder="Компания" />
                                                <div className="form__error">{errors.company && touched.company && errors.company}</div>
                                            </div>
                                        </div>
                                        <div className="form__wrap">
                                            <div className="form__group">
                                                <InputMask type="text" name="phone" className="form__input" onChange={handleChange} value={values.phone} placeholder="Номер телефона" mask="+7 (999) 999-99-99" />
                                                <div className="form__error">{errors.phone && touched.phone && errors.phone}</div>
                                            </div>
                                            <div className="form__group">
                                                <input type="text" name="email" className="form__input" onChange={handleChange} value={values.email} placeholder="E-mail" />
                                                <div className="form__error">{errors.email && touched.email && errors.email}</div>
                                            </div>
                                        </div>
                                        <div className="form__wrap">
                                            <div className="form__group">
                                                <textarea type="text" name="about" className="form__textarea h-170" onChange={handleChange} value={values.about} placeholder="Расскажите кратко о себе" />
                                                <div className="form__error">{errors.about && touched.about && errors.about}</div>
                                            </div>
                                        </div>

                                        <div className="form__checks">
                                            <div className="form__checks-title">Бюджет</div>
                                            <div className="form__checks-wrap">
                                                <label className="form__checks-label">
                                                    <input
                                                        type="radio"
                                                        name="budget"
                                                        checked={values.budget === "менее 200к ₽"}
                                                        onChange={() => setFieldValue("budget", "менее 200к ₽")}
                                                    />
                                                    <div className="form__checks-c">
                                                        <div className="form__checks-text">
                                                            менее 200к ₽
                                                        </div>
                                                    </div>
                                                </label>
                                                <label className="form__checks-label">
                                                    <input
                                                        type="radio"
                                                        name="budget"
                                                        checked={values.budget === "200к—500к ₽"}
                                                        onChange={() => setFieldValue("budget", "200к—500к ₽")}
                                                    />
                                                    <div className="form__checks-c">
                                                        <div className="form__checks-text">
                                                            200к—500к ₽
                                                        </div>
                                                    </div>
                                                </label>
                                                <label className="form__checks-label">
                                                    <input
                                                        type="radio"
                                                        name="budget"
                                                        checked={values.budget === "от 1 млн ₽"}
                                                        onChange={() => setFieldValue("budget", "от 1 млн ₽")}
                                                    />
                                                    <div className="form__checks-c">
                                                        <div className="form__checks-text">
                                                            от 1 млн ₽
                                                        </div>
                                                    </div>
                                                </label>
                                                <label className="form__checks-label">
                                                    <input
                                                        type="radio"
                                                        name="budget"
                                                        checked={values.budget === "Лидогенерация"}
                                                        onChange={() => setFieldValue("budget", "Лидогенерация")}
                                                    />
                                                    <div className="form__checks-c">
                                                        <div className="form__checks-text">
                                                            Лидогенерация
                                                        </div>
                                                    </div>
                                                </label>
                                                <label className="form__checks-label">
                                                    <input
                                                        type="radio"
                                                        name="budget"
                                                        checked={values.budget === "Поддержка и развитие"}
                                                        onChange={() => setFieldValue("budget", "Поддержка и развитие")}
                                                    />
                                                    <div className="form__checks-c">
                                                        <div className="form__checks-text">
                                                            Поддержка и развитие
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div className="form__error">{errors.budget && touched.budget && errors.budget}</div>
                                        </div>

                                        <div className="form__file">
                                            <label className="form__file-label">
                                                Прикрепить файл
                                            </label>
                                            <label>
                                                <input id="file" name="file" type="file" onChange={(event) => {
                                                    console.log(event.currentTarget.files[0]);
                                                    setFieldValue("file", event.currentTarget.files[0]);
                                                }} />
                                                <Icon icon="file" />
                                            </label>

                                            {
                                                values.file ?
                                                    <div className="form__file-f">
                                                        {values.file.name}
                                                        <div className="form__file-delete" onClick={(event) => {
                                                            setFieldValue("file", null);
                                                        }}>&times;</div>
                                                    </div>
                                                    : null
                                            }
                                            <button type="submit" className='btn --white'>
                                                Отправить
                                            </button>
                                            <div className="form__check p-style-grey">
                                             <span className='span'>
                                                <Popup
                                                    trigger={<span>Нажимая кнопку «Отправить», вы соглашаетесь с нашей политикой в отношении обработки персональных данных </span>}
                                                    modal
                                                    nested
                                                >
                                                    {close => (
                                                        <div className="modalAgree">
                                                            <button className="modalClose" onClick={close}>
                                                                &times;
                                                            </button>
                                                            <div className="modalHeader"> Политика в отношении обработки персональных данных </div>
                                                            <div className='modalContent'>
                                                                <br/><p className='toCenter'>1. Общие положения</p><br/>
                                                                Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. № 152-ФЗ «О персональных данных» (далее — Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ООО "ДЕУС" (далее — Оператор).<br/>
                                                                1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.<br/>
                                                                1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://deus.team.<br/>
                                                                <br/><p className='toCenter'>2. Основные понятия, используемые в Политике</p><br/>
                                                                2.1. Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники.<br/>
                                                                2.2. Блокирование персональных данных — временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).<br/>
                                                                2.3. Веб-сайт — совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://deus.team.<br/>
                                                                2.4. Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств.<br/>
                                                                2.5. Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных.<br/>
                                                                2.6. Обработка персональных данных — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.<br/>
                                                                2.7. Оператор — государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и/или осуществляющие обработку персональных данных, а также определяющие цели обработки персональных данных, состав персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными.<br/>
                                                                2.8. Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта https://deus.team.<br/>
                                                                2.9. Персональные данные, разрешенные субъектом персональных данных для распространения, — персональные данные, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных путем дачи согласия на обработку персональных данных, разрешенных субъектом персональных данных для распространения в порядке, предусмотренном Законом о персональных данных (далее — персональные данные, разрешенные для распространения).<br/>
                                                                2.10. Пользователь — любой посетитель веб-сайта https://deus.team.<br/>
                                                                2.11. Предоставление персональных данных — действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.<br/>
                                                                2.12. Распространение персональных данных — любые действия, направленные на раскрытие персональных данных неопределенному кругу лиц (передача персональных данных) или на ознакомление с персональными данными неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к персональным данным каким-либо иным способом.<br/>
                                                                2.13. Трансграничная передача персональных данных — передача персональных данных на территорию иностранного государства органу власти иностранного государства, иностранному физическому или иностранному юридическому лицу.<br/>
                                                                2.14. Уничтожение персональных данных — любые действия, в результате которых персональные данные уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных в информационной системе персональных данных и/или уничтожаются материальные носители персональных данных.<br/>
                                                                <br/><p className='toCenter'>3. Основные права и обязанности Оператора</p><br/>
                                                                3.1. Оператор имеет право:<br/>
                                                                — получать от субъекта персональных данных достоверные информацию и/или документы, содержащие персональные данные;<br/>
                                                                — в случае отзыва субъектом персональных данных согласия на обработку персональных данных, а также, направления обращения с требованием о прекращении обработки персональных данных, Оператор вправе продолжить обработку персональных данных без согласия субъекта персональных данных при наличии оснований, указанных в Законе о персональных данных;<br/>
                                                                — самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей, предусмотренных Законом о персональных данных и принятыми в соответствии с ним нормативными правовыми актами, если иное не предусмотрено Законом о персональных данных или другими федеральными законами.<br/>
                                                                3.2. Оператор обязан:<br/>
                                                                — предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных;<br/>
                                                                — организовывать обработку персональных данных в порядке, установленном действующим законодательством РФ;<br/>
                                                                — отвечать на обращения и запросы субъектов персональных данных и их законных представителей в соответствии с требованиями Закона о персональных данных;<br/>
                                                                — сообщать в уполномоченный орган по защите прав субъектов персональных данных по запросу этого органа необходимую информацию в течение 10 дней с даты получения такого запроса;<br/>
                                                                — публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике в отношении обработки персональных данных;<br/>
                                                                — принимать правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных;<br/>
                                                                — прекратить передачу (распространение, предоставление, доступ) персональных данных, прекратить обработку и уничтожить персональные данные в порядке и случаях, предусмотренных Законом о персональных данных;<br/>
                                                                — исполнять иные обязанности, предусмотренные Законом о персональных данных.<br/>
                                                                <br/><p className='toCenter'>4. Основные права и обязанности субъектов персональных данных</p><br/>
                                                                4.1. Субъекты персональных данных имеют право:<br/>
                                                                — получать информацию, касающуюся обработки его персональных данных, за исключением случаев, предусмотренных федеральными законами. Сведения предоставляются субъекту персональных данных Оператором в доступной форме, и в них не должны содержаться персональные данные, относящиеся к другим субъектам персональных данных, за исключением случаев, когда имеются законные основания для раскрытия таких персональных данных. Перечень информации и порядок ее получения установлен Законом о персональных данных;<br/>
                                                                — требовать от оператора уточнения его персональных данных, их блокирования или уничтожения в случае, если персональные данные являются неполными, устаревшими, неточными, незаконно полученными или не являются необходимыми для заявленной цели обработки, а также принимать предусмотренные законом меры по защите своих прав;<br/>
                                                                — выдвигать условие предварительного согласия при обработке персональных данных в целях продвижения на рынке товаров, работ и услуг;<br/>
                                                                — на отзыв согласия на обработку персональных данных, а также, на направление требования о прекращении обработки персональных данных;<br/>
                                                                — обжаловать в уполномоченный орган по защите прав субъектов персональных данных или в судебном порядке неправомерные действия или бездействие Оператора при обработке его персональных данных;<br/>
                                                                — на осуществление иных прав, предусмотренных законодательством РФ.<br/>
                                                                4.2. Субъекты персональных данных обязаны:<br/>
                                                                — предоставлять Оператору достоверные данные о себе;<br/>
                                                                — сообщать Оператору об уточнении (обновлении, изменении) своих персональных данных.<br/>
                                                                4.3. Лица, передавшие Оператору недостоверные сведения о себе, либо сведения о другом субъекте персональных данных без согласия последнего, несут ответственность в соответствии с законодательством РФ.<br/>
                                                                <br/><p className='toCenter'>5. Принципы обработки персональных данных</p><br/>
                                                                5.1. Обработка персональных данных осуществляется на законной и справедливой основе.<br/>
                                                                5.2. Обработка персональных данных ограничивается достижением конкретных, заранее определенных и законных целей. Не допускается обработка персональных данных, несовместимая с целями сбора персональных данных.<br/>
                                                                5.3. Не допускается объединение баз данных, содержащих персональные данные, обработка которых осуществляется в целях, несовместимых между собой.<br/>
                                                                5.4. Обработке подлежат только персональные данные, которые отвечают целям их обработки.<br/>
                                                                5.5. Содержание и объем обрабатываемых персональных данных соответствуют заявленным целям обработки. Не допускается избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.<br/>
                                                                5.6. При обработке персональных данных обеспечивается точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных. Оператор принимает необходимые меры и/или обеспечивает их принятие по удалению или уточнению неполных или неточных данных.<br/>
                                                                5.7. Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных. Обрабатываемые персональные данные уничтожаются либо обезличиваются по достижении целей обработки или в случае утраты необходимости в достижении этих целей, если иное не предусмотрено федеральным законом.
                                                                <br/><p className='toCenter'>6. Цели обработки персональных данных</p><br/>
                                                                <table>
                                                                    <tr>
                                                                        <td>Цель обработки</td>
                                                                        <td>Информирование Пользователя посредством отправки электронных писем</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Персональные данные</td>
                                                                        <td>фамилия, имя, отчество электронный адрес номера телефонов</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Правовые основания</td>
                                                                        <td>уставные (учредительные) документы Оператора договоры, заключаемые между оператором и субъектом персональных данных</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Виды обработки персональных данных</td>
                                                                        <td>Сбор, запись, систематизация, накопление, хранение, уничтожение и обезличивание персональных данных</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>Отправка информационных писем на адрес электронной почты</td>
                                                                    </tr>
                                                                </table>
                                                                <br/><p className='toCenter'>7. Условия обработки персональных данных</p><br/>
                                                                7.1. Обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных.<br/>
                                                                7.2. Обработка персональных данных необходима для достижения целей, предусмотренных международным договором Российской Федерации или законом, для осуществления возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей.<br/>
                                                                7.3. Обработка персональных данных необходима для осуществления правосудия, исполнения судебного акта, акта другого органа или должностного лица, подлежащих исполнению в соответствии с законодательством Российской Федерации об исполнительном производстве.<br/>
                                                                7.4. Обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем.<br/>
                                                                7.5. Обработка персональных данных необходима для осуществления прав и законных интересов оператора или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных.<br/>
                                                                7.6. Осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе (далее — общедоступные персональные данные).<br/>
                                                                7.7. Осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом.<br/>
                                                                <br/><p className='toCenter'>8. Порядок сбора, хранения, передачи и других видов обработки персональных данных</p><br/>
                                                                Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем реализации правовых, организационных и технических мер, необходимых для выполнения в полном объеме требований действующего законодательства в области защиты персональных данных.<br/>
                                                                8.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.<br/>
                                                                8.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в случае, если субъектом персональных данных дано согласие Оператору на передачу данных третьему лицу для исполнения обязательств по гражданско-правовому договору.<br/>
                                                                8.3. В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора hello@de-us.ru с пометкой «Актуализация персональных данных».<br/>
                                                                8.4. Срок обработки персональных данных определяется достижением целей, для которых были собраны персональные данные, если иной срок не предусмотрен договором или действующим законодательством.<br/>
                                                                Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора hello@de-us.ru с пометкой «Отзыв согласия на обработку персональных данных». <br/>
                                                                8.5. Вся информация, которая собирается сторонними сервисами, в том числе платежными системами, средствами связи и другими поставщиками услуг, хранится и обрабатывается указанными лицами (Операторами) в соответствии с их Пользовательским соглашением и Политикой конфиденциальности. Субъект персональных данных и/или с указанными документами. Оператор не несет ответственность за действия третьих лиц, в том числе указанных в настоящем пункте поставщиков услуг. <br/>
                                                                8.6. Установленные субъектом персональных данных запреты на передачу (кроме предоставления доступа), а также на обработку или условия обработки (кроме получения доступа) персональных данных, разрешенных для распространения, не действуют в случаях обработки персональных данных в государственных, общественных и иных публичных интересах, определенных законодательством РФ. <br/>
                                                                8.7. Оператор при обработке персональных данных обеспечивает конфиденциальность персональных данных. <br/>
                                                                8.8. Оператор осуществляет хранение персональных данных в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных. <br/>
                                                                8.9. Условием прекращения обработки персональных данных может являться достижение целей обработки персональных данных, истечение срока действия согласия субъекта персональных данных, отзыв согласия субъектом персональных данных или требование о прекращении обработки персональных данных, а также выявление неправомерной обработки персональных данных.<br/>
                                                                <br/><p className='toCenter'>9. Перечень действий, производимых Оператором с полученными персональными данными</p><br/>
                                                                9.1. Оператор осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных.<br/>
                                                                9.2. Оператор осуществляет автоматизированную обработку персональных данных с получением и/или передачей полученной информации по информационно-телекоммуникационным сетям или без таковой.<br/>
                                                                <br/><p className='toCenter'>10. Трансграничная передача персональных данных</p><br/>
                                                                10.1. Оператор до начала осуществления деятельности по трансграничной передаче персональных данных обязан уведомить уполномоченный орган по защите прав субъектов персональных данных о своем намерении осуществлять трансграничную передачу персональных данных (такое уведомление направляется отдельно от уведомления о намерении осуществлять обработку персональных данных).<br/>
                                                                10.2. Оператор до подачи вышеуказанного уведомления, обязан получить от органов власти иностранного государства, иностранных физических лиц, иностранных юридических лиц, которым планируется трансграничная передача персональных данных, соответствующие сведения.<br/>
                                                                <br/><p className='toCenter'>11. Конфиденциальность персональных данных</p><br/>
                                                                Оператор и иные лица, получившие доступ к персональным данным, обязаны не раскрывать третьим лицам и не распространять персональные данные без согласия субъекта персональных данных, если иное не предусмотрено федеральным законом.<br/>
                                                                <br/><p className='toCenter'>12. Заключительные положения</p><br/>
                                                                12.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты hello@de-us.ru.<br/>
                                                                12.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.<br/>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Popup>





                                            </span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="form__success" style={{ display: success ? 'block' : 'none' }}>
                                        <div className="form__success-title">Заявка отправлена!</div>
                                        <div className="form__success-descr">Ожидайте, скоро мы с вами свяжемся</div>
                                    </div>
                                    
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
            }
        </>
    )

}

export default connect(
    (state) => (
        {
            services: state.app.services,
            contacts: state.app.contacts
        }
    )
)(Cta)
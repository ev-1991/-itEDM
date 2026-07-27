(() => {
  "use strict";

  const supportedLanguages = ["ru", "kk", "en"];
  let currentLanguage = "ru";
  try {
    const savedLanguage = localStorage.getItem("itedm-language");
    if (supportedLanguages.includes(savedLanguage)) currentLanguage = savedLanguage;
  } catch {}

  const translationRows = [
    ["ТОО itEDM — IT-решения для бизнеса в Алматы", "itEDM ЖШС — Алматыдағы бизнеске арналған IT-шешімдер", "itEDM LLP — IT solutions for business in Almaty"],
    ["ТОО itEDM — комплексное IT-обслуживание бизнеса в Алматы: аутсорсинг, сети, серверы, кибербезопасность и видеонаблюдение.", "itEDM ЖШС — Алматыдағы бизнеске кешенді IT-қызмет көрсету: аутсорсинг, желілер, серверлер, киберқауіпсіздік және бейнебақылау.", "itEDM LLP provides complete business IT services in Almaty: outsourcing, networks, servers, cybersecurity and video surveillance."],
    ["IT-решения для бизнеса", "Бизнеске арналған IT-шешімдер", "IT solutions for business"],
    ["Язык сайта", "Сайт тілі", "Website language"],
    ["Выберите язык сайта", "Сайт тілін таңдаңыз", "Choose website language"],
    ["Услуги", "Қызметтер", "Services"],
    ["Калькулятор", "Калькулятор", "Calculator"],
    ["О компании", "Компания туралы", "About us"],
    ["Как работаем", "Қалай жұмыс істейміз", "How we work"],
    ["Как мы работаем", "Қалай жұмыс істейміз", "How we work"],
    ["Контакты", "Байланыстар", "Contacts"],
    ["Позвонить", "Қоңырау шалу", "Call us"],
    ["Настройки отображения", "Көрсету параметрлері", "Display settings"],
    ["Включить тёмную тему", "Қараңғы тақырыпты қосу", "Enable dark theme"],
    ["Включить светлую тему", "Жарық тақырыпты қосу", "Enable light theme"],
    ["Увеличить текст", "Мәтінді үлкейту", "Increase text size"],
    ["Вернуть обычный размер текста", "Қалыпты мәтін өлшемін қайтару", "Restore normal text size"],
    ["Открыть меню", "Мәзірді ашу", "Open menu"],
    ["Закрыть меню", "Мәзірді жабу", "Close menu"],
    ["Главная навигация", "Негізгі навигация", "Main navigation"],
    ["Основные направления itEDM", "itEDM негізгі бағыттары", "itEDM core services"],
    ["SMART NETWORK", "SMART NETWORK", "SMART NETWORK"],
    ["DNA-сеть активна", "DNA-желі белсенді", "DNA network active"],
    ["IT-аутсорсинг в Алматы", "Алматыдағы IT-аутсорсинг", "IT outsourcing in Almaty"],
    ["IT-инфраструктура,", "IT-инфрақұрылым,", "IT infrastructure"],
    ["которая работает", "сіздің бизнесіңіз үшін", "that works"],
    ["на ваш бизнес", "жұмыс істейді", "for your business"],
    ["Берём под контроль компьютеры, серверы, сети и безопасность — от разового выезда до полного сопровождения.", "Компьютерлерді, серверлерді, желілерді және қауіпсіздікті толық бақылауға аламыз — бір реттік шақырудан тұрақты сүйемелдеуге дейін.", "We keep your computers, servers, networks and security under control — from a one-time visit to complete ongoing support."],
    ["Оставить заявку", "Өтінім қалдыру", "Request service"],
    ["Наши услуги", "Біздің қызметтер", "Our services"],
    ["✓ Стабильно. Безопасно. Профессионально.", "✓ Тұрақты. Қауіпсіз. Кәсіби.", "✓ Stable. Secure. Professional."],
    ["Кибербезопасность", "Киберқауіпсіздік", "Cybersecurity"],
    ["Защитим сеть,", "Желіні, серверлерді", "We protect your"],
    ["серверы и данные", "және компания деректерін", "network, servers"],
    ["компании", "қорғаймыз", "and company data"],
    ["Аудит, устранение уязвимостей, Firewall, резервное копирование и безопасная сегментация сети.", "Аудит, осалдықтарды жою, Firewall, резервтік көшіру және желіні қауіпсіз сегменттеу.", "Audits, vulnerability remediation, firewalls, backups and secure network segmentation."],
    ["Получить консультацию", "Кеңес алу", "Get a consultation"],
    ["Подробнее", "Толығырақ", "Learn more"],
    ["✓ Защита вашего бизнеса 24/7", "✓ Бизнесіңізді тәулік бойы қорғау", "✓ 24/7 protection for your business"],
    ["СКС • ЛВС • Видеонаблюдение", "ҚКЖ • ЖЕЖ • Бейнебақылау", "SCS • LAN • Video surveillance"],
    ["Инфраструктура", "Инфрақұрылым", "Infrastructure"],
    ["под ключ — от", "кілтпен тапсыру —", "delivered turnkey —"],
    ["проекта до запуска", "жобадан іске қосуға дейін", "from design to launch"],
    ["Сети, Wi‑Fi, VLAN, серверные, IP-камеры и системы контроля доступа с гарантией на работы.", "Желілер, Wi‑Fi, VLAN, серверлік бөлмелер, IP-камералар және қолжетімділікті басқару жүйелері — жұмыс кепілдігімен.", "Networks, Wi‑Fi, VLANs, server rooms, IP cameras and access control systems, all backed by a workmanship warranty."],
    ["Рассчитать проект", "Жобаны есептеу", "Estimate your project"],
    ["✓ Один подрядчик на весь проект", "✓ Бүкіл жобаға бір мердігер", "✓ One contractor for the entire project"],
    ["Предыдущий слайд", "Алдыңғы слайд", "Previous slide"],
    ["Следующий слайд", "Келесі слайд", "Next slide"],
    ["Выбор слайда", "Слайдты таңдау", "Choose slide"],
    ["Слайд 1", "1-слайд", "Slide 1"],
    ["Слайд 2", "2-слайд", "Slide 2"],
    ["Слайд 3", "3-слайд", "Slide 3"],
    ["СИСТЕМЫ ПОД КОНТРОЛЕМ", "ЖҮЙЕЛЕР БАҚЫЛАУДА", "SYSTEMS UNDER CONTROL"],
    ["Полный цикл", "Толық цикл", "Full service cycle"],
    ["от аудита до постоянной поддержки", "аудиттен тұрақты қолдауға дейін", "from audit to ongoing support"],
    ["Преимущество полного цикла", "Толық циклдің артықшылығы", "Full-cycle advantage"],
    ["Преимущества", "Артықшылықтар", "Benefits"],
    ["Оперативный выезд по Алматы", "Алматы бойынша жедел шығу", "Fast on-site support across Almaty"],
    ["Гарантия на выполненные работы", "Орындалған жұмыстарға кепілдік", "Warranty on completed work"],
    ["Наличный и безналичный расчёт", "Қолма-қол және қолма-қолсыз төлем", "Cash and cashless payment"],
    ["Для бизнеса и частных клиентов", "Бизнес пен жеке клиенттерге", "For businesses and private clients"],
    ["itEDM в цифрах", "itEDM сандармен", "itEDM in numbers"],
    ["Почему выбирают itEDM", "Неліктен itEDM таңдайды", "Why clients choose itEDM"],
    ["Технологии без хаоса.", "Ретсіздіксіз технология.", "Technology without chaos."],
    ["Результат без лишних слов.", "Артық сөзсіз нәтиже.", "Results without empty promises."],
    ["Разбираемся в задаче бизнеса, собираем решение в единую систему и остаёмся рядом после запуска.", "Бизнес міндетін түсініп, шешімді бір жүйеге біріктіреміз және іске қосылғаннан кейін де қолдау көрсетеміз.", "We understand the business challenge, bring the solution together as one system and stay with you after launch."],
    ["лет практического", "жыл практикалық", "years of hands-on"],
    ["IT-опыта", "IT-тәжірибе", "IT experience"],
    ["ключевых", "негізгі", "core service"],
    ["направлений", "бағыт", "areas"],
    ["один подрядчик", "бір мердігер", "one contractor"],
    ["на весь проект", "бүкіл жобаға", "for the whole project"],
    ["оперативная", "жедел көшпелі", "fast on-site"],
    ["выездная поддержка", "қолдау", "support"],
    ["Экспертиза itEDM", "itEDM сараптамасы", "itEDM expertise"],
    ["Все IT-задачи —", "Барлық IT-міндеттер —", "Every IT task —"],
    ["в одних руках", "бір сенімді командада", "handled by one team"],
    ["Создаём надёжную цифровую основу для офисов, магазинов, медицинских центров и производственных компаний.", "Кеңселер, дүкендер, медициналық орталықтар және өндірістік компаниялар үшін сенімді цифрлық негіз құрамыз.", "We build a reliable digital foundation for offices, shops, medical centers and manufacturing companies."],
    ["IT-аутсорсинг", "IT-аутсорсинг", "IT outsourcing"],
    ["Абонентское и разовое обслуживание, ремонт техники, установка Windows и Linux, удалённая и выездная поддержка.", "Абоненттік және бір реттік қызмет, техниканы жөндеу, Windows және Linux орнату, қашықтан және көшпелі қолдау.", "Subscription and one-time support, hardware repair, Windows and Linux installation, remote and on-site assistance."],
    ["Выезд", "Көшпелі қызмет", "On-site"],
    ["IT-аудит", "IT-аудит", "IT audit"],
    ["IT-аутстаффинг", "IT-аутстаффинг", "IT outstaffing"],
    ["Системные администраторы, сетевые инженеры и специалисты поддержки для временной или постоянной работы.", "Уақытша немесе тұрақты жұмысқа жүйелік әкімшілер, желілік инженерлер және қолдау мамандары.", "System administrators, network engineers and support specialists for temporary or permanent assignments."],
    ["Инженеры", "Инженерлер", "Engineers"],
    ["Админы", "Әкімшілер", "Admins"],
    ["Поддержка", "Қолдау", "Support"],
    ["Сети и СКС", "Желілер және ҚКЖ", "Networks and SCS"],
    ["Проектирование ЛВС, монтаж кабеля, маркировка и тестирование, MikroTik, Cisco, TP-Link, VLAN, Wi‑Fi и VPN.", "ЖЕЖ жобалау, кабель монтажы, таңбалау және тестілеу, MikroTik, Cisco, TP-Link, VLAN, Wi‑Fi және VPN.", "LAN design, cable installation, labeling and testing, MikroTik, Cisco, TP-Link, VLAN, Wi‑Fi and VPN."],
    ["СКС / ЛВС", "ҚКЖ / ЖЕЖ", "SCS / LAN"],
    ["Серверы и хранение", "Серверлер және сақтау", "Servers and storage"],
    ["Windows Server и Linux, Active Directory, файловые серверы, виртуализация, NAS и резервное копирование.", "Windows Server және Linux, Active Directory, файлдық серверлер, виртуализация, NAS және резервтік көшіру.", "Windows Server and Linux, Active Directory, file servers, virtualization, NAS and backups."],
    ["Аудит ИБ, поиск уязвимостей, защита от атак и фишинга, Firewall, политики доступа и обучение сотрудников.", "Ақпараттық қауіпсіздік аудиті, осалдықтарды іздеу, шабуылдар мен фишингтен қорғау, Firewall, қолжетімділік саясаты және қызметкерлерді оқыту.", "Security audits, vulnerability discovery, protection from attacks and phishing, firewall policies, access controls and staff training."],
    ["Аудит ИБ", "АҚ аудиті", "Security audit"],
    ["Защита", "Қорғау", "Protection"],
    ["1С, CRM и автоматизация", "1С, CRM және автоматтандыру", "1C, CRM and automation"],
    ["Установка и сопровождение 1С, внедрение CRM, интеграции с сайтом, телефонией и мессенджерами.", "1С орнату және сүйемелдеу, CRM енгізу, сайтпен, телефониямен және мессенджерлермен интеграция.", "1C installation and support, CRM implementation and integrations with websites, telephony and messengers."],
    ["Интеграции", "Интеграциялар", "Integrations"],
    ["Разработка сайтов", "Сайттар әзірлеу", "Website development"],
    ["Корпоративные сайты, каталоги и лендинги с мобильной адаптацией, технической поддержкой и обновлением.", "Мобильді бейімделуі, техникалық қолдауы және жаңартуы бар корпоративтік сайттар, каталогтар мен лендингтер.", "Corporate websites, catalogs and landing pages with mobile optimization, technical support and updates."],
    ["Слаботочные системы", "Әлсіз ток жүйелері", "Low-voltage systems"],
    ["Монтаж и обслуживание IP- и аналогового видеонаблюдения, СКУД, домофонии и пожарной сигнализации.", "IP және аналогтық бейнебақылауды, қолжетімділікті басқару жүйесін, домофония мен өрт дабылын монтаждау және қызмет көрсету.", "Installation and maintenance of IP and analog video surveillance, access control, intercoms and fire alarm systems."],
    ["Специалист обслуживает рабочий компьютер", "Маман жұмыс компьютеріне қызмет көрсетуде", "Technician servicing a workstation"],
    ["Команда технической поддержки помогает клиентам", "Техникалық қолдау тобы клиенттерге көмектесуде", "Technical support team assisting clients"],
    ["Инженер выполняет монтаж сетевых кабелей", "Инженер желілік кабельдерді монтаждауда", "Engineer installing network cabling"],
    ["Администратор работает в серверной", "Әкімші серверлік бөлмеде жұмыс істеуде", "Administrator working in a server room"],
    ["Центр мониторинга кибербезопасности", "Киберқауіпсіздік мониторинг орталығы", "Cybersecurity monitoring center"],
    ["Специалист настраивает CRM и аналитику", "Маман CRM мен аналитиканы баптауда", "Specialist configuring CRM and analytics"],
    ["Разработка адаптивного сайта на разных устройствах", "Әртүрлі құрылғыларға бейімделген сайт әзірлеу", "Responsive website development across devices"],
    ["Монтаж камеры видеонаблюдения", "Бейнебақылау камерасын монтаждау", "Video surveillance camera installation"],
    ["Ориентировочный расчёт", "Алдын ала есеп", "Quick estimate"],
    ["Узнайте стоимость", "Құнын біліңіз", "Estimate the cost"],
    ["за 30 секунд", "30 секундта", "in 30 seconds"],
    ["Выберите услугу и объём работ. Калькулятор сразу покажет предварительную сумму по средним ценам рынка Алматы.", "Қызмет пен жұмыс көлемін таңдаңыз. Калькулятор Алматы нарығындағы орташа бағалар бойынша алдын ала соманы бірден көрсетеді.", "Choose a service and quantity. The calculator instantly shows a preliminary estimate based on average Almaty market prices."],
    ["Услуга", "Қызмет", "Service"],
    ["IT-аутсорсинг — 1 компьютер / месяц", "IT-аутсорсинг — 1 компьютер / ай", "IT outsourcing — 1 computer / month"],
    ["Обслуживание сервера / месяц", "Серверге қызмет көрсету / ай", "Server support / month"],
    ["Монтаж СКС — 1 точка", "ҚКЖ монтажы — 1 нүкте", "SCS installation — 1 point"],
    ["Прокладка UTP-кабеля — 1 метр", "UTP-кабелін төсеу — 1 метр", "UTP cable installation — 1 meter"],
    ["Монтаж IP-камеры внутри помещения", "Ғимарат ішіндегі IP-камера монтажы", "Indoor IP camera installation"],
    ["Монтаж уличной IP-камеры", "Көшедегі IP-камера монтажы", "Outdoor IP camera installation"],
    ["Установка Windows и программ", "Windows және бағдарламаларды орнату", "Windows and software installation"],
    ["Базовое внедрение CRM", "CRM базалық енгізу", "Basic CRM implementation"],
    ["Разработка лендинга", "Лендинг әзірлеу", "Landing page development"],
    ["Разработка корпоративного сайта", "Корпоративтік сайт әзірлеу", "Corporate website development"],
    ["Количество", "Саны", "Quantity"],
    ["Уменьшить количество", "Санын азайту", "Decrease quantity"],
    ["Количество услуг", "Қызмет саны", "Service quantity"],
    ["Увеличить количество", "Санын арттыру", "Increase quantity"],
    ["Срочная работа", "Шұғыл жұмыс", "Urgent service"],
    ["в течение 24 часов · +20%", "24 сағат ішінде · +20%", "within 24 hours · +20%"],
    ["Ночь или выходной", "Түн немесе демалыс күні", "Night or weekend"],
    ["работы вне графика · +30%", "жұмыс уақытынан тыс · +30%", "outside business hours · +30%"],
    ["Предварительная стоимость", "Алдын ала құны", "Estimated cost"],
    ["Цена за единицу", "Бірлік бағасы", "Unit price"],
    ["Дополнительные условия", "Қосымша шарттар", "Additional conditions"],
    ["Уточнить расчёт в WhatsApp", "Есепті WhatsApp-та нақтылау", "Confirm estimate on WhatsApp"],
    ["Расчёт ориентировочный и не является публичной офертой. Оборудование и материалы не включены. Точная цена — после уточнения задачи или выезда.", "Есеп алдын ала берілген және жария оферта емес. Жабдық пен материалдар қосылмаған. Нақты баға міндетті анықтағаннан немесе нысанға шыққаннан кейін беріледі.", "This estimate is preliminary and is not a public offer. Equipment and materials are not included. The final price is confirmed after reviewing the task or visiting the site."],
    ["Результат расчёта стоимости", "Құнды есептеу нәтижесі", "Cost estimate result"],
    ["Как сформированы ориентировочные цены?", "Алдын ала бағалар қалай қалыптастырылды?", "How were the estimated prices calculated?"],
    ["Мы сверили открытые прайсы компаний Алматы на IT-аутсорсинг, СКС, видеонаблюдение, установку Windows, CRM и разработку сайтов. Значения округлены до среднего рыночного ориентира. Проверено 28.07.2026.", "Алматы компанияларының IT-аутсорсинг, ҚКЖ, бейнебақылау, Windows орнату, CRM және сайт әзірлеу бойынша ашық прайстарын салыстырдық. Мәндер нарықтың орташа деңгейіне дейін дөңгелектелді. 28.07.2026 тексерілді.", "We compared public Almaty price lists for IT outsourcing, SCS, video surveillance, Windows installation, CRM and website development. Values were rounded to an average market benchmark. Checked on 28 July 2026."],
    ["Камеры", "Камералар", "Cameras"],
    ["Сайты", "Сайттар", "Websites"],
    ["комплексный", "кешенді", "complete"],
    ["подход", "тәсіл", "approach"],
    ["Не просто чиним технику — создаём основу для роста", "Тек техниканы жөндемейміз — өсуге негіз құрамыз", "We do more than fix equipment — we build a foundation for growth"],
    ["ТОО itEDM — команда специалистов полного цикла IT-поддержки. Мы анализируем инфраструктуру, предупреждаем сбои и отвечаем за стабильную работу систем.", "itEDM ЖШС — толық циклді IT-қолдау мамандарының командасы. Инфрақұрылымды талдаймыз, ақаулардың алдын аламыз және жүйелердің тұрақты жұмысына жауап береміз.", "itEDM LLP is a full-cycle IT support team. We analyze infrastructure, prevent failures and take responsibility for stable system operation."],
    ["Комплексный подход", "Кешенді тәсіл", "Complete approach"],
    ["От кабельной линии до CRM и защиты данных.", "Кабель желісінен CRM мен деректерді қорғауға дейін.", "From cabling to CRM and data protection."],
    ["Практический опыт", "Практикалық тәжірибе", "Hands-on experience"],
    ["Офисы, медицина, торговля и производство.", "Кеңселер, медицина, сауда және өндіріс.", "Offices, healthcare, retail and manufacturing."],
    ["Гибкий формат", "Икемді формат", "Flexible service"],
    ["Разовые работы или абонентское обслуживание.", "Бір реттік жұмыстар немесе абоненттік қызмет.", "One-time work or subscription support."],
    ["Ответственность", "Жауапкершілік", "Accountability"],
    ["Гарантия, прозрачные сроки и понятный результат.", "Кепілдік, ашық мерзімдер және түсінікті нәтиже.", "Warranty, transparent timelines and clear results."],
    ["От заявки до", "Өтінімнен", "From request"],
    ["готового результата", "дайын нәтижеге дейін", "to completed work"],
    ["Без сложной бюрократии: быстро погружаемся в задачу и предлагаем понятное техническое решение.", "Күрделі бюрократиясыз: міндетті тез түсініп, нақты техникалық шешім ұсынамыз.", "No complicated bureaucracy: we quickly understand the task and propose a clear technical solution."],
    ["Заявка", "Өтінім", "Request"],
    ["Вы описываете задачу в WhatsApp или по телефону.", "Міндетті WhatsApp-та немесе телефон арқылы сипаттайсыз.", "Describe your task via WhatsApp or phone."],
    ["Диагностика", "Диагностика", "Assessment"],
    ["Уточняем детали, при необходимости выезжаем на объект.", "Мәліметтерді нақтылаймыз, қажет болса нысанға шығамыз.", "We clarify the details and visit the site when needed."],
    ["Решение", "Шешім", "Solution"],
    ["Согласовываем стоимость и выполняем работы.", "Құнын келісіп, жұмыстарды орындаймыз.", "We agree on the cost and complete the work."],
    ["Проверяем результат, даём гарантию и остаёмся на связи.", "Нәтижені тексереміз, кепілдік береміз және байланыста қаламыз.", "We verify the result, provide a warranty and stay available."],
    ["Бесплатная консультация", "Тегін кеңес", "Free consultation"],
    ["Расскажите о вашей IT-задаче", "IT-міндетіңіз туралы айтыңыз", "Tell us about your IT task"],
    ["Заполните форму — заявка сразу откроется в WhatsApp. Специалист уточнит детали и предложит решение.", "Нысанды толтырыңыз — өтінім WhatsApp-та бірден ашылады. Маман мәліметтерді нақтылап, шешім ұсынады.", "Complete the form and your request will open in WhatsApp. A specialist will clarify the details and propose a solution."],
    ["Или позвоните прямо сейчас", "Немесе қазір қоңырау шалыңыз", "Or call us now"],
    ["Ваше имя", "Атыңыз", "Your name"],
    ["Номер телефона", "Телефон нөмірі", "Phone number"],
    ["Какая услуга нужна?", "Қандай қызмет қажет?", "Which service do you need?"],
    ["Выберите направление", "Бағытты таңдаңыз", "Choose a service"],
    ["Другая задача", "Басқа міндет", "Another task"],
    ["Кратко опишите задачу", "Міндетті қысқаша сипаттаңыз", "Briefly describe the task"],
    ["Отправить в WhatsApp", "WhatsApp-қа жіберу", "Send via WhatsApp"],
    ["Нажимая кнопку, вы соглашаетесь на обработку данных для связи по заявке.", "Түймені басу арқылы өтінім бойынша байланысу үшін деректерді өңдеуге келісесіз.", "By clicking the button, you consent to data processing so we can contact you about your request."],
    ["Как к вам обращаться?", "Сізге қалай хабарласайық?", "What should we call you?"],
    ["Что нужно настроить, установить или исправить?", "Нені баптау, орнату немесе түзету керек?", "What needs to be configured, installed or fixed?"],
    ["Всегда на связи", "Әрқашан байланыстамыз", "Always available"],
    ["Работаем по Алматы. Подберём формат поддержки под ваш бизнес и бюджет.", "Алматы бойынша жұмыс істейміз. Бизнесіңіз бен бюджетіңізге сай қолдау форматын таңдаймыз.", "We work across Almaty and tailor the support format to your business and budget."],
    ["IT-решения и проекты", "IT-шешімдер мен жобалар", "IT solutions and projects"],
    ["Техническое сопровождение", "Техникалық сүйемелдеу", "Technical support"],
    ["Монтаж и инфраструктура", "Монтаж және инфрақұрылым", "Installation and infrastructure"],
    ["Инфраструктура. Безопасность. Развитие.", "Инфрақұрылым. Қауіпсіздік. Даму.", "Infrastructure. Security. Growth."],
    ["Навигация", "Навигация", "Navigation"],
    ["Направления", "Бағыттар", "Services"],
    ["Сети и серверы", "Желілер мен серверлер", "Networks and servers"],
    ["г. Алматы, Казахстан", "Алматы қ., Қазақстан", "Almaty, Kazakhstan"],
    ["© 2026 ТОО itEDM. Надёжная IT-инфраструктура для вашего бизнеса.", "© 2026 itEDM ЖШС. Бизнесіңізге арналған сенімді IT-инфрақұрылым.", "© 2026 itEDM LLP. Reliable IT infrastructure for your business."],
    ["Написать Евгению в WhatsApp", "Евгенийге WhatsApp арқылы жазу", "Message Evgeniy on WhatsApp"],
    ["Написать Дмитрию в WhatsApp", "Дмитрийге WhatsApp арқылы жазу", "Message Dmitriy on WhatsApp"],
    ["Написать Максиму в WhatsApp", "Максимге WhatsApp арқылы жазу", "Message Maksim on WhatsApp"],
    ["Написать в WhatsApp", "WhatsApp арқылы жазу", "Message us on WhatsApp"],
    ["Быстрая связь", "Жылдам байланыс", "Quick contact"],
    ["Обычный размер текста", "Қалыпты мәтін өлшемі", "Normal text size"],
    ["Здравствуйте! Заявка с сайта itEDM.", "Сәлеметсіз бе! itEDM сайтынан өтінім.", "Hello! This is a request from the itEDM website."],
    ["Имя", "Аты", "Name"],
    ["Телефон", "Телефон", "Phone"],
    ["Задача", "Міндет", "Task"],
    ["Здравствуйте! Хочу уточнить расчёт с сайта itEDM.", "Сәлеметсіз бе! itEDM сайтындағы есепті нақтылағым келеді.", "Hello! I would like to confirm an estimate from the itEDM website."],
    ["Срочно", "Шұғыл", "Urgent"],
    ["Ночь/выходной", "Түн/демалыс", "Night/weekend"],
    ["Ориентировочно", "Шамамен", "Estimated"],
    ["да", "иә", "yes"],
    ["нет", "жоқ", "no"]
  ];

  const translations = {
    kk: Object.fromEntries(translationRows.map(([source, kk]) => [source, kk])),
    en: Object.fromEntries(translationRows.map(([source, , en]) => [source, en]))
  };
  const canonicalPhrases = new Map();
  translationRows.forEach(([source, kk, en]) => {
    canonicalPhrases.set(source, source);
    canonicalPhrases.set(kk, source);
    canonicalPhrases.set(en, source);
  });
  const textSources = new WeakMap();
  const attributeSources = new WeakMap();

  function t(source, language = currentLanguage) {
    return translations[language]?.[source] || source;
  }

  function canonicalPhrase(value) {
    return canonicalPhrases.get(value) || value;
  }

  const slides = [...document.querySelectorAll(".slide")];
  const dots = [...document.querySelectorAll(".slider-dots button")];
  const prev = document.querySelector(".slider-prev");
  const next = document.querySelector(".slider-next");
  const hero = document.querySelector(".hero");
  const sliderProgressBar = document.querySelector(".slider-progress span");
  const SLIDE_INTERVAL = 6500;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = 0;
  let timer;
  let stormReady = false;

  function showSlide(index) {
    const previous = active;
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === active));
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === active);
      dot.setAttribute("aria-current", i === active ? "true" : "false");
    });
    if (stormReady && previous !== active && !reduceMotion) {
      window.setTimeout(() => triggerLightning(Math.random() > .65 ? 2 : 1), 280);
    }
    restartSliderProgress();
  }

  function restartSliderProgress() {
    if (!sliderProgressBar) return;
    sliderProgressBar.classList.remove("is-running");
    void sliderProgressBar.offsetWidth;
    sliderProgressBar.classList.add("is-running");
  }

  function restartSlider() {
    window.clearInterval(timer);
    timer = window.setInterval(() => showSlide(active + 1), SLIDE_INTERVAL);
    restartSliderProgress();
  }

  prev?.addEventListener("click", () => { showSlide(active - 1); restartSlider(); });
  next?.addEventListener("click", () => { showSlide(active + 1); restartSlider(); });
  dots.forEach((dot, index) => dot.addEventListener("click", () => { showSlide(index); restartSlider(); }));
  showSlide(0);
  restartSlider();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearInterval(timer);
      hero?.classList.add("is-paused");
    } else {
      hero?.classList.remove("is-paused");
      restartSlider();
    }
  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");
  const homeLogo = document.querySelector(".header__logo");
  const themeToggle = document.querySelector(".theme-toggle");
  const fontToggle = document.querySelector(".font-toggle");
  const mobileMenu = window.matchMedia("(max-width: 900px)");

  function closeMenu() {
    menuButton?.classList.remove("is-open");
    nav?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", t("Открыть меню"));
    document.body.classList.remove("menu-open");
  }

  menuButton?.addEventListener("click", () => {
    const open = !menuButton.classList.contains("is-open");
    menuButton.classList.toggle("is-open", open);
    nav?.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", t(open ? "Закрыть меню" : "Открыть меню"));
    document.body.classList.toggle("menu-open", open);
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });
  mobileMenu.addEventListener?.("change", event => {
    if (!event.matches) closeMenu();
  });

  function updateHeader() {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  homeLogo?.addEventListener("click", event => {
    event.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  function setTheme(theme) {
    const dark = theme === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const icon = themeToggle?.querySelector("span");
    if (icon) icon.textContent = dark ? "☀" : "◐";
    themeToggle?.setAttribute("aria-pressed", String(dark));
    const themeLabel = t(dark ? "Включить светлую тему" : "Включить тёмную тему");
    themeToggle?.setAttribute("aria-label", themeLabel);
    if (themeToggle) themeToggle.title = themeLabel;
    try { localStorage.setItem("itedm-theme", dark ? "dark" : "light"); } catch {}
  }

  function setLargeFont(activeFont) {
    if (activeFont) document.documentElement.dataset.font = "large";
    else delete document.documentElement.dataset.font;
    fontToggle?.setAttribute("aria-pressed", String(activeFont));
    const fontLabel = t(activeFont ? "Вернуть обычный размер текста" : "Увеличить текст");
    fontToggle?.setAttribute("aria-label", fontLabel);
    if (fontToggle) fontToggle.title = t(activeFont ? "Обычный размер текста" : "Увеличить текст");
    try { localStorage.setItem("itedm-font", activeFont ? "large" : "normal"); } catch {}
  }

  setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  setLargeFont(document.documentElement.dataset.font === "large");
  themeToggle?.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
  fontToggle?.addEventListener("click", () => {
    setLargeFont(document.documentElement.dataset.font !== "large");
  });

  function translateTextNodes(language) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const parent = node.parentElement;
      const raw = node.nodeValue || "";
      if (parent && !parent.closest("script, style, .language-picker")) {
        let source = textSources.get(node);
        if (!source && raw.trim()) {
          const leading = raw.match(/^\s*/)?.[0] || "";
          const trailing = raw.match(/\s*$/)?.[0] || "";
          source = {
            leading,
            trailing,
            phrase: canonicalPhrase(raw.trim())
          };
          textSources.set(node, source);
        }
        if (source) node.nodeValue = `${source.leading}${t(source.phrase, language)}${source.trailing}`;
      }
      node = walker.nextNode();
    }
  }

  function translateAttributes(language) {
    const attributeNames = ["aria-label", "title", "placeholder"];
    document.querySelectorAll("[aria-label], [title], [placeholder]").forEach(element => {
      let sources = attributeSources.get(element);
      if (!sources) {
        sources = {};
        attributeSources.set(element, sources);
      }
      attributeNames.forEach(name => {
        if (!element.hasAttribute(name)) return;
        if (!sources[name]) sources[name] = canonicalPhrase(element.getAttribute(name) || "");
        element.setAttribute(name, t(sources[name], language));
      });
    });
  }

  function applyLanguage(language) {
    currentLanguage = supportedLanguages.includes(language) ? language : "ru";
    document.documentElement.lang = currentLanguage;
    document.title = t("ТОО itEDM — IT-решения для бизнеса в Алматы");
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", t("ТОО itEDM — комплексное IT-обслуживание бизнеса в Алматы: аутсорсинг, сети, серверы, кибербезопасность и видеонаблюдение."));
    translateTextNodes(currentLanguage);
    translateAttributes(currentLanguage);
    document.querySelectorAll(".language-select").forEach(select => {
      select.value = currentLanguage;
    });
    const menuOpen = menuButton?.classList.contains("is-open");
    menuButton?.setAttribute("aria-label", t(menuOpen ? "Закрыть меню" : "Открыть меню"));
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    setLargeFont(document.documentElement.dataset.font === "large");
    try { localStorage.setItem("itedm-language", currentLanguage); } catch {}
    money = new Intl.NumberFormat(localeByLanguage[currentLanguage], { maximumFractionDigits: 0 });
    updateCalculator();
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  document.querySelector("#request-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      t("Здравствуйте! Заявка с сайта itEDM."),
      "",
      `${t("Имя")}: ${form.get("name") || ""}`,
      `${t("Телефон")}: ${form.get("phone") || ""}`,
      `${t("Услуга")}: ${form.get("service") || ""}`,
      `${t("Задача")}: ${form.get("message") || ""}`
    ].join("\n");
    window.open(`https://wa.me/77779712555?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });

  const calcService = document.querySelector("#calc-service");
  const calcQuantity = document.querySelector("#calc-quantity");
  const calcMinus = document.querySelector("#calc-minus");
  const calcPlus = document.querySelector("#calc-plus");
  const calcUrgent = document.querySelector("#calc-urgent");
  const calcOutside = document.querySelector("#calc-outside");
  const calcTotal = document.querySelector("#calc-total");
  const calcUnitPrice = document.querySelector("#calc-unit-price");
  const calcCount = document.querySelector("#calc-count");
  const calcExtra = document.querySelector("#calc-extra");
  const calcOrder = document.querySelector("#calc-order");
  const localeByLanguage = { ru: "ru-KZ", kk: "kk-KZ", en: "en-US" };
  const calculatorUnits = {
    ru: {
      it: "компьютер / месяц",
      server: "сервер / месяц",
      scs: "точка",
      cable: "метр",
      "camera-in": "камера",
      "camera-out": "камера",
      windows: "устройство",
      crm: "проект",
      landing: "проект",
      corporate: "проект"
    },
    kk: {
      it: "компьютер / ай",
      server: "сервер / ай",
      scs: "нүкте",
      cable: "метр",
      "camera-in": "камера",
      "camera-out": "камера",
      windows: "құрылғы",
      crm: "жоба",
      landing: "жоба",
      corporate: "жоба"
    },
    en: {
      it: "computer / month",
      server: "server / month",
      scs: "point",
      cable: "meter",
      "camera-in": "camera",
      "camera-out": "camera",
      windows: "device",
      crm: "project",
      landing: "project",
      corporate: "project"
    }
  };
  let money = new Intl.NumberFormat(localeByLanguage[currentLanguage], { maximumFractionDigits: 0 });

  function clampQuantity(value) {
    const numeric = Number.parseInt(value, 10);
    return Math.min(500, Math.max(1, Number.isFinite(numeric) ? numeric : 1));
  }

  function updateCalculator() {
    const option = calcService?.selectedOptions[0];
    if (!option || !calcQuantity) return;
    const quantity = clampQuantity(calcQuantity.value);
    const unitPrice = Number(option.dataset.price) || 0;
    const extraPercent = (calcUrgent?.checked ? 20 : 0) + (calcOutside?.checked ? 30 : 0);
    const total = Math.round(unitPrice * quantity * (1 + extraPercent / 100));
    const formattedTotal = `${money.format(total)} ₸`;
    calcQuantity.value = String(quantity);
    if (calcTotal) calcTotal.textContent = formattedTotal;
    if (calcUnitPrice) calcUnitPrice.textContent = `${money.format(unitPrice)} ₸`;
    const unit = calculatorUnits[currentLanguage]?.[option.value] || option.dataset.unit || "";
    if (calcCount) calcCount.textContent = `${quantity} ${unit}`;
    if (calcExtra) calcExtra.textContent = `${extraPercent}%`;
    if (calcOrder) {
      const details = [
        t("Здравствуйте! Хочу уточнить расчёт с сайта itEDM."),
        "",
        `${t("Услуга")}: ${option.textContent.trim()}`,
        `${t("Количество")}: ${quantity}`,
        `${t("Срочно")}: ${t(calcUrgent?.checked ? "да" : "нет")}`,
        `${t("Ночь/выходной")}: ${t(calcOutside?.checked ? "да" : "нет")}`,
        `${t("Ориентировочно")}: ${formattedTotal}`
      ].join("\n");
      calcOrder.href = `https://wa.me/77779712555?text=${encodeURIComponent(details)}`;
    }
  }

  calcService?.addEventListener("change", updateCalculator);
  calcQuantity?.addEventListener("input", updateCalculator);
  calcQuantity?.addEventListener("change", updateCalculator);
  calcUrgent?.addEventListener("change", updateCalculator);
  calcOutside?.addEventListener("change", updateCalculator);
  calcMinus?.addEventListener("click", () => {
    if (!calcQuantity) return;
    calcQuantity.value = String(clampQuantity(calcQuantity.value) - 1);
    calcQuantity.value = String(clampQuantity(calcQuantity.value));
    updateCalculator();
  });
  calcPlus?.addEventListener("click", () => {
    if (!calcQuantity) return;
    calcQuantity.value = String(clampQuantity(calcQuantity.value) + 1);
    calcQuantity.value = String(clampQuantity(calcQuantity.value));
    updateCalculator();
  });
  document.querySelectorAll(".language-select").forEach(select => {
    select.addEventListener("change", event => applyLanguage(event.currentTarget.value));
  });
  applyLanguage(currentLanguage);

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".service-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rx = ((y / rect.height) - .5) * -4;
        const ry = ((x / rect.width) - .5) * 5;
        card.style.setProperty("--card-x", `${x}px`);
        card.style.setProperty("--card-y", `${y}px`);
        card.style.setProperty("--card-rx", `${rx.toFixed(2)}deg`);
        card.style.setProperty("--card-ry", `${ry.toFixed(2)}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--card-rx", "0deg");
        card.style.setProperty("--card-ry", "0deg");
      });
    });
  }

  const canvas = document.querySelector("#network-canvas");
  const ctx = canvas?.getContext("2d");
  const lightningCanvas = document.querySelector("#lightning-canvas");
  const lightningCtx = lightningCanvas?.getContext("2d");
  const stormFlash = document.querySelector(".storm-flash");
  if (!canvas || !ctx || !lightningCanvas || !lightningCtx || !hero) return;

  const pointer = { x: 0, y: 0, active: false };
  let nodes = [];
  let bolts = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrame;
  let lightningFrame;
  let lightningTimer;

  function createNodes() {
    const count = width < 700
      ? Math.max(24, Math.min(40, Math.round(width / 12)))
      : Math.max(28, Math.min(80, Math.round(width / 22)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .34,
      vy: (Math.random() - .5) * .34,
      radius: Math.random() * 1.5 + .7,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function resizeCanvas() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.5 : 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    lightningCanvas.width = Math.round(width * dpr);
    lightningCanvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    lightningCanvas.style.width = `${width}px`;
    lightningCanvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    lightningCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createNodes();
  }

  function movePointer(event) {
    const rect = hero.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  }

  hero.addEventListener("mousemove", movePointer);
  hero.addEventListener("mouseleave", () => { pointer.active = false; });
  hero.addEventListener("touchmove", event => {
    const touch = event.touches[0];
    if (touch) movePointer(touch);
  }, { passive: true });
  hero.addEventListener("touchend", () => { pointer.active = false; });
  hero.addEventListener("pointerdown", event => {
    if (!event.target.closest("a,button") && !reduceMotion) triggerLightning(1);
  });
  window.addEventListener("resize", resizeCanvas);

  function dnaPoint(x, strand, time) {
    const baseWave = Math.sin(x * .003 + time * .00028) * 16;
    let center = height * .31 + baseWave;
    let influence = 0;
    if (pointer.active) {
      const dx = x - pointer.x;
      influence = Math.exp(-(dx * dx) / (2 * 175 * 175));
      center += (pointer.y - center) * influence * .3;
    }
    const amplitude = 31 + influence * 18;
    const wave = Math.sin(x * .019 - time * .00135);
    return center + (strand === 0 ? wave : -wave) * amplitude;
  }

  function drawDNA(time) {
    const startX = width < 700 ? -35 : Math.max(width * .32, 380);
    const endX = width + 40;
    if (startX >= endX) return;

    ctx.save();
    ctx.lineCap = "round";
    for (let strand = 0; strand < 2; strand++) {
      ctx.beginPath();
      for (let x = startX; x <= endX; x += 7) {
        const y = dnaPoint(x, strand, time);
        if (x === startX) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const strandGradient = ctx.createLinearGradient(startX, 0, endX, 0);
      if (strand === 0) {
        strandGradient.addColorStop(0, "rgba(0,184,217,0)");
        strandGradient.addColorStop(.35, "rgba(101,231,255,.18)");
        strandGradient.addColorStop(1, "rgba(101,231,255,.42)");
      } else {
        strandGradient.addColorStop(0, "rgba(132,107,255,0)");
        strandGradient.addColorStop(.35, "rgba(132,107,255,.14)");
        strandGradient.addColorStop(1, "rgba(132,107,255,.34)");
      }
      ctx.strokeStyle = strandGradient;
      ctx.lineWidth = 1.25;
      ctx.shadowBlur = 10;
      ctx.shadowColor = strand === 0 ? "rgba(101,231,255,.4)" : "rgba(132,107,255,.32)";
      ctx.stroke();
    }

    ctx.shadowBlur = 0;
    for (let x = startX; x <= endX; x += 31) {
      const y1 = dnaPoint(x, 0, time);
      const y2 = dnaPoint(x, 1, time);
      const depth = .14 + Math.abs(Math.sin(x * .019 - time * .00135)) * .22;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.strokeStyle = `rgba(163,231,255,${depth})`;
      ctx.lineWidth = .7;
      ctx.stroke();

      ctx.fillStyle = "rgba(101,231,255,.65)";
      ctx.beginPath();
      ctx.arc(x, y1, 1.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(163,142,255,.55)";
      ctx.beginPath();
      ctx.arc(x, y2, 1.7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawNetwork(time = 0) {
    ctx.clearRect(0, 0, width, height);
    drawDNA(time);

    nodes.forEach(node => {
      if (!reduceMotion) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -10 || node.x > width + 10) node.vx *= -1;
        if (node.y < -10 || node.y > height + 10) node.vy *= -1;

        if (pointer.active) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 230 && distance > 1) {
            const force = (1 - distance / 230) * .0045;
            node.vx += dx * force;
            node.vy += dy * force;
            const speed = Math.hypot(node.vx, node.vy);
            if (speed > 1.3) {
              node.vx = node.vx / speed * 1.3;
              node.vy = node.vy / speed * 1.3;
            }
          }
        }
      }
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 128) {
          const alpha = (1 - distance / 128) * .28;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(42, 215, 239, ${alpha})`;
          ctx.lineWidth = .75;
          ctx.stroke();
        }
      }
    }

    if (pointer.active) {
      nodes.forEach(node => {
        const distance = Math.hypot(pointer.x - node.x, pointer.y - node.y);
        if (distance < 210) {
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `rgba(85, 228, 245, ${(1 - distance / 210) * .72})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      const pulse = 7 + Math.sin(time * .004) * 3;
      const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 32);
      glow.addColorStop(0, "rgba(85,228,245,.65)");
      glow.addColorStop(1, "rgba(0,184,217,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(85,228,245,.85)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, pulse, 0, Math.PI * 2);
      ctx.stroke();
    }

    nodes.forEach(node => {
      const shimmer = .46 + Math.sin(time * .002 + node.phase) * .2;
      ctx.fillStyle = `rgba(85,228,245,${shimmer})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrame = requestAnimationFrame(drawNetwork);
  }

  function makeBolt(startX = width * (.55 + Math.random() * .4)) {
    const points = [{ x: startX, y: -18 }];
    let x = startX;
    let y = -18;
    const targetY = height * (.42 + Math.random() * .42);
    while (y < targetY) {
      y += 18 + Math.random() * 24;
      x += (Math.random() - .5) * 42;
      points.push({ x, y });
    }

    const branches = [];
    points.forEach((point, index) => {
      if (index > 2 && index < points.length - 2 && Math.random() > .72) {
        const direction = Math.random() > .5 ? 1 : -1;
        const branch = [{ ...point }];
        let bx = point.x;
        let by = point.y;
        for (let step = 0; step < 3 + Math.floor(Math.random() * 3); step++) {
          bx += direction * (12 + Math.random() * 26);
          by += 13 + Math.random() * 22;
          branch.push({ x: bx, y: by });
        }
        branches.push(branch);
      }
    });

    return {
      points,
      branches,
      born: performance.now(),
      life: 330 + Math.random() * 190
    };
  }

  function drawLine(context, points, color, widthValue) {
    context.beginPath();
    points.forEach((point, index) => {
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    context.strokeStyle = color;
    context.lineWidth = widthValue;
    context.stroke();
  }

  function drawLightning(now = performance.now()) {
    lightningCtx.clearRect(0, 0, width, height);
    bolts = bolts.filter(bolt => now - bolt.born < bolt.life);
    bolts.forEach(bolt => {
      const age = (now - bolt.born) / bolt.life;
      const alpha = Math.max(0, 1 - age) * (age < .12 ? 1 : .78);
      lightningCtx.save();
      lightningCtx.lineCap = "round";
      lightningCtx.lineJoin = "round";
      lightningCtx.shadowBlur = 24;
      lightningCtx.shadowColor = `rgba(80,190,255,${alpha})`;
      drawLine(lightningCtx, bolt.points, `rgba(54,148,255,${alpha * .32})`, 8);
      drawLine(lightningCtx, bolt.points, `rgba(198,244,255,${alpha})`, 2.2);
      drawLine(lightningCtx, bolt.points, `rgba(255,255,255,${alpha})`, .8);
      bolt.branches.forEach(branch => {
        drawLine(lightningCtx, branch, `rgba(117,214,255,${alpha * .7})`, 1.1);
      });
      lightningCtx.restore();
    });

    if (bolts.length) lightningFrame = requestAnimationFrame(drawLightning);
  }

  function triggerLightning(amount = 1) {
    if (reduceMotion) return;
    const flashX = 55 + Math.random() * 40;
    stormFlash?.style.setProperty("--flash-x", `${flashX}%`);
    stormFlash?.classList.remove("is-flashing");
    void stormFlash?.offsetWidth;
    stormFlash?.classList.add("is-flashing");
    for (let i = 0; i < amount; i++) {
      bolts.push(makeBolt(width * ((flashX + (Math.random() - .5) * 12) / 100)));
    }
    cancelAnimationFrame(lightningFrame);
    lightningFrame = requestAnimationFrame(drawLightning);
  }

  function scheduleLightning() {
    window.clearTimeout(lightningTimer);
    if (reduceMotion) return;
    lightningTimer = window.setTimeout(() => {
      triggerLightning(Math.random() > .76 ? 2 : 1);
      scheduleLightning();
    }, 4800 + Math.random() * 7200);
  }

  resizeCanvas();
  animationFrame = requestAnimationFrame(drawNetwork);
  stormReady = true;
  scheduleLightning();
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(lightningFrame);
      window.clearTimeout(lightningTimer);
    } else {
      animationFrame = requestAnimationFrame(drawNetwork);
      scheduleLightning();
    }
  });
})();

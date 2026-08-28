/**
 * فلسفة النمط: «مسارات الثقة الطبية» — حداثة تحريرية سويسرية تمثل رحلة التوريد
 * عبر خطوط موجهة، كحلي مؤسسي، وأخضر علاجي؛ الهدف إظهار الامتثال والقدرة بوضوح هادئ.
 */
import { useEffect, useState } from "react";
import {
  ArrowUpLeft,
  BadgeCheck,
  Boxes,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Globe2,
  Handshake,
  HeartPulse,
  Languages,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Network,
  PackageCheck,
  ScanLine,
  Send,
  ShieldCheck,
  Stethoscope,
  Truck,
  UsersRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

type Locale = "ar" | "en";

const assets = {
  officialLogo: "/manus-storage/soudad-official-logo_05125311.png",
  symbol: "/manus-storage/soudad-symbol_75f29b2d.png",
  hero: "/manus-storage/soudad-hero-healthcare-supply_cef5f3be.jpg",
  compliance: "/manus-storage/soudad-compliance-detail_98c28824.jpg",
  products: "/manus-storage/soudad-medical-products_29f1fcf7.jpg",
  logistics: "/manus-storage/soudad-logistics-network_00b72b95.jpg",
  yemenMap: "/manus-storage/yemen-coverage-map_fef757f1.svg",
};

const copy = {
  ar: {
    brand: "سُؤدد فارما",
    brandSub: "تجارة الأدوية والمستلزمات الطبية",
    nav: [
      ["الرئيسية", "home"],
      ["من نحن", "about"],
      ["خدماتنا", "services"],
      ["الامتثال", "compliance"],
      ["التغطية", "reach"],
      ["تواصل معنا", "contact"],
    ],
    partner: "كن شريكنا",
    heroEyebrow: "بوابتكم الموثوقة للحلول الدوائية والطبية",
    heroTitle: "حلول صحية موثوقة، تصل حيث تحتاجها الرعاية.",
    heroBody:
      "نربط بين الجودة العالمية واحتياجات القطاع الصحي في اليمن بمنظومة توريد دوائي وطبي دقيقة، مرنة، وملتزمة.",
    explore: "استكشف خدماتنا",
    talk: "ابدأ محادثة الشراكة",
    homeBadge: "سُؤدد فارما | من المصدر إلى نقطة الرعاية",
    stats: [
      ["4", "قطاعات تشغيلية متخصصة"],
      ["GSP", "معايير تخزين طبي جيدة"],
      ["100%", "امتثال تنظيمي موجه"],
      ["YEM", "تركيز متكامل على السوق اليمني"],
    ],
    routeGuide: "محطات مسار الرعاية",
    routeSteps: ["البداية", "المنهج", "القطاعات", "الامتثال", "الوصول", "الشراكة"],
    aboutKicker: "من نحن",
    aboutTitle: "شريك توريد يفهم ما وراء المنتج.",
    aboutText:
      "سؤدد فارما شركة يمنية متخصصة في استيراد وتسويق وتوزيع الأدوية البشرية والمستلزمات الطبية والأجهزة الحديثة. نعمل لنؤمّن للقطاع الصحي المحلي منتجات آمنة وفعالة عبر شراكات استراتيجية وقدرة تشغيلية عملية.",
    profile: "ملف الشركة",
    visionLabel: "رؤيتنا",
    vision:
      "أن نكون الخيار الأول والشركة الرائدة والموثوقة في توفير الحلول الدوائية والطبية المتكاملة في اليمن والمنطقة الإقليمية.",
    missionLabel: "رسالتنا",
    mission:
      "تعزيز وإمداد القطاع الصحي بمنتجات دوائية وطبية آمنة وفعالة وذات جودة عالية من خلال منظومة توزيع احترافية ومتطورة.",
    valuesLabel: "قيم تحكم كل مسار",
    values: ["الجودة", "الموثوقية", "النزاهة", "الاحترافية", "خدمة العملاء", "التطوير المستمر"],
    servicesKicker: "من المصدر إلى الرعاية",
    servicesTitle: "قطاعات تشغيلية تتحرك بدقة واحدة.",
    servicesBody:
      "نغطي احتياجات القطاع الصحي والدوائي من خلال قطاعات مترابطة، من اختيار المنتج وتوريده إلى وصوله الآمن للسوق.",
    services: [
      ["01", "استيراد وتوزيع الأدوية البشرية", "توفير الأدوية الحيوية والمستحضرات الصيدلانية الأساسية والتخصصية.", "pill"],
      ["02", "المستلزمات الطبية المستهلكة", "تأمين المواد والمستلزمات الطبية لاحتياجات المستشفيات والمراكز الصحية.", "supplies"],
      ["03", "الأجهزة والمعدات الطبية", "توريد الأجهزة الطبية الحديثة ومتابعة تشغيلها وصيانتها.", "equipment"],
      ["04", "التسويق الدوائي الاحترافي", "استراتيجيات علمية تعزز الحصة السوقية لشركائنا من المصانع العالمية.", "marketing"],
    ],
    serviceEvidence: ["منشأ موثوق", "إمداد سريري", "تشغيل ومتابعة", "حضور سوقي"],
    whyKicker: "قوة تشغيلية قابلة للقياس",
    whyTitle: "الالتزام لا يكون وعداً؛ بل نظام عمل.",
    whyBody:
      "ندير كل مرحلة من مراحل العمل بعقلية جاهزية واستجابة. لذلك يجد شركاؤنا وضوحاً في الإجراءات، دقة في المتابعة، ومرونة أمام متطلبات السوق.",
    whyItems: [
      ["شبكة توزيع لوجستية واسعة", "تغطي المراكز والمحافظات الرئيسية لضمان وصول الإمدادات بكفاءة."],
      ["علاقات استراتيجية وثيقة", "روابط متينة وموثوقة مع الموردين والمصانع والجهات ذات العلاقة."],
      ["كادر بشري متخصص", "فريق مؤهل في الإدارة والصيدلة والتسويق الدوائي."],
      ["استجابة ديناميكية وسريعة", "قدرة على تحليل الاحتياج وسد العجز في المتطلبات الطبية الطارئة."],
    ],
    operatingCaption: "نقطة تشغيل | جاهزية توريد مدروسة",
    complianceKicker: "الامتثال والشراكات الدولية",
    complianceTitle: "جاهزية محلية بمعايير تعامل عالمية.",
    complianceText:
      "نهيئ لشركائنا الدوليين مساراً واضحاً لدخول السوق المحلي، بدءاً من التعامل مع المتطلبات التنظيمية وصولاً إلى إدارة التوريد والتوزيع باحترافية.",
    complianceItems: [
      ["تراخيص رسمية", "تخزين واستيراد معتمد لدى الهيئة العليا للأدوية والمستلزمات الطبية."],
      ["جاهزية تنظيمية", "التزام دقيق باللوائح والأنظمة المنظمة للقطاع الدوائي والطبي."],
      ["نموذج شراكة", "دعم تسجيل المنتجات وإدارتها وتسويقها وتوزيعها محلياً."],
    ],
    reachKicker: "التغطية الجغرافية",
    reachTitle: "من مركز العمليات إلى كل نقطة احتياج.",
    reachBody:
      "تدعم شبكتنا اللوجستية وصول الإمدادات إلى المراكز والمحافظات الرئيسية بكفاءة، مع مرونة في مواكبة الاحتياجات المتغيرة للقطاع الصحي.",
    reachBadge: "شبكة وصول مرنة",
    reachNote: "توسعنا التشغيلي يبدأ من فهم الاحتياج وينتهي بوصول منظم وآمن.",
    contactKicker: "التواصل والشراكة",
    contactTitle: "لنحوّل احتياجكم إلى مسار توريد واضح.",
    contactText:
      "نرحب باستفسارات المصانع والموردين والمستشفيات والجهات المهتمة ببناء شراكة عمل مستدامة.",
    emailTitle: "البريد الرسمي",
    websiteTitle: "الموقع الإلكتروني",
    locationTitle: "المقر الرئيسي",
    locationText: "الجمهورية اليمنية",
    formName: "الاسم الكامل",
    formOrg: "اسم الجهة / الشركة",
    formEmail: "البريد الإلكتروني",
    formType: "نوع الاستفسار",
    formMessage: "كيف يمكننا مساعدتكم؟",
    formSelect: "اختر نوع الاستفسار",
    formOptions: ["شراكة دولية", "توريد وتوزيع", "مستلزمات أو أجهزة طبية", "استفسار عام"],
    submit: "إرسال الاستفسار",
    response: "نتعامل مع الاستفسارات باهتمام وسنعاود التواصل عبر البريد الرسمي.",
    finalTitle: "نرفع جودة التوريد الطبي، معاً.",
    finalCta: "تواصل مع سؤدد فارما",
    footerText: "حلول دوائية وطبية موثوقة للقطاع الصحي.",
    legal: "تنويه: المعلومات الطبية والمنتجات تخضع للتراخيص واللوائح المعمول بها.",
    copyright: "جميع الحقوق محفوظة لسؤدد فارما.",
    formToast: "تم استلام استفساركم مبدئياً. يرجى التواصل عبر البريد الرسمي لإتمام المتابعة.",
  },
  en: {
    brand: "SOUDAD PHARMA",
    brandSub: "Medicines & Medical Supplies",
    nav: [
      ["Home", "home"],
      ["About", "about"],
      ["Services", "services"],
      ["Compliance", "compliance"],
      ["Reach", "reach"],
      ["Contact", "contact"],
    ],
    partner: "Partner With Us",
    heroEyebrow: "Your trusted gateway to pharmaceutical & medical solutions",
    heroTitle: "Trusted healthcare solutions, delivered where care needs them.",
    heroBody:
      "We connect global quality with Yemen’s healthcare needs through a precise, responsive, and responsible pharmaceutical and medical supply network.",
    explore: "Explore our services",
    talk: "Start a partnership conversation",
    homeBadge: "Soudad Pharma | From source to point of care",
    stats: [
      ["4", "specialized operating sectors"],
      ["GSP", "good storage practice standards"],
      ["100%", "compliance-led approach"],
      ["YEM", "dedicated focus on the Yemeni market"],
    ],
    routeGuide: "Care path checkpoints",
    routeSteps: ["Start", "Approach", "Sectors", "Compliance", "Reach", "Partnership"],
    aboutKicker: "About Soudad",
    aboutTitle: "A supply partner that understands what lies beyond the product.",
    aboutText:
      "Soudad Pharma is a Yemeni company specialized in importing, marketing, and distributing human medicines, medical consumables, and modern equipment. We help secure safe, effective healthcare products through strategic partnerships and practical operating capability.",
    profile: "Company profile",
    visionLabel: "Our vision",
    vision:
      "To be the first choice and the trusted leading company for integrated pharmaceutical and medical solutions in Yemen and the wider region.",
    missionLabel: "Our mission",
    mission:
      "To strengthen the healthcare sector with safe, effective, high-quality pharmaceutical and medical products through an advanced, professional distribution system.",
    valuesLabel: "Values that guide every route",
    values: ["Quality", "Reliability", "Integrity", "Professionalism", "Customer care", "Continuous development"],
    servicesKicker: "From source to care",
    servicesTitle: "Operating sectors, moving with one standard of precision.",
    servicesBody:
      "We cover healthcare and pharmaceutical requirements through connected business lines—from product selection and sourcing to safe market delivery.",
    services: [
      ["01", "Human medicines import & distribution", "Providing essential and specialized pharmaceutical preparations and vital medicines.", "pill"],
      ["02", "Medical consumables", "Supplying hospitals and healthcare facilities with medical materials and everyday consumables.", "supplies"],
      ["03", "Medical devices & equipment", "Sourcing modern medical equipment and supporting its operation and maintenance.", "equipment"],
      ["04", "Professional pharmaceutical marketing", "Building scientific strategies that support our global manufacturing partners’ market presence.", "marketing"],
    ],
    serviceEvidence: ["Trusted origin", "Clinical supply", "Operation & follow-up", "Market presence"],
    whyKicker: "Operational strength with purpose",
    whyTitle: "Commitment is not a promise; it is a working system.",
    whyBody:
      "We manage every stage with readiness and response in mind. Partners gain clarity in process, precision in follow-up, and flexibility as market needs evolve.",
    whyItems: [
      ["Broad logistics distribution network", "Serving key centers and governorates for efficient availability of supplies."],
      ["Close strategic relationships", "Trusted ties with suppliers, manufacturers, and relevant stakeholders."],
      ["Specialist team", "Qualified talent across management, pharmacy, and pharmaceutical marketing."],
      ["Dynamic, rapid response", "The ability to analyse demand and help bridge urgent medical supply gaps."],
    ],
    operatingCaption: "Operating node | measured supply readiness",
    complianceKicker: "Compliance & global partnerships",
    complianceTitle: "Local readiness, global standards of engagement.",
    complianceText:
      "We provide international partners with a clear route into the local market—supporting regulatory requirements, product management, supply, and professional distribution.",
    complianceItems: [
      ["Official licensing", "Licensed for storage and import by Yemen’s Supreme Board of Drugs and Medical Appliances."],
      ["Regulatory readiness", "Careful adherence to the regulations that govern the medical and pharmaceutical sector."],
      ["Partnership model", "Support for local product registration, management, marketing, and distribution."],
    ],
    reachKicker: "Geographical reach",
    reachTitle: "From our operating center to every point of need.",
    reachBody:
      "Our logistics network supports efficient delivery to key centers and governorates, with the flexibility to meet the changing needs of the healthcare sector.",
    reachBadge: "Responsive access network",
    reachNote: "Our operating reach begins with understanding demand and ends with organised, safe delivery.",
    contactKicker: "Contact & partnership",
    contactTitle: "Let’s turn your need into a clear supply route.",
    contactText:
      "We welcome inquiries from manufacturers, suppliers, hospitals, and organisations interested in building a lasting working partnership.",
    emailTitle: "Official email",
    websiteTitle: "Website",
    locationTitle: "Head office",
    locationText: "Republic of Yemen",
    formName: "Full name",
    formOrg: "Organisation / company",
    formEmail: "Email address",
    formType: "Inquiry type",
    formMessage: "How can we help?",
    formSelect: "Select an inquiry type",
    formOptions: ["International partnership", "Supply & distribution", "Medical supplies or equipment", "General inquiry"],
    submit: "Send inquiry",
    response: "We review inquiries carefully and will follow up through the official email address.",
    finalTitle: "Together, we raise the standard of medical supply.",
    finalCta: "Contact Soudad Pharma",
    footerText: "Trusted pharmaceutical and medical solutions for the healthcare sector.",
    legal: "Notice: Medical information and products remain subject to applicable licensing and regulation.",
    copyright: "All rights reserved to Soudad Pharma.",
    formToast: "Your inquiry has been noted. Please use our official email to complete follow-up.",
  },
} as const;

const serviceIcons = {
  pill: HeartPulse,
  supplies: PackageCheck,
  equipment: Stethoscope,
  marketing: Network,
};

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className={`brand-mark official-brand ${compact ? "brand-compact" : ""}`} aria-label="Soudad Pharma">
      <img src={assets.officialLogo} alt="Soudad Pharma Medical Supplies" className="official-logo" />
    </a>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("ar");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAr = locale === "ar";
  const t = copy[locale];
  const DirectionalChevron = isAr ? ChevronLeft : ChevronRight;

  useEffect(() => {
    document.documentElement.lang = isAr ? "ar" : "en";
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.title = isAr
      ? "سؤدد فارما | حلول دوائية وطبية موثوقة"
      : "Soudad Pharma | Trusted Pharmaceutical & Medical Solutions";
  }, [isAr]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLocale = () => setLocale((value) => (value === "ar" ? "en" : "ar"));
  const closeMenu = () => setMobileOpen(false);
  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success(t.formToast);
    event.currentTarget.reset();
  };

  return (
    <main dir={isAr ? "rtl" : "ltr"} className={`site-shell ${isAr ? "font-ar" : "font-en"}`}>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label={isAr ? "التنقل الرئيسي" : "Main navigation"}>
            {t.nav.map(([label, id]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="language-control" type="button" onClick={toggleLocale} aria-label="Switch language">
              <Languages size={16} />
              <span>{isAr ? "EN" : "ع"}</span>
            </button>
            <a href="#contact" className="header-cta">
              <span>{t.partner}</span>
              <ArrowUpLeft size={15} />
            </a>
            <button className="mobile-menu-toggle" type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label={isAr ? "قائمة الجوال" : "Mobile menu"}>
            {t.nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
            <a href="#contact" className="mobile-partner" onClick={closeMenu}>{t.partner}</a>
          </nav>
        )}
      </header>

      <aside className="route-guide" aria-label={t.routeGuide}>
        <span className="route-guide-title">{t.routeGuide}</span>
        <div className="route-guide-line" />
        {(["home", "about", "services", "compliance", "reach", "contact"] as const).map((id, index) => (
          <a href={`#${id}`} key={id} aria-label={t.routeSteps[index]}>
            <span>{String(index + 1).padStart(2, "0")}</span><i /><b>{t.routeSteps[index]}</b>
          </a>
        ))}
      </aside>

      <section id="home" className="hero-section">
        <div className="hero-image-wrap" aria-hidden="true">
          <img src={assets.hero} alt="" className="hero-image" />
          <div className="hero-image-gradient" />
        </div>
        <div className="route-line route-line-one" aria-hidden="true"><i /><b /></div>
        <div className="route-line route-line-two" aria-hidden="true"><i /><b /></div>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-light"><span />{t.heroEyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-lede">{t.heroBody}</p>
            <div className="hero-actions">
              <a href="#services" className="button button-green"><span>{t.explore}</span><DirectionalChevron size={18} /></a>
              <a href="#contact" className="text-action text-action-light"><span>{t.talk}</span><ArrowUpLeft size={17} /></a>
            </div>
          </div>
          <div className="hero-stamp">
            <span className="stamp-dot" />
            <p>{t.homeBadge}</p>
          </div>
        </div>
        <div className="hero-stat-ribbon">
          {t.stats.map(([number, label], index) => (
            <div className="hero-stat" key={label}>
              <span className="stat-number">{number}</span>
              <span className="stat-label">{label}</span>
              {index < t.stats.length - 1 && <i />}
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="about-section section-spacing">
        <div className="section-checkpoint"><span>02</span><i />{t.routeSteps[1]}</div>
        <div className="route-marker route-marker-about" aria-hidden="true"><span /><i /></div>
        <div className="section-grid about-grid">
          <div className="about-intro">
            <p className="eyebrow"><span />{t.aboutKicker}</p>
            <h2>{t.aboutTitle}</h2>
            <p className="body-copy">{t.aboutText}</p>
            <a href="#contact" className="text-action text-action-dark"><span>{t.profile}</span><DirectionalChevron size={17} /></a>
          </div>
          <div className="about-vision-stack">
            <article className="vision-card vision-card-primary">
              <div className="card-symbol"><Globe2 size={22} /></div>
              <p className="card-label">{t.visionLabel}</p>
              <p>{t.vision}</p>
            </article>
            <article className="vision-card vision-card-secondary">
              <div className="card-symbol"><HeartPulse size={21} /></div>
              <p className="card-label">{t.missionLabel}</p>
              <p>{t.mission}</p>
            </article>
          </div>
        </div>
        <div className="values-strip">
          <div className="values-heading"><span>{t.valuesLabel}</span><div /></div>
          <div className="values-list">
            {t.values.map((value, index) => <span key={value}><b>0{index + 1}</b>{value}</span>)}
          </div>
        </div>
      </section>

      <section id="services" className="services-section section-spacing">
        <div className="section-checkpoint"><span>03</span><i />{t.routeSteps[2]}</div>
        <div className="services-heading-wrap">
          <div>
            <p className="eyebrow"><span />{t.servicesKicker}</p>
            <h2>{t.servicesTitle}</h2>
          </div>
          <p className="body-copy services-copy">{t.servicesBody}</p>
        </div>
        <div className="services-path">
          <svg className="services-route" viewBox="0 0 1200 420" preserveAspectRatio="none" aria-hidden="true">
            <path d="M54 70 C156 70, 202 292, 355 292 S526 70, 650 70 S842 292, 976 292 S1085 110, 1152 110" />
          </svg>
          {t.services.map(([number, title, description, iconName], index) => {
            const Icon = serviceIcons[iconName as keyof typeof serviceIcons];
            return (
              <article className={`service-card service-card-${index + 1}`} key={number}>
                <div className="service-waypoint"><span>{t.serviceEvidence[index]}</span><i /></div>
                <div className="service-index">{number}</div>
                <div className="service-icon"><Icon size={25} strokeWidth={1.7} /></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href="#contact" aria-label={title}><DirectionalChevron size={20} /></a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="operating-section">
        <div className="operating-photo"><img src={assets.products} alt="" /><p className="operating-caption"><span>04</span>{t.operatingCaption}</p></div>
        <div className="operating-content">
          <p className="eyebrow eyebrow-light"><span />{t.whyKicker}</p>
          <h2 className="operating-title">{isAr ? <>الالتزام لا يكون وعداً؛<br className="mobile-title-break" /> بل نظام عمل.</> : t.whyTitle}</h2>
          <p className="body-copy body-copy-light">{t.whyBody}</p>
          <div className="strength-list">
            {t.whyItems.map(([title, description], index) => (
              <div className="strength-item" key={title}>
                <div className="strength-number">0{index + 1}</div>
                <div><h3>{title}</h3><p>{description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="compliance" className="compliance-section section-spacing">
        <div className="section-checkpoint"><span>04</span><i />{t.routeSteps[3]}</div>
        <div className="compliance-image-col">
          <img src={assets.compliance} alt="" />
          <div className="compliance-seal"><ShieldCheck size={28} /><span>GSP</span><small>QUALITY ROUTE</small></div>
          <div className="photo-route" aria-hidden="true"><span /><i /></div>
        </div>
        <div className="compliance-copy-col">
          <p className="eyebrow"><span />{t.complianceKicker}</p>
          <h2>{t.complianceTitle}</h2>
          <p className="body-copy">{t.complianceText}</p>
          <div className="compliance-list">
            {t.complianceItems.map(([title, description], index) => {
              const icons = [ClipboardCheck, BadgeCheck, Handshake];
              const Icon = icons[index];
              return (
                <article key={title} className="compliance-item">
                  <div className="compliance-icon"><Icon size={20} /></div>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </article>
              );
            })}
          </div>
          <a href="#contact" className="button button-navy"><span>{t.partner}</span><DirectionalChevron size={18} /></a>
        </div>
      </section>

      <section id="reach" className="reach-section">
        <div className="section-checkpoint section-checkpoint-light"><span>05</span><i />{t.routeSteps[4]}</div>
        <div className="reach-background"><img src={assets.logistics} alt="" /><div /></div>
        <div className="reach-content">
          <div className="reach-copy">
            <p className="eyebrow eyebrow-light"><span />{t.reachKicker}</p>
            <h2>{t.reachTitle}</h2>
            <p>{t.reachBody}</p>
            <div className="reach-badge"><MapPin size={17} /><span>{t.reachBadge}</span></div>
          </div>
          <div className="coverage-map-panel" aria-label={t.reachBadge}>
            <div className="coverage-map-head"><span><i />{isAr ? "نقاط الانتشار" : "Coverage points"}</span><b>{isAr ? "اليمن" : "YEMEN"}</b></div>
            <div className="yemen-map-visual">
              <img src={assets.yemenMap} alt={isAr ? "خريطة اليمن مع نقاط انتشار سؤدد فارما" : "Yemen map with Soudad Pharma coverage points"} />
              <span className="map-marker map-sanaa"><i /><b>{isAr ? "صنعاء" : "Sana'a"}</b></span>
              <span className="map-marker map-hodeidah"><i /><b>{isAr ? "الحديدة" : "Hodeidah"}</b></span>
              <span className="map-marker map-taiz"><i /><b>{isAr ? "تعز" : "Taiz"}</b></span>
              <span className="map-marker map-aden"><i /><b>{isAr ? "عدن" : "Aden"}</b></span>
              <span className="map-marker map-hadramout"><i /><b>{isAr ? "حضرموت" : "Hadramout"}</b></span>
            </div>
            <p className="coverage-map-note"><span><Check size={13} /></span>{isAr ? "تغطية لوجستية مرنة للمراكز والمحافظات الرئيسية." : "Responsive logistics coverage for key centers and governorates."}</p>
          </div>
        </div>
        <div className="reach-note"><span><Check size={15} /></span>{t.reachNote}</div>
      </section>

      <section id="contact" className="contact-section section-spacing">
        <div className="section-checkpoint"><span>06</span><i />{t.routeSteps[5]}</div>
        <div className="contact-intro">
          <p className="eyebrow"><span />{t.contactKicker}</p>
          <h2>{t.contactTitle}</h2>
          <p className="body-copy">{t.contactText}</p>
          <div className="contact-details">
            <a href="mailto:info@soudadpharma.com" className="contact-detail"><Mail size={19} /><div><span>{t.emailTitle}</span><strong>info@soudadpharma.com</strong></div></a>
            <a href="https://www.soudadpharma.com" target="_blank" rel="noreferrer" className="contact-detail"><Globe2 size={19} /><div><span>{t.websiteTitle}</span><strong>www.soudadpharma.com</strong></div></a>
            <div className="contact-detail"><MapPin size={19} /><div><span>{t.locationTitle}</span><strong>{t.locationText}</strong></div></div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleForm}>
          <div className="form-route" aria-hidden="true"><span /><i /></div>
          <div className="form-row">
            <label>{t.formName}<input required name="name" autoComplete="name" /></label>
            <label>{t.formOrg}<input required name="organization" autoComplete="organization" /></label>
          </div>
          <div className="form-row">
            <label>{t.formEmail}<input required type="email" name="email" autoComplete="email" /></label>
            <label>{t.formType}<select required name="type" defaultValue=""><option value="" disabled>{t.formSelect}</option>{t.formOptions.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={15} /></label>
          </div>
          <label className="textarea-label">{t.formMessage}<textarea required name="message" rows={4} /></label>
          <button className="button button-green form-submit" type="submit"><span>{t.submit}</span><Send size={17} /></button>
          <p className="form-note">{t.response}</p>
        </form>
      </section>

      <section className="final-cta">
        <div className="final-route" aria-hidden="true"><span /><span /><i /></div>
        <div><h2>{t.finalTitle}</h2></div>
        <a href="mailto:info@soudadpharma.com" className="button button-white"><span>{t.finalCta}</span><ArrowUpLeft size={18} /></a>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div><Logo /><p>{t.footerText}</p></div>
          <div className="footer-links">{t.nav.slice(1).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
          <a className="footer-email" href="mailto:info@soudadpharma.com"><Mail size={18} />info@soudadpharma.com</a>
        </div>
        <div className="footer-bottom"><p>{t.legal}</p><p>© {new Date().getFullYear()} {t.copyright}</p></div>
      </footer>
    </main>
  );
}

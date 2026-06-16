"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Gem,
  MapPin,
  Sparkles
} from "lucide-react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";

import { EventCountdown } from "@/components/event-countdown";
import { ShehnaiPlayer } from "@/components/shehnai-player";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ENGAGEMENT_MAP_URL = "https://maps.app.goo.gl/3saYgsweQPBvG5y27";
const WEDDING_MAP_URL = "https://maps.app.goo.gl/bt37KwPFbpvDZwzQ9";
const LAST_PAGE = 2;

const pageBackgrounds = [
  `${BASE_PATH}/cover-card-with-ganesh.jpeg`,
  `${BASE_PATH}/details-card.jpeg`,
  `${BASE_PATH}/details-card.jpeg`
];

const pageNames = ["आवरण", "सगाई", "विवाह"];

const pageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? "10%" : "-10%",
    scale: 0.985
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? "-10%" : "10%",
    scale: 0.985
  })
};

function VenueLink({
  href,
  label,
  name,
  children
}: {
  href: string;
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      whileTap={{ scale: 0.985 }}
      className="venue"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      <MapPin className="venue-pin" aria-hidden="true" />
      <span className="venue-copy">
        <small>समारोह स्थल</small>
        <strong>{name}</strong>
        <em>{children}</em>
      </span>
      <ArrowUpRight className="venue-arrow" aria-hidden="true" />
    </motion.a>
  );
}

function CoverPage({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.section
      className="cover-content"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
      }}
    >
      <div className="cover-ganesh-space" aria-hidden="true" />

      <motion.p
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
        className="cover-blessing"
      >
        ॥ श्री गणेशाय नमः ॥
      </motion.p>

      <motion.div
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
        className="cover-ornament"
        aria-hidden="true"
      >
        <span />
        <Sparkles />
        <span />
      </motion.div>

      <motion.p
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
        className="cover-kicker"
      >
        सगाई एवं शुभ विवाह
      </motion.p>

      <motion.h1
        variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
      >
        कंचन <b>संग</b> अभिषेक
      </motion.h1>

      <motion.p
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
        className="cover-invite"
      >
        हमारी सुपुत्री कंचन के मंगल उत्सव की शुभ बेला में
        <br />
        आपका स्नेहिल स्वागत है
      </motion.p>

      <motion.p
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        className="cover-dates"
      >
        01 – 03 जुलाई 2026
      </motion.p>

      <motion.button
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        className="open-invitation"
        onClick={onOpen}
      >
        आमंत्रण खोलें
        <ArrowRight aria-hidden="true" />
      </motion.button>
    </motion.section>
  );
}

function EngagementPage() {
  return (
    <motion.section
      className="event-content engagement-content"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } }
      }}
    >
      <motion.header variants={pageItem}>
        <p className="event-blessing">॥ शुभारंभ ॥</p>
        <Gem aria-hidden="true" />
        <p className="event-kicker">प्रेम के नए अध्याय का उत्सव</p>
        <h2>सगाई समारोह</h2>
        <p className="event-copy">
          हमारी सुपुत्री कंचन एवं अभिषेक के सगाई समारोह में
          <br />
          आप सपरिवार सादर आमंत्रित हैं
        </p>
      </motion.header>

      <motion.div variants={pageItem} className="event-couple">
        <span>कंचन</span>
        <Image
          className="engagement-rings"
          src={`${BASE_PATH}/engagement-rings.png`}
          alt="संग"
          width={320}
          height={320}
        />
        <span>अभिषेक</span>
      </motion.div>

      <motion.div variants={pageItem} className="date-block">
        <CalendarDays aria-hidden="true" />
        <div>
          <span>बुधवार • सगाई की तिथि</span>
          <strong>01 जुलाई 2026</strong>
        </div>
      </motion.div>

      <motion.div variants={pageItem} className="countdown-wrap">
        <EventCountdown
          target="2026-07-01T13:00:00+05:30"
          label="सगाई तक"
          arrivedLabel="सगाई की शुभ बेला आ गई है"
          ariaLabel="सगाई समारोह की उलटी गिनती"
        />
      </motion.div>

      <motion.div variants={pageItem} className="single-time">
        <Clock3 aria-hidden="true" />
        <span>
          <small>समय</small>
          <strong>दोपहर 1:00 बजे से</strong>
        </span>
      </motion.div>

      <motion.div variants={pageItem}>
        <VenueLink
          href={ENGAGEMENT_MAP_URL}
          label="अबीर बैंक्वेट का स्थान Google Maps पर खोलें"
          name="अबीर बैंक्वेट"
        >
          बी-16/3, झिलमिल औद्योगिक क्षेत्र, झिलमिल कॉलोनी,
          <br />
          नई दिल्ली, दिल्ली – 110095
        </VenueLink>
      </motion.div>
    </motion.section>
  );
}

const pageItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

function WeddingPage() {
  return (
    <motion.section
      className="event-content wedding-content"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.085, delayChildren: 0.1 } }
      }}
    >
      <motion.header variants={pageItem}>
        <p className="event-blessing">॥ श्री गणेशाय नमः ॥</p>
        <Sparkles aria-hidden="true" />
        <p className="event-kicker">स्नेहिल आमंत्रण</p>
        <h2>शुभ विवाह</h2>
        <p className="event-copy">
          ईश्वर की असीम कृपा से हमारी सुपुत्री कंचन के मंगल परिणय पर
          <br />
          आप सपरिवार सादर आमंत्रित हैं
        </p>
      </motion.header>

      <motion.section variants={pageItem} className="couple">
        <div className="person">
          <h3>कंचन</h3>
          <p>
            सुपुत्री श्री श्रीनाथ यादव
            <br />
            एवं श्रीमती लालती देवी
          </p>
        </div>
        <div className="union" aria-label="संग">
          <span />
          <b>संग</b>
          <span />
        </div>
        <div className="person">
          <h3>अभिषेक</h3>
          <p>
            सुपुत्र श्री वेद पाल सिंह
            <br />
            एवं श्रीमती मीना
          </p>
        </div>
      </motion.section>

      <motion.div variants={pageItem} className="date-block">
        <CalendarDays aria-hidden="true" />
        <div>
          <span>शुक्रवार • विवाह तिथि</span>
          <strong>03 जुलाई 2026</strong>
        </div>
      </motion.div>

      <motion.div variants={pageItem} className="countdown-wrap">
        <EventCountdown
          target="2026-07-03T19:00:00+05:30"
          label="शुभ विवाह तक"
          arrivedLabel="मंगल बेला आ गई है"
          ariaLabel="विवाह की उलटी गिनती"
        />
      </motion.div>

      <motion.section variants={pageItem} className="schedule">
        <div className="schedule-item">
          <Clock3 aria-hidden="true" />
          <div>
            <span>बारात आगमन</span>
            <strong>सायं 7:00 बजे से</strong>
          </div>
        </div>
        <i aria-hidden="true" />
        <div className="schedule-item">
          <Clock3 aria-hidden="true" />
          <div>
            <span>प्रीति भोज</span>
            <strong>रात्रि 8:00 बजे</strong>
          </div>
        </div>
      </motion.section>

      <motion.p variants={pageItem} className="vidai">
        विदाई • 04 जुलाई 2026 • तारों की छाँव में
      </motion.p>

      <motion.div variants={pageItem}>
        <VenueLink
          href={WEDDING_MAP_URL}
          label="आनंदी होम्स बैंक्वेट का स्थान Google Maps पर खोलें"
          name="आनंदी होम्स बैंक्वेट"
        >
          सी-4, केंद्रीय विहार के सामने, होशियारपुर गाँव,
          <br />
          सेक्टर 51, नोएडा, उत्तर प्रदेश – 201303
        </VenueLink>
      </motion.div>
    </motion.section>
  );
}

export default function Home() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToPage = (nextPage: number) => {
    const boundedPage = Math.min(LAST_PAGE, Math.max(0, nextPage));
    if (boundedPage === page) return;
    setDirection(boundedPage > page ? 1 : -1);
    setPage(boundedPage);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -55 || info.velocity.x < -450) {
      goToPage(page + 1);
    } else if (info.offset.x > 55 || info.velocity.x > 450) {
      goToPage(page - 1);
    }
  };

  return (
    <main className="invitation-page">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <motion.article
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`invitation-card page-${page}`}
        style={{ backgroundImage: `url("${pageBackgrounds[page]}")` }}
        aria-label="कंचन के परिवार की ओर से मंगल उत्सव निमंत्रण"
      >
        <ShehnaiPlayer />

        {page > 0 && (
          <Image
            className="detail-ganesh"
            src={`${BASE_PATH}/ganesh-details.png`}
            alt="श्री गणेश"
            width={441}
            height={403}
            priority
          />
        )}

        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            drag={page === 0 ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
            className="page-layer"
          >
            {page === 0 && <CoverPage onOpen={() => goToPage(1)} />}
            {page === 1 && <EngagementPage />}
            {page === 2 && <WeddingPage />}
          </motion.div>
        </AnimatePresence>

        {page > 0 && (
          <nav className="page-navigation" aria-label="निमंत्रण के पृष्ठ">
            <button
              type="button"
              className="nav-arrow"
              aria-label="पिछला पृष्ठ"
              disabled={page === 0}
              onClick={() => goToPage(page - 1)}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <div className="page-dots">
              {pageNames.map((name, index) => (
                <button
                  key={name}
                  type="button"
                  className={page === index ? "active" : ""}
                  aria-label={`${name} पृष्ठ खोलें`}
                  aria-current={page === index ? "page" : undefined}
                  onClick={() => goToPage(index)}
                >
                  <span />
                  {index > 0 && <small>{name}</small>}
                </button>
              ))}
            </div>
            {page < LAST_PAGE ? (
              <button
                type="button"
                className="nav-arrow"
                aria-label="अगला पृष्ठ"
                onClick={() => goToPage(page + 1)}
              >
                <ArrowRight aria-hidden="true" />
              </button>
            ) : (
              <span className="nav-arrow-placeholder" aria-hidden="true" />
            )}
          </nav>
        )}
      </motion.article>
    </main>
  );
}

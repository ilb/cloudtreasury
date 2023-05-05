--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: RelationType; Type: TYPE; Schema: public; Owner: cloudtreasury
--

CREATE TYPE public."RelationType" AS ENUM (
    'ORG'
);


ALTER TYPE public."RelationType" OWNER TO cloudtreasury;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BusinessEntity; Type: TABLE; Schema: public; Owner: cloudtreasury
--

CREATE TABLE public."BusinessEntity" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    uid uuid
);


ALTER TABLE public."BusinessEntity" OWNER TO cloudtreasury;

--
-- Name: BusinessEntity_id_seq; Type: SEQUENCE; Schema: public; Owner: cloudtreasury
--

CREATE SEQUENCE public."BusinessEntity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."BusinessEntity_id_seq" OWNER TO cloudtreasury;

--
-- Name: BusinessEntity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloudtreasury
--

ALTER SEQUENCE public."BusinessEntity_id_seq" OWNED BY public."BusinessEntity".id;


--
-- Name: Calculation; Type: TABLE; Schema: public; Owner: cloudtreasury
--

CREATE TABLE public."Calculation" (
    id integer NOT NULL,
    "stockId" integer NOT NULL,
    "AssessmentDate" text NOT NULL,
    "ActiveMarket" text NOT NULL,
    "FairValue" integer NOT NULL,
    "DaysNumbers" integer NOT NULL,
    "TransactionsNumbers" integer NOT NULL,
    "OutputVolume" integer NOT NULL,
    "TotalVolume" integer NOT NULL
);


ALTER TABLE public."Calculation" OWNER TO cloudtreasury;

--
-- Name: Calculation_id_seq; Type: SEQUENCE; Schema: public; Owner: cloudtreasury
--

CREATE SEQUENCE public."Calculation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Calculation_id_seq" OWNER TO cloudtreasury;

--
-- Name: Calculation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloudtreasury
--

ALTER SEQUENCE public."Calculation_id_seq" OWNED BY public."Calculation".id;


--
-- Name: Permission; Type: TABLE; Schema: public; Owner: cloudtreasury
--

CREATE TABLE public."Permission" (
    id integer NOT NULL,
    code text NOT NULL,
    title text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Permission" OWNER TO cloudtreasury;

--
-- Name: Permission_id_seq; Type: SEQUENCE; Schema: public; Owner: cloudtreasury
--

CREATE SEQUENCE public."Permission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Permission_id_seq" OWNER TO cloudtreasury;

--
-- Name: Permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloudtreasury
--

ALTER SEQUENCE public."Permission_id_seq" OWNED BY public."Permission".id;


--
-- Name: Relation; Type: TABLE; Schema: public; Owner: cloudtreasury
--

CREATE TABLE public."Relation" (
    id integer NOT NULL,
    "businessEntityId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type public."RelationType" DEFAULT 'ORG'::public."RelationType" NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Relation" OWNER TO cloudtreasury;

--
-- Name: RelationMember; Type: TABLE; Schema: public; Owner: cloudtreasury
--

CREATE TABLE public."RelationMember" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "roleId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "relationId" integer NOT NULL
);


ALTER TABLE public."RelationMember" OWNER TO cloudtreasury;

--
-- Name: RelationMember_id_seq; Type: SEQUENCE; Schema: public; Owner: cloudtreasury
--

CREATE SEQUENCE public."RelationMember_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RelationMember_id_seq" OWNER TO cloudtreasury;

--
-- Name: RelationMember_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloudtreasury
--

ALTER SEQUENCE public."RelationMember_id_seq" OWNED BY public."RelationMember".id;


--
-- Name: Relation_id_seq; Type: SEQUENCE; Schema: public; Owner: cloudtreasury
--

CREATE SEQUENCE public."Relation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Relation_id_seq" OWNER TO cloudtreasury;

--
-- Name: Relation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloudtreasury
--

ALTER SEQUENCE public."Relation_id_seq" OWNED BY public."Relation".id;


--
-- Name: Role; Type: TABLE; Schema: public; Owner: cloudtreasury
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    code text NOT NULL,
    title text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Role" OWNER TO cloudtreasury;

--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: cloudtreasury
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Role_id_seq" OWNER TO cloudtreasury;

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloudtreasury
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: Stock; Type: TABLE; Schema: public; Owner: cloudtreasury
--

CREATE TABLE public."Stock" (
    id integer NOT NULL,
    ticker text NOT NULL,
    value integer NOT NULL,
    isin text
);


ALTER TABLE public."Stock" OWNER TO cloudtreasury;

--
-- Name: Stock_id_seq; Type: SEQUENCE; Schema: public; Owner: cloudtreasury
--

CREATE SEQUENCE public."Stock_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Stock_id_seq" OWNER TO cloudtreasury;

--
-- Name: Stock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloudtreasury
--

ALTER SEQUENCE public."Stock_id_seq" OWNED BY public."Stock".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: cloudtreasury
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    login text NOT NULL,
    name text NOT NULL,
    password text,
    data jsonb,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO cloudtreasury;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: cloudtreasury
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO cloudtreasury;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloudtreasury
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _PermissionToRole; Type: TABLE; Schema: public; Owner: cloudtreasury
--

CREATE TABLE public."_PermissionToRole" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_PermissionToRole" OWNER TO cloudtreasury;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: cloudtreasury
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO cloudtreasury;

--
-- Name: BusinessEntity id; Type: DEFAULT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."BusinessEntity" ALTER COLUMN id SET DEFAULT nextval('public."BusinessEntity_id_seq"'::regclass);


--
-- Name: Calculation id; Type: DEFAULT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Calculation" ALTER COLUMN id SET DEFAULT nextval('public."Calculation_id_seq"'::regclass);


--
-- Name: Permission id; Type: DEFAULT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Permission" ALTER COLUMN id SET DEFAULT nextval('public."Permission_id_seq"'::regclass);


--
-- Name: Relation id; Type: DEFAULT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Relation" ALTER COLUMN id SET DEFAULT nextval('public."Relation_id_seq"'::regclass);


--
-- Name: RelationMember id; Type: DEFAULT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."RelationMember" ALTER COLUMN id SET DEFAULT nextval('public."RelationMember_id_seq"'::regclass);


--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Name: Stock id; Type: DEFAULT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Stock" ALTER COLUMN id SET DEFAULT nextval('public."Stock_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: BusinessEntity; Type: TABLE DATA; Schema: public; Owner: cloudtreasury
--

COPY public."BusinessEntity" (id, name, "createdAt", "updatedAt", uid) FROM stdin;
1	ООО "БРОКЕР"	2023-04-20 12:25:04.072	2023-04-20 12:25:04.073	c36067c3-2f15-4a02-8b13-5e755daa1375
\.


--
-- Data for Name: Calculation; Type: TABLE DATA; Schema: public; Owner: cloudtreasury
--

COPY public."Calculation" (id, "stockId", "AssessmentDate", "ActiveMarket", "FairValue", "DaysNumbers", "TransactionsNumbers", "OutputVolume", "TotalVolume") FROM stdin;
\.


--
-- Data for Name: Permission; Type: TABLE DATA; Schema: public; Owner: cloudtreasury
--

COPY public."Permission" (id, code, title, "createdAt", "updatedAt") FROM stdin;
1	users_create	Добавление пользователей	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
2	users_read	Просмотр пользователей	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
3	users_update	Редактирование пользователей	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
4	users_delete	Удаление пользователей	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
5	roles_create	Добавление ролей	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
6	roles_read	Просмотр ролей	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
7	roles_update	Редактирование ролей	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
8	roles_delete	Удаление ролей	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
9	permissions_create	Добавление прав	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
10	permissions_read	Просмотр прав	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
11	permissions_update	Редактирование прав	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
12	permissions_delete	Удаление прав	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
13	offers_create	Добавление заявок	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
14	offers_read	Просмотр заявок	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
15	offers_update	Редактирование заявок	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
16	offers_delete	Удаление заявок	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
17	settings_create	Добавление настроек	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
18	settings_read	Просмотр настроек	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
19	settings_update	Редактирование настроек	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
20	settings_delete	Удаление настроек	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
22	menu_read	Просмотр бокового и верхнего меню	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
23	stocks_create	Добавление ценных бумаг	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
24	stocks_read	Просмотр ценных бумаг	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
25	stocks_update	Редактирование ценных бумаг	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
26	stocks_delete	Удаление ценных бумаг	2023-04-20 12:25:04.022	2023-04-20 12:25:04.024
\.


--
-- Data for Name: Relation; Type: TABLE DATA; Schema: public; Owner: cloudtreasury
--

COPY public."Relation" (id, "businessEntityId", "createdAt", type, "updatedAt") FROM stdin;
1	1	2023-04-20 12:25:04.078	ORG	2023-04-20 12:25:04.079
\.


--
-- Data for Name: RelationMember; Type: TABLE DATA; Schema: public; Owner: cloudtreasury
--

COPY public."RelationMember" (id, "userId", "roleId", "createdAt", "updatedAt", "relationId") FROM stdin;
1	1	1	2023-04-20 12:25:04.097	2023-04-20 12:25:04.098	1
2	2	3	2023-04-20 12:25:04.097	2023-04-20 12:25:04.098	1
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: cloudtreasury
--

COPY public."Role" (id, code, title, "createdAt", "updatedAt") FROM stdin;
1	admin	Администратор	2023-04-20 12:25:04.041	2023-04-20 12:25:04.042
2	testgroup	Тестовая роль LDAP	2023-04-20 12:25:04.059	2023-04-20 12:25:04.059
3	.apps.loandeal.analyst	Аналитик	2023-04-20 12:25:04.066	2023-04-20 12:25:04.067
\.


--
-- Data for Name: Stock; Type: TABLE DATA; Schema: public; Owner: cloudtreasury
--

COPY public."Stock" (id, ticker, value, isin) FROM stdin;
1	Альфа-Б2Р1	10000000	\N
2	АЛЬФА-Б2Р3	5000000	\N
3	АЛЬФА-Б2Р6	10000000	\N
4	АльфаБО-18	5000000	\N
5	АльфаБО-22	5000000	\N
6	Башнефть04	10000000	\N
7	Башнефть06	10000000	RU000A0JTM28
8	Башнефть07	10000000	RU000A0JTM36
9	Башнефть08	5000000	RU000A0JTM44
10	Башнефть09	5000000	RU000A0JTM51
11	ВТБ Б-1-49	10000000	\N
12	ВТБ Б-1-50	5087502	\N
13	ВТБ Б-1-62	6203934	\N
14	ВТБ Б-1-63	10000000	\N
15	ВТБ Б-1-64	10000000	\N
16	ВТБ Б-1-8	20000000	\N
17	ВТБ Б-1-85	3430487	\N
18	ВТБ Б-1-98	10000000	\N
19	ВТБ Б-1-99	10000000	\N
20	ВТБ Б1-286	1217260	RU000A104C03
21	ВТБ Б1-130	5000000	RU000A104KG2
22	ВТБ Б1-131	3146046	RU000A104UX6
23	ВТБ Б1-132	3706705	RU000A104W74
24	ВТБ Б1-203	2961805	\N
25	ВТБ Б1-204	5000000	\N
26	ВТБ Б1-205	11893584	\N
27	ВТБ Б1-228	8064466	\N
28	ВТБ Б1-229	11118143	\N
29	ВТБ Б1-230	4288549	RU000A103Q81
30	ВТБ Б1-240	521969	\N
31	ВТБ Б1-251	7505743	RU000A103YS0
32	ВТБ Б1-252	9119408	RU000A1046G0
33	ВТБ Б1-253	4582133	RU000A104C60
34	ВТБ БО-30	10000000	RU000A0JV3Q3
35	ВТБ БО-43	20000000	RU000A0JU773
36	ВЭБ 1P-12	10000000	\N
37	ВЭБ 1P-15	5000000	\N
38	ВЭБ 1P-16	20000000	\N
39	ВЭБ 1P-17	20000000	RU000A100GY1
40	ВЭБ 1P-21	20000000	\N
41	ВЭБ ПБО1Р2	15000000	\N
42	ВЭБ ПБО1Р5	10000000	\N
43	ВЭБ ПБО1Р9	30000000	\N
44	ВЭБ.РФ 06	10000000	\N
45	ВЭБ.РФ 08	15000000	\N
46	ВЭБ.РФ 09	15000000	\N
47	ВЭБ.РФ 10	15000000	\N
48	ВЭБ.РФ 19	10000000	RU000A0JT6B2
49	ВЭБ.РФ 21	15000000	\N
50	ВЭБ1P-22	25000000	RU000A102FC5
51	ВЭБ1P-К105	8965366	RU000A102UY8
52	ВЭБлизБ04	5000000	RU000A0JV8D0
53	ВЭБлизБ05	5000000	RU000A0JV8G3
54	ВЭБлизинг4	5000000	\N
55	ВЭБлизинг5	5000000	\N
56	ВЭБлизинг8	5000000	\N
57	ВЭБлизинг9	5000000	\N
58	Газпнф1P1R	15000000	\N
59	Газпнф1P3R	25000000	RU000A0ZYDS7
60	ГазпрнефБ1	5000000	\N
61	ГазпрнефБ4	10000000	\N
62	ГазпромКP1	15000000	\N
63	ГПБ 12	10000000	RU000A0JT6J5
64	ГПБ 1P-05P	13228044	RU000A1002E8
65	ГПБ 2-ИП	15000000	\N
66	ГПБ БО-07	10000000	RU000A0JU7Y9
67	ГПБ БО-08	10000000	\N
68	ГПБ БО-10	10000000	RU000A0JUV08
69	ГПБ БО-15	10000000	\N
70	ГПБ БО-16	10000000	RU000A0JXP45
71	ГПБ БО-17	10000000	RU000A0ZYEE5
72	ГПБ БО-18	10000000	RU000A0ZYRX7
73	ГПБ БО-19	10000000	RU000A0ZYRY5
74	ГПБ БО-25	5000000	\N
75	ГПБ001P03P	10377062	\N
76	ГПБ001P09P	20000000	\N
77	ГПБ001P14P	10000000	\N
78	ГПБ001P19P	15000000	RU000A102GJ8
79	ГТЛК 1P-03	10000000	RU000A0JXE06
80	ГТЛК 1P-04	10000000	RU000A0JXPG2
81	ГТЛК 1P-07	10000000	RU000A0ZYNY4
82	ГТЛК 1P-08	10000000	RU000A0ZYR91
83	ГТЛК 1P-10	10000000	RU000A0ZZ984
84	ГТЛК 1P-12	5000000	RU000A0ZZV11
85	ГТЛК 1P-13	10000000	RU000A1003A4
86	ГТЛК 1P-14	10000000	RU000A100FE5
87	ГТЛК 1P-20	7000000	RU000A1038M5
88	ГТЛК БО-04	5000000	RU000A0JVA10
89	ГТЛК БО-05	4000000	RU000A0JVWD9
90	ГТЛК БО-06	4000000	RU000A0JVWJ6
91	ГТЛК БО-07	4000000	RU000A0JW1P8
92	ГТЛК БО-08	5000000	\N
93	ДОМ 1P-3R	15000000	RU000A0ZZ1N0
94	ДОМ 1P-4R	25000000	RU000A0ZZ7C0
95	ДОМ 1P-5R	10000000	RU000A1004W6
96	ДОМ 1P-6R	25000000	RU000A100ET6
97	ДОМ 1P-7R	20000000	RU000A101590
98	ДОМ 1P-9R	15000000	RU000A104123
99	ДОМ.РФ Б-5	5000000	RU000A0JX2R1
100	ДОМ.РФ Б-6	5000000	RU000A0ZYF20
101	ДОМ.РФ Б-7	5000000	RU000A0ZYF38
102	ДОМ.РФ Б-8	5000000	RU000A0ZYFM5
103	ДОМ.РФ Б10	10000000	RU000A0ZYFN3
104	ДОМ.РФ16об	10000000	\N
105	ДОМ.РФ18об	7000000	RU000A0JRDY3
106	ДОМ.РФ1P1R	15000000	RU000A0ZYLU6
107	ДОМ.РФ1P2R	15000000	RU000A0ZYQU5
108	ДОМ.РФ25об	6000000	RU000A0JTW83
109	ДОМ.РФ30об	6000000	RU000A0JUKX4
110	ЕАБР 1Р-01	10000000	RU000A0ZZDB0
111	ЕАБР 1Р-02	5000000	\N
112	ЕАБР 1Р-03	5000000	\N
113	ЕАБР 1Р-04	5000000	RU000A100JC1
114	ЕАБР П3-01	10000000	RU000A1050H0
115	ЕАБР11	5000000	RU000A0JS934
116	ИНГБ-БО1	5000000	\N
117	МГор48-об	30000000	\N
118	МегафнБ1P3	15000000	RU000A0ZYC98
119	Мегафон1P4	20000000	\N
120	Мегафон1P5	20000000	\N
121	МТС БО-01	10000000	RU000A0JTTA5
122	МТС 001P-1	10000000	\N
123	МТС 001P-3	15000000	RU000A0ZYFC6
124	МТС 1P-05	10000000	\N
125	МТС 1P-08	5000000	RU000A100A58
126	МТС 1P-13	10000000	RU000A101939
127	МТС 1P-17	10000000	\N
128	ОткрФКБОП1	2000000	RU000A0JVC59
251	СберБ БО37	10000000	\N
129	ОткрФКБОП3	10000000	RU000A0JXLR8
130	ОткрФКББ4	5000000	RU000A0JV3L4
131	ОткрФКББ07	5000000	\N
132	ОткрФКББ10	3000000	\N
133	ОткрФКББ11	3000000	\N
134	ОткрФКББ12	6000000	\N
135	ОткрФКББ13	3000000	\N
136	ОткрФКББ14	5000000	\N
137	ОткрФКБОП5	10000000	\N
138	ОткрФКБП08	10000000	RU000A1035Y6
139	ОткрФКБП08	10000000	RU000A1035Y6
140	ОткрФКБП6	15000000	RU000A101GR3
141	ОткрФКБПБ1	1703531	\N
142	ОФЗ 24020	9999993	\N
143	ОФЗ 25083	350000000	\N
144	ОФЗ 26205	150000000	\N
145	ОФЗ 26209	293579016	\N
146	ОФЗ 26211 	150000000	RU000A0JTJL3
147	ОФЗ 26215 	250000000	RU000A0JU4L3
148	ОФЗ 26217	290000000	\N
149	ОФЗ 26218	250000000	RU000A0JVW48
150	ОФЗ 26220	350000000	RU000A0JXB41
151	ОФЗ 26222	350000000	RU000A0JXQF2
152	ОФЗ 26223	350000000	RU000A0ZYU88
153	ОФЗ 26224	350000000	RU000A0ZYUA9
154	ОФЗ 26226	350000000	RU000A0ZZYW2
155	ОФЗ 26227	341389524	\N
156	ОФЗ 26228	444104266	RU000A100A82
157	ОФЗ 26234	500000000	RU000A101QE0
158	ОФЗ 26235	483816503	RU000A1028E3
159	ОФЗ 26239	325339886	RU000A103901
160	ОФЗ 29012	212415496	RU000A0JX0H6
161	ПочтаРБ1P2	5000000	RU000A0JXRD5
162	ПочтаРБ1P3	5000000	RU000A0JXS59
163	ПочтаРБ1P4	5000000	RU000A0ZZ5H3
164	ПочтаРБ1P5	5000000	RU000A0ZZ5J9
165	ПочтаРБ1P6	5000000	RU000A100SZ3
166	ПочтаРБ1P7	5000000	RU000A1008Y3
167	ПочтаРБ1P8	5000000	RU000A100UT2
168	ПочтаРосБ2	5000000	RU000A0JWGV2
169	ПочтаРосБ4	5000000	RU000A0JXMP0
170	РЕСОЛизБП4	5000000	\N
171	РЖД Б01P1R	15000000	RU000A0JXN05
172	РЖД 1Р-06R	15000000	RU000A0ZZ4P9
173	РЖД 1Р-10R	10000000	\N
174	РЖД БО-02	15000000	RU000A0JVW71
175	РЖД БО-07	20000000	RU000A0JWC82
176	РЖД-28 обл	20000000	RU000A0JTU85
177	РЖД-32 обл	10000000	RU000A0JSGV0
178	РЖД-41 обл	15000000	RU000A0JX1S1
179	РН БАНК1Р2	5000000	\N
180	РН БАНК1Р3	5000000	\N
181	РН БАНК1Р4	5000000	\N
182	РН БАНК1Р5	8000000	\N
183	РН БАНК1Р6	7000000	RU000A100UU0
184	РН БАНК1Р7	8000000	RU000A102960
185	РН БАНК1Р8	8000000	RU000A1030Y7
186	Росбанк2P4	10000000	\N
187	Росбанк2P5	10000000	\N
188	Росбанк2P6	15000000	RU000A100TH9
189	Росбанк2P7	10000000	\N
190	Росбанк2P8	15000000	RU000A102F28
191	Росбанк2P9	20000000	RU000A103DU0
192	РосбанкБ11	5000000	RU000A0JX2F6
193	РосбанкБ12	5000000	RU000A0JX2D1
194	РосбанкБ20	5000000	\N
195	РосбанкБ26	7000000	RU000A0JWNB0
196	Роснефть04	10000000	RU000A0JT940
197	Роснефть05	10000000	RU000A0JT965
198	Роснефть07	15000000	RU000A0JTS06
199	Роснефть08	15000000	RU000A0JTS22 
200	Роснефть06	10000000	RU000A0JTYL2
201	РоснефтьБ1	15000000	RU000A0JUFU0
202	РоснефтьБ5	20000000	RU000A0JUCS1
203	РоснефтьБ6	20000000	RU000A0JUCR3
204	РоснефтьБ7	20000000	RU000A0JUFV8
205	Роснфт1P2	30000000	RU000A0JX355
206	Роснфт1P4	40000000	RU000A0JXQK2
207	Роснфт2P1	300000000	RU000A0ZYJH7
208	Роснфт2P3	30000000	RU000A0ZYLG5
209	Роснфт2P4	50000000	RU000A0ZYT40
210	РосселхБ17	10000000	RU000A0JT7M7
211	РСХБ 13	5000000	\N
212	РСХБ 14	10000000	\N
213	РСХБ 15	10000000	\N
214	РСХБ 16	10000000	\N
215	РСХБ 17	10000000	RU000A0JT7M7
216	РСХБ 18	5000000	RU000A0JT874
217	РСХБ 20	10000000	RU000A0JTVJ2
218	РСХБ 22	5000000	RU000A0JU6A1
219	РСХБ 23	5000000	RU000A0JUAD7
220	РСХБ 2Р10	10000000	RU000A103GX7
221	РСХБ 2Р14	15000000	RU000A103N84
222	РСХБ Б01R	5000000	RU000A101129
223	РСХБ Б02RP	2480992	RU000A101DD0
224	РСХБ Б05КР	10000000	\N
225	РСХБ БО 2P	10000000	\N
226	РСХБ БО 3P	7000000	\N
227	РСХБ БО 4P	5000000	\N
228	РСХБ БО-5Р	25000000	\N
229	РСХБ БО-6Р	13000000	RU000A0ZZPZ3
230	>РСХБ БО-9Р	10000000	\N
231	РСХБ БО13	5000000	RU000A0JUW31
232	РСХБ БО14	5000000	RU000A0JUW72
233	РСХБ БО15	5000000	RU000A0JV3R1
234	РСХБ БО9	10000000	RU000A0JVWB3
235	РСХБ2Р09	3799466	\N
236	РСХБ2Р6RIB	1379330	RU000A1036F3
237	РСХБ2Р11	10000000	RU000A104925
238	СамарОбл10	12000000	\N
239	Сбер Sb12R	30000000	\N
240	Сбер Sb13R	40000000	\N
241	Сбер Sb14R	40000000	\N
242	Сбер Sb18R	40000000	RU000A102FR3
243	Сбер Sb19R	180000000	RU000A102CU4
244	Сбер Sb32R	50000000	RU000A103G75
245	СберБ Б12R	50000000	\N
246	СберБ Б16R	40000000	RU000A0ZZE20
247	СберБ Б52R	12000000	\N
248	СберБ Б78R	60000000	\N
249	СберБ БО6R	40000000	RU000A0ZZ117
250	СберБ БО19	15000000	\N
252	СберБ БО4R	25000000	\N
253	СовкмFIZL1	500000	RU000A101376
254	СовкмFIZL2	4893867	RU000A101PP8
255	Совком БО3	7000000	\N
256	Совком БО5	10000000	\N
257	СовкомБОП1	10000000	RU000A100DZ5
258	СовкомБОП2	12000000	RU000A101MB5
259	СовкомБОП3	10000000	\N
260	Татнфт1P1	15000000	RU000A1018K1
261	ТойотаБ1P1	5000000	\N
262	ТойотаБ1P2	3000000	\N
263	ТойотаБ1P3	5000000	RU000A100YW8
264	ТойотаБ1P5	5000000	\N
265	ТранснфБО5	17000000	\N
266	ТранснфБО6	17000000	RU000A0JWS92
267	ТрансФБО39	2100000	\N
268	ТрнфБО1P10	15000000	\N
269	ТрнфБО1P12	15000000	\N
270	ТрнфБО1P4	15000000	RU000A0JWVC1
271	ТрнфБО1P6	20000000	\N
272	ТрнфБО1P9	15000000	\N
273	ФолксвБ1P2	5000000	\N
274	ФолксвБ1P3	10000000	RU000A0ZYQU5
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: cloudtreasury
--

COPY public."User" (id, login, name, password, data, "isBlocked", "createdAt", "updatedAt") FROM stdin;
1	admin	Admin	$2b$06$W6buUDD9eVL2VloYVXtw3O/Ea3t8nJaVWCEBB65OUlTkkyuSbfT/y	\N	f	2023-04-20 12:25:04.086	2023-04-20 12:25:04.087
2	analyst	Analyst	$2b$06$W6buUDD9eVL2VloYVXtw3O/Ea3t8nJaVWCEBB65OUlTkkyuSbfT/y	\N	f	2023-04-20 12:25:04.092	2023-04-20 12:25:04.093
\.


--
-- Data for Name: _PermissionToRole; Type: TABLE DATA; Schema: public; Owner: cloudtreasury
--

COPY public."_PermissionToRole" ("A", "B") FROM stdin;
1	1
2	1
3	1
4	1
5	1
6	1
7	1
8	1
9	1
10	1
11	1
12	1
13	1
14	1
15	1
16	1
17	1
18	1
19	1
20	1
22	1
23	1
24	1
25	1
26	1
1	2
2	2
3	2
4	2
5	2
6	2
7	2
8	2
9	2
10	2
11	2
12	2
13	2
14	2
15	2
16	2
17	2
18	2
19	2
20	2
22	2
23	2
24	2
25	2
26	2
13	3
14	3
15	3
16	3
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: cloudtreasury
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
0964fd17-3086-4105-981b-6547ce3f9c36	21bcada2ca73f2f480c479b38f7899b803849b6b644b4f60c21b8fee33ce5a35	2023-04-20 16:13:33.509546+04	20220914124415_init	\N	\N	2023-04-20 16:13:33.440618+04	1
6b16ae78-8160-49e8-87d8-bbe6635db1e5	9cb51e0b7636fa960d2bd9f801893d4151f9fbecb6d7514cfd9cd8926b70ca3d	2023-04-20 16:13:33.52055+04	20221006213220_unrequired_password	\N	\N	2023-04-20 16:13:33.512278+04	1
fae870c4-99dc-4456-ad91-ca0bafee52c2	5178e1444cc3e4753cdcb75d9a9fce8adc76bdc70e9a5464e2df3064518a0ce9	2023-04-20 16:13:33.553278+04	20221012113430_change_role_structure	\N	\N	2023-04-20 16:13:33.523414+04	1
73849ea2-0537-454c-a262-c2670e71edff	a793df46538c1ee794e23e9464b2e2f969da0b11a575bc4bffb663690cd34b3d	2023-04-20 16:13:33.580122+04	20221012124820_change_role_structure	\N	\N	2023-04-20 16:13:33.555986+04	1
e61e9e00-3f2e-455b-af64-20124a80709a	4a65afba5aadbc6b366f41da968b216d7a9ae2afaf6ee3828216dce57e5e8b99	2023-04-20 16:13:33.591935+04	20221012130253_fix_typo	\N	\N	2023-04-20 16:13:33.582869+04	1
8b86066b-a99f-4613-98b5-b378fa8f3669	41a5ef30b3146505b18ec3958f9c2929a5ef0935f8695a8fff40c7229b5f0f1a	2023-04-20 16:13:33.609243+04	20230313165322_added_uid_to_business_entity_table	\N	\N	2023-04-20 16:13:33.594725+04	1
e3b51e3f-970f-41bd-b7d5-d9f18c885fdf	220fbea3c0276a20e10a72c382660e66960f14e0a73c5b4a7099989af47c9164	2023-04-20 16:13:33.631547+04	20230329091813_create_stock_table	\N	\N	2023-04-20 16:13:33.612481+04	1
24674ce6-855a-49d7-82f6-49bf44bc3465	0688a68ac575274a0ec0698aa8eac6f5f7471470df6e63e3d0c8269068e413cf	2023-04-20 16:13:33.659875+04	20230330172422_rename_stock_id_into_id	\N	\N	2023-04-20 16:13:33.637126+04	1
2c787264-25a8-45e8-940f-1d4e82094541	31af232157ba77598990c94ec1e6387fcf4a8890c908b3fe81c34cd3f7ea5121	2023-04-20 16:13:33.682158+04	20230331130053_stocks_database_rename	\N	\N	2023-04-20 16:13:33.662645+04	1
00fffadd-6f4b-46ed-bc9b-e73f60476612	5be2b1f32ffb575940302c224ad9c9ee6d3334be4df7edeab3a211ed2d1c9ad5	2023-04-25 14:58:37.444821+04	20230421131056_create_calculation_table	\N	\N	2023-04-25 14:58:37.409979+04	1
e0d9d759-7032-4754-bd55-23447f5e4c12	423ed15f1e2770eb4674fc8cb2a1364ac8afde7e72d6893e54a45cdca3c2ff2b	2023-04-25 14:58:37.469544+04	20230421134235_assessment_date_to_string	\N	\N	2023-04-25 14:58:37.447455+04	1
\.


--
-- Name: BusinessEntity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudtreasury
--

SELECT pg_catalog.setval('public."BusinessEntity_id_seq"', 2, false);


--
-- Name: Calculation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudtreasury
--

SELECT pg_catalog.setval('public."Calculation_id_seq"', 1, false);


--
-- Name: Permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudtreasury
--

SELECT pg_catalog.setval('public."Permission_id_seq"', 27, false);


--
-- Name: RelationMember_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudtreasury
--

SELECT pg_catalog.setval('public."RelationMember_id_seq"', 3, false);


--
-- Name: Relation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudtreasury
--

SELECT pg_catalog.setval('public."Relation_id_seq"', 2, false);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudtreasury
--

SELECT pg_catalog.setval('public."Role_id_seq"', 4, false);


--
-- Name: Stock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudtreasury
--

SELECT pg_catalog.setval('public."Stock_id_seq"', 274, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloudtreasury
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, false);


--
-- Name: BusinessEntity BusinessEntity_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."BusinessEntity"
    ADD CONSTRAINT "BusinessEntity_pkey" PRIMARY KEY (id);


--
-- Name: Calculation Calculation_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Calculation"
    ADD CONSTRAINT "Calculation_pkey" PRIMARY KEY (id);


--
-- Name: Permission Permission_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Permission"
    ADD CONSTRAINT "Permission_pkey" PRIMARY KEY (id);


--
-- Name: RelationMember RelationMember_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."RelationMember"
    ADD CONSTRAINT "RelationMember_pkey" PRIMARY KEY (id);


--
-- Name: Relation Relation_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Relation"
    ADD CONSTRAINT "Relation_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: Stock Stock_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Stock"
    ADD CONSTRAINT "Stock_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: BusinessEntity_uid_key; Type: INDEX; Schema: public; Owner: cloudtreasury
--

CREATE UNIQUE INDEX "BusinessEntity_uid_key" ON public."BusinessEntity" USING btree (uid);


--
-- Name: Permission_code_key; Type: INDEX; Schema: public; Owner: cloudtreasury
--

CREATE UNIQUE INDEX "Permission_code_key" ON public."Permission" USING btree (code);


--
-- Name: Relation_businessEntityId_key; Type: INDEX; Schema: public; Owner: cloudtreasury
--

CREATE UNIQUE INDEX "Relation_businessEntityId_key" ON public."Relation" USING btree ("businessEntityId");


--
-- Name: Role_code_key; Type: INDEX; Schema: public; Owner: cloudtreasury
--

CREATE UNIQUE INDEX "Role_code_key" ON public."Role" USING btree (code);


--
-- Name: User_login_key; Type: INDEX; Schema: public; Owner: cloudtreasury
--

CREATE UNIQUE INDEX "User_login_key" ON public."User" USING btree (login);


--
-- Name: _PermissionToRole_AB_unique; Type: INDEX; Schema: public; Owner: cloudtreasury
--

CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON public."_PermissionToRole" USING btree ("A", "B");


--
-- Name: _PermissionToRole_B_index; Type: INDEX; Schema: public; Owner: cloudtreasury
--

CREATE INDEX "_PermissionToRole_B_index" ON public."_PermissionToRole" USING btree ("B");


--
-- Name: Calculation Calculation_stockId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Calculation"
    ADD CONSTRAINT "Calculation_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES public."Stock"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelationMember RelationMember_relationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."RelationMember"
    ADD CONSTRAINT "RelationMember_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES public."Relation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelationMember RelationMember_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."RelationMember"
    ADD CONSTRAINT "RelationMember_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RelationMember RelationMember_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."RelationMember"
    ADD CONSTRAINT "RelationMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Relation Relation_businessEntityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."Relation"
    ADD CONSTRAINT "Relation_businessEntityId_fkey" FOREIGN KEY ("businessEntityId") REFERENCES public."BusinessEntity"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _PermissionToRole _PermissionToRole_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."_PermissionToRole"
    ADD CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES public."Permission"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _PermissionToRole _PermissionToRole_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cloudtreasury
--

ALTER TABLE ONLY public."_PermissionToRole"
    ADD CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// 允許跨域
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

server.use(jsonServer.bodyParser);

// ─── 假資料 ──────────────────────────────────────────────────────────────────

const now = Math.floor(Date.now() / 1000);
const DAY = 86400;

function ts(daysAgo, hour = 10) {
    return now - daysAgo * DAY + hour * 3600;
}

const MOCK_USING_DATA = [
    // ── 今天 ──
    {
        _key: "861393403", barcode: "(01)12345678901231(17)261231(10)123",
        refNumber: "qwe", materialId: "2104795",
        expirationDate: 1798646400000, expirationDateString: "20261231",
        batchNumber: "123", contractId: "856216925", valuationCode: "12358",
        quantity: 1, patientChartNumber: "pa501606", patientName: "莊淑傑",
        OpNumber: "op26052523", doctorName: "劉志恩", doctorAccount: "doc434633",
        divisionCode: "3", divisionName: "心臟外科",
        createTime: ts(0, 9), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(0, 8), opmethod: "Thrombectomy or Embolectomy",
        payType: "自費", model: "qwe", materialName: "qwe",
        pricingQuantity: 1, companyName: "烏迪科技股份有限公司",
        taxId: "94053872", tfdaLicense: "無資料", uploaded: false, updated: false,
    },
    {
        _key: "861393441", refNumber: "1014", materialId: "2886356",
        contractId: "2934669", valuationCode: "無資料",
        quantity: 1, patientChartNumber: "pa501606", patientName: "莊淑傑",
        OpNumber: "op26052523", doctorName: "劉志恩", doctorAccount: "doc434633",
        divisionCode: "3", divisionName: "心臟外科",
        createTime: ts(0, 9), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(0, 8), opmethod: "Thrombectomy or Embolectomy",
        payType: "自費", model: "320 cm x 213cm, 40Pkg/Box", materialName: '"3M" 無菌防水舖單',
        pricingQuantity: 1, companyName: "醫優科技股份有限公司",
        taxId: "85082333", tfdaLicense: "衛署醫器輸字第013811號", uploaded: false, updated: false,
    },
    // ── 2 天前 ──
    {
        _key: "861393860", barcode: "(01)05414734217101(17)261231(10)123",
        refNumber: "406700", materialId: "2157839",
        expirationDate: 1798646400000, expirationDateString: "20261231",
        batchNumber: "123", contractId: "750280160", valuationCode: "FCBM6700",
        quantity: 1, patientChartNumber: "pa711566", patientName: "莊涵溥",
        OpNumber: "op26052522", doctorName: "王慧金", doctorAccount: "doc789499",
        divisionCode: "2", divisionName: "耳鼻喉科",
        createTime: ts(2, 10), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(2, 9), opmethod: "Laryngo Micro Surgery (L.M.S.)",
        payType: "健保", model: "可鎖導引鞘 5F 12cm", materialName: '"聖猷達"費思凱絲導管導引器',
        pricingQuantity: 3, companyName: "銀鐸實業有限公司",
        taxId: "22731043", tfdaLicense: "衛署醫器輸字第009586號", uploaded: false, updated: false,
    },
    {
        _key: "861393883", barcode: "(01)05414734217101(17)261231(10)123",
        refNumber: "406700", materialId: "2157839",
        expirationDate: 1798646400000, expirationDateString: "20261231",
        batchNumber: "123", contractId: "750280160", valuationCode: "FCBM6700",
        quantity: 2, patientChartNumber: "pa711566", patientName: "莊涵溥",
        OpNumber: "op26052522", doctorName: "王慧金", doctorAccount: "doc789499",
        divisionCode: "2", divisionName: "耳鼻喉科",
        createTime: ts(2, 10), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(2, 9), opmethod: "Laryngo Micro Surgery (L.M.S.)",
        payType: "健保", model: "可鎖導引鞘 5.5F 12cm", materialName: '"聖猷達"費思凱絲導管導引器',
        pricingQuantity: 3, companyName: "銀鐸實業有限公司",
        taxId: "22731043", tfdaLicense: "衛署醫器輸字第009586號", uploaded: false, updated: false,
    },
    // ── 4 天前 ──
    {
        _key: "861393922", barcode: "(01)05414734217132(17)261231(10)123",
        refNumber: "406703", materialId: "2157873",
        expirationDate: 1798646400000, expirationDateString: "20261231",
        batchNumber: "123", contractId: "750280144", valuationCode: "FCBM6700",
        quantity: 1, patientChartNumber: "pa383744", patientName: "王蘭信",
        OpNumber: "op26052519", doctorName: "莊成成", doctorAccount: "doc497903",
        divisionCode: "3", divisionName: "心臟外科",
        createTime: ts(4, 11), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(4, 10), opmethod: "Replacement of Pacemaker",
        payType: "健保", model: "7F .078 XB4 SH 100cm", materialName: '"考迪斯" 導引導管',
        pricingQuantity: 1, companyName: "博而美國際股份有限公司",
        taxId: "23359021", tfdaLicense: "衛署醫器輸字第008642號", uploaded: true, updated: true,
    },
    {
        _key: "861396197", barcode: "(01)20705032021903(17)261231(10)2255",
        refNumber: "77805700", materialId: "850433378",
        expirationDate: 1798646400000, expirationDateString: "20261231",
        batchNumber: "2255", contractId: "856218244", valuationCode: "CB242",
        quantity: 1, patientChartNumber: "pa383744", patientName: "王蘭信",
        OpNumber: "op26052519", doctorName: "莊成成", doctorAccount: "doc497903",
        divisionCode: "3", divisionName: "心臟外科",
        createTime: ts(4, 11), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(4, 10), opmethod: "Replacement of Pacemaker",
        payType: "健保", model: "25G 雷射探頭", materialName: '"愛爾康"準星眼用雷射儀',
        pricingQuantity: 1, companyName: "瑞士商愛爾康大藥廠股份有限公司",
        taxId: "20916488", tfdaLicense: "衛署醫器輸字第019571號", uploaded: false, updated: false,
    },
    // ── 6 天前 ──
    {
        _key: "861396260", barcode: "(01)00380657511143(17)261231(10)2255",
        refNumber: "8065751114", materialId: "2612181",
        expirationDate: 1798646400000, expirationDateString: "20261231",
        batchNumber: "2255", contractId: "3360894", valuationCode: "150098065751114",
        quantity: 1, patientChartNumber: "pa220031", patientName: "陳大偉",
        OpNumber: "op26052518", doctorName: "林佳穎", doctorAccount: "doc112233",
        divisionCode: "5", divisionName: "神經外科",
        createTime: ts(6, 14), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(6, 13), opmethod: "Craniotomy",
        payType: "健保", model: "標準型顱骨鑽頭 14mm", materialName: '"史賽克" 顱骨固定系統',
        pricingQuantity: 2, companyName: "史賽克醫療器材股份有限公司",
        taxId: "22358012", tfdaLicense: "衛署醫器輸字第021045號", uploaded: true, updated: false,
    },
    {
        _key: "861396317", barcode: "(01)00705032022043(17)261231(10)2255",
        refNumber: "77808300", materialId: "2232933",
        expirationDate: 1798646400000, expirationDateString: "20261231",
        batchNumber: "2255", contractId: "856218244", valuationCode: "CB242",
        quantity: 1, patientChartNumber: "pa220031", patientName: "陳大偉",
        OpNumber: "op26052518", doctorName: "林佳穎", doctorAccount: "doc112233",
        divisionCode: "5", divisionName: "神經外科",
        createTime: ts(6, 14), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(6, 13), opmethod: "Craniotomy",
        payType: "自費", model: "7F .078 JR4 SH 100cm", materialName: '"考迪斯" 導引導管',
        pricingQuantity: 1, companyName: "博而美國際股份有限公司",
        taxId: "23359021", tfdaLicense: "衛署醫器輸字第008642號", uploaded: false, updated: false,
    },
    // ── 8 天前（只出現在 week/month，不在 day）──
    {
        _key: "861400001",
        refNumber: "50210", materialId: "3001122",
        contractId: "4012345", valuationCode: "NV2210",
        quantity: 1, patientChartNumber: "pa330044", patientName: "黃美玲",
        OpNumber: "op26052510", doctorName: "張志明", doctorAccount: "doc556677",
        divisionCode: "4", divisionName: "骨科",
        createTime: ts(8, 9), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(8, 8), opmethod: "Total Hip Replacement",
        payType: "健保", model: "髖關節假體 56mm", materialName: '"史密斯" 全髖關節置換系統',
        pricingQuantity: 1, companyName: "史密斯醫療股份有限公司",
        taxId: "31245678", tfdaLicense: "衛署醫器輸字第022100號", uploaded: true, updated: true,
    },
    {
        _key: "861400002",
        refNumber: "50211", materialId: "3001123",
        contractId: "4012345", valuationCode: "NV2210",
        quantity: 1, patientChartNumber: "pa330044", patientName: "黃美玲",
        OpNumber: "op26052510", doctorName: "張志明", doctorAccount: "doc556677",
        divisionCode: "4", divisionName: "骨科",
        createTime: ts(8, 9), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(8, 8), opmethod: "Total Hip Replacement",
        payType: "健保", model: "骨水泥 40g", materialName: '"施樂輝" 骨水泥',
        pricingQuantity: 2, companyName: "施樂輝醫療器材有限公司",
        taxId: "29876543", tfdaLicense: "衛署醫器輸字第011230號", uploaded: false, updated: false,
    },
    {
        _key: "861400003",
        refNumber: "50212", materialId: "3001124",
        contractId: "4012346", valuationCode: "NV2211",
        quantity: 1, patientChartNumber: "pa441155", patientName: "李宏志",
        OpNumber: "op26052509", doctorName: "吳明達", doctorAccount: "doc778899",
        divisionCode: "1", divisionName: "一般外科",
        createTime: ts(8, 15), recoder: "5631", revoked: false, warehouse: "5634",
        optime: ts(8, 14), opmethod: "Laparoscopic Appendectomy",
        payType: "健保", model: "5mm 腹腔鏡穿刺器", materialName: '"柯惠" 腹腔鏡穿刺套管',
        pricingQuantity: 3, companyName: "柯惠醫療股份有限公司",
        taxId: "18765432", tfdaLicense: "衛署醫器輸字第018765號", uploaded: false, updated: false,
    },
    // ── 12 天前（只出現在 month）──
    {
        _key: "861410001",
        refNumber: "60301", materialId: "4001001",
        contractId: "5011100", valuationCode: "CR3301",
        quantity: 1, patientChartNumber: "pa552266", patientName: "蔡雅惠",
        OpNumber: "op26052501", doctorName: "陳冠宇", doctorAccount: "doc334455",
        divisionCode: "6", divisionName: "眼科",
        createTime: ts(12, 10), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(12, 9), opmethod: "Phacoemulsification",
        payType: "自費", model: "單焦點人工水晶體 +21.0D", materialName: '"愛爾康" AcrySof IQ 人工水晶體',
        pricingQuantity: 1, companyName: "瑞士商愛爾康大藥廠股份有限公司",
        taxId: "20916488", tfdaLicense: "衛署醫器輸字第019571號", uploaded: true, updated: true,
    },
    {
        _key: "861410002",
        refNumber: "60302", materialId: "4001002",
        contractId: "5011100", valuationCode: "CR3301",
        quantity: 1, patientChartNumber: "pa552266", patientName: "蔡雅惠",
        OpNumber: "op26052501", doctorName: "陳冠宇", doctorAccount: "doc334455",
        divisionCode: "6", divisionName: "眼科",
        createTime: ts(12, 10), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(12, 9), opmethod: "Phacoemulsification",
        payType: "健保", model: "黏彈劑 1.0mL", materialName: '"愛爾康" Viscoat 眼用黏彈劑',
        pricingQuantity: 1, companyName: "瑞士商愛爾康大藥廠股份有限公司",
        taxId: "20916488", tfdaLicense: "衛署醫器輸字第019572號", uploaded: false, updated: false,
    },
    {
        _key: "861410003",
        refNumber: "70101", materialId: "5001001",
        contractId: "6011200", valuationCode: "SP4401",
        quantity: 1, patientChartNumber: "pa663377", patientName: "林俊傑",
        OpNumber: "op26052495", doctorName: "黃建國", doctorAccount: "doc990011",
        divisionCode: "7", divisionName: "泌尿科",
        createTime: ts(15, 11), recoder: "5631", revoked: false, warehouse: "5634",
        optime: ts(15, 10), opmethod: "TURP",
        payType: "健保", model: "26Fr 連續灌流切除鏡", materialName: '"史賽克" 前列腺切除系統',
        pricingQuantity: 1, companyName: "史賽克醫療器材股份有限公司",
        taxId: "22358012", tfdaLicense: "衛署醫器輸字第023010號", uploaded: false, updated: false,
    },
    {
        _key: "861410004",
        refNumber: "70102", materialId: "5001002",
        contractId: "6011201", valuationCode: "SP4402",
        quantity: 1, patientChartNumber: "pa663377", patientName: "林俊傑",
        OpNumber: "op26052495", doctorName: "黃建國", doctorAccount: "doc990011",
        divisionCode: "7", divisionName: "泌尿科",
        createTime: ts(15, 11), recoder: "5631", revoked: false, warehouse: "5634",
        optime: ts(15, 10), opmethod: "TURP",
        payType: "健保", model: "雙極電切環 28Fr", materialName: '"奧林巴斯" 雙極電切系統',
        pricingQuantity: 2, companyName: "奧林巴斯光學股份有限公司",
        taxId: "11234567", tfdaLicense: "衛署醫器輸字第017832號", uploaded: true, updated: false,
    },
    {
        _key: "861410005",
        refNumber: "70201", materialId: "5002001",
        contractId: "6012300", valuationCode: "CV5501",
        quantity: 1, patientChartNumber: "pa774488", patientName: "吳麗珍",
        OpNumber: "op26052490", doctorName: "劉志恩", doctorAccount: "doc434633",
        divisionCode: "3", divisionName: "心臟外科",
        createTime: ts(18, 13), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(18, 12), opmethod: "CABG",
        payType: "健保", model: "主動脈球囊幫浦導管 40mL", materialName: '"達威" 主動脈球囊反搏導管',
        pricingQuantity: 1, companyName: "達威醫療器材股份有限公司",
        taxId: "33456789", tfdaLicense: "衛署醫器輸字第024560號", uploaded: false, updated: false,
    },
    {
        _key: "861410006",
        refNumber: "70202", materialId: "5002002",
        contractId: "6012300", valuationCode: "CV5502",
        quantity: 1, patientChartNumber: "pa774488", patientName: "吳麗珍",
        OpNumber: "op26052490", doctorName: "劉志恩", doctorAccount: "doc434633",
        divisionCode: "3", divisionName: "心臟外科",
        createTime: ts(18, 13), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(18, 12), opmethod: "CABG",
        payType: "健保", model: "體外循環管路套組", materialName: '"邁科威" 體外循環迴路套組',
        pricingQuantity: 1, companyName: "邁科威生物技術股份有限公司",
        taxId: "44567890", tfdaLicense: "衛署醫器輸字第025678號", uploaded: false, updated: false,
    },
    {
        _key: "861410007",
        refNumber: "80101", materialId: "6001001",
        contractId: "7013400", valuationCode: "SP6601",
        quantity: 1, patientChartNumber: "pa885599", patientName: "江明哲",
        OpNumber: "op26052480", doctorName: "王慧金", doctorAccount: "doc789499",
        divisionCode: "2", divisionName: "耳鼻喉科",
        createTime: ts(22, 9), recoder: "5631", revoked: false, warehouse: "5634",
        optime: ts(22, 8), opmethod: "Septoplasty",
        payType: "健保", model: "0度鼻竇內視鏡 4mm", materialName: '"卡爾蔡司" 鼻竇硬式內視鏡',
        pricingQuantity: 1, companyName: "卡爾蔡司醫療股份有限公司",
        taxId: "55678901", tfdaLicense: "衛署醫器輸字第026789號", uploaded: true, updated: true,
    },
    {
        _key: "861410008",
        refNumber: "80102", materialId: "6001002",
        contractId: "7013400", valuationCode: "SP6602",
        quantity: 1, patientChartNumber: "pa885599", patientName: "江明哲",
        OpNumber: "op26052480", doctorName: "王慧金", doctorAccount: "doc789499",
        divisionCode: "2", divisionName: "耳鼻喉科",
        createTime: ts(22, 9), recoder: "5631", revoked: false, warehouse: "5634",
        optime: ts(22, 8), opmethod: "Septoplasty",
        payType: "自費", model: "鼻腔填塞止血海綿 5cm", materialName: '"邁保科" 可吸收鼻腔止血棉',
        pricingQuantity: 4, companyName: "邁保科生技股份有限公司",
        taxId: "66789012", tfdaLicense: "衛署醫器輸字第027890號", uploaded: false, updated: false,
    },
    {
        _key: "861410009",
        refNumber: "90201", materialId: "7001001",
        contractId: "8014500", valuationCode: "OR7701",
        quantity: 1, patientChartNumber: "pa996610", patientName: "鄭淑芬",
        OpNumber: "op26052470", doctorName: "莊成成", doctorAccount: "doc497903",
        divisionCode: "3", divisionName: "心臟外科",
        createTime: ts(27, 14), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(27, 13), opmethod: "Valve Replacement",
        payType: "健保", model: "機械式主動脈瓣膜 23mm", materialName: '"聖猷達" 機械式心臟瓣膜',
        pricingQuantity: 1, companyName: "銀鐸實業有限公司",
        taxId: "22731043", tfdaLicense: "衛署醫器輸字第009587號", uploaded: true, updated: true,
    },
    {
        _key: "861410010",
        refNumber: "90202", materialId: "7001002",
        contractId: "8014501", valuationCode: "OR7702",
        quantity: 1, patientChartNumber: "pa996610", patientName: "鄭淑芬",
        OpNumber: "op26052470", doctorName: "莊成成", doctorAccount: "doc497903",
        divisionCode: "3", divisionName: "心臟外科",
        createTime: ts(27, 14), recoder: "5630", revoked: false, warehouse: "5634",
        optime: ts(27, 13), opmethod: "Valve Replacement",
        payType: "健保", model: "生物組織心包補片 5x8cm", materialName: '"邁科威" 心包膜修補補片',
        pricingQuantity: 1, companyName: "邁科威生物技術股份有限公司",
        taxId: "44567890", tfdaLicense: "衛署醫器輸字第025679號", uploaded: false, updated: false,
    },
];

// ─── POST /using-v2/listByPage ────────────────────────────────────────────────

server.post('/using-v2/listByPage', (req, res) => {
    const { startTime, endTime, page = 1, limit = 20 } = req.body || {};

    let filtered = MOCK_USING_DATA;

    if (startTime) {
        filtered = filtered.filter(d => d.createTime >= startTime);
    }
    if (endTime) {
        filtered = filtered.filter(d => d.createTime <= endTime);
    }

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    res.json({ totalPages, totalCount, data });
});

// ─────────────────────────────────────────────────────────────────────────────

server.use(router);

const PORT = process.env.PORT || 3100;
server.listen(PORT, () => {
    console.log(`Mock API running on port ${PORT}`);
});

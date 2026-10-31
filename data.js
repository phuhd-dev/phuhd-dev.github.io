/*
 * ─────────────────────────────────────────────────────────────
 *  TOÀN BỘ NỘI DUNG TRANG NẰM Ở FILE NÀY.
 *  Sửa thông tin của bạn bên dưới, lưu lại, tải lại trang là xong.
 *
 *  - Chữ có 2 ngôn ngữ viết dạng { vi: "...", en: "..." }.
 *    Chỉ cần một ngôn ngữ thì ghi chuỗi thường: "..." (cả 2 ngôn ngữ dùng chung).
 *  - Bọc chữ trong **...** để in đậm.
 *  - Mục nào không có thì để mảng rỗng [] — trang sẽ tự ẩn mục đó.
 *  - Thời gian viết dạng "YYYY-MM" hoặc chỉ "YYYY". end: null nghĩa là "Hiện tại".
 *  - Nguồn nội dung: CV-tieng-viet.md. Sửa CV thì sửa luôn ở đây cho khớp.
 * ─────────────────────────────────────────────────────────────
 */
window.PROFILE = {
  isSample: false,
  updated: "2026-10",
  // Ngôn ngữ mặc định khi mở trang. Gửi bản tiếng Anh thì thêm ?lang=en vào cuối link.
  defaultLang: "vi",

  name: "Huỳnh Đại Phú",
  initials: "HĐP",
  avatar: "assets/avatar.jpg",

  role: "Flutter Developer",
  level: { vi: "Mid-level · 6 năm", en: "Mid-level · 6 years" },
  tagline: {
    vi: "Tôi làm app mobile đa nền tảng cho fintech, doanh nghiệp và đô thị thông minh. Gần nhất là 2 app giao dịch FX cho thị trường Nhật: **SBI FX** và **OANDA証券**.",
    en: "I build cross-platform mobile apps for fintech, enterprise and smart-city clients. Most recently: two FX trading apps for the Japanese market, **SBI FX** and **OANDA証券**."
  },
  location: { vi: "Nha Trang, Khánh Hoà", en: "Nha Trang, Vietnam" },
  availability: { vi: "Sẵn sàng nhận việc mới", en: "Open to new opportunities" },
  openTo: {
    vi: ["Toàn thời gian", "Tại Nha Trang: Onsite / Hybrid / Remote", "Nơi khác: Remote"],
    en: ["Full-time", "In Nha Trang: Onsite / Hybrid / Remote", "Elsewhere: Remote"]
  },

  contact: {
    email: "phuhd.dev@gmail.com",
    phone: "(+84) 768 860 660",
    zalo: "0945548502",          // số Zalo (khác số điện thoại), để "" nếu không dùng
    telegram: "https://t.me/phuhd2", // để "" nếu không dùng
    linkedin: "https://www.linkedin.com/in/phuhd/",
    github: "",
    website: "",
    cvPage: "cv.html",           // CV khổ A4 (bản tiếng Việt). Để "" thì ẩn nút.
    note: {
      vi: "Gọi điện, nhắn Zalo / Telegram hay gửi email đều được — tôi sẽ phản hồi sớm nhất có thể.",
      en: "Call, message me on Zalo / Telegram, or email — I'll get back to you as soon as I can."
    }
  },

  stats: [
    { value: { vi: "6 năm", en: "6 yrs" }, label: { vi: "phát triển ứng dụng mobile đa nền tảng", en: "building cross-platform mobile apps" } },
    { value: { vi: "2 app FX", en: "2 FX apps" }, label: { vi: "SBI FX & OANDA証券 cho thị trường Nhật", en: "SBI FX & OANDA証券 for the Japanese market" } },
    { value: "−30%", label: { vi: "thời gian tải app CiAMS (Vinpearl)", en: "app load time at CiAMS (Vinpearl)" } }
  ],

  about: {
    vi: [
      "Flutter Developer (mid-level), có **6 năm phát triển ứng dụng mobile đa nền tảng** (iOS & Android) cho **fintech, doanh nghiệp và đô thị thông minh**. Gần nhất tôi phát triển 2 app giao dịch FX cho thị trường Nhật Bản: **SBI FX** (đã có trên store) và **OANDA証券** (developer chính cùng leader, dựng từ con số 0 đến giai đoạn chuẩn bị phát hành). Tôi làm chính phần **đặt lệnh, cập nhật giá realtime và đăng nhập**.",
      "Trước đó tôi là **developer chính của CiAMS**, hệ thống quản lý tài sản cho nhân viên Vinpearl, và đã **giảm 30% thời gian tải app**. Tôi có kinh nghiệm dẫn dắt nhóm nhỏ, review code, xây codebase theo Clean Architecture và viết test, và **dùng AI (Claude Code, GitHub Copilot) hằng ngày** để viết code, debug và kiểm thử."
    ],
    en: [
      "Mid-level Flutter developer with **6 years of cross-platform mobile development** (iOS & Android) for **fintech, enterprise and smart-city** clients. Most recently I built two FX trading apps for the Japanese market: **SBI FX** (live on the stores) and **OANDA証券** (main developer alongside the lead, from scratch to release preparation). My main areas were **order entry, real-time prices and login**.",
      "Before that I was the **main developer of CiAMS**, Vinpearl's asset management app for staff, where I **cut app load time by 30%**. I have led small teams, reviewed code, built Clean Architecture codebases and written tests, and I **use AI (Claude Code, GitHub Copilot) every day** for coding, debugging and testing."
    ]
  },

  experience: [
    {
      company: "GUIDE Co., Ltd",
      role: { vi: "Lập trình viên Mobile (Flutter)", en: "Mobile Developer (Flutter)" },
      start: "2023-01",
      end: "2026-10",
      location: { vi: "Tân Bình, TP. HCM", en: "Tan Binh, Ho Chi Minh City" },
      summary: {
        vi: "Phát triển 2 app giao dịch FX cho SBI FX và OANDA証券, phục vụ thị trường Nhật Bản. Mỗi dự án có team mobile 3 người (1 leader, 2 developer), làm việc với khách hàng Nhật qua BrSE.",
        en: "Built two FX trading apps, SBI FX and OANDA証券, for the Japanese market. Each project had a 3-person mobile team (1 lead, 2 developers) working with Japanese clients through a BrSE."
      },
      highlights: {
        vi: [
          "Làm chính phần **đặt lệnh của SBIFX**, lõi nghiệp vụ của app: đủ các loại lệnh (thường, IFD, OCO, IFD-OCO, Limit/Stop, Trail, Speed Order), sửa lệnh, đóng vị thế hàng loạt, cùng công thức **lãi/lỗ quy ra Yên và tính theo pips**. Qua kiểm thử tích hợp (ITb) **không phát sinh lỗi nghiêm trọng**.",
          "Là **developer chính cùng leader**, dựng **app OANDA từ con số 0** (02/2025) đến giai đoạn chuẩn bị phát hành bản đầu tiên (**dự kiến 11/2026**): home, watchlist, đặt lệnh, position.",
          "Xây phần **cập nhật giá và vị thế realtime**: dữ liệu không bị mất hay sai thứ tự khi mạng chậm, khi đổi tab hoặc khi app chạy nền.",
          "Đưa app OANDA lên **màn hình gập và màn hình kép** (Pixel Fold, Android Adaptive Apps, **iPhone Duo trên iOS 27 SDK**): bố cục responsive theo kích thước màn hình; giữ đúng trạng thái và **phiên đăng nhập** khi gập, mở hoặc xoay máy; sửa lỗi **app bị treo khi đổi chế độ điều hướng hệ thống** (xử lý cả phía native Android).",
          "Đề xuất và dựng **mock stream API, mock Remote Config** và cơ chế **chuyển nhanh giữa API thật và stub API**, giúp cả team phát triển và test mà không phải chờ backend. Review code cho các thành viên trong team.",
          "Đưa **AI (GitHub Copilot, sau đó là Claude Code)** vào công việc hằng ngày: viết code, debug, **dò root cause từ log**, review code và viết test, nhờ vậy **phủ được nhiều case kiểm thử hơn**, kể cả test thao tác trên giao diện app."
        ],
        en: [
          "Main developer of the **SBIFX order entry**, the core of the app: every order type (market, IFD, OCO, IFD-OCO, Limit/Stop, Trail, Speed Order), order amendment, bulk position closing, plus **P/L in yen and in pips**. **No critical defects** in integration testing (ITb).",
          "As **main developer alongside the lead**, built the **OANDA app from scratch** (Feb 2025) up to preparing its first release (**planned for Nov 2026**): home, watchlist, order entry, positions.",
          "Built **real-time price and position updates** that never drop or reorder data on slow networks, tab switches or while the app is in the background.",
          "Brought the OANDA app to **foldable and dual-screen devices** (Pixel Fold, Android Adaptive Apps, **iPhone Duo on the iOS 27 SDK**): size-responsive layouts; state and **login session** kept when folding, unfolding or rotating; fixed an **app freeze when switching the system navigation mode** (including on the native Android side).",
          "Proposed and built **mock streaming APIs, a mock Remote Config** and a **quick switch between real and stub APIs**, so the whole team could develop and test without waiting on the backend. Reviewed code for teammates.",
          "Brought **AI (GitHub Copilot, then Claude Code)** into daily work: writing code, debugging, **tracing root causes from logs**, reviewing code and writing tests, which **widened test coverage**, including UI interaction tests."
        ]
      },
      // Tiêu đề ngắn cho từng gạch đầu dòng ở trên (cùng thứ tự). Có tiêu đề thì công ty này được trình bày dạng lưới nổi bật.
      titles: {
        vi: ["Đặt lệnh SBIFX", "OANDA từ con số 0", "Giá & vị thế realtime", "Màn hình gập & màn hình kép", "Mock API cho cả team", "AI trong công việc hằng ngày"],
        en: ["SBIFX order entry", "OANDA from scratch", "Real-time prices & positions", "Foldable & dual-screen", "Mock APIs for the team", "AI in daily work"]
      },
      tech: ["Flutter", "Riverpod", "AutoRoute", "SSE", "Auth0", "Platform channel"]
    },
    {
      company: "VinHMS Software JSC",
      role: { vi: "Lập trình viên Mobile (Flutter)", en: "Mobile Developer (Flutter)" },
      start: "2021-11",
      end: "2022-12",
      location: { vi: "Quận 3, TP. HCM", en: "District 3, Ho Chi Minh City" },
      summary: {
        vi: "Developer chính của **CiAMS**, app quản lý tài sản doanh nghiệp (EAM) dùng nội bộ cho nhân viên Vinpearl.",
        en: "Main developer of **CiAMS**, an in-house enterprise asset management (EAM) app for Vinpearl staff."
      },
      highlights: {
        vi: [
          "Là **developer chính**, đưa CiAMS về đích **đúng hạn** dù yêu cầu nghiệp vụ thay đổi liên tục.",
          "Xây chế độ **offline**: app vẫn dùng được khi mất mạng và **tự đồng bộ dữ liệu khi có mạng lại**. Cache dữ liệu cục bộ (SQLite) kết hợp lazy loading giúp **giảm 30% thời gian tải app**.",
          "Xây các nghiệp vụ trên app: **kiểm kê tài sản bằng quét mã**, giao việc và bảo trì, tra cứu thông tin và lịch sử vòng đời tài sản, quản lý kho vật tư – phụ tùng, **báo lỗi kèm chụp ảnh** và ghi chỉ số điện nước.",
          "Phối hợp với DevOps và backend để **tích hợp Datadog** vào app, giúp theo dõi lỗi và hiệu năng ngay trên môi trường thật."
        ],
        en: [
          "As **main developer**, shipped CiAMS **on schedule** despite constantly changing business requirements.",
          "Built an **offline mode**: the app keeps working without a connection and **syncs automatically once back online**. Local caching (SQLite) plus lazy loading **cut app load time by 30%**.",
          "Built the app's business flows: **asset inventory by code scanning**, work orders and maintenance, asset details and lifecycle history, spare-parts stock, **fault reports with photos** and utility meter readings.",
          "Worked with DevOps and backend to **integrate Datadog**, tracking errors and performance in production."
        ]
      },
      tech: ["Flutter", "GetX", "SQLite", "Firebase", "Datadog"]
    },
    {
      company: "FPT Software",
      role: { vi: "Lập trình viên Mobile (Flutter)", en: "Mobile Developer (Flutter)" },
      start: "2020-11",
      end: "2021-10",
      location: { vi: "TP. Thủ Đức, TP. HCM", en: "Thu Duc City, Ho Chi Minh City" },
      summary: {
        vi: "Phát triển DxKit, app tiện ích dành cho cư dân khu đô thị.",
        en: "Built DxKit, a services app for residents of urban developments."
      },
      highlights: {
        vi: [
          "**Team Lead dự án DxKit** (03–06/2021), dẫn dắt nhóm **3 người** ở giai đoạn kick-off. Tôi nhận yêu cầu từ BA, chia task, giao cho đúng người và giữ dự án đúng tiến độ.",
          "Điều phối việc phát hành phiên bản mới, cập nhật tính năng và bản sửa lỗi.",
          "Phân tích báo cáo lỗi để tìm ra xu hướng và xử lý dứt điểm các lỗi tái diễn."
        ],
        en: [
          "**Team Lead for DxKit** (Mar–Jun 2021), leading a **3-person team** through kick-off: took requirements from the BA, split the work, assigned it to the right people and kept the project on schedule.",
          "Coordinated new releases, feature updates and bug-fix releases.",
          "Analysed bug reports to spot trends and permanently fix recurring defects."
        ]
      },
      tech: ["Flutter", "BLoC", "RxDart", "Provider", "Firebase"]
    },
    {
      company: "Two Media Co., Ltd",
      role: { vi: "Lập trình viên Mobile (Flutter)", en: "Mobile Developer (Flutter)" },
      start: "2020-01",
      end: "2020-10",
      location: { vi: "Quận 1, TP. HCM", en: "District 1, Ho Chi Minh City" },
      summary: {
        vi: "Phát triển Mano, nền tảng kiểm duyệt và xem video.",
        en: "Built Mano, a video moderation and viewing platform."
      },
      highlights: {
        vi: [
          "Cùng nhóm hoàn thiện app Mano trên Flutter: quản lý tài khoản và xem video đã kiểm duyệt.",
          "Hỗ trợ đội backend (Golang / Buffalo) xây **API tải video lên AWS S3**, cùng **WebSocket server và client**."
        ],
        en: [
          "Helped the team complete the Mano Flutter app: account management and viewing moderated videos.",
          "Supported the backend team (Golang / Buffalo) in building a **video upload API to AWS S3** and a **WebSocket server and client**."
        ]
      },
      tech: ["Flutter", "BLoC", "Firebase", "Golang", "AWS S3"]
    }
  ],

  projects: [
    {
      name: "SBI FX",
      start: "2023-01", end: "2026-10",          // dùng cho dải thời gian
      period: "2023 – 2026",
      domain: { vi: "Giao dịch FX, thị trường Nhật", en: "FX trading, Japan" },
      role: { vi: "Developer, làm chính phần đặt lệnh", en: "Developer, main dev on order entry" },
      tech: ["Flutter", "Riverpod", "AutoRoute", { vi: "Platform channel iOS", en: "iOS platform channel" }],
      link: "https://apps.apple.com/jp/app/sbi%E8%A8%BC%E5%88%B8-fx%E3%82%A2%E3%83%97%E3%83%AA-fx-%E7%82%BA%E6%9B%BF%E3%81%AE%E5%8F%96%E5%BC%95%E3%82%A2%E3%83%97%E3%83%AA/id449512771"
    },
    {
      name: "OANDA証券",
      start: "2025-02", end: "2026-10",          // dùng cho dải thời gian
      period: "2025 – 2026",
      domain: { vi: "Giao dịch FX & CFD, thị trường Nhật", en: "FX & CFD trading, Japan" },
      role: { vi: "Developer chính cùng leader, từ đầu dự án", en: "Main developer with the lead, from day one" },
      tech: ["Flutter", "Riverpod", "SSE", "Auth0", "WebView"],
      link: ""
    },
    {
      name: "CiAMS",
      start: "2021-11", end: "2022-12",          // dùng cho dải thời gian
      period: "2021 – 2022",
      domain: { vi: "Quản lý tài sản doanh nghiệp (EAM), Vinpearl", en: "Enterprise asset management (EAM), Vinpearl" },
      role: { vi: "Developer chính", en: "Main developer" },
      tech: ["Flutter", "GetX", { vi: "SQLite (offline sync)", en: "SQLite (offline sync)" }, "Firebase", "Datadog"],
      link: "https://apps.apple.com/vn/app/staff-app/id6449700366?l=vi"
    },
    {
      name: "DxKit",
      start: "2020-11", end: "2021-10",          // dùng cho dải thời gian
      lead: ["2021-03", "2021-06"], // giai đoạn làm Team Lead
      period: "2021",
      domain: { vi: "Tiện ích cư dân đô thị", en: "Urban resident services" },
      role: "Developer, Team Lead",
      tech: ["Flutter", "BLoC", "RxDart", "Provider", "Firebase"],
      link: ""
    },
    {
      name: "Mano",
      start: "2020-01", end: "2020-10",          // dùng cho dải thời gian
      period: "2020",
      domain: { vi: "Nền tảng kiểm duyệt video", en: "Video moderation platform" },
      role: "Developer",
      tech: ["Flutter", "BLoC", "Firebase", "Golang"],
      link: ""
    }
  ],

  skills: [
    { group: "Mobile", items: ["Flutter", "Dart", { vi: "Đa nền tảng iOS & Android", en: "Cross-platform iOS & Android" }, "Clean Architecture", "Platform channel (Swift / Kotlin)"] },
    { group: "State management", items: ["Riverpod", "BLoC", "GetX", "RxDart", "Provider", "GetIt"] },
    { group: { vi: "Chất lượng", en: "Quality" }, items: ["Unit / Widget / Integration test", { vi: "Review code", en: "Code review" }, "Mock / stub API"] },
    { group: { vi: "Dữ liệu & dịch vụ", en: "Data & services" }, items: ["SQLite", "Firebase (Crashlytics, FCM, Remote Config)", "NoSQL", "REST API", { vi: "SSE / streaming realtime", en: "SSE / real-time streaming" }, "WebSocket", "AWS S3"] },
    { group: { vi: "Xác thực & nền tảng", en: "Auth & platform" }, items: ["Auth0 / OAuth2 PKCE", { vi: "WebView lai (cookie, header)", en: "Hybrid WebView (cookies, headers)" }, { vi: "Đa ngôn ngữ (ja/en)", en: "Localization (ja/en)" }, { vi: "Màn hình gập & màn hình kép (Android Adaptive Apps, iPhone Duo)", en: "Foldable & dual-screen (Android Adaptive Apps, iPhone Duo)" }, { vi: "Xoay màn hình theo cảm biến", en: "Sensor-based rotation" }] },
    { group: { vi: "AI trong phát triển", en: "AI in development" }, items: ["Claude Code", "GitHub Copilot", { vi: "Viết code & debug với AI", en: "AI-assisted coding & debugging" }, { vi: "Phân tích log", en: "Log analysis" }, { vi: "Sinh test", en: "Test generation" }, { vi: "Viết Skill cho Claude Code (vd OCR bằng Apple Vision chạy trên máy)", en: "Custom Claude Code Skills (e.g. on-device OCR with Apple Vision)" }] },
    { group: { vi: "Giám sát & công cụ", en: "Monitoring & tools" }, items: ["Datadog", "Jira", "Backlog", "Git (GitHub, GitLab)"] },
    { group: { vi: "Khác", en: "Other" }, items: ["Android (Java, MVC)", { vi: "Golang / Buffalo (cơ bản)", en: "Golang / Buffalo (basic)" }, "OOP", { vi: "Cấu trúc dữ liệu & giải thuật", en: "Data structures & algorithms" }] },
    { group: { vi: "Làm việc nhóm", en: "Teamwork" }, items: [{ vi: "Dẫn dắt nhóm nhỏ", en: "Leading small teams" }, { vi: "Chia việc theo yêu cầu từ BA", en: "Planning work from BA requirements" }, { vi: "Phối hợp UX/UI, backend, DevOps", en: "Working with UX/UI, backend, DevOps" }, { vi: "Khách hàng Nhật (qua BrSE)", en: "Japanese clients (via BrSE)" }] }
  ],

  education: [
    {
      school: { vi: "Học viện Công nghệ Bưu chính Viễn thông (PTIT), TP. HCM", en: "Posts & Telecommunications Institute of Technology (PTIT), HCMC" },
      degree: { vi: "Kỹ sư Công nghệ Đa phương tiện", en: "Engineer's Degree in Multimedia Technology" },
      start: "2014",
      end: "2019"
    }
  ],

  certifications: [],

  languages: [
    { name: { vi: "Tiếng Anh", en: "English" }, level: { vi: "Đọc hiểu tài liệu kỹ thuật", en: "Reading technical documentation" } }
  ],

  // Lời nhận xét từ sếp / đồng nghiệp cũ (vd lấy từ LinkedIn Recommendations). Để [] nếu chưa có.
  testimonials: []
};

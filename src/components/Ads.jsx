import { useEffect, useRef } from "react";

/* =========================================================
   HIGH REVENUE FORMAT ADS
========================================================= */

const AD_CONFIGS = {
  "160x300": {
    width: 160,
    height: 300,
    key: "f44d2c44bb180bf086b9ed9d4dfa1bcb",
    src: "https://www.highrevenueformat.com/f44d2c44bb180bf086b9ed9d4dfa1bcb/invoke.js",
  },

  "320x50": {
    width: 320,
    height: 50,
    key: "307b221387cc5d827c04a022a0bf1d1f",
    src: "https://www.highrevenueformat.com/307b221387cc5d827c04a022a0bf1d1f/invoke.js",
  },

  "728x90": {
    width: 728,
    height: 90,
    key: "aaecdb4c7c7f14863630123143dc2fd4",
    src: "https://www.highrevenueformat.com/aaecdb4c7c7f14863630123143dc2fd4/invoke.js",
  },
};

/* =========================================================
   PROFITABLE RATE ADS
========================================================= */

const PROFITABLE_RATE = {
  "profit-1":
    "https://pl31279381.profitableratecpmnetwork.com/19/39/6a/19396acf310a027f4dbee458cad9bc9e.js",

  "profit-2":
    "https://pl31279385.profitableratecpmnetwork.com/84/e3/3d/84e33d944bd8672f824018fd3e509e4f.js",
};

/* =========================================================
   DIMENSIONS
========================================================= */

const DIMENSIONS = {
  "160x300": "w-[160px] h-[300px]",
  "320x50": "w-[320px] h-[50px]",
  "728x90": "w-[728px] h-[90px]",

  "profit-1": "w-full min-h-[50px]",
  "profit-2": "w-full min-h-[50px]",
};

/* =========================================================
   HIGH REVENUE FORMAT
   Runs inside an isolated iframe.

   This is important because HighRevenueFormat uses:
       window.atOptions

   Every iframe gets its own window object, so two ads
   cannot overwrite each other's atOptions.
========================================================= */

function loadHighRevenueAd(container, config) {
  const { key, width, height, src } = config;

  const iframe = document.createElement("iframe");

  iframe.width = width;
  iframe.height = height;

  iframe.style.width = `${width}px`;
  iframe.style.height = `${height}px`;
  iframe.style.border = "0";
  iframe.style.margin = "0";
  iframe.style.padding = "0";
  iframe.style.display = "block";
  iframe.style.overflow = "hidden";

  iframe.setAttribute("frameBorder", "0");
  iframe.setAttribute("scrolling", "no");
  iframe.setAttribute("title", "Advertisement");

  container.appendChild(iframe);

  const iframeDocument =
    iframe.contentDocument || iframe.contentWindow.document;

  iframeDocument.open();

  iframeDocument.write(`
    <!DOCTYPE html>

    <html>
      <head>

        <meta
          name="viewport"
          content="width=${width}, initial-scale=1.0"
        />

        <style>
          html,
          body {
            margin: 0;
            padding: 0;

            width: ${width}px;
            height: ${height}px;

            overflow: hidden;

            background: transparent;
          }
        </style>

      </head>

      <body>

        <script>
          window.atOptions = {
            key: "${key}",
            format: "iframe",
            height: ${height},
            width: ${width},
            params: {}
          };
        <\/script>

        <script
          src="${src}"
          async
        ><\/script>

      </body>
    </html>
  `);

  iframeDocument.close();

  return iframe;
}

/* =========================================================
   PROFITABLE RATE
========================================================= */

function loadProfitableRateAd(container, src) {
  const script = document.createElement("script");

  script.src = src;
  script.async = true;

  container.appendChild(script);

  return script;
}

/* =========================================================
   ADS COMPONENT
========================================================= */

const Ads = ({ type }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const container = adRef.current;

    if (!container || !type) {
      return;
    }

    /* ---------------------------------------------
       Clear only THIS ad component
    --------------------------------------------- */

    container.innerHTML = "";

    /* ---------------------------------------------
       HIGH REVENUE FORMAT
    --------------------------------------------- */

    const highRevenueConfig = AD_CONFIGS[type];

    if (highRevenueConfig) {
      loadHighRevenueAd(container, highRevenueConfig);
    }

    /* ---------------------------------------------
       PROFITABLE RATE
    --------------------------------------------- */

    const profitableRateSrc = PROFITABLE_RATE[type];

    if (profitableRateSrc) {
      loadProfitableRateAd(container, profitableRateSrc);
    }

    /* ---------------------------------------------
       CLEANUP
    --------------------------------------------- */

    return () => {
      container.innerHTML = "";
    };
  }, [type]);

  /* =================================================
     INVALID TYPE
  ================================================= */

  if (!type || !DIMENSIONS[type]) {
    return null;
  }

  /* =================================================
     RENDER
  ================================================= */

  return (
    <div
      ref={adRef}
      className={`${DIMENSIONS[type]} overflow-hidden`}
      data-ad-type={type}
      data-ad-placement="techby"
    />
  );
};

export default Ads; 


















// import { useEffect, useRef } from "react";

// /* =========================================================
//    DUMMY AD CONFIG
//    No real ad network / API is used
// ========================================================= */

// const DUMMY_ADS = {
//   "160x300": {
//     width: 160,
//     height: 300,
//     label: "160 × 300 AD",
//   },

//   "320x50": {
//     width: 320,
//     height: 50,
//     label: "320 × 50 AD",
//   },

//   "728x90": {
//     width: 728,
//     height: 90,
//     label: "728 × 90 AD",
//   },

//   "profit-1": {
//     width: "100%",
//     height: 60,
//     label: "DUMMY AD",
//   },

//   "profit-2": {
//     width: "100%",
//     height: 60,
//     label: "DUMMY AD",
//   },
// };

// /* =========================================================
//    ADS COMPONENT
// ========================================================= */

// const Ads = ({ type }) => {
//   const adRef = useRef(null);

//   useEffect(() => {
//     const container = adRef.current;

//     if (!container || !type) {
//       return;
//     }

//     // Clear previous ad
//     container.innerHTML = "";

//     const ad = DUMMY_ADS[type];

//     if (!ad) {
//       return;
//     }

//     /* =====================================================
//        CREATE DUMMY AD
//     ===================================================== */

//     const wrapper = document.createElement("div");

//     wrapper.style.width =
//       typeof ad.width === "number" ? `${ad.width}px` : ad.width;

//     wrapper.style.height = `${ad.height}px`;

//     wrapper.style.display = "flex";
//     wrapper.style.alignItems = "center";
//     wrapper.style.justifyContent = "center";

//     wrapper.style.background =
//       "linear-gradient(135deg, #0f172a, #1e293b)";

//     wrapper.style.border = "1px solid #334155";
//     wrapper.style.borderRadius = "8px";

//     wrapper.style.color = "#94a3b8";
//     wrapper.style.fontSize = "12px";
//     wrapper.style.fontFamily = "Arial, sans-serif";

//     wrapper.style.overflow = "hidden";

//     /* =====================================================
//        AD TEXT
//     ===================================================== */

//     const text = document.createElement("span");

//     text.innerText = ad.label;

//     text.style.pointerEvents = "none";
//     text.style.userSelect = "none";

//     wrapper.appendChild(text);

//     container.appendChild(wrapper);

//     /* =====================================================
//        CLEANUP
//     ===================================================== */

//     return () => {
//       container.innerHTML = "";
//     };
//   }, [type]);

//   /* =========================================================
//      INVALID TYPE
//   ========================================================= */

//   if (!type || !DUMMY_ADS[type]) {
//     return null;
//   }

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <div
//       ref={adRef}
//       className="overflow-hidden"
//       data-ad-type={type}
//       data-ad-placement="techby"
//     />
//   );
// };

// export default Ads;
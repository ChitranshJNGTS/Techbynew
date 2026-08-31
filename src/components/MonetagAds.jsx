import { useEffect } from "react";

export default function MonetagAds() {
  useEffect(() => {
    // Script 1
    const script1 = document.createElement("script");
    script1.src = "https://5gvci.com/act/files/tag.min.js?z=11690249";
    script1.dataset.cfasync = "false";
    script1.async = true;

    // Script 2
    const script2 = document.createElement("script");
    script2.dataset.zone = "11690252";
    script2.src = "https://nap5k.com/tag.min.js";
    script2.async = true;

    // Script 3
    const script3 = document.createElement("script");
    script3.dataset.zone = "11690253";
    script3.src = "https://n6wxm.com/vignette.min.js";
    script3.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);

    return () => {
      script1.remove();
      script2.remove();
      script3.remove();
    };
  }, []);

  return null;
}
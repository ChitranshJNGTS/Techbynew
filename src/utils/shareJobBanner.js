
import { toBlob } from "html-to-image";

export async function shareJobBanner(bannerElement, job) {
  if (!bannerElement) {
    throw new Error("Job banner is not ready.");
  }

  const blob = await toBlob(bannerElement, {
    pixelRatio: 3,
    backgroundColor: "#ffffff",
    cacheBust: true,
  });

  if (!blob) {
    throw new Error("Could not create the job image.");
  }

  const file = new File(
    [blob],
    `${(job?.jobTitle || "job").replace(/[^a-z0-9]+/gi, "-")}.png`,
    { type: "image/png" }
  );

  const title = `${job?.jobTitle || "Job Opening"} at ${
    job?.companyName || "Company"
  }`;

  const text = `${title}\nFind more genuine job openings on TechBy.`;

  if (
    navigator.canShare &&
    navigator.canShare({ files: [file] }) &&
    navigator.share
  ) {
    await navigator.share({
      files: [file],
      title,
      text,
    });
    return;
  }

  // Fallback: download the PNG so the user can attach it in WhatsApp.
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = file.name;
  link.click();

  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

  throw new Error(
    "The image was downloaded. Attach it to your WhatsApp message manually."
  );
}

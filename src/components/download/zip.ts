import JSZip from "jszip";

export async function packageZip(urls: string[]): Promise<Blob> {
  const zip = new JSZip();

  for (const url of urls) {
    const filename = url.split("/").slice(-1)[0];
    const response = await fetch(url);

    if (response.status === 404) {
      // Let caller know which file is missing
      alert(`File not found: ${filename} (URL: ${url})`);
      throw new Error(`404 - File not found: ${url}`);
    }

    // Any non-OK response should be treated as an error (400, 403, 500, ...)
    if (!response.ok) {
      alert(`Error fetching file: ${filename} (status: ${response.status})`);
      throw new Error(`${response.status} - Error fetching: ${url}`);
    }

    const data = await response.blob();
    zip.file(filename, data);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  return blob;
}

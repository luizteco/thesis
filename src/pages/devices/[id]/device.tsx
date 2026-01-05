import {
  CustomiseObjectForm,
  type CustomiseObjectFormField,
} from "@components/customise/customise-object-form";
import { downloadObject } from "@components/download/download";
import { Preview } from "@components/object/preview";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetDeviceById } from "./use-get-device";

export type DeviceConfig = {
  name: string;
  id: string;
  previewStlPath: string;
  previewImagePath: string;
  description: string;
  // download configuration (optional)
  productType?: "cutlery" | "cup" | "button" | "bidet" | string;
  staticFiles?: string[];
  variablePattern?: string;
  variableParts?: string[];
  prefixUrl?: string;
  sizeTable?: Array<any>;
  handleYesParts?: string[];
  handleNoParts?: string[];
  includeInstructions?: boolean;
  previewImages?: string[];
};

export function Device() {
  const { id } = useParams<{ id: string }>();
  const device = useGetDeviceById(id!);
  const { t } = useTranslation();

  const [isDownloading, setIsDownloading] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 10,
    height: 10,
    depth: 30,
    thickness: 2,
  });
  const [includeHandle, setIncludeHandle] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const handleDimensionsChange = useCallback(
    (values: Record<string, number>) => {
      setDimensions({
        width: values.width,
        height: values.height,
        depth: values.depth,
        thickness: values.thickness ?? dimensions.thickness,
      });
    },
    [dimensions.thickness]
  );

  const CustomiseObjectFormFields: CustomiseObjectFormField[] = (() => {
    if (!device) return [];
    // No customization required for bidet
    if (device.productType === "bidet") return [];

    // Button: width + height only
    if (device.productType === "button") {
      return [
        { label: t("device.width"), inputId: "width", value: dimensions.width },
        { label: t("device.height"), inputId: "height", value: dimensions.height },
      ];
    }

    // Cup: height + thickness only
    if (device.productType === "cup") {
      return [
        { label: t("device.height"), inputId: "height", value: dimensions.height },
        { label: t("device.thickness"), inputId: "thickness", value: (dimensions as any).thickness },
      ];
    }

    // Cutlery: height + thickness only (width not required)
    if (device.productType === "cutlery") {
      return [
        { label: t("device.height"), inputId: "height", value: dimensions.height },
        { label: t("device.thickness"), inputId: "thickness", value: (dimensions as any).thickness },
      ];
    }

    // Fallback: width, height, depth
    return [
      { label: t("device.width"), inputId: "width", value: dimensions.width },
      { label: t("device.height"), inputId: "height", value: dimensions.height },
      { label: t("device.depth"), inputId: "depth", value: dimensions.depth },
    ];
  })();

  const handleDownload = async () => {
    if (!device) return;
    setIsDownloading(true);
    try {
      // eslint-disable-next-line no-console
      console.log("Device.download clicked", { id: device.id, dimensions, includeHandle });

      await downloadObject(
        device.id,
        dimensions,
        {
          productType: device.productType,
          staticFiles: device.staticFiles,
          variablePattern: device.variablePattern,
          variableParts: device.variableParts,
          prefixUrl: device.prefixUrl,
          sizeTable: (device as any).sizeTable,
          handleYesParts: device.handleYesParts,
          handleNoParts: device.handleNoParts,
          includeInstructions: device.includeInstructions,
          handlePattern: (device as any).handlePattern,
        },
        { includeHandle }
      );
    } catch (err: any) {
      // Show a friendly error to the user and log details to console
      // eslint-disable-next-line no-console
      console.error("Download failed:", err);
      alert(`Download failed: ${err?.message ?? String(err)}`);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!device) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-700">{t("device.loading")}</p>
        </div>
      </div>
    );
  }

  const printedImages = device.previewImages || (() => {
    if (device.id === "bidet") return ["/preview-images/bidet.png"];
    if (device.id === "button") return ["/preview-images/button.png"];
    if (device.id === "cup") return ["/preview-images/cup.png"];
    if (device.id === "cutlery") return ["/preview-images/cutlery.png"];
    return [device.previewImagePath];
  })();

  const getPrintingMaterials = () => {
    switch (device.id) {
      case "cutlery":
        return (
          <>
            <p><strong>Assembly:</strong> Print two springs, insert them into the handle and close with the top.</p>
            <p><strong>Supports:</strong> Supports on the handle.</p>
            <p><strong>Filament:</strong> PLA or PETG recommended.</p>
            <p><strong>Layer height:</strong> 0.28 mm standard; 0.2 mm for smoother grip surfaces.</p>
            <p><strong>Wall/perimeters:</strong> 3–4 walls; infill 20–30% gyroid or grid.</p>
            <p><strong>Bed adhesion:</strong> Use a brim for tall parts; keep bed clean (IPA) for best adhesion.</p>
            <p><strong>Orientation:</strong> Place grip surfaces upward to minimize supports; Check photo for reference.</p>
          </>
        );
      case "cup":
        return (
          <>
            <p><strong>Assembly:</strong> Print 9 flexible sticks. Utilize a 8mm Roller bearing to connect the handle to the cup support.</p>
            <p><strong>Supports:</strong> Enable supports only where touching the build plate, brim on the flexible sticks.</p>
            <p><strong>Filament:</strong> PLA.</p>
            <p><strong>Layer height:</strong> 0.28 mm standard; 0.2 mm for smoother grip surfaces.</p>
            <p><strong>Wall/perimeters:</strong> 3–4 walls; infill 20–30% gyroid or grid.</p>
            <p><strong>Bed adhesion:</strong> Use a brim for small parts; keep bed clean (IPA) for best adhesion.</p>
            <p><strong>Orientation:</strong> Place grip surfaces upward to minimize supports; Check the photo for reference.</p>
          </>
        );
      case "button":
        return (
          <>
            <p><strong>Assembly:</strong> Print 4 pins to make the connection between the handles. Fill the inner grip with heavy particles to make it more stable. Print extra hooks to change it due to wear and use.</p>
            <p><strong>Supports:</strong> Enable supports on the print bed.</p>
            <p><strong>Filament:</strong> PLA.</p>
            <p><strong>Layer height:</strong> 0.2 mm standard; 0.16 mm for smoother grip surfaces.</p>
            <p><strong>Wall/perimeters:</strong> 3–4 walls; infill 20–30% gyroid or grid.</p>
            <p><strong>Bed adhesion:</strong> Use a brim for the hooks; keep bed clean (IPA) for best adhesion.</p>
            <p><strong>Orientation:</strong> Place grip surfaces upward to minimize supports; keep mating faces flat on the bed.</p>
          </>
        );
      case "bidet":
        return (
          <>
            <p><strong>Assembly:</strong> Connect the device to a standard PET bottle with water to utilize the product.</p>
            <p><strong>Support:</strong> No support.</p>
            <p><strong>Filament:</strong> PLA.</p>
            <p><strong>Layer height:</strong> 0.2 mm standard; 0.16 mm for smoother grip surfaces.</p>
            <p><strong>Wall/perimeters:</strong> 3–4 walls; infill 20–30% gyroid or grid.</p>
            <p><strong>Bed adhesion:</strong> No brim.</p>
            <p><strong>Orientation:</strong> Place grip surfaces upward to minimize supports; keep mating faces flat on the bed, check photos for reference.</p>
          </>
        );
      default:
        return (
          <>
            <p><strong>Supports:</strong> Enable supports only where touching the build plate unless your slicer reports overhangs beyond 60°.</p>
            <p><strong>Filament:</strong> PLA or PETG recommended. For food contact, use food-safe PLA and a clean nozzle.</p>
            <p><strong>Layer height:</strong> 0.2 mm standard; 0.16 mm for smoother grip surfaces.</p>
            <p><strong>Wall/perimeters:</strong> 3–4 walls; infill 20–30% gyroid or grid.</p>
            <p><strong>Bed adhesion:</strong> Use a brim for tall parts; keep bed clean (IPA) for best adhesion.</p>
            <p><strong>Orientation:</strong> Place grip surfaces upward to minimize supports; keep mating faces flat on the bed.</p>
          </>
        );
    }
  };

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  const nextImage = () => {
    setViewerIndex((prev) => (prev + 1) % printedImages.length);
  };

  const prevImage = () => {
    setViewerIndex((prev) => (prev - 1 + printedImages.length) % printedImages.length);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h1 className="text-4xl font-bold text-black mb-3">
                {t(`devices.${device.id}.name`, { defaultValue: device.name })}
              </h1>
              <p className="text-lg text-gray-700">{t(`devices.${device.id}.description`, { defaultValue: device.description })}</p>

              {CustomiseObjectFormFields.length > 0 ? (
                <>
                  <h2 className="text-xl font-bold text-black mb-6">{t("device.customizeDimensions")}</h2>
                  <CustomiseObjectForm fields={CustomiseObjectFormFields} onChange={handleDimensionsChange} />
                </>
              ) : (
                <div className="mt-4 text-gray-700">{t("device.noCustomization")}</div>
              )}
              {device.productType === "cutlery" && (
                <div className="mt-4 flex items-center gap-3">
                  <input
                    id="include-handle"
                    type="checkbox"
                    checked={includeHandle}
                    onChange={(e) => setIncludeHandle(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="include-handle" className="text-gray-700">
                    {t("device.includeHandle")}
                  </label>
                </div>
              )}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="mt-8 w-full px-6 py-4 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {t("device.downloading")}
                  </span>
                ) : (
                  t("device.download", { name: device.name })
                )}
              </button>

              <div className="mt-8 space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                  <button className="w-full text-left px-4 py-3 font-semibold text-black flex items-center justify-between">
                    <span>Printed Examples</span>
                    <span className="text-sm text-gray-500">(click to view)</span>
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
                    {printedImages.map((src, idx) => (
                      <div
                        key={src}
                        className="relative w-full rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => openViewer(idx)}
                      >
                        {src.endsWith('.mp4') ? (
                          <>
                            <video
                              src={src}
                              className="w-full h-48 object-cover"
                              muted
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="bg-white/90 rounded-full p-3">
                                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <img
                            src={src}
                            alt={`Printed example for ${device.name}`}
                            className="w-full h-48 object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                  <button className="w-full text-left px-4 py-3 font-semibold text-black flex items-center justify-between">
                    <span>Printing & Materials</span>
                    <span className="text-sm text-gray-500">(scrollable)</span>
                  </button>
                  <div className="max-h-48 overflow-y-auto px-4 pb-4 space-y-2 text-gray-700 text-sm">
                    {getPrintingMaterials()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full order-1 lg:order-2">
            <Preview stlPath={device.previewStlPath} productId={device.id} />
          </div>
        </div>
      </div>
      {viewerOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center px-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={closeViewer}
              className="absolute -top-10 right-0 text-white text-lg font-semibold px-3 py-1 rounded-full bg-white/20 hover:bg-white/30"
            >
              Close
            </button>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              {printedImages[viewerIndex].endsWith('.mp4') ? (
                <video
                  src={printedImages[viewerIndex]}
                  controls
                  autoPlay
                  loop
                  className="w-full h-[70vh] object-contain bg-black"
                />
              ) : (
                <img
                  src={printedImages[viewerIndex]}
                  alt={`Printed example ${viewerIndex + 1}`}
                  className="w-full h-[70vh] object-contain bg-black"
                />
              )}
              {printedImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-3 shadow"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-3 shadow"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            <div className="mt-4 flex justify-center gap-2 text-white text-sm">
              {printedImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setViewerIndex(idx)}
                  className={`h-2 w-2 rounded-full ${idx === viewerIndex ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
